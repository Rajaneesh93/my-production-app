#!/bin/bash
# Stop Apache if running
systemctl stop httpd || true
# Clean old deployment
rm -rf /var/www/html/*