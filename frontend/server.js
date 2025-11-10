const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const API_HOST = process.env.API_HOST || '127.0.0.1';
const API_PORT = Number(process.env.API_PORT || 8899);
const BUILD_DIR = path.join(__dirname, 'build');

if (!fs.existsSync(BUILD_DIR)) {
  console.error('[shadowchain] Build directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Serve the production build
app.use(express.static(BUILD_DIR, { extensions: ['html'] }));

// Tiny helper so the frontend (or ops) can inspect which backend the proxy uses.
app.get('/__shadowchain_config', (_req, res) => {
  res.json({
    api_base: `http://${API_HOST}:${API_PORT}`,
    frontend: `http://0.0.0.0:${PORT}`,
  });
});

// SPA fallback – ensures client routes return index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[shadowchain] Frontend server listening on http://0.0.0.0:${PORT}`);
  console.log(`[shadowchain] Backend API expected at http://${API_HOST}:${API_PORT}`);
});
