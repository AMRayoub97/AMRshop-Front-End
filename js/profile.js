fetch('../views/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  });

// Display username or 'Guest' if not logged in
var username = localStorage.getItem('username') || 'Guest';

var usernameSpan = document.getElementById('username');
if (usernameSpan) {
    usernameSpan.innerHTML = username;
}

var nom = document.getElementById('Nom');
if (nom) {
    nom.textContent = username;
}

document.querySelectorAll('.username').forEach(el => {
    el.textContent = username;
});

window.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';

    let total = 0;

    if (cart.length === 0) {
        ordersList.innerHTML = '<li>No products in cart.</li>';
    } else {
        // Count quantities for each product by title (or id if available)
        const productMap = {};
        cart.forEach(product => {
            const key = product.title || product.name || product.id || JSON.stringify(product);
            if (!productMap[key]) {
                productMap[key] = {
                    ...product,
                    quantity: 1
                };
            } else {
                productMap[key].quantity += 1;
            }
        });

        Object.values(productMap).forEach(product => {
            const li = document.createElement('li');
            const imgSrc = product.image || (product.images && product.images[0]) || '';
            li.innerHTML = `
                <img src="${imgSrc}" alt="${product.title || product.name}" class="order-product-img" style="width:60px;height:60px;object-fit:contain;border-radius:8px;margin-right:10px;cursor:pointer;">
                <span>${product.title || product.name}</span>
                <span style="margin-left:auto;">
                    $${Number(product.price).toFixed(2)}
                </span>
                <span style="margin-left:16px;">
                    Qty: <strong>${product.quantity}</strong>
                </span>
                <button class="delete-order-btn" style="margin-left:16px;background:#e74c3c;color:#fff;border:none;border-radius:5px;padding:4px 10px;cursor:pointer;">Eliminar</button>
            `;
            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.gap = "10px";
            ordersList.appendChild(li);

            // go to product page on image click
            li.querySelector('.order-product-img').addEventListener('click', function() {
                localStorage.setItem('selectedProduct', JSON.stringify({
                    title: product.title || product.name,
                    author: product.author || 'Unknown',
                    year: product.year || 'Unknown',
                    images: [imgSrc], // for product page compatibility
                    image: imgSrc,    // for panel compatibility
                    price: product.price,
                    description: `Book by ${product.author || 'Unknown'}, published in ${product.year || 'Unknown'}.`,
                    category: "Book"
                }));
                window.location.href = "product.html";
            });

            // Only add to total if price is a valid number
            if (product.price && !isNaN(product.price)) {
                total += Number(product.price) * product.quantity;
            }

            // Delete button logic
            li.querySelector('.delete-order-btn').addEventListener('click', function() {
                // Remove all items with this key from cart and update localStorage
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const key = product.title || product.name || product.id || JSON.stringify(product);
                cart = cart.filter(item => {
                    const itemKey = item.title || item.name || item.id || JSON.stringify(item);
                    return itemKey !== key;
                });
                localStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            });
        });
    }

    // Show total below the list
    const totalDiv = document.createElement('div');
    totalDiv.style.marginTop = "16px";
    totalDiv.style.fontWeight = "bold";
    totalDiv.style.fontSize = "1.1em";
    totalDiv.textContent = `Total: $${total.toFixed(2)}`;
    ordersList.parentElement.appendChild(totalDiv);

    const lastLogin = localStorage.getItem('lastLogin');
    if (lastLogin) {
        document.getElementById('last-login').textContent = lastLogin;
    }

    const puntos = localStorage.getItem('puntos') || 0;
    document.getElementById('points').textContent = puntos;
});