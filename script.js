/*
 * Function to check the window width and deactivate the sidebar if necessary
 */
function sidebarDeactivate() {
	const checkbox = document.getElementById('sidebar-active');

	// Check if the window width is less than or equal to 600px
	if (window.innerWidth >= 700) {
		checkbox.checked = false; // Uncheck the checkbox
	}
}

// Listen for resize events to check window size on resize
window.addEventListener('resize', sidebarDeactivate);

// Run the function once on page load in case the page is already small
sidebarDeactivate();

/*
 * Smooth scroll with offset
 */
const navbar = document.getElementById("navbar");

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener("click", function(e) {
		e.preventDefault();

		// Get the target element using the href value
		const targetElement = document.querySelector(this.getAttribute("href"));

		// Set the offset value (navbar height)
		const offset = navbar.getBoundingClientRect().height;

		// Calculate the position to scroll to (target position minus the offset)
		const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset + 1;

		// Smoothly scroll to the calculated position
		window.scrollTo({
			top: targetPosition,
			behavior: "smooth"
		});
	});
});

/*
 * Offseting the header so that navbar see trough
 */
function adjustMarginTop() {

	// Get the height of the navbar
	const navbarHeight = navbar.offsetHeight;

	document.getElementById("slider").style.marginTop = `${-navbarHeight}px`;
}

window.onload = adjustMarginTop;
window.onresize = adjustMarginTop;

/*
 * Scrolling change navbar design
 */
window.onscroll = function() {
	changeNavbarBackground();
};

function changeNavbarBackground() {
	var navbar = document.getElementById("navbar");
	if (window.scrollY > 200) {
		navbar.classList.add("scrolled");
	} else {
		navbar.classList.remove("scrolled");
	}
}



/*
 * Header slider
 */

