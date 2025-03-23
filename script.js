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
// document.addEventListener("DOMContentLoaded", function() {
// 	const sliderContainer = document.querySelector('.slider-container');
// 	const progressBar = document.getElementById('progress-bar');
// 	const progress = document.querySelector('.progress');
// 	const indicators = document.querySelectorAll('.indicator');
// 	const slides = document.querySelectorAll('.slide');
// 	let currentSlideIndex = 0;
// 	let timer;
// 	const slideChangeInterval = 3000; // 3 seconds
// 	let progressWidth = 0;
// 	let lastTime = 0;
//
// 	// Function to update the progress bar smoothly
// 	function updateProgressBar(timestamp) {
// 		if (!lastTime) lastTime = timestamp; // Initialize the last timestamp on the first call
// 		const deltaTime = timestamp - lastTime; // Time elapsed in ms
// 		lastTime = timestamp;
//
// 		// Calculate the amount of progress to add based on elapsed time
// 		const progressIncrement = (100 / slideChangeInterval) * deltaTime;
//
// 		progressWidth += progressIncrement;
// 		progress.style.width = progressWidth + '%';
//
// 		if (progressWidth >= 100) {
// 			changeSlide();
// 			resetProgressBar();
// 		} else {
// 			// Request the next frame for smooth animation
// 			requestAnimationFrame(updateProgressBar);
// 		}
// 	}
//
// 	// Function to reset the progress bar
// 	function resetProgressBar() {
// 		progressWidth = 0;
// 		progress.style.width = '0%';
// 		lastTime = 0; // Reset the timestamp for the next cycle
// 	}
//
// 	// Function to change the slide
// 	function changeSlide() {
// 		currentSlideIndex = (currentSlideIndex + 1) % slides.length;
// 		sliderContainer.scrollTo({
// 			left: currentSlideIndex * window.innerWidth,
// 			behavior: 'smooth'
// 		});
// 	}
//
// 	// Function to select a specific slide by indicator
// 	function goToSlide(slideIndex) {
// 		currentSlideIndex = slideIndex;
// 		sliderContainer.scrollTo({
// 			left: currentSlideIndex * window.innerWidth,
// 			behavior: 'smooth'
// 		});
// 		resetProgressBar();
// 	}
//
// 	// Add event listeners for the indicators
// 	indicators.forEach((indicator, index) => {
// 		indicator.addEventListener('click', () => {
// 			goToSlide(index);
// 		});
// 	});
//
// 	// Function to start the auto-scrolling timer
// 	function startAutoScroll() {
// 		// Clear any existing timers to avoid multiple intervals running
// 		if (timer) {
// 			cancelAnimationFrame(timer);
// 		}
//
// 		// Start the smooth animation for progress bar
// 		requestAnimationFrame(updateProgressBar);
// 	}
//
// 	// Function to reset the timer and progress bar when manually scrolling
// 	function handleManualScroll() {
// 		const scrollPosition = sliderContainer.scrollLeft;
// 		currentSlideIndex = Math.round(scrollPosition / window.innerWidth);
// 		resetProgressBar();
// 		startAutoScroll(); // Restart the timer after manual scroll
// 	}
//
// 	// Listen to scroll event to detect manual scrolling
// 	sliderContainer.addEventListener('scroll', handleManualScroll);
//
// 	// Start the auto-scrolling when the page loads
// 	startAutoScroll();
// });


/*
 * Header slider mouse click scroll
 */
const slider = document.querySelector(".slider-container");
let isDown = false;
let startX;
let scrollLeft;
let scrollForce = 2;
let slideWidth = slider.clientWidth; // Assuming each slide takes up the full width of the container

// Function to update the slideWidth
function updateSlideWidth() {
	slideWidth = slider.clientWidth;
}

// Mouse events
slider.addEventListener("mousedown", (event) => {
	isDown = true;
	startX = event.pageX - slider.offsetLeft;
	scrollLeft = slider.scrollLeft;
	slider.style.cursor = "grabbing";

	// Disable scroll snap while dragging
	slider.style.scrollSnapType = 'none';
});

slider.addEventListener("mouseleave", () => {
	if (isDown) {
		isDown = false;
		smoothScrollToNearestSlide(); // Smooth scroll when mouse leaves
	}
	// Re-enable scroll snap when mouse leaves
	slider.style.scrollSnapType = 'x mandatory';
});

slider.addEventListener("mouseup", () => {
	if (isDown) {
		isDown = false;
		smoothScrollToNearestSlide(); // Smooth scroll when mouse is released
	}
	// Re-enable scroll snap when mouse is released
	slider.style.scrollSnapType = 'x mandatory';
});

slider.addEventListener("mousemove", (event) => {
	if (!isDown) return;
	const x = event.pageX - slider.offsetLeft;
	const walk = (x - startX) * scrollForce;
	slider.scrollLeft = scrollLeft - walk;
	event.preventDefault();
});

// Function to smoothly scroll to the nearest slide after dragging
function smoothScrollToNearestSlide() {
	// Recalculate the slide width in case the window has resized
	updateSlideWidth();

	const scrollMax = slider.scrollWidth - slider.clientWidth;
	const scrollPercentage = slider.scrollLeft / scrollMax;
	const nearestSlide = Math.round(scrollPercentage * (slider.scrollWidth / slideWidth)); // Nearest slide index

	// Scroll to the nearest slide with smooth transition
	const targetPosition = nearestSlide * slideWidth;
	slider.scrollTo({
		left: targetPosition,
		behavior: 'smooth', // Smooth scroll to the target slide
	});
}

// Recalculate the slide width when the window is resized
window.addEventListener('resize', () => {
	updateSlideWidth();
	// Ensure scroll snap is enabled after resizing
	slider.style.scrollSnapType = 'x mandatory';
});

/*
 * Collapsible part
 */
var coll = document.getElementById("collapsible");

coll.addEventListener("click", function() {
	this.classList.toggle("active");
	var content = this.nextElementSibling;
	if (content.style.display === "block") {
		content.style.display = "none";
	} else {
		content.style.display = "block";
	}
});

coll.addEventListener("click", function() {
	this.classList.toggle("active");
	var content = this.nextElementSibling;
	if (content.style.maxHeight){
		content.style.maxHeight = null;
	} else {
		content.style.maxHeight = content.scrollHeight + "px";
	}
});

/*
 * Infinite scroller part
 */
const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
	addAnimation();
}

function addAnimation() {
	scrollers.forEach(scroller => {
		scroller.setAttribute("data-animated", true);

		const scrollerInner = scroller.querySelector(".inner-scroller");
		const scrollerContent = Array.from(scrollerInner.children);

		for (let i = 0; i < 2; i++) {
			scrollerContent.forEach(item => {
				const duplicatedItem = item.cloneNode(true);
				duplicatedItem.setAttribute("area-hidden", true);
				scrollerInner.appendChild(duplicatedItem);
			})
		}
	});
}

/*
 * Scirpts for modal
 */
// Get all modal buttons
var modalBtns = document.querySelectorAll('.card-button');

// Loop through each button and add event listener
modalBtns.forEach(function(btn) {
	btn.onclick = function() {
		var modalId = this.getAttribute('data-modal');
		var modal = document.getElementById(modalId);
		modal.style.display = "flex"; // Use flex for centering
	}
});

// Get all close buttons
var closeBtns = document.querySelectorAll('.close');

// Loop through each close button and add event listener
closeBtns.forEach(function(span) {
	span.onclick = function() {
		var modal = this.closest('.modal');
		modal.style.display = "none";
	}
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	var modals = document.querySelectorAll('.modal');
	modals.forEach(function(modal) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	});
}
