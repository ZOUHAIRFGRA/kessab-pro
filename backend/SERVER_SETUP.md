# Kessab Pro - Server Deployment Guide

## Prerequisites
- Ubuntu Server 20.04 LTS or higher
- Root access or sudo privileges

## Server Initial Setup

1. Update system:
```bash
sudo apt update && sudo apt upgrade -y
```

2. Install required packages:
```bash
sudo apt install -y docker.io docker-compose git curl
```

3. Enable Docker:
```bash
sudo systemctl start docker
sudo systemctl enable docker
```

4. Add your user to docker group (replace `ubuntu` with your username):
```bash
sudo usermod -aG docker ubuntu
# Log out and log back in for changes to take effect
```

## Application Setup

1. Create application directory:
```bash
sudo mkdir -p /opt/kessab-pro
sudo chown -R $USER:$USER /opt/kessab-pro
cd /opt/kessab-pro
```

2. Clone repository:
```bash
git clone https://github.com/ZOUHAIRFGRA/kessab-pro.git .
cd backend
```

3. Create and configure environment file:
```bash
cp .env.example .env
nano .env
```

Add the following to `.env`:
```env
# Database Configuration
DB_PASSWORD=your_strong_password
MYSQL_ROOT_PASSWORD=your_strong_password

# JWT Configuration
JWT_SECRET=your_very_long_random_string

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=strong_admin_password
```

4. Create and set permissions for uploads directory:
```bash
mkdir -p uploads
chmod 777 uploads
```

## Cloudflare Tunnel Setup

1. Install Cloudflared:
```bash
# Download the latest version
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

2. Login to Cloudflare:
```bash
cloudflared tunnel login
# Follow the browser authentication steps
```

3. Create tunnel:
```bash
# Create the tunnel
cloudflared tunnel create kessab-api

# Note down the Tunnel ID from the output
# Example output: "Created tunnel kessab-api with id 1234-5678-9abc-def0"
```

4. Configure tunnel:
```bash
# Create config directory
sudo mkdir -p /etc/cloudflared

# Create config file
sudo nano /etc/cloudflared/config.yml
```

Add to `config.yml`:
```yaml
tunnel: <YOUR-TUNNEL-ID>
credentials-file: /root/.cloudflared/<YOUR-TUNNEL-ID>.json

ingress:
  - hostname: kessab-api.tunnels.dev
    service: http://localhost:8080
  - service: http_status:404
```

5. Install tunnel as a service:
```bash
sudo cloudflared service install
sudo systemctl start cloudflared
sudo systemctl enable cloudflared
```

## Setup Auto-start on Boot

1. Create systemd service for the application:
```bash
sudo nano /etc/systemd/system/kessab-pro.service
```

Add the following:
```ini
[Unit]
Description=Kessab Pro Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/kessab-pro/backend
ExecStart=/usr/bin/docker-compose up -d
ExecStop=/usr/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

2. Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable kessab-pro
sudo systemctl start kessab-pro
```

## Useful Commands

### Application Management
```bash
# Start application
sudo systemctl start kessab-pro

# Stop application
sudo systemctl stop kessab-pro

# Check status
sudo systemctl status kessab-pro

# View logs
docker-compose logs -f
```

### Tunnel Management
```bash
# Check tunnel status
sudo systemctl status cloudflared

# Get tunnel URL
cloudflared tunnel info kessab-api

# Restart tunnel
sudo systemctl restart cloudflared
```

### Database Management
```bash
# Connect to database
docker-compose exec db mysql -u root -p

# Backup database
docker-compose exec db mysqldump -u root -p kessab > backup.sql

# Restore database
cat backup.sql | docker-compose exec -T db mysql -u root -p kessab
```

## Security Recommendations

1. Configure firewall:
```bash
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

2. Set up automatic security updates:
```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

3. Secure MySQL:
```bash
docker-compose exec db mysql_secure_installation
```

## Monitoring

To check if everything is running:

1. Application status:
```bash
curl http://localhost:8080/api/health
```

2. Docker containers:
```bash
docker-compose ps
```

3. Tunnel status:
```bash
sudo systemctl status cloudflared
```

## Troubleshooting

1. If containers won't start:
```bash
# Check logs
docker-compose logs

# Rebuild containers
docker-compose down
docker-compose up --build -d
```

2. If tunnel is not working:
```bash
# Check tunnel logs
sudo journalctl -u cloudflared

# Restart tunnel
sudo systemctl restart cloudflared
```

3. If uploads are not working:
```bash
# Check permissions
sudo chown -R 1000:1000 uploads/
sudo chmod 777 uploads/
```

## Maintenance

1. Update application:
```bash
cd /opt/kessab-pro
git pull
docker-compose down
docker-compose up --build -d
```

2. Backup data:
```bash
# Create backups directory
mkdir -p /opt/kessab-pro/backups

# Backup database
docker-compose exec db mysqldump -u root -p kessab > /opt/kessab-pro/backups/db_$(date +%Y%m%d).sql

# Backup uploads
tar -czf /opt/kessab-pro/backups/uploads_$(date +%Y%m%d).tar.gz uploads/
```

## Support

For issues and support:
- Create an issue on GitHub
- Contact: [Your Contact Information]

## Notes

- The Cloudflare Tunnel URL will remain static unless you delete the tunnel
- All uploaded files are stored in the `uploads` directory
- Database data is persisted in a Docker volume named `mysql-data`
- Logs are available through `docker-compose logs`
