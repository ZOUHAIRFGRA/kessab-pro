#!/bin/bash

case "$1" in
    "start")
        sudo systemctl start cloudflared
        echo "Cloudflare tunnel started"
        ;;
    "stop")
        sudo systemctl stop cloudflared
        echo "Cloudflare tunnel stopped"
        ;;
    "restart")
        sudo systemctl restart cloudflared
        echo "Cloudflare tunnel restarted"
        ;;
    "status")
        sudo systemctl status cloudflared
        ;;
    "url")
        cloudflared tunnel info kessab-api
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|url}"
        exit 1
        ;;
esac
