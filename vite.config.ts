import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"
import { defineConfig } from "vitest/config"

export default defineConfig({
	base: process.env.BASE_PATH ?? "/",
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "robots.txt"],
			manifest: {
				name: "2048",
				short_name: "2048",
				description: "2048 puzzle game",
				display: "standalone",
				orientation: "portrait",
				theme_color: "#000000",
				background_color: "#ffffff",
				icons: [
					{ src: "logo192.png", sizes: "192x192", type: "image/png" },
					{ src: "logo512.png", sizes: "512x512", type: "image/png" },
					{
						src: "logo512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable"
					}
				]
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,jpg,svg,woff2}"]
			}
		})
	],
	resolve: {
		// root imports come from the paths in tsconfig.json
		tsconfigPaths: true
	},
	server: {
		port: 3002,
		host: "0.0.0.0"
	},
	build: {
		// the Dockerfile copies this folder into nginx
		outDir: "build"
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./src/setupTests.ts"]
	}
})
