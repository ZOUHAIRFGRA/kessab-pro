# Azure Deployment Setup

This document explains how to set up the Azure environment for deploying the KessabPro backend application.

## Prerequisites

1. An Azure account
2. GitHub account with the repository containing the application
3. Azure CLI installed (optional for local setup)

## Setup Steps

### 1. Create Azure Resources

1. **Create a Resource Group:**

```bash
az group create --name kessab-pro-rg --location eastus
```

2. **Create an Azure App Service Plan:**

```bash
az appservice plan create --name kessab-pro-plan --resource-group kessab-pro-rg --sku B1 --is-linux
```

3. **Create an Azure Web App:**

```bash
az webapp create --resource-group kessab-pro-rg --plan kessab-pro-plan --name kessab-pro-app --runtime "JAVA:17-java17"
```

4. **Create an Azure MySQL Database:**

```bash
az mysql server create \
  --resource-group kessab-pro-rg \
  --name kessab-pro-mysql \
  --location eastus \
  --admin-user mysqlrootuser \
  --admin-password YOUR_PASSWORD_HERE \
  --sku-name B_Gen5_1
```

5. **Create the MySQL database:**

```bash
az mysql db create \
  --resource-group kessab-pro-rg \
  --server-name kessab-pro-mysql \
  --name kessab
```

6. **Configure Web App settings:**

```bash
az webapp config appsettings set \
  --resource-group kessab-pro-rg \
  --name kessab-pro-app \
  --settings \
    SPRING_DATASOURCE_URL="jdbc:mysql://kessab-pro-mysql.mysql.database.azure.com:3306/kessab?useSSL=true&requireSSL=false&createDatabaseIfNotExist=true" \
    SPRING_DATASOURCE_USERNAME="mysqlrootuser@kessab-pro-mysql" \
    SPRING_DATASOURCE_PASSWORD=YOUR_PASSWORD_HERE \
    JWT_SECRET=YOUR_JWT_SECRET_HERE \
    ADMIN_USERNAME=YOUR_ADMIN_USERNAME \
    ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD
```

### 2. Configure GitHub Secrets

Add the following secrets to your GitHub repository:

1. `AZURE_CREDENTIALS`: This is the service principal JSON for GitHub Actions to authenticate with Azure.

```bash
az ad sp create-for-rbac --name "kessab-pro-sp" --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/kessab-pro-rg \
  --sdk-auth
```

Copy the JSON output and add it as a secret named `AZURE_CREDENTIALS` in your GitHub repository settings.

2. `AZURE_PUBLISH_PROFILE`: Get the publish profile from the Azure portal:
   - Go to your App Service in the Azure portal
   - Click on "Get publish profile" and download the file
   - Copy the contents of the downloaded file and add it as a secret named `AZURE_PUBLISH_PROFILE` in your GitHub repository settings

### 3. Configure Database Firewall Rules

Allow connections from Azure services:

```bash
az mysql server firewall-rule create \
  --resource-group kessab-pro-rg \
  --server-name kessab-pro-mysql \
  --name AllowAllAzureIPs \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0
```

### 4. Prepare Your Application

Make sure your `application.properties` or `application.yml` file is set up to use environment variables for configuration.

For example:

```properties
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
jwt.secret=${JWT_SECRET}
```

### 5. Push to GitHub and Deploy

Once everything is set up, push your changes to the `main` branch or trigger the workflow manually to start the deployment process.
