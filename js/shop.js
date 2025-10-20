var title = document.getElementById('shop-title');
var modeButton = document.querySelector('button[name="mode"]');
var cart = JSON.parse(localStorage.getItem('cart')) || [];
var allProducts = []; // Guardar todos los productos aquí

// Función para obtener productos de la API real
async function fetchProducts() {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data = await res.json();
    return data.products; // Note: products are in data.products
}

async function renderProducts(productsToRender) {
    const grid = document.querySelector('.product-grid');
    grid.innerHTML = '';

    (productsToRender || allProducts).forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}" class="product-img" style="cursor:pointer;">
            <h3>${product.title}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <div class="card-buttons">
                <input type="number" min="1"  value="1" class="quantity-input" style="width:50px;margin-right:8px;">
                <button class="add-to-cart-btn">
                     Add to Cart 🛒
                </button>
                <button class="show-details-btn">Show Details</button>
            </div>
        `;
        // Add to Cart button
        card.querySelector('.add-to-cart-btn').addEventListener('click', function() {
            const quantity = parseInt(card.querySelector('.quantity-input').value) || 1;
            if( quantity < 1) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid quantity',
                    text: 'Please enter a quantity between 1 and 10',
                });
                card.querySelector('.quantity-input').value = 1;
                return;
            }else if (quantity > 10) {
                Swal.fire({
                    icon: 'error',
                    title: 'max quantity is 10',
                    text: 'Please enter a quantity between 1 and 10.',
                });
                card.querySelector('.quantity-input').value = 1;
                return;
            }
            for (let i = 0; i < quantity; i++) {
                cart.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(cart));

            // Add 100 puntos for each product added
            let puntos = parseInt(localStorage.getItem('puntos')) || 0;
            puntos += 100 * quantity;
            localStorage.setItem('puntos', puntos);

            // Show SweetAlert2 popup with image
            Swal.fire({
                title: `"${product.title}" added to cart!`,
                imageUrl: product.images[0],
                imageWidth: 120,
                imageHeight: 120,
                imageAlt: product.title,
                html: `Quantity: <strong>${quantity}</strong>`,
                confirmButtonText: 'OK'
            });
        });
        // Show Details button
        card.querySelector('.show-details-btn').addEventListener('click', function() {
            Swal.fire({
                title: product.title,
                imageUrl: product.image,
                imageWidth: 120,
                imageHeight: 120,
                imageAlt: product.title,
                html: `<img src="${product.images[0]}" alt="${product.title}" style="width:100px;height:100px;"><br>
                       <strong>Price:</strong> $${product.price.toFixed(2)}<br>
                       <strong>Description:</strong> ${product.description}`,
                confirmButtonText: 'OK'
            });
        });
        // Add click event to the product image to go to product page
        card.querySelector('.product-img').addEventListener('click', function() {
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            window.location.href = "views/product.html?id=" + product.id;
        });
        grid.appendChild(card);
    });

    if (typeof updateCardsForMode === "function") updateCardsForMode();
}

// Inicializa productos y búsqueda
window.addEventListener('DOMContentLoaded', async function() {
    // Set night/day mode from localStorage
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'night') {
        document.body.classList.add('night-mode');
        document.body.classList.remove('day-mode');
        modeButton.textContent = 'Day';
    } else {
        document.body.classList.add('day-mode');
        document.body.classList.remove('night-mode');
        modeButton.textContent = 'Night';
    }
    allProducts = await fetchProducts();
    renderProducts();

    // Búsqueda en tiempo real
    var searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filtered = allProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
        renderProducts(filtered);
    });
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
    updateCardsForMode();
});
// hide/show button for the BAR
var hideButton = document.getElementById('hide-btn');
var hidButtonDiv = document.querySelector('.hid-button');
var hideIcon = document.getElementById('hide-icon');
var hideText = document.getElementById('hide-text');
hideButton.addEventListener('click', function() {
    var bar = document.querySelector('.BAR');
    if (bar.style.display === 'none') {
        bar.style.display = 'flex';
        hideText.textContent = 'Hide';
        hideIcon.textContent = '\u{25B2}';
        hidButtonDiv.classList.remove('top');
    } else {
        bar.style.display = 'none';
        hideText.textContent = 'Show';
        hideIcon.textContent = '\u{1F441}';
        hidButtonDiv.classList.add('top');
    }
});

fetch('../views/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
      });

// Show/hide price filter options when filter button is clicked
document.addEventListener('DOMContentLoaded', function() {
    const filterBtn = document.getElementById('filter-btn');
    const filterOptions = document.getElementById('filter-options');
    const priceHighBtn = document.querySelector('.price-high');
    const priceLowBtn = document.querySelector('.price-low');

    if (filterBtn && filterOptions) {
        filterBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            filterOptions.style.display = (filterOptions.style.display === 'block') ? 'none' : 'block';
        });
        // Hide options when clicking outside
        document.addEventListener('click', function(e) {
            if (!filterBtn.contains(e.target) && !filterOptions.contains(e.target)) {
                filterOptions.style.display = 'none';
            }
        });
    }

    // Sort high to low
    if (priceHighBtn) {
        priceHighBtn.addEventListener('click', function() {
            const sorted = [...allProducts].sort((a, b) => b.price - a.price);
            renderProducts(sorted);
            filterOptions.style.display = 'none';
        });
    }
    // Sort low to high
    if (priceLowBtn) {
        priceLowBtn.addEventListener('click', function() {
            const sorted = [...allProducts].sort((a, b) => a.price - b.price);
            renderProducts(sorted);
            filterOptions.style.display = 'none';
        });
    }
});

