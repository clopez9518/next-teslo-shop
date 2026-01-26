# Descripción


## Correr en dev

1. Clonar repositorio
2. Renombrar archivo .env.example a .env y completar variables
3. Instalar dependencias
```
npm install
```
4. Levantar la base de datos
```
docker compose up -d
```
5. Generar la base de datos
```
npx prisma migrate dev --name init
```
6. Seed de la base de datos
```
npm run seed
```
7. Levantar el servidor
```
npm run dev
```
