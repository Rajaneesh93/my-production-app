#!/bin/bash
set -e
systemctl start httpd
systemctl enable httpd
echo "Server started successfully!"
