const modeButton = document.querySelector('button[name="mode"]');
const hideButton = document.getElementById('hide-btn');
const hidButtonDiv = document.querySelector('.hid-button');
const hideIcon = document.getElementById('hide-icon');
const hideText = document.getElementById('hide-text');
const productGrid = document.getElementById('verse-grid');
let allBooks = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fetch books from Open Library API (default: "javascript")
async function fetchBooks(query = "javascript") {
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`);
    const data = await res.json();
    return data.docs || [];
}

// Render books as cards
function renderBooks(booksToRender) {
    productGrid.innerHTML = '';
    (booksToRender || allBooks).forEach(book => {
        const coverId = book.cover_i;
        const imgSrc = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
            : 'https://via.placeholder.com/120x180?text=No+Cover';
        const title = book.title || "No Title";
        const author = (book.author_name && book.author_name.join(', ')) || "Unknown Author";
        const year = book.first_publish_year || "N/A";
        const price = (Math.random() * 40 + 10).toFixed(2); // $10.00 - $50.00
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${imgSrc}" alt="${title}" style="width:120px;height:180px;object-fit:cover;border-radius:8px;">
            <h3>${title}</h3>
            <p><strong>Author:</strong> ${author}</p>
            <p><strong>Year:</strong> ${year}</p>
            <p><strong>Price:</strong> $${price}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
            <button class="show-details-btn">Show Details</button>
        `;
        // Add to Cart button
        card.querySelector('.add-to-cart-btn').addEventListener('click', function() {
            cart.push({
                title,
                author,
                year,
                image: imgSrc, // important for panel display
                price // <-- Save the price in the cart!
            });
            localStorage.setItem('cart', JSON.stringify(cart));

            // Add 100 puntos for each book added
            let puntos = parseInt(localStorage.getItem('puntos')) || 0;
            puntos += 100;
            localStorage.setItem('puntos', puntos);

            // Show SweetAlert2 popup with image
            Swal.fire({
                title: `"${title}" added to cart!`,
                imageUrl: imgSrc,
                imageWidth: 120,
                imageHeight: 180,
                imageAlt: title,
                html: `<strong>Author:</strong> ${author}<br><strong>Year:</strong> ${year}<br><strong>Price:</strong> $${price}`,
                confirmButtonText: 'OK',
                background: document.body.classList.contains('night-mode') ? '#181818' : '#fff',
                color: document.body.classList.contains('night-mode') ? '#1fa750' : '#1fa750',
                confirmButtonColor: '#1fa750'
            });
        });
        // Show Details button
        card.querySelector('.show-details-btn').addEventListener('click', function() {
            Swal.fire({
                title: title,
                imageUrl: imgSrc,
                imageWidth: 120,
                imageHeight: 180,
                imageAlt: title,
                html: `<strong>Author:</strong> ${author}<br><strong>Year:</strong> ${year}`,
                confirmButtonText: 'OK',
                background: document.body.classList.contains('night-mode') ? '#181818' : '#fff',
                color: document.body.classList.contains('night-mode') ? '#1fa750' : '#1fa750',
                confirmButtonColor: '#1fa750'
            });
        });
        // Make the image clickable to go to a product page
        card.querySelector('img').addEventListener('click', function() {
            localStorage.setItem('selectedProduct', JSON.stringify({
                title,
                author,
                year,
                images: [imgSrc], 
                price,
                description: `Book by ${author}, published in ${year}.`,
                category: "Book"
            }));
            window.location.href = "product.html";
        });
        productGrid.appendChild(card);
    });
}

// Search functionality
window.addEventListener('DOMContentLoaded', async function() {
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
    allBooks = await fetchBooks();
    renderBooks();

    // Real-time search
    var searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', async function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length === 0) {
            allBooks = await fetchBooks();
            renderBooks();
        } else {
            allBooks = await fetchBooks(searchTerm);
            renderBooks();
        }
    });
});

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
    renderBooks(); // re-render to update SweetAlert2 color
});

// Hide/show bar
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

// Load footer
fetch('../views/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    });