export const getAllowedOrigins = () => {
  const origins = new Set();
  if (process.env.FRONTEND_URL) origins.add(process.env.FRONTEND_URL);
  if (process.env.ALLOWED_ORIGINS) {
    process.env.ALLOWED_ORIGINS.split(',').forEach((o) => origins.add(o.trim()));
  }
  return origins;
};

export const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (getAllowedOrigins().has(origin)) return true;
  return /^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(origin);
};

export const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }
};
