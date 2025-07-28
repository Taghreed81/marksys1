				document.addEventListener('DOMContentLoaded', function() {
					const slider = document.querySelector('.multi-slider');
					const slides = document.querySelectorAll('.multi-slide');
					const dotsContainer = document.querySelector('.multi-slider-dots');
					const prevBtn = document.querySelector('.multi-slider-prev');
					const nextBtn = document.querySelector('.multi-slider-next');
					
					let currentIndex = 0;
					const itemsToShow = 5; // Number of items visible at once
					let slideInterval;
					const slideDuration = 5000; // 5 seconds
					
					// Create dots based on slide groups
					const dotCount = Math.ceil(slides.length / itemsToShow);
					for (let i = 0; i < dotCount; i++) {
						const dot = document.createElement('div');
						dot.classList.add('multi-slider-dot');
						if (i === 0) dot.classList.add('active');
						dot.addEventListener('click', () => {
							goToSlideGroup(i);
						});
						dotsContainer.appendChild(dot);
					}
					
					const dots = document.querySelectorAll('.multi-slider-dot');
					
					// Update slider position
					function updateSlider() {
						const slideWidth = slides[0].offsetWidth + 20; // Width + margin
						slider.scrollTo({
							left: currentIndex * itemsToShow * slideWidth,
							behavior: 'smooth'
						});
						
						// Update dots
						const activeDot = Math.floor(currentIndex / (slides.length / dotCount));
						dots.forEach((dot, index) => {
							dot.classList.toggle('active', index === activeDot);
						});
					}
					
					// Go to specific slide group
					function goToSlideGroup(groupIndex) {
						currentIndex = groupIndex * itemsToShow;
						if (currentIndex >= slides.length) currentIndex = 0;
						updateSlider();
						resetInterval();
					}
					
					// Next slide group
					function nextSlideGroup() {
						currentIndex += itemsToShow;
						if (currentIndex >= slides.length) currentIndex = 0;
						updateSlider();
					}
					
					// Previous slide group
					function prevSlideGroup() {
						currentIndex -= itemsToShow;
						if (currentIndex < 0) currentIndex = slides.length - itemsToShow;
						updateSlider();
					}
					
					// Auto slide
					function startInterval() {
						slideInterval = setInterval(nextSlideGroup, slideDuration);
					}
					
					// Reset interval
					function resetInterval() {
						clearInterval(slideInterval);
						startInterval();
					}
					
					// Event listeners
					nextBtn.addEventListener('click', () => {
						nextSlideGroup();
						resetInterval();
					});
					
					prevBtn.addEventListener('click', () => {
						prevSlideGroup();
						resetInterval();
					});
					
					// Start auto sliding
					startInterval();
					
					// Pause on hover
					slider.addEventListener('mouseenter', () => {
						clearInterval(slideInterval);
					});
					
					slider.addEventListener('mouseleave', startInterval);
					
					// Handle window resize
					window.addEventListener('resize', updateSlider);
				});
