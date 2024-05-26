document.addEventListener('DOMContentLoaded', () => {
    // Select all Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.btn-outline-primary');

    // Add click event listener to each button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Function to handle Add to Cart button click
    function addToCart(event) {
        // Get the book details
        const bookItem = event.target.closest('.book-item');
        const bookTitle = bookItem.querySelector('.card-title').textContent;
        const bookPrice = parseFloat(bookItem.querySelector('.card-text').textContent.replace('$', '')); // Convert price to float
        
        // Create an object to represent the book
        const book = {
            title: bookTitle,
            price: bookPrice
        };

        // Get existing cart items from local storage or initialize an empty array
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Add the selected book to the cart
        cartItems.push(book);

        // Store the updated cart items in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update cart display on cart page
        updateCartDisplay(cartItems);

        // Optionally, display a message to confirm that the book has been added to the cart
        alert('Book added to cart!');
    }

    // Function to update cart display on cart page
    function updateCartDisplay(cartItems) {
        // Select the cart container
        const cartContainer = document.querySelector('.cart-container');

        // Clear existing cart items
        cartContainer.innerHTML = '';

        // Initialize total price
        let totalPrice = 0;

        // Loop through each item in the cart
        cartItems.forEach(item => {
            // Create a cart item element
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="row">
                    <div class="col-md-7">
                        <h3>${item.title}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                    </div>
                </div>
            `;

            // Append the cart item element to the cart container
            cartContainer.appendChild(cartItemElement);

            // Add item price to total price
            totalPrice += item.price;
        });

        // Select the total price element and update its content
        const totalPriceElement = document.getElementById('totalPrice');
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
});
