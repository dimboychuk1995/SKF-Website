const FORMSPREE_URL = 'https://formspree.io/f/xzdkyzqr';
const PHOTO_FILES = [
    'photo_1_2026-04-05_16-37-18.jpg',
    'photo_1_2026-04-05_16-37-29.jpg',
    'photo_1_2026-04-05_16-37-32.jpg',
    'photo_1_2026-04-05_16-37-35.jpg',
    'photo_1_2026-04-05_16-37-40.jpg',
    'photo_10_2026-04-05_16-37-18.jpg',
    'photo_10_2026-04-05_16-37-29.jpg',
    'photo_10_2026-04-05_16-37-40.jpg',
    'photo_11_2026-04-05_16-37-40.jpg',
    'photo_12_2026-04-05_16-37-40.jpg',
    'photo_13_2026-04-05_16-37-40.jpg',
    'photo_14_2026-04-05_16-37-40.jpg',
    'photo_15_2026-04-05_16-37-40.jpg',
    'photo_16_2026-04-05_16-37-40.jpg',
    'photo_17_2026-04-05_16-37-40.jpg',
    'photo_18_2026-04-05_16-37-40.jpg',
    'photo_19_2026-04-05_16-37-40.jpg',
    'photo_2_2026-04-05_16-37-18.jpg',
    'photo_2_2026-04-05_16-37-29.jpg',
    'photo_2_2026-04-05_16-37-35.jpg',
    'photo_2_2026-04-05_16-37-40.jpg',
    'photo_20_2026-04-05_16-37-40.jpg',
    'photo_21_2026-04-05_16-37-40.jpg',
    'photo_22_2026-04-05_16-37-40.jpg',
    'photo_23_2026-04-05_16-37-40.jpg',
    'photo_24_2026-04-05_16-37-40.jpg',
    'photo_25_2026-04-05_16-37-40.jpg',
    'photo_26_2026-04-05_16-37-40.jpg',
    'photo_27_2026-04-05_16-37-40.jpg',
    'photo_28_2026-04-05_16-37-40.jpg',
    'photo_29_2026-04-05_16-37-40.jpg',
    'photo_3_2026-04-05_16-37-18.jpg',
    'photo_3_2026-04-05_16-37-29.jpg',
    'photo_3_2026-04-05_16-37-35.jpg',
    'photo_3_2026-04-05_16-37-40.jpg',
    'photo_30_2026-04-05_16-37-40.jpg',
    'photo_31_2026-04-05_16-37-40.jpg',
    'photo_32_2026-04-05_16-37-40.jpg',
    'photo_4_2026-04-05_16-37-18.jpg',
    'photo_4_2026-04-05_16-37-29.jpg',
    'photo_4_2026-04-05_16-37-40.jpg',
    'photo_5_2026-04-05_16-37-18.jpg',
    'photo_5_2026-04-05_16-37-29.jpg',
    'photo_5_2026-04-05_16-37-40.jpg',
    'photo_6_2026-04-05_16-37-18.jpg',
    'photo_6_2026-04-05_16-37-29.jpg',
    'photo_6_2026-04-05_16-37-40.jpg',
    'photo_7_2026-04-05_16-37-18.jpg',
    'photo_7_2026-04-05_16-37-29.jpg',
    'photo_7_2026-04-05_16-37-40.jpg',
    'photo_8_2026-04-05_16-37-18.jpg',
    'photo_8_2026-04-05_16-37-29.jpg',
    'photo_8_2026-04-05_16-37-40.jpg',
    'photo_9_2026-04-05_16-37-18.jpg',
    'photo_9_2026-04-05_16-37-29.jpg',
    'photo_9_2026-04-05_16-37-40.jpg'
];

let quoteFormData = {};
let testimonialsState = {
    current: 0,
    total: 0,
    intervalId: null
};
let galleryState = {
    visibleCount: 3,
    step: 3
};

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initHeader();
    initMobileNavigation();
    initSmoothScroll();
    initPhotosGallery();
    initReveal();
    initCounters();
    initFAQ();
    initBackToTop();
    initTransitBars();
    initQuoteFormFlow();
    initContactForm();
    initTestimonials();
    populateCarMakes();
});

function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const hidePreloader = () => preloader.classList.add('hidden');

    window.addEventListener('load', () => {
        setTimeout(hidePreloader, 500);
    });

    setTimeout(hidePreloader, 2500);
}

function initHeader() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('#navLinks a');
    const sections = document.querySelectorAll('section[id]');

    if (!header) return;

    const updateHeader = () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    };

    const updateActiveLink = () => {
        const offset = window.scrollY + 140;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const link = document.querySelector(`#navLinks a[href="#${section.id}"]`);

            if (!link) return;

            if (offset >= top && offset < bottom) {
                navLinks.forEach((item) => item.classList.remove('active'));
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('scroll', updateActiveLink, { passive: true });

    updateHeader();
    updateActiveLink();
}

function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('active');
        navLinks.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

function initSmoothScroll() {
    const header = document.getElementById('header');

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();

            const headerOffset = header ? header.offsetHeight + 12 : 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    });
}

function initReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach((element) => observer.observe(element));
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target || '0');
            const duration = 1800;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const value = Math.floor(progress * target);
                counter.textContent = value.toLocaleString('en-US');

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString('en-US');
                }
            };

            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
        });
    }, { threshold: 0.5 });

    counters.forEach((counter) => observer.observe(counter));
}

function initPhotosGallery() {
    const grid = document.getElementById('photosGrid');
    const button = document.getElementById('loadMorePhotos');
    if (!grid) return;

    const renderGallery = () => {
        grid.innerHTML = PHOTO_FILES.slice(0, galleryState.visibleCount).map((fileName, index) => {
            const photoNumber = String(index + 1).padStart(2, '0');

            return `
                <article class="gallery-item reveal visible">
                    <img src="images/${fileName}" alt="SKF transport photo ${index + 1}" loading="lazy">
                    <div class="gallery-caption"><span>Recent Transport ${photoNumber}</span></div>
                </article>
            `;
        }).join('');

        if (!button) return;

        const hasMorePhotos = galleryState.visibleCount < PHOTO_FILES.length;
        button.hidden = !hasMorePhotos;

        if (hasMorePhotos) {
            const remaining = PHOTO_FILES.length - galleryState.visibleCount;
            const nextBatchSize = Math.min(galleryState.step, remaining);
            button.innerHTML = `<i class="bi bi-images"></i> Show ${nextBatchSize} More Photos`;
        }
    };

    renderGallery();

    if (!button) return;

    button.addEventListener('click', () => {
        galleryState.visibleCount = Math.min(galleryState.visibleCount + galleryState.step, PHOTO_FILES.length);
        renderGallery();
    });
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            faqItems.forEach((faq) => {
                faq.classList.remove('open');
                const faqAnswer = faq.querySelector('.faq-answer');
                if (faqAnswer) {
                    faqAnswer.style.maxHeight = null;
                }
            });

            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }
        });
    });
}

function initBackToTop() {
    const button = document.getElementById('backToTop');
    if (!button) return;

    const updateButton = () => {
        button.classList.toggle('visible', window.scrollY > 500);
    };

    window.addEventListener('scroll', updateButton, { passive: true });
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    updateButton();
}

function initTransitBars() {
    const bars = document.querySelectorAll('.transit-bar .bar');
    const coverageSection = document.getElementById('coverage');
    if (!bars.length || !coverageSection) return;

    const originalWidths = Array.from(bars, (bar) => bar.style.width);
    bars.forEach((bar) => {
        bar.style.width = '0';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = originalWidths[index];
                }, index * 120);
            });
            observer.disconnect();
        });
    }, { threshold: 0.35 });

    observer.observe(coverageSection);
}

function initQuoteFormFlow() {
    const quoteForm = document.getElementById('quote-form');
    const contactInfoForm = document.getElementById('contact-info-form');
    const modalElement = document.getElementById('quoteModal');

    if (quoteForm && modalElement) {
        quoteForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!quoteForm.checkValidity()) {
                quoteForm.reportValidity();
                return;
            }

            quoteFormData = {
                pickup_city: document.getElementById('pickup-location')?.value.trim() || '',
                delivery_city: document.getElementById('delivery-location')?.value.trim() || '',
                vehicle_make: document.getElementById('car-make')?.value || '',
                vehicle_model: document.getElementById('car-model')?.value.trim() || '',
                vehicle_condition: document.getElementById('vehicle-condition')?.value || '',
                trailer_type: document.getElementById('trailer-type')?.value || ''
            };

            const modal = window.bootstrap ? new window.bootstrap.Modal(modalElement) : null;
            modal?.show();
        });
    }

    if (contactInfoForm) {
        contactInfoForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!contactInfoForm.checkValidity()) {
                contactInfoForm.reportValidity();
                return;
            }

            const button = contactInfoForm.querySelector('button[type="submit"]');
            if (!button) return;

            const originalText = button.innerHTML;
            button.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
            button.disabled = true;

            const payload = {
                _subject: 'New Quote Request - SKF Trucking',
                name: document.getElementById('quote-name')?.value.trim() || '',
                email: document.getElementById('quote-email')?.value.trim() || '',
                phone: document.getElementById('quote-phone')?.value.trim() || '',
                ...quoteFormData
            };

            try {
                const response = await fetch(FORMSPREE_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Quote request failed');
                }

                button.innerHTML = '<i class="bi bi-check-circle-fill"></i> Request Sent';

                setTimeout(() => {
                    const modalInstance = window.bootstrap
                        ? window.bootstrap.Modal.getInstance(modalElement)
                        : null;
                    modalInstance?.hide();
                    contactInfoForm.reset();
                    quoteForm.reset();
                    button.innerHTML = originalText;
                    button.disabled = false;
                    quoteFormData = {};
                }, 1200);
            } catch (error) {
                button.innerHTML = '<i class="bi bi-x-circle-fill"></i> Try Again';

                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 1800);
            }
        });
    }
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const button = contactForm.querySelector('button[type="submit"]');
        if (!button) return;

        const originalText = button.innerHTML;
        button.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
        button.disabled = true;

        const formData = new FormData(contactForm);
        formData.append('_subject', 'New Contact Message - SKF Trucking');

        try {
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Contact request failed');
            }

            button.innerHTML = '<i class="bi bi-check-circle-fill"></i> Message Sent';

            setTimeout(() => {
                contactForm.reset();
                button.innerHTML = originalText;
                button.disabled = false;
            }, 1500);
        } catch (error) {
            button.innerHTML = '<i class="bi bi-x-circle-fill"></i> Try Again';

            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 1800);
        }
    });
}

async function initTestimonials() {
    const track = document.getElementById('testimonialsTrack');
    const dotsContainer = document.getElementById('sliderDots');
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');

    if (!track || !dotsContainer) return;

    try {
        const response = await fetch('reviews.json');
        const reviews = await response.json();
        const selectedReviews = reviews.slice(0, 6);

        track.innerHTML = selectedReviews.map((review) => createTestimonialCard(review)).join('');
        testimonialsState.total = selectedReviews.length;

        if (!testimonialsState.total) return;

        dotsContainer.innerHTML = selectedReviews
            .map((_, index) => `<button class="slider-dot${index === 0 ? ' active' : ''}" type="button" data-index="${index}" aria-label="Go to review ${index + 1}"></button>`)
            .join('');

        dotsContainer.querySelectorAll('.slider-dot').forEach((dot) => {
            dot.addEventListener('click', () => {
                goToTestimonial(Number(dot.dataset.index || '0'));
            });
        });

        prevButton?.addEventListener('click', () => goToTestimonial(testimonialsState.current - 1));
        nextButton?.addEventListener('click', () => goToTestimonial(testimonialsState.current + 1));

        const slider = document.querySelector('.testimonials-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopTestimonialsAutoplay);
            slider.addEventListener('mouseleave', startTestimonialsAutoplay);
        }

        startTestimonialsAutoplay();
        goToTestimonial(0);
    } catch (error) {
        track.innerHTML = `
            <article class="testimonial-card">
                <p>Reviews are temporarily unavailable. You can still request a quote or contact SKF Trucking directly.</p>
            </article>
        `;
        dotsContainer.innerHTML = '';
    }
}

function createTestimonialCard(review) {
    const rating = Number(review.rating || 5);
    const stars = Array.from({ length: rating }, () => '<i class="bi bi-star-fill"></i>').join('');
    const initials = (review.author || 'SKF')
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const formattedDate = review.date
        ? new Date(review.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : 'Recent review';

    return `
        <article class="testimonial-card">
            <div class="testimonial-header">
                <div class="stars">${stars}</div>
                <div class="testimonial-tag">${escapeHtml(review.tag || 'Customer Review')}</div>
            </div>
            <p>"${escapeHtml(review.text || '')}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">${escapeHtml(initials)}</div>
                <div class="testimonial-meta">
                    <strong>${escapeHtml(review.author || 'SKF Customer')}</strong>
                    <span>${escapeHtml(formattedDate)}</span>
                </div>
            </div>
        </article>
    `;
}

function goToTestimonial(index) {
    const track = document.getElementById('testimonialsTrack');
    const dots = document.querySelectorAll('.slider-dot');
    if (!track || !testimonialsState.total) return;

    if (index < 0) index = testimonialsState.total - 1;
    if (index >= testimonialsState.total) index = 0;

    testimonialsState.current = index;
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === index);
    });
}

function startTestimonialsAutoplay() {
    stopTestimonialsAutoplay();

    if (testimonialsState.total <= 1) return;

    testimonialsState.intervalId = window.setInterval(() => {
        goToTestimonial(testimonialsState.current + 1);
    }, 5000);
}

function stopTestimonialsAutoplay() {
    if (testimonialsState.intervalId) {
        clearInterval(testimonialsState.intervalId);
        testimonialsState.intervalId = null;
    }
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function initSKFMap() {
    const mapElement = document.getElementById('skf-map');
    if (!mapElement || !window.google?.maps) return;

    const detroit = { name: 'Detroit, MI (HQ)', lat: 42.331427, lng: -83.0457538 };
    const destinations = [
        { name: 'Chicago, IL', lat: 41.8781136, lng: -87.6297982 },
        { name: 'Milwaukee, WI', lat: 43.0389025, lng: -87.9064736 },
        { name: 'Addison, IL', lat: 41.931696, lng: -88.0017283 },
        { name: 'Indianapolis, IN', lat: 39.768403, lng: -86.158068 },
        { name: 'Cleveland, OH', lat: 41.49932, lng: -81.6943605 }
    ];

    const map = new google.maps.Map(mapElement, {
        zoom: 6,
        center: { lat: 41.5, lng: -85.5 },
        mapTypeId: 'roadmap',
        styles: [
            { elementType: 'geometry', stylers: [{ color: '#eef4fb' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#18324d' }] },
            { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c8d7e8' }] },
            { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#ffe99b' }] },
            { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] }
        ]
    });

    new google.maps.Marker({
        position: { lat: detroit.lat, lng: detroit.lng },
        map,
        title: detroit.name,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#003366',
            fillOpacity: 1,
            strokeColor: '#ffd600',
            strokeWeight: 3
        }
    });

    destinations.forEach((destination) => {
        new google.maps.Marker({
            position: { lat: destination.lat, lng: destination.lng },
            map,
            title: destination.name,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: '#ffd600',
                fillOpacity: 1,
                strokeColor: '#003366',
                strokeWeight: 2
            }
        });

        new google.maps.Polyline({
            path: [
                { lat: detroit.lat, lng: detroit.lng },
                { lat: destination.lat, lng: destination.lng }
            ],
            geodesic: true,
            strokeColor: '#00509e',
            strokeOpacity: 0.75,
            strokeWeight: 3,
            map
        });
    });
}

function initPlacesAutocomplete() {
    const pickupInput = document.getElementById('pickup-location');
    const deliveryInput = document.getElementById('delivery-location');
    const options = { types: ['(cities)'], componentRestrictions: { country: 'us' } };

    if (pickupInput && window.google?.maps?.places) {
        new google.maps.places.Autocomplete(pickupInput, options);
    }

    if (deliveryInput && window.google?.maps?.places) {
        new google.maps.places.Autocomplete(deliveryInput, options);
    }

    const handleZipBlur = (event) => {
        const value = event.target.value.trim();
        if (!/^\d{5}$/.test(value)) return;

        fetch(`https://api.zippopotam.us/us/${value}`)
            .then((response) => response.ok ? response.json() : null)
            .then((data) => {
                const place = data?.places?.[0];
                if (place) {
                    event.target.value = `${place['place name']}, ${place['state abbreviation']}`;
                }
            })
            .catch(() => {});
    };

    pickupInput?.addEventListener('blur', handleZipBlur);
    deliveryInput?.addEventListener('blur', handleZipBlur);
}

function populateCarMakes() {
    const makeSelect = document.getElementById('car-make');
    if (!makeSelect || makeSelect.options.length > 1) return;

    const makes = [
        'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Buick', 'Cadillac',
        'Chevrolet', 'Chrysler', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Genesis', 'GMC', 'Honda',
        'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Lamborghini', 'Land Rover', 'Lexus',
        'Lincoln', 'Maserati', 'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi', 'Nissan',
        'Porsche', 'Ram', 'Rolls-Royce', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo', 'Other'
    ];

    makes.forEach((make) => {
        const option = document.createElement('option');
        option.value = make;
        option.textContent = make;
        makeSelect.appendChild(option);
    });
}

function initSKFMapAndAutocomplete() {
    populateCarMakes();
    initPlacesAutocomplete();
    initSKFMap();
}

window.initSKFMapAndAutocomplete = initSKFMapAndAutocomplete;