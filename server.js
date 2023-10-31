import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import express from 'express'
import { createServer } from 'vite'


const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createAppServer() {
	const app = express();

	const vite = await createServer({
		server: { middlewareMode: true },
		appType: 'custom'
	});

	app.use(vite.middlewares);
	app.use('*', async (req, res, next) => {
		try {
			const url = req.originalUrl;

			let template = fs.readFileSync(
				path.resolve(__dirname, 'index.html'),
				'utf-8',
			);
			template = await vite.transformIndexHtml(url, template);
			const { render } = await vite.ssrLoadModule('/src/entry-server.ts');
			const { html } = await render();
			const injectedHtml = template.replace(`<!--ssr-outlet-->`, html);
			res.status(200).set({ 'Content-Type': 'text/html' }).end(injectedHtml);
		}
		catch (err) {
			vite.ssrFixStacktrace(err);
			console.log(err);
			res.status(500).end();
		}

	});

	app.use(express.static('.'));
	app.listen(3000, () => {
		console.log('Server is ready')
	});
}

createAppServer();
