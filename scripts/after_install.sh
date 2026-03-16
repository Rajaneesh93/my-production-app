#!/bin/bash
set -e
# Move files if deployed into subfolder
if [ -d /var/www/html/my-production-app ]; then
  cp -r /var/www/html/my-production-app/* /var/www/html/
  rm -rf /var/www/html/my-production-app
fi
echo "OK" > /var/www/html/health
chown -R apache:apache /var/www/html
chmod -R 755 /var/www/html
