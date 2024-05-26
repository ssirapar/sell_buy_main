document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('keyup', () => {
        const query = searchBar.value.toLowerCase();
        const bookItems = document.querySelectorAll('.book-item');
        
        bookItems.forEach(item => {
            const title = item.querySelector('h3').innerText.toLowerCase();
            const author = item.querySelector('p').innerText.toLowerCase();
            if (title.includes(query) || author.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
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
        const bookPrice = parseFloat(bookItem.querySelector('.card-text').textContent.replace('$', '')); // Parse price as float
        
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

        // Optionally, display a message to confirm that the book has been added to the cart
        alert('Book added to cart!');

        // Update cart display
        updateCartDisplay(cartItems);
    }

    // Function to update the cart display
    function updateCartDisplay(cartItems) {
        // Select the container for displaying cart items
        const cartContainer = document.querySelector('.cart-container');

        // Clear the existing content of the cart container
        cartContainer.innerHTML = '';

        // Initialize total price
        let totalPrice = 0;

        // Loop through each cart item and create HTML elements to display them
        cartItems.forEach((item, index) => {
            const cartItemHTML = `
                <div class="cart-item">
                    <h3>${item.title}</h3>
                    <p>${item.price.toFixed(2)}</p>
                </div>
            `;
            cartContainer.innerHTML += cartItemHTML;

            // Add item price to total price
            totalPrice += item.price;
        });

        // Select the container for displaying total price
        const totalPriceContainer = document.querySelector('#totalPrice');

        // Update the displayed total price
        totalPriceContainer.textContent = totalPrice.toFixed(2);
    }
});

