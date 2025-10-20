// Load footer
fetch('../views/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  });

// Trending products slider
document.addEventListener('DOMContentLoaded', async function() {
    const container = document.querySelector('.products-foru');
    if (!container) return;

    // Fetch trending products
    try {
        const res = await fetch('https://dummyjson.com/products?limit=20');
        const data = await res.json();
        const products = data.products;

        // Create slider wrapper
        const slider = document.createElement('div');
        slider.className = 'trending-slider';

        // Duplicate products for seamless infinite loop
        const allProducts = [...products, ...products];

        allProducts.forEach(product => {
            const box = document.createElement('div');
            box.className = 'trending-product';
            box.innerHTML = `
                <img src="${product.images[0]}" alt="${product.title}" style="cursor:pointer;">
                <div class="trending-title">${product.title}</div>
                <div class="trending-price">$${product.price}</div>
            `;
            // Add click event to image
            box.querySelector('img').addEventListener('click', function() {
                localStorage.setItem('selectedProduct', JSON.stringify(product));
                window.location.href = "../index.html";
            });
            slider.appendChild(box);
        });

        container.appendChild(slider);

        // Infinite loop animation from right to left
        let scrollAmount = 0;
        function animateSlider() {
            scrollAmount += 1;
            if (scrollAmount > slider.scrollWidth / 2) {
                scrollAmount = 0;
            }
            slider.scrollLeft = scrollAmount;
            requestAnimationFrame(animateSlider);
        }
        animateSlider();
        
    } catch (e) {
        container.innerHTML += "<p style='color:#fff'>Failed to load trending products.</p>";
    }
});

// Promotion products slider (using Fake Store API)
document.addEventListener('DOMContentLoaded', async function() {
    const promoContainer = document.querySelector('.promotion');
    if (!promoContainer) return;

    try {
        const res = await fetch('https://fakestoreapi.com/products?limit=15');
        const products = await res.json();

        // Create slider wrapper
        const slider = document.createElement('div');
        slider.className = 'promotion-slider';

        // Duplicate products for seamless infinite loop
        const allProducts = [...products, ...products];

        allProducts.forEach(product => {
            const box = document.createElement('div');
            box.className = 'promotion-product';
            box.innerHTML = `
                <img src="${product.image}" alt="${product.title}" style="cursor:pointer;">
                <div class="promotion-title">${product.title}</div>
                <div class="promotion-price" style="text-decoration:line-through;color:#b0b0b0;">$${product.price}</div>
                <div class="promotion-price" style="color:#f00202;">
                    $${(product.price * 0.6).toFixed(2)} <span style="font-size:0.9em;color:#f00202;">(60% OFF)</span>
                </div>
            `;
            // Add click event to image
            box.querySelector('img').addEventListener('click', function() {
                localStorage.setItem('selectedProduct', JSON.stringify(product));
                window.location.href = "../index.html";
            });
            slider.appendChild(box);
        });

        promoContainer.appendChild(slider);

        // Infinite loop animation from right to left
        let scrollAmount = 0;
        function animateSlider() {
            scrollAmount += 1;
            if (scrollAmount > slider.scrollWidth / 2) {
                scrollAmount = 0;
            }
            slider.scrollLeft = scrollAmount;
            requestAnimationFrame(animateSlider);
        }
        animateSlider();
    } catch (e) {
        promoContainer.innerHTML += "<p style='color:#fff'>Failed to load promotion products.</p>";
    }
});
// Night mode para los cards
function updateCardsForMode() {
    var cards = document.querySelectorAll('.product-card');
    if (document.body.classList.contains('night-mode')) {
        cards.forEach(function(card) {
            card.style.backgroundColor = 'black';
            card.style.color = 'white';
            card.style.boxShadow = '0 0 32px 0 #c9b037cc, 0 2px 16px #0008';
        });
    } else {
        cards.forEach(function(card) {
            card.style.backgroundColor = 'white';
            card.style.color = 'black';
            card.style.boxShadow = '';
        });
    }
}

// Night mode toggle 
document.addEventListener('DOMContentLoaded', function() {
    const modeButton = document.querySelector('button[name="mode"]');
    // Set initial mode from localStorage
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'night') {
        document.body.classList.add('night-mode');
        document.body.classList.remove('day-mode');
        if (modeButton) modeButton.textContent = 'Day';
    } else {
        document.body.classList.add('day-mode');
        document.body.classList.remove('night-mode');
        if (modeButton) modeButton.textContent = 'Night';
    }

    if (modeButton) {
        modeButton.addEventListener('click', function() {
            if (document.body.classList.contains('night-mode')) {
                document.body.classList.remove('night-mode');
                document.body.classList.add('day-mode');
                modeButton.textContent = 'Night';
                localStorage.setItem('mode', 'day');
            } else {
                document.body.classList.remove('day-mode');
                document.body.classList.add('night-mode');
                modeButton.textContent = 'Day';
                localStorage.setItem('mode', 'night');
            }
            updateCardsForMode && updateCardsForMode();
        });
    }
});