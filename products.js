const evaohoh = document.getElementById('evaohoh');
const evaohohoh = document.getElementById('evaohohoh');

function filterProducts(searchTerm) {
    const term = searchTerm.toLowerCase();
    const products = document.querySelectorAll('.zoe1 > div, .zoe2 > div, .zoe3 > div');

    products.forEach(product => {
        const title = product.querySelector('h4').textContent.toLowerCase();
        const visible = title.includes(term);


        if (visible) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

evaohoh.addEventListener('input', function() {
    filterProducts(evaohoh.value);
});






document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = document.getElementById('cart');
    const cartIcon = document.querySelector('.cart-icon');
    const closeCartButton = document.getElementById('close-cart-button');
    const cartTotal = document.getElementById('cart-total');

    cartIcon.addEventListener('click', () => {
        cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
    });

    closeCartButton.addEventListener('click', () => {
        cart.style.display = 'none';
    });

    document.querySelectorAll("button[class^='btn-']").forEach((button, index) => {
        button.addEventListener("click", () => {
            const productContainer = button.parentElement;
            const productImage = productContainer.querySelector("img").src;
            const productName = productContainer.querySelector("h4").textContent;
            const productPrice = productContainer.querySelector("h4:nth-of-type(2)").textContent.replace('$', '').replace('.', '').replace(',', '.');

            addProductToCart(productImage, productName, parseFloat(productPrice));
            updateCartTotal();
        });
    });

    document.getElementById('checkout-button').addEventListener("click", () => {
        alert("Compra realizada exitosamente!");
        cartItemsContainer.innerHTML = '';
        updateCartTotal();
    });
});

function addProductToCart(image, name, price) {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
        <img src="${image}" alt="${name}">
        <h4>${name}</h4>
        <span>$${price.toFixed(2)}</span>
        <button onclick="removeProductFromCart(this)">Eliminar</button>
    `;

    cartItemsContainer.appendChild(cartItem);
}

function removeProductFromCart(button) {
    const cartItem = button.parentElement;
    cartItem.remove();
    updateCartTotal();
}

function updateCartTotal() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartItemsContainer.querySelectorAll('.cart-item span').forEach(item => {
        total += parseFloat(item.textContent.replace('$', '').replace(',', ''));
    });

    cartTotal.textContent = `Total: $${total.toFixed(2).replace('.', ',')}`;
}
