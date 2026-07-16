import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { generateStoryBeat } from './api/generate-story';

function storyApiPlugin() {
  const handler = async (req: any, res: any, next: any) => {
    if (req.method !== 'POST' || req.url !== '/api/generate-story') {
      next();
      return;
    }

    try {
      const body = await new Promise<string>((resolve, reject) => {
        let data = '';
        req.on('data', (chunk: string) => {
          data += chunk;
        });
        req.on('end', () => resolve(data));
        req.on('error', reject);
      });

      const input = JSON.parse(body);
      const story = await generateStoryBeat(input);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ story: JSON.stringify(story) }));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Story handler failed.' }));
    }
  };

  return {
    name: 'story-api-plugin',
    configureServer(server: any) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
  process.env.GOOGLE_AI_API_KEY = env.GOOGLE_AI_API_KEY || env.GOOGLE_AI_API_KEY;

  return {
    plugins: [nodePolyfills({ protocolImports: true }), react(), storyApiPlugin()],
    resolve: {
      alias: {
        global: 'globalThis',
      },
    },
    define: {
      global: 'globalThis',
    },
    server: {
      port: 5173,
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        supported: {
          bigint: true,
        },
        target: 'esnext',
      },
    },
    build: {
      target: 'esnext',
    },
  };
});