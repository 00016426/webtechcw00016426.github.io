document.addEventListener('DOMContentLoaded', function () {
  const products = document.querySelectorAll('.product');
  const cartList = document.getElementById('cartList');
  const totalPriceElement = document.getElementById('totalPrice');

  let cart = [];

  products.forEach(product => {
    const quantityInput = product.querySelector('input[type="number"]');
    const priceElement = product.querySelector('.price');

    quantityInput.addEventListener('input', function () {
      const quantity = parseInt(this.value);
      // Extract numeric part from the price string
      const price = parseFloat(priceElement.textContent.replace(/[^\d.]/g, ''));

      const existingCartItem = cart.find(item => item.product === product);
      if (existingCartItem) {
        existingCartItem.quantity = quantity;
      } else {
        cart.push({
          product: product,
          quantity: quantity,
          price: price
        });
      }

      updateCart();
    });
  });

  function updateCart() {
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${item.product.querySelector('h2').textContent}</span>
        <span>${item.quantity} x $${item.price.toFixed(2)}</span>
        <span>$${(item.quantity * item.price).toFixed(2)}</span>
      `;
      cartList.appendChild(listItem);

      total += item.quantity * item.price;
    });

    totalPriceElement.textContent = `Total Price: $${total.toFixed(2)}`;
  }
});

  