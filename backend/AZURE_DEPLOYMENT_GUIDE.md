# Azure Deployment Guide for KessabPro Backend

This guide explains how to deploy the KessabPro backend application to Azure using GitHub Actions.

## Prerequisites

Before you can deploy the application, you need to set up:

1. An Azure account
2. Azure resources (see below)
3. GitHub repository secrets

## Azure Resources

The following Azure resources are required:

1. **Resource Group**: `kessab-pro-rg`
2. **App Service Plan**: `kessab-pro-plan`
3. **Web App**: `kessab-pro-app`
4. **MySQL Database**: `kessab-pro-mysql`

## GitHub Secrets

The following GitHub secrets need to be set up in your repository:

1. `AZURE_CREDENTIALS`: Service principal credentials for Azure authentication
2. `AZURE_PUBLISH_PROFILE`: Publish profile for your Azure Web App
3. `DATASOURCE_URL`: MySQL database connection string
4. `DATASOURCE_USERNAME`: MySQL database username
5. `DATASOURCE_PASSWORD`: MySQL database password
6. `JWT_SECRET`: Secret key for JWT token generation
7. `ADMIN_USERNAME`: Admin username
8. `ADMIN_PASSWORD`: Admin password

## Setting Up the Deployment

### 1. Create Azure Resources

You can create the required Azure resources using the Azure Portal or Azure CLI:

```bash
# Login to Azure
az login

# Create Resource Group
az group create --name kessab-pro-rg --location eastus

# Create App Service Plan
az appservice plan create --name kessab-pro-plan --resource-group kessab-pro-rg --sku B1 --is-linux

# Create Web App
az webapp create --resource-group kessab-pro-rg --plan kessab-pro-plan --name kessab-pro-app --runtime "JAVA:17-java17"

# Create MySQL Database
az mysql server create \
  --resource-group kessab-pro-rg \
  --name kessab-pro-mysql \
  --location eastus \
  --admin-user mysqlrootuser \
  --admin-password YOUR_PASSWORD_HERE \
  --sku-name B_Gen5_1

# Create the database
az mysql db create \
  --resource-group kessab-pro-rg \
  --server-name kessab-pro-mysql \
  --name kessab
```

### 2. Configure GitHub Secrets

Set up the required GitHub secrets in your repository:

1. Create service principal for Azure authentication:
```bash
az ad sp create-for-rbac --name "kessab-pro-sp" --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/kessab-pro-rg \
  --sdk-auth
```
Copy the JSON output and add it as a secret named `AZURE_CREDENTIALS` in your repository settings.

2. Get the publish profile from the Azure portal and add it as `AZURE_PUBLISH_PROFILE`.

3. Add the remaining secrets with appropriate values.

### 3. Configure Database Firewall Rules

Allow Azure services to access the MySQL database:

```bash
az mysql server firewall-rule create \
  --resource-group kessab-pro-rg \
  --server-name kessab-pro-mysql \
  --name AllowAllAzureIPs \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0
```

## Deployment Workflows

This repository includes the following GitHub Actions workflows:

1. **Backend CI** (`backend-ci.yml`): 
   - Builds and tests the application on pushes to the `main` and `develop` branches.

2. **Azure Backend Deployment** (`azure-backend-deploy-updated.yml`): 
   - Deploys the application to Azure App Service on pushes to the `main` branch or manual triggers.

3. **Container Deployment** (`azure-container-deploy.yml`):
   - Optional workflow for deploying as a container to Azure Container Apps.

## Monitoring and Troubleshooting

After deployment, you can monitor the application in the Azure Portal:

1. View application logs:
   - Go to your App Service in Azure Portal
   - Navigate to "Monitoring" > "Log Stream"

2. Check deployment history:
   - Go to your App Service in Azure Portal
   - Navigate to "Deployment" > "Deployment Center" > "Logs"

## Local Development

For local development, you can use Docker Compose:

```bash
cd backend
docker-compose up
```

This will start a MySQL database and the Spring Boot application.
