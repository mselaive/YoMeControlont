# Usa una imagen de Node.js para construir los archivos estáticos
FROM node:14 as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Usa una imagen de Nginx para servir los archivos estáticos
FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]