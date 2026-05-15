# ZERO 2 ONE Website - Deployment Guide

## Requirements
- Node.js 18+ 
- npm or bun

## Quick Deploy (VPS / Node.js Hosting)

1. Upload the entire folder to your server
2. Run:
```bash
npm install
npm run build
npm start
```
3. The site will run on port 3000

## Using PM2 (Recommended for Production)
```bash
npm install -g pm2
npm install
npm run build
pm2 start npm --name "zero2one" -- start
pm2 save
pm2 startup
```

## Using Docker
```bash
docker build -t zero2one .
docker run -p 3000:3000 zero2one
```

## Environment Variables
Create a `.env` file with:
```
NEXT_PUBLIC_GTM_ID=GTM-TVKP5KSX
```

## Nginx Reverse Proxy (Optional)
```nginx
server {
    listen 80;
    server_name zero2one.sa www.zero2one.sa;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Important Notes
- This is a Next.js app that requires Node.js server (NOT a static HTML site)
- It cannot be hosted on shared hosting (cPanel with PHP only)
- You need VPS, Cloud, or any hosting that supports Node.js
- Recommended: Vercel (free), Railway, DigitalOcean, Hetzner
