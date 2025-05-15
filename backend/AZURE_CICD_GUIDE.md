# KessabPro Azure CI/CD Guide

This guide explains the CI/CD setup for deploying the KessabPro backend application to Azure.

## CI/CD Workflow Overview

The project uses GitHub Actions for continuous integration and deployment:

1. **Backend CI Workflow** - Triggered on pushes to `main` and `develop` branches
   - Builds and tests the Spring Boot application

2. **Backend Azure Deployment Workflow** - Triggered on pushes to the `main` branch
   - Builds the Spring Boot application
   - Deploys the JAR file to Azure App Service

3. **Container Deployment Workflow** (Alternative approach) - Manually triggered
   - Builds the Spring Boot application
   - Creates a Docker image and pushes it to Azure Container Registry
   - Deploys the container to Azure Container Apps

## Setup Instructions

### 1. Create Azure Resources

First, you need to set up the required Azure resources. You can do this manually through the Azure Portal or using Azure CLI:

```bash
# Login to Azure
az login

# Set subscription if you have multiple
az account set --subscription <your-subscription-id>

# Create Resource Group
az group create --name kessab-pro-rg --location eastus

# Create App Service Plan
az appservice plan create --name kessab-pro-plan --resource-group kessab-pro-rg --sku B1 --is-linux

# Create Web App
az webapp create --resource-group kessab-pro-rg --plan kessab-pro-plan --name kessab-pro-app --runtime "JAVA:17-java17"

# Create Azure MySQL Database
az mysql server create \
  --resource-group kessab-pro-rg \
  --name kessab-pro-mysql \
  --location eastus \
  --admin-user mysqlrootuser \
  --admin-password <your-secure-password> \
  --sku-name B_Gen5_1

# Create the MySQL database
az mysql db create \
  --resource-group kessab-pro-rg \
  --server-name kessab-pro-mysql \
  --name kessab
```

### 2. Configure GitHub Secrets

Set up the following secrets in your GitHub repository:

1. `AZURE_CREDENTIALS`: Service principal credentials for Azure authentication

```bash
az ad sp create-for-rbac --name "kessab-pro-sp" --role contributor \
  --scopes /subscriptions/<your-subscription-id>/resourceGroups/kessab-pro-rg \
  --sdk-auth
```

2. `AZURE_PUBLISH_PROFILE`: Download from the Azure portal
   - Go to your App Service in Azure Portal
   - Download publish profile
   - Copy the contents to this secret

3. Database and Application Secrets:
   - `DATASOURCE_URL`: JDBC connection string
   - `DATASOURCE_USERNAME`: Database username
   - `DATASOURCE_PASSWORD`: Database password
   - `JWT_SECRET`: Secret for JWT token generation
   - `ADMIN_USERNAME`: Admin username
   - `ADMIN_PASSWORD`: Admin password

4. For Container Deployment (if using):
   - `ACR_LOGIN_SERVER`: Azure Container Registry server (e.g., `kessabproacr.azurecr.io`)
   - `ACR_NAME`: Name of your Azure Container Registry
   - `ACR_USERNAME`: Username for ACR
   - `ACR_PASSWORD`: Password for ACR

### 3. Configure Environment Variables in Azure App Service

Set the following application settings in your Azure App Service:

```bash
az webapp config appsettings set \
  --resource-group kessab-pro-rg \
  --name kessab-pro-app \
  --settings \
    SPRING_PROFILES_ACTIVE=azure \
    SPRING_DATASOURCE_URL="jdbc:mysql://kessab-pro-mysql.mysql.database.azure.com:3306/kessab?useSSL=true&requireSSL=false&createDatabaseIfNotExist=true" \
    SPRING_DATASOURCE_USERNAME="mysqlrootuser@kessab-pro-mysql" \
    SPRING_DATASOURCE_PASSWORD=<your-secure-password> \
    JWT_SECRET=<your-jwt-secret> \
    ADMIN_USERNAME=<admin-username> \
    ADMIN_PASSWORD=<admin-password>
```

### 4. Additional Configuration

#### Allow Azure Services to Access MySQL

```bash
az mysql server firewall-rule create \
  --resource-group kessab-pro-rg \
  --server-name kessab-pro-mysql \
  --name AllowAllAzureIPs \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0
```

#### Configure SSL for MySQL Connection

If you need to configure SSL for your MySQL connection, download the certificate and use it in your application:

```bash
az mysql server show \
  --resource-group kessab-pro-rg \
  --name kessab-pro-mysql \
  --query "fullyQualifiedDomainName" \
  --output tsv
```

### 5. Monitoring and Troubleshooting

- View application logs in Azure App Service:
  - Go to your App Service in Azure Portal
  - Navigate to "Monitoring" > "Log Stream"

- Check deployment history:
  - Go to your App Service in Azure Portal
  - Navigate to "Deployment" > "Deployment Center" > "Logs"

## Local Development

For local development, you can use Docker Compose:

```bash
cd backend
docker-compose up
```

This will start:
- A MySQL database
- The Spring Boot application

## Switching Deployment Methods

This repository includes two deployment strategies:

1. **App Service JAR Deployment** - Deploys a JAR file directly to Azure App Service
   - Simpler configuration
   - Managed runtime environment

2. **Container Deployment** - Deploys a Docker container
   - More control over the environment
   - Better isolation
   - Consistent environments between dev and production

To switch between these methods, use the appropriate GitHub workflow.
