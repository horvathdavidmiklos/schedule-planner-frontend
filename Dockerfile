# 1. lépés: Node.js alapú képet használunk
FROM node:18-alpine

# 2. lépés: Alkalmazás könyvtár létrehozása
WORKDIR /app

# 3. lépés: package.json és package-lock.json másolása
COPY package*.json ./

# 4. lépés: Függőségek telepítése
RUN npm install

# 5. lépés: Az alkalmazás forráskódjának másolása
COPY . .

# Másold be a tanúsítványokat a konténerbe
COPY ./certs /app/certs

# 6. lépés: A port 80-ra irányítjuk a konténert
EXPOSE 80

# 7. lépés: A fejlesztői szerver indítása
CMD ["npm", "run", "serve", "--", "--port", "80"]


