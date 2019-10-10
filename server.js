const express = require('express');

express()
	.use('/', express.static('/home/site/wwwroot', { index: 'index.html' }))
	.listen(Number(process.env.PORT || '3000'));