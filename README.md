# IT Study Hub เว็บไซต์หาเพื่อนอ่านหนังสือภายในคณะ

# 🚀 Project Setup Guide

## Client (Frontend)

1. เข้าไปที่โฟลเดอร์ `my-app`
    ```bash
    cd my-app
    ```
2. ติดตั้ง dependencies
    ```bash
    npm install
    ```
3. รันโปรเจค
    ```bash
    npm run dev
    ```

## Server (Backend)

1. เข้าไปที่โฟลเดอร์ `server`
    ```bash
    cd server
    ```
2. ติดตั้ง dependencies
    ```bash
    npm install
    ```
3. สร้างไฟล์ .env ในโฟลเดอร์ server
4. รันโปรเจค
    ```bash
    nodemon index.js
    ```

## .env Example
    DB_USER=postgres
    DB_HOST=localhost
    DB_NAME=activities_reading
    DB_PASSWORD=password
    DB_PORT=5432
    PORT=5000
    JWT_SECRET=replace_with_strong_random_secret