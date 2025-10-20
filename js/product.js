// Get product from localStorage
        let product = JSON.parse(localStorage.getItem('selectedProduct'));
        if (product) {
            function renderStars(rating) {
                const fullStars = Math.floor(rating);
                const halfStar = rating % 1 >= 0.5;
                let stars = '';
                for (let i = 0; i < fullStars; i++) stars += '★';
                if (halfStar) stars += '☆';
                for (let i = fullStars + halfStar; i < 5; i++) stars += '☆';
                return `<span class="stars">${stars}</span>`;
            }

            document.getElementById('product-details').innerHTML = `
                <h1>${product.title}</h1>
                <img src="${product.images[0]}" alt="${product.title}">
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <div class="reviews-section">
                    <strong>Reviews:</strong>
                    <div class="stars-row">
                        ${renderStars(product.rating || 4.5)}
                        <span style="margin-left:8px;">(${product.rating || 4.5}/5)</span>
                    </div>
                </div>
                <div class="comments-section">
                    <strong>Comments:</strong>
                    <ul id="comments-list">
                        <li>No comments yet.</li>
                    </ul>
                    <textarea id="comment-input" placeholder="Add a comment..."></textarea>
                    <button id="add-comment-btn">Add Comment</button>
                </div>
                <div class="buy-section">
                    <input type="number" min="1" value="1" id="quantity-input" style="width:60px;margin-right:10px;">
                    <button id="add-to-cart-btn">Add to Cart</button>
                </div>
            `;
        } else {
            document.getElementById('product-details').textContent = "No product found.";
        }

        // Comments logic (simple local, per product)
        const commentsKey = 'comments_' + (product ? product.id : '');
        const commentsList = document.getElementById('comments-list');
        const commentInput = document.getElementById('comment-input');
        const addCommentBtn = document.getElementById('add-comment-btn');

        function loadComments() {
            if (!commentsList) return;
            const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
            commentsList.innerHTML = comments.length
                ? comments.map(c => `<li><strong>${c.author}:</strong> ${c.text}</li>`).join('')
                : '<li>No comments yet.</li>';
        }
        if (commentsList) loadComments();

        if (addCommentBtn) {
            addCommentBtn.onclick = function() {
                const val = commentInput.value.trim();
                if (val) {
                    const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
                    // Get username from localStorage or use 'Guest'
                    const author = localStorage.getItem('username') || 'Guest';
                    comments.push({ author, text: val });
                    localStorage.setItem(commentsKey, JSON.stringify(comments));
                    commentInput.value = '';
                    loadComments();
                }
            };
        }

        // Add to cart logic
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.onclick = function() {
                const quantity = parseInt(document.getElementById('quantity-input').value) || 1;
                if (quantity < 1 || quantity > 10) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid quantity',
                        text: 'Please enter a quantity between 1 and 10',
                    });
                    document.getElementById('quantity-input').value = 1;
                    return;
                }
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                for (let i = 0; i < quantity; i++) {
                    cart.push(product);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`Added ${quantity} "${product.title}" to cart!`);
            };
        }

        // Night mode toggle logic
    document.addEventListener('DOMContentLoaded', function() {
    const modeButton = document.getElementById('toggle');
    // Set initial mode from localStorage
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'night') {
        document.body.classList.add('night-mode');
        document.body.backgroundColor = 'black';
        document.body.classList.remove('day-mode');
        if (modeButton) modeButton.textContent = 'Day Mode';
    } else {
        document.body.classList.add('day-mode');
        document.body.backgroundColor = 'white';
        document.body.classList.remove('night-mode');
        if (modeButton) modeButton.textContent = 'Night Mode';
    }

    if (modeButton) {
        modeButton.addEventListener('click', function() {
            if (document.body.classList.contains('night-mode')) {
                document.body.classList.remove('night-mode');
                document.body.classList.add('day-mode');
                modeButton.textContent = 'Night Mode';
                localStorage.setItem('mode', 'day');
            } else {
                document.body.classList.remove('day-mode');
                document.body.classList.add('night-mode');
                modeButton.textContent = 'Day Mode';
                localStorage.setItem('mode', 'night');
            }
        });
    }
});