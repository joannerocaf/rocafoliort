/// <reference lib="dom" />

import './jquery/dist/jquery.slim.min.js';
import './popper.js/dist/popper.min.js';
import './bootstrap/dist/js/bootstrap.bundle.js';

const page = window.location.pathname.replace('/pages/', '').replace('.html', '');
const link = document.getElementById(page);
if (link != null)
	link.classList.add('border-info');

const button = document.querySelector<HTMLButtonElement>('button.navbar-toggler');
if (button != null)
	button.onclick = () => {
		button.classList.toggle('menu-open')
	};

setTimeout(() => {
	const heroImg = document.querySelector('#hero img');
	console.log(heroImg)
	if (heroImg != null)
		heroImg.classList.add('lower-in');
}, 100);
