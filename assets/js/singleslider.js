document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.single-slider');
    const slides = document.querySelectorAll('.single-slide');
    const prevBtn = document.querySelector('.single-slider-prev');
    const nextBtn = document.querySelector('.single-slider-next');
    const dotsContainer = document.querySelector('.single-slider-dots');
    
    let currentIndex = 0;
    
    // Create dots
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('single-slider-dot');
        if(index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.single-slider-dot');
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    function goToSlide(index) {
        showSlide(index);
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Optional: Auto-advance slides
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowLeft') prevSlide();
        if(e.key === 'ArrowRight') nextSlide();
    });
});
