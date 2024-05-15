#!/bin/bash

# Lue ympäristömuuttujat .env.local-tiedostosta
export $(grep -v '^#' .env.local | xargs)

# Rakennetaan Docker-kuva ja välitetään ympäristömuuttujat
docker build --no-cache \
  --build-arg OPENAI_API_KEY=$OPENAI_API_KEY \
  --build-arg NEXT_PUBLIC_MAPS_API_KEY=$NEXT_PUBLIC_MAPS_API_KEY \
  --build-arg SUPABASE_PRIVATE_KEY=$SUPABASE_PRIVATE_KEY \
  --build-arg SUPABASE_URL=$SUPABASE_URL \
  --build-arg SERPAPI_API_KEY=$SERPAPI_API_KEY \
  --build-arg AUTH_SECRET=$AUTH_SECRET \
  --build-arg BASIC_AUTH_USER=$BASIC_AUTH_USER \
  --build-arg BASIC_AUTH_PASSWORD=$BASIC_AUTH_PASSWORD \
  -t my-nextjs-app .