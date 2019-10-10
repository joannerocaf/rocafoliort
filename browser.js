import './node_modules/jquery/dist/jquery.slim.min.js';
import './node_modules/popper.js/dist/popper.min.js';
import './node_modules/bootstrap/dist/js/bootstrap.bundle.js';

const page = window.location.pathname.replace('/pages/', '').replace('.html', '');
const link = document.getElementById(page);
if (link != null)
	link.classList.add('border-info');

const button = document.querySelector('button.navbar-toggler');
if (button != null)
	button.onclick = () => {
		button.classList.toggle('menu-open')
	};
