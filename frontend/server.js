const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.PORT || 3000;
const API_PORT = process.env.API_PORT || 8899;
const API_HOST = process.env.API_HOST || '127.0.0.1';
const API_URL = process.env.API_URL || `http://${API_HOST}:${API_PORT}`;

const app = express();
const buildPath = path.join(__dirname, 'build');

const proxyPaths = ['/shadow', '/health', '/address'];
app.use(
  proxyPaths,
  createProxyMiddleware({
    target: API_URL,
    changeOrigin: true,
    ws: true,
    logLevel: 'warn',
  })
);

app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[shadowchain] Frontend server listening on port ${PORT}`);
  console.log(`[shadowchain] Proxying API traffic (${proxyPaths.join(', ')}) to ${API_URL}`);
});
