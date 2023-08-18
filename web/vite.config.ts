import dns from 'dns';
import { defineConfig, UserConfig } from 'vite';

// See: https://vitejs.dev/config/server-options.html#server-host
// So that Vite will load on local instead of 127.0.0.1
dns.setDefaultResultOrder('verbatim');
import redwood from '@redwoodjs/vite';
const viteConfig: UserConfig = {
  plugins: [redwood()],
  optimizeDeps: {
    force: true
  }
};
export default defineConfig(viteConfig);