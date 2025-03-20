console.time(`Startup complete after`);

import { dirname, join } from 'path';
import { URL, fileURLToPath } from 'url';

import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express from 'express';

import headers from './headers.json' with { type: 'json' };

const PUBLIC_DIR = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 3000);
const {
	COOKIE_KEY = 'COOKIE_KEY',
	NODE_ENV = 'development',
	PASSWORD = 'PASSWORD',
	PORTFOLIO_URL = '',
} = process.env;

express()
	.set('view engine', 'pug')
	.set('views', join(PUBLIC_DIR, '..', 'views'))
	.use(bodyParser.urlencoded({ extended: true }))
	.use(compression())
	.use(cookieParser(COOKIE_KEY))
	.use(
		cookieSession({
			secret: COOKIE_KEY,
			maxAge: 24 * 60 * 60 * 1000,
		}),
	)
	.use(express.static(PUBLIC_DIR)) // should be the `public` directory of the project
	.use(express.static(join(PUBLIC_DIR, '..', 'node_modules')))
	.use((req, res, next) => {
		if (
			NODE_ENV === 'production' &&
			req.hostname.includes('joannerocafort.com') === false
		) {
			return res.redirect(new URL(req.url, 'https://joannerocafort.com').href);
		}
		if (req.url !== '/login' && req.session?.authenticated !== true) {
			return res.redirect('/login');
		}
		res.set(headers);
		res.removeHeader('X-Powered-By');
		next();
	})
	.get('/', (_, res) => res.render('landing'))
	.get('/about', (_, res) => res.render('about'))
	.get('/graphic', (_, res) => res.render('graphic'))
	.get('/links', (_, res) => res.render('links'))
	.get('/photos', (_, res) => res.render('photos'))
	.get('/uiux', (_, res) => res.render('uiux'))
	.get('/private', (_, res) => res.redirect(PORTFOLIO_URL))
	.get('/beyondsst/showcase', (_, res) =>
		res.render('beyondsst/showcase'),
	)
	.get('/promenade/showcase', (_, res) =>
		res.render('promenade/showcase'),
	)
	.get('/caps/showcase', (_, res) =>
		res.render('caps/showcase'),
	)
	)
	.get('/login', (_, res) => res.render('login'))
	.post('/login', (req, res) => {
		if (req.body.password === PASSWORD) {
			req.session = { ...req.session, authenticated: true };
			return res.redirect('/');
		}
		return res.redirect('/login');
	})
	.listen(PORT, () => {
		console.timeEnd(`Startup complete after`);
		console.info(`Now listening on port ${PORT}`);
		if (NODE_ENV !== 'production') {
			console.info(`View website at http://localhost:${PORT}`);
		}
	});
