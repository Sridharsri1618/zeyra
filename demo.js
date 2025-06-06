let cart = JSON.parse(localStorage.getItem('cart')) || [];
let appliedDiscount = 0;
function renderCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  let subtotal = 0;
  cartItemsDiv.innerHTML = "";
  cart.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;
    cartItemsDiv.innerHTML += `
      <tr>
        <td><img src="${item.img}" alt="${item.name}" width="60"></td>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td><input type="number" value="${item.quantity}" min="1"
          onchange="updateQty(${index}, this.value)"></td>
        <td>₹${itemSubtotal.toFixed(2)}</td>
        <td><button onclick="removeItem(${index})">🗑️</button></td>
      </tr>
    `;
  });
  updateTotals(subtotal);
}
function updateQty(index, newQty) {
  cart[index].quantity = parseInt(newQty);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}
function applyCoupon() {
  const couponInput = document.getElementById("couponInput").value.trim();
  let subtotal = calculateSubtotal();
  if (couponInput === "SAVE50") {
    appliedDiscount = subtotal * 0.5;
    alert("Coupon Applied: 50% OFF");
  } else {
    appliedDiscount = 0;
    alert("Invalid Coupon");
  }
  updateTotals(subtotal);
}
function calculateSubtotal() {
  return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
}
function updateTotals(subtotal) {
  const total = subtotal - appliedDiscount;
  document.getElementById("subtotalValue").innerText = "₹" + subtotal.toFixed(2);
  document.getElementById("totalValue").innerText = "₹" + total.toFixed(2);
}
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thanks for purchasing!");
  cart = [];
  localStorage.removeItem('cart');
  renderCart();
}
renderCart();
