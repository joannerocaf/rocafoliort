const express = require('express');
const compression = require('compression');

express()
	.use(compression())
	.use(express.static(__dirname, { index: 'index.html', extensions: ['html'] }))
	.use(express.static('pages', { extensions: ['html'] }))
	.listen(Number(process.env.PORT || '8080'));
