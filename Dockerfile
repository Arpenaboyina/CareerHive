# ---- Stage 1: build the static assets ----
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies using the lockfile for reproducible builds.
COPY package*.json ./
RUN npm ci

# Build the production bundle.
COPY . .
ENV CI=true
RUN npm run build

# ---- Stage 2: serve with a lightweight nginx ----
FROM nginx:1.27-alpine AS runtime

# SPA-friendly nginx config (history fallback + asset caching).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the compiled assets from the build stage.
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
