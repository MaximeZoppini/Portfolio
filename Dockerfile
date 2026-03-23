# Étape 1 : Build de l'application
FROM node:20-alpine AS builder

WORKDIR /app

# Optimisation de cache : on installe d'abord les dépendances
COPY package.json package-lock.json ./
RUN npm ci

# On copie le reste du code et on build
COPY . .
RUN npm run build

# Étape 2 : Serveur web léger pour la production
FROM nginx:alpine

# On récupère le build généré par Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Config pour gérer la navigation SPA (Single Page Application)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
