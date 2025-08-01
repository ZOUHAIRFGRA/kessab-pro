#!/bin/bash

echo "=== Kessab Pro Status Check ==="
echo

# Check if containers are running
echo "1. Container Status:"
docker-compose ps
echo

# Check if application responds
echo "2. Application Health:"
if curl -s http://localhost:8080/api/health > /dev/null; then
    echo "✅ Application is responding"
    curl -s http://localhost:8080/api/health | jq '.' 2>/dev/null || curl -s http://localhost:8080/api/health
else
    echo "❌ Application is not responding"
fi
echo

# Check database connection
echo "3. Database Status:"
if docker-compose exec -T db mysql -u root -p${DB_PASSWORD:-kessab123} -e "SELECT 1" > /dev/null 2>&1; then
    echo "✅ Database is accessible"
else
    echo "❌ Database is not accessible"
fi
echo

# Check system resources
echo "4. System Resources:"
echo "Memory usage:"
free -h | grep Mem
echo "Disk usage:"
df -h | grep -E "/$|/opt"
echo

# Check ports
echo "5. Port Status:"
if netstat -tlnp | grep :8080 > /dev/null; then
    echo "✅ Port 8080 is open"
else
    echo "❌ Port 8080 is not open"
fi

if netstat -tlnp | grep :3306 > /dev/null; then
    echo "✅ Port 3306 is open"
else
    echo "❌ Port 3306 is not open"
fi
echo

echo "=== Status Check Complete ==="
