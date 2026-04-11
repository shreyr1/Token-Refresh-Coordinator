#!/bin/bash
set -e

# Configuration
ENV_FILE="BACKEND/.env"

# Ensure openssl is available
if ! command -v openssl &> /dev/null; then
    echo "Error: openssl is not installed."
    exit 1
fi

# Function to update or append values in .env
update_env() {
    local key=$1
    local value=$2
    if grep -q "^${key}=" "$ENV_FILE"; then
        sed "s|^${key}=.*|${key}='${value}'|" "$ENV_FILE" > "$ENV_FILE.tmp" && mv "$ENV_FILE.tmp" "$ENV_FILE"
    else
        echo "${key}='${value}'" >> "$ENV_FILE"
    fi
}

# Ensure .env exists
if [ ! -f "$ENV_FILE" ]; then
    touch "$ENV_FILE"
fi

# 1. Rotate existing keys (Point 5: Sliding window)
# Move current keys to PREVIOUS before generating NEW
CURRENT_ACCESS=$(grep "^JWT_ACCESS_SECRET=" "$ENV_FILE" | cut -d"=" -f2- | sed "s/^['\"]*//;s/['\"]*$//" || echo "")
CURRENT_REFRESH=$(grep "^JWT_REFRESH_SECRET=" "$ENV_FILE" | cut -d"=" -f2- | sed "s/^['\"]*//;s/['\"]*$//" || echo "")

if [ -n "$CURRENT_ACCESS" ]; then
    echo "Archiving current keys to PREVIOUS..."
    update_env "JWT_PREVIOUS_ACCESS_SECRET" "$CURRENT_ACCESS"
    update_env "JWT_PREVIOUS_REFRESH_SECRET" "$CURRENT_REFRESH"
fi

NEW_ACCESS_SECRET=$(openssl rand -hex 32)
NEW_REFRESH_SECRET=$(openssl rand -hex 32)

echo "Rotating keys..."
update_env "JWT_ACCESS_SECRET" "$NEW_ACCESS_SECRET"
update_env "JWT_REFRESH_SECRET" "$NEW_REFRESH_SECRET"

echo "Keys rotated successfully in $ENV_FILE"

# Point 4: Git tracks key evolution and rotation history (SAFELY for public repos)
ROTATION_FILE="ROTATION.md"
TIMESTAMP=$(date +'%Y-%m-%d %H:%M:%S')
# Generate a hash of the secrets for verification without exposure
ACCESS_HASH=$(echo -n "$NEW_ACCESS_SECRET" | sha256sum | cut -d' ' -f1)

echo "Updating rotation log..."
if [ ! -f "$ROTATION_FILE" ]; then
    echo "# Key Rotation Log" > "$ROTATION_FILE"
    echo "| Timestamp | Event | Access Key Hash (SHA256) |" >> "$ROTATION_FILE"
    echo "|-----------|-------|-------------------------|" >> "$ROTATION_FILE"
fi

echo "| $TIMESTAMP | Keys Rotated | $ACCESS_HASH |" >> "$ROTATION_FILE"

echo "Committing rotation log to git..."
git add "$ROTATION_FILE"
git commit -m "signing keys rotated successfully"

echo "Rotation logged in git."
