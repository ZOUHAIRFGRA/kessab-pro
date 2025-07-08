# Kessab Pro Backend

## Prerequisites
- Docker
- Docker Compose
- Git

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/ZOUHAIRFGRA/kessab-pro.git
cd kessab-pro/backend
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Edit the `.env` file with your desired configuration:
- Set a secure JWT_SECRET
- Configure database credentials if needed
- Set admin username and password

4. Build and run the application:
```bash
docker-compose up --build
```

5. Verify the application is running:
```bash
curl http://localhost:8080/api/health
```

## Ports
- Backend API: 8080
- MySQL Database: 3306

## Environment Variables
See `.env.example` for all required environment variables.

## Health Check
Access `http://localhost:8080/api/health` to verify the application is running correctly.

## Database Access
To connect to the database:
```bash
mysql -h localhost -P 3306 -u root
```

## Troubleshooting
1. If containers fail to start, check logs:
```bash
docker-compose logs
```

2. To restart the application:
```bash
docker-compose down
docker-compose up --build
```

3. To clean up and start fresh:
```bash
docker-compose down -v
docker-compose up --build
```
