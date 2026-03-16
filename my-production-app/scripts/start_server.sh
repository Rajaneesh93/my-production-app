#!/bin/bash
# Start Apache
systemctl start httpd
systemctl enable httpd
echo "Server started successfully!"