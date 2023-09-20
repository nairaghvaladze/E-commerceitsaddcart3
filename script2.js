
const btnCart=document.querySelector('#cart-icon');
const cart1=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
  cart1.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
  cart1.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
  loadContent();

}


function fetchItemsFromAPI() {
  return fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .catch(error => console.error('Error fetching items:', error));
}
function displayItems(items) {
  const itemList = document.getElementById('item-list');

  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
    <div id="main3">
    <img src="${item.image}" alt="${item.name}">
      <p style="width:250px">${item.title}</p> <p style="text-weigth:bold">Price: $${item.price} </p>
      <input type="number" id="quantity-${item.id}" placeholder="Quantity" style="width:150px">
    
      <button onclick="addToCart(${item.id})" id="button1"><img src="./image/Add To Cart.png" id="addcart">
      <img src="./image/Wish List.png" id="addcart"></button>
      </div>
    `;
    itemList.appendChild(itemDiv);
  });
}
let cart = [];

function addToCart(itemId) {
  const quantity = parseInt(document.getElementById(`quantity-${itemId}`).value) || 1;
  const selectedItem = items.find(item => item.id === itemId);
  if (selectedItem) {
    const existingCartItem = cart.find(item => item.id === itemId);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cart.push({ ...selectedItem, quantity });
    }
    updateCartDisplay();
  }
}
function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCartDisplay();
}
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  let totalAmount = 0;
  let totalItems = 0;

  cart.forEach(item => {
    const itemPrice = item.price * item.quantity;
    totalAmount += itemPrice;
    totalItems += item.quantity;
    cartItemsContainer.innerHTML += `
      <div>
        <img src="${item.image}" alt="${item.title}" style="width:50px; heigth:50px">
        <p style="width:200px">${item.title} - Quantity: ${item.quantity} - $${itemPrice.toFixed(2)}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
  });

  document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
  document.getElementById('total-items').innerText = totalItems;
}
function clearCart() {
  cart = [];
  updateCartDisplay();
}
let items = [];

fetchItemsFromAPI()
  .then(data => {
    items = data; // Store fetched items in the 'items' array
    displayItems(items);
  })
  .catch(error => console.error('Error:', error));
      
  