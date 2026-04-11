#!/bin/bash
set -e

# Configuration
ENV_FILE="BACKEND/.env"

# Ensure openssl is available
if ! command -v openssl &> /dev/null; then
    echo "Error: openssl is not installed."
    exit 1
fi

# 1. Rotate existing keys (Point 5 preparation - optional but good practice)
# We can move current to previous if we want to implement Point 5 later.
# For now, let's just implement Point 2: Generate new JWT_ACCESS_SECRET and JWT_REFRESH_SECRET.

NEW_ACCESS_SECRET=$(openssl rand -hex 32)
NEW_REFRESH_SECRET=$(openssl rand -hex 32)

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
