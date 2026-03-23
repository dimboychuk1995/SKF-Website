// --- SKF Trucking Main Script ---

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Sticky header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Close mobile menu if open
                    const navCollapse = document.querySelector('.navbar-collapse');
                    if (navCollapse && navCollapse.classList.contains('show')) {
                        bootstrap.Collapse.getInstance(navCollapse)?.hide();
                    }
                }
            }
        });
    });

    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + (counter.dataset.suffix || '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    };

    // Intersection Observer for counter animation
    const observerOptions = { threshold: 0.5 };
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    counters.forEach(counter => counterObserver.observe(counter));

    // Button ripple effect
    document.querySelectorAll('button, .btn').forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = btn.getBoundingClientRect();
            btn.style.setProperty('--x', e.clientX - rect.left + 'px');
            btn.style.setProperty('--y', e.clientY - rect.top + 'px');
        });
    });

    // Load Google Reviews
    fetch('reviews.json')
        .then(res => res.json())
        .then(reviews => {
            const reviewsBlock = document.getElementById('google-reviews');
            if (!reviewsBlock) return;
            const shuffled = reviews.sort(() => 0.5 - Math.random()).slice(0, 6);
            shuffled.forEach((r, index) => {
                const stars = '★'.repeat(r.rating) + '<span style="color:#ddd;">' + '★'.repeat(5 - r.rating) + '</span>';
                const date = new Date(r.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
                const item = document.createElement('div');
                item.className = 'col-md-6 col-lg-4';
                item.setAttribute('data-aos', 'fade-up');
                item.setAttribute('data-aos-delay', (index * 100).toString());
                item.innerHTML = `
                    <div class="review-item h-100">
                        <div class="d-flex align-items-center mb-3">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(r.author)}&background=FFD600&color=003366&size=48&bold=true" 
                                 alt="${r.author}" 
                                 style="width:48px;height:48px;border-radius:50%;border:3px solid #FFD600;" 
                                 class="me-3">
                            <div>
                                <div class="fw-bold" style="color:var(--primary);">${r.author}</div>
                                <small class="text-muted">${date}</small>
                            </div>
                        </div>
                        <div class="mb-2" style="color:#FFD600;font-size:1.1rem;">${stars}</div>
                        <p class="mb-0" style="color:#555;">"${r.text}"</p>
                    </div>
                `;
                reviewsBlock.appendChild(item);
            });
        })
        .catch(err => console.log('Reviews not loaded:', err));

    // Set minimum date for shipping date input
    const shipDateInput = document.getElementById('ship-date');
    if (shipDateInput) {
        const today = new Date().toISOString().split('T')[0];
        shipDateInput.setAttribute('min', today);
        shipDateInput.value = today;
    }
});

// Google Maps and Autocomplete initialization
function initSKFMapAndAutocomplete() {
    // Google Places Autocomplete
    const options = { types: ['(cities)'], componentRestrictions: { country: 'us' } };
    const pickupInput = document.getElementById('pickup-location');
    const deliveryInput = document.getElementById('delivery-location');
    
    if (pickupInput && window.google && google.maps.places) {
        new google.maps.places.Autocomplete(pickupInput, options);
    }
    if (deliveryInput && window.google && google.maps.places) {
        new google.maps.places.Autocomplete(deliveryInput, options);
    }

    // Car makes list
    const makes = [
        'Acura','Alfa Romeo','Aston Martin','Audi','Bentley','BMW','Buick','Cadillac',
        'Chevrolet','Chrysler','Dodge','Ferrari','Fiat','Ford','Genesis','GMC','Honda',
        'Hyundai','Infiniti','Jaguar','Jeep','Kia','Lamborghini','Land Rover','Lexus',
        'Lincoln','Maserati','Mazda','Mercedes-Benz','Mini','Mitsubishi','Nissan',
        'Porsche','Ram','Rolls-Royce','Subaru','Tesla','Toyota','Volkswagen','Volvo'
    ];
    const makeSelect = document.getElementById('car-make');
    if (makeSelect) {
        makes.forEach(make => {
            const opt = document.createElement('option');
            opt.value = make;
            opt.textContent = make;
            makeSelect.appendChild(opt);
        });
    }

    // Operated/Inoperated switch label
    const operatedSwitch = document.getElementById('operated-switch');
    if (operatedSwitch) {
        operatedSwitch.addEventListener('change', function() {
            const label = document.querySelector('label[for="operated-switch"]');
            if (label) label.textContent = this.checked ? 'Vehicle is Operable' : 'Vehicle is Inoperable';
        });
    }

    // ZIP code to city conversion
    function fetchCityByZip(zip, callback) {
        fetch(`https://api.zippopotam.us/us/${zip}`)
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (data && data.places && data.places.length > 0) {
                    const place = data.places[0];
                    callback(`${place["place name"]}, ${place["state abbreviation"]}`);
                } else {
                    callback(null);
                }
            })
            .catch(() => callback(null));
    }

    function handleLocationInput(e) {
        const val = e.target.value.trim();
        if (/^\d{5}$/.test(val)) {
            fetchCityByZip(val, city => {
                if (city) e.target.value = city;
            });
        }
    }

    if (pickupInput) pickupInput.addEventListener('blur', handleLocationInput);
    if (deliveryInput) deliveryInput.addEventListener('blur', handleLocationInput);

    // Initialize map
    if (typeof initSKFMap === 'function') {
        initSKFMap();
    }
}

// Form submission handling
document.querySelector('.quote-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Processing...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Quote Requested!';
        btn.style.background = 'linear-gradient(135deg, #28a745 0%, #218838 100%)';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            this.reset();
            document.getElementById('operated-switch').checked = true;
        }, 2000);
    }, 1500);
});

document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            this.reset();
        }, 2000);
    }, 1500);
});
