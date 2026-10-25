import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' makes assets work at https://USERNAME.github.io/ANY-REPO-NAME/ with no changes
export default defineConfig({ plugins: [react()], base: './' })
