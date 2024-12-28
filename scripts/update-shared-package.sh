#!/bin/bash

# This script is used to update the shared package in the all services.

# package name
PACKAGE_NAME="@km12dev/shared-servat"

# Publish new version of shared package
echo "Publishing new version of shared package..."

cd /home/km12/Projects/micro_services_projects/servat_ms/shared
pnpm run pub


# Wait for 3 seconds to ensure the package is published
echo "Waiting for 3 seconds..."
sleep 3

# updating the shared package in all services
echo "Updating the shared package in all services..."
SERVICES=(
  "user-service",
  "catalog-service",
)

cd .. # move to the root directory

for SERVICE in "${SERVICES[@]}"; do
    echo "Updating shared package in $SERVICE..."
    (cd $SERVICE && pnpm update $PACKAGE_NAME)
done

echo "Shared package updated in all services."
 