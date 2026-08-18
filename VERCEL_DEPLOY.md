# PixNGiggles — Vercel Deployment

Deploy **two separate Vercel projects**: one for the frontend, one for the backend API.

---

## 1. Backend API (Vercel)

### Vercel project settings

| Setting | Value |
|---------|--------|
| **Root Directory** | `backend` |
| **Framework Preset** | Other |
| **Build Command** | (leave empty) |
| **Output Directory** | (leave empty) |
| **Install Command** | `npm install` |

### Environment variables (Vercel → Settings → Environment Variables)

| Variable | Example | Required |
|----------|---------|----------|
| `MONGO_URI` | `mongodb+srv://...` | Yes |
| `JWT_SECRET` | long random string | Yes |
| `FRONTEND_URL` | `https://pixngiggles.vercel.app` | Yes |
| `CLOUDINARY_CLOUD_NAME` | your cloud name | Yes |
| `CLOUDINARY_API_KEY` | your key | Yes |
| `CLOUDINARY_API_SECRET` | your secret | Yes |
| `NODE_ENV` | `production` | Yes |
| `ALLOWED_ORIGINS` | optional extra URLs, comma-separated | No |

`VERCEL` is set automatically by Vercel — do not add it manually.

### After deploy

Your API base URL will look like:

`https://pixngiggles-api.vercel.app`

Test health check:

`https://pixngiggles-api.vercel.app/api/health`

### Seed database (run locally, not on Vercel)

```bash
cd backend
# Use same MONGO_URI as production in .env
npm run seed
```

---

## 2. Frontend (Vercel)

### Vercel project settings

| Setting | Value |
|---------|--------|
| **Root Directory** | `frontend` |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### Environment variables

| Variable | Example | Required |
|----------|---------|----------|
| `VITE_API_URL` | `https://pixngiggles-api.vercel.app/api` | Yes |

**Important:** `VITE_API_URL` must end with `/api` (no trailing slash after `api`).

### SPA routing

`frontend/vercel.json` rewrites all routes to `index.html` for React Router.

---

## 3. MongoDB Atlas

1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Add **Network Access** → allow `0.0.0.0/0` (required for Vercel serverless).
3. Copy connection string to `MONGO_URI` in backend Vercel env.

---

## 4. Cloudinary

1. Create account at [cloudinary.com](https://cloudinary.com).
2. Add `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` to backend Vercel env.

---

## 5. Deploy order

1. Deploy **backend** first → copy the URL.
2. Set `VITE_API_URL` on frontend to `https://YOUR-BACKEND.vercel.app/api`
3. Set `FRONTEND_URL` on backend to `https://YOUR-FRONTEND.vercel.app`
4. Deploy **frontend**
5. Run `npm run seed` locally if database is empty
6. Login: `/admin/login`

---

## 6. Custom domains

- Frontend: `pixngiggles.com` → Vercel frontend project
- API (optional): `api.pixngiggles.com` → Vercel backend project

Update env vars after custom domains:

- Backend `FRONTEND_URL` → `https://pixngiggles.com`
- Frontend `VITE_API_URL` → `https://api.pixngiggles.com/api` (or keep vercel.app URL)

---

## 7. Local development

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS errors | Set `FRONTEND_URL` exactly to frontend URL (no trailing slash) |
| API 404 | Ensure `VITE_API_URL` includes `/api` |
| MongoDB timeout | Atlas → Network Access → allow all IPs `0.0.0.0/0` |
| Blank admin after login | Check JWT_SECRET is set on backend |
| Images not uploading | Verify Cloudinary env vars on backend |
