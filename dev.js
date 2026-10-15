const express = require('express');
const cors = require('cors');
const { createServer: createViteServer } = require('vite');
const messageRoutes = require('./server/messageRoutes');

async function start() {
  try {
    const app = express();
    app.use(cors({ origin: true, credentials: true }));
    app.use(express.json());

    // API routes must be registered before Vite middlewares
    app.use('/api/messages', messageRoutes);

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });

    app.use(vite.middlewares);

    app.listen(3000, '0.0.0.0', () => {
      console.log('Dev server running on http://0.0.0.0:3000');
    });
  } catch (err) {
    console.error('Failed to start dev server:', err);
    process.exit(1);
  }
}

start();
