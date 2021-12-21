import { dirname, join } from 'path';
import { fileURLToPath, URL } from 'url';

import compression from 'compression';
import express from 'express';

import headers from './headers.json';

const PUBLIC_DIR = dirname(fileURLToPath(import.meta.url));

console.log(join(PUBLIC_DIR, '..', 'node_modules'))

express()
	.set('view engine', 'pug')
	.set('views', join(PUBLIC_DIR, '..', 'views'))
	.use(compression())
	.use(express.static(PUBLIC_DIR)) // should be the `public` directory of the project
	.use(express.static(join(PUBLIC_DIR, '..', 'node_modules')))
	.use((req, res, next) => {
		if (process.env.NODE_ENV === 'production' && req.hostname.includes('joannerocafort.com') === false) {
			return res.redirect(new URL(req.url, 'https://joannerocafort.com').href);
		}
		res.set(headers);
		res.removeHeader('X-Powered-By');
		next();
	})
	.get('/', (_, res) => res.render('index'))
	.get('/about', (_, res) => res.render('about'))
	.get('/contact', (_, res) => res.render('contact'))
	.get('/graphic', (_, res) => res.render('graphic'))
	.get('/landing', (_, res) => res.render('landing'))
	.get('/links', (_, res) => res.render('links'))
	.get('/photos', (_, res) => res.render('photos'))
	.get('/uiux', (_, res) => res.render('uiux'))
	.get('/private', (_req, res) => res.redirect(process.env.PORTFOLIO_URL ?? ''))
	.listen(process.env.PORT ?? 3000);
