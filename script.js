document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Scroll Fade-ins
    const scrollObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's the stats section, trigger the counter animation
                if (entry.target.classList.contains('stats-container')) {
                    startCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, scrollObserverOptions);

    const hiddenElements = document.querySelectorAll('.hidden-onscroll');
    hiddenElements.forEach(el => scrollObserver.observe(el));

    // Number Counter Animation
    let countersStarted = false;
    
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        
        const counters = document.querySelectorAll('.stat-number');
        const duration = 2000; // ms
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Use easeOutQuart easing function for smoother deceleration
                const easeOut = 1 - Math.pow(1 - progress, 4);
                
                const currentVal = Math.floor(easeOut * target);
                counter.innerText = currentVal;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }
});
