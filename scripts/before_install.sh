#!/bin/bash
set -e
systemctl stop httpd || true
rm -rf /var/www/html/*
