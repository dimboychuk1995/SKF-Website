// --- Quote Form Logic ---
// --- Quote Form Logic ---
function initSKFMapAndAutocomplete() {
  // Google Places Autocomplete for Pickup/Delivery (classic, with warning)
  const options = { types: ['(cities)'], componentRestrictions: { country: 'us' } };
  const pickupInput = document.getElementById('pickup-location');
  const deliveryInput = document.getElementById('delivery-location');
  if (pickupInput && window.google && google.maps.places) new google.maps.places.Autocomplete(pickupInput, options);
  if (deliveryInput && window.google && google.maps.places) new google.maps.places.Autocomplete(deliveryInput, options);

  // Car makes (short list, можно расширить)
  const makes = [
    'Acura','Alfa Romeo','Audi','BMW','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Fiat','Ford','Genesis','GMC','Honda','Hyundai','Infiniti','Jaguar','Jeep','Kia','Land Rover','Lexus','Lincoln','Mazda','Mercedes-Benz','Mini','Mitsubishi','Nissan','Porsche','Ram','Subaru','Tesla','Toyota','Volkswagen','Volvo'
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
      if (label) label.textContent = this.checked ? 'Operated' : 'Inoperated';
    });
  }
  // --- Autocomplete ZIP <-> City ---
  function fetchCityByZip(zip, cb) {
    fetch(`https://api.zippopotam.us/us/${zip}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && data.places && data.places.length > 0) {
          const place = data.places[0];
          cb(`${place["place name"]}, ${place["state abbreviation"]}`);
        } else {
          cb(null);
        }
      })
      .catch(() => cb(null));
  }

  function handleLocationInput(e) {
    const val = e.target.value.trim();
    // ZIP: 5 digits
    if (/^\d{5}$/.test(val)) {
      fetchCityByZip(val, city => {
        if (city) e.target.value = city;
      });
    }
    // City, ST: do nothing (Google Autocomplete handles)
  }

  if (pickupInput) {
    pickupInput.addEventListener('blur', handleLocationInput);
  }
  if (deliveryInput) {
    deliveryInput.addEventListener('blur', handleLocationInput);
  }
  // --- Map ---
  if (typeof initSKFMap === 'function') {
    initSKFMap();
  }
}
// Section animation on scroll
AOS.init({
  duration: 900,
  once: true
});

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Button ripple effect
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--x', e.clientX - rect.left + 'px');
    btn.style.setProperty('--y', e.clientY - rect.top + 'px');
  });
});

// Google Reviews block (load from reviews.json)
fetch('reviews.json')
  .then(res => res.json())
  .then(reviews => {
    const reviewsBlock = document.getElementById('google-reviews');
    if (!reviewsBlock) return;
    // Show only 8 reviews at once, randomize
    const shuffled = reviews.sort(() => 0.5 - Math.random());
    const shown = shuffled.slice(0, 8);
    shown.forEach(r => {
      const stars = '<span style="color:#FFD600;font-size:1.2em;">' + '★'.repeat(r.rating) + '<span style="color:#e0e0e0;">' + '★'.repeat(5 - r.rating) + '</span></span>';
      const date = new Date(r.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      const item = document.createElement('div');
      item.className = 'col-md-6 col-lg-4';
      item.innerHTML = `
        <div class="review-item shadow-sm mb-4" style="background:#fff; color:#222; border-radius:18px; min-height:160px; box-shadow:0 2px 16px rgba(60,60,60,0.10); padding: 1.5rem; display:flex; flex-direction:column; justify-content:space-between;">
          <div class="d-flex align-items-center mb-2">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(r.author)}&background=FFD600&color=111&size=40&rounded=true" alt="avatar" class="me-3" style="width:40px;height:40px;border-radius:50%;border:2px solid #FFD600;">
            <div>
              <span class="fw-bold" style="color:#222;">${r.author}</span><br>
              <span class="text-secondary" style="font-size:0.95em;">${date}</span>
            </div>
          </div>
          <div class="mb-2">${stars}</div>
          <div style="font-size:1.05em;">${r.text}</div>
        </div>
      `;
      reviewsBlock.appendChild(item);
    });
  });


