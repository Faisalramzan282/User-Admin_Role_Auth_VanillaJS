const cartContainer = document.getElementById('cartContainer');
const totalAmountSpan = document.getElementById('totalAmount');
function fetchDataFromBackend() {
    const userLogAuth = JSON.parse(localStorage.getItem("userLogAuth"))
    const token = userLogAuth.token;
    const config = {
        headers: {
          "x-access-token": token,
          "Content-type": "application/json",
        },
      };
    $.ajax({
      url: 'http://localhost:3001/movies',
      type: 'GET',
      "Content-type": "application/json",
      headers: config.headers,
      success: function (data) {
        renderCartItems(data);
      },
      error: function (error) {
        console.error('Error:', error);
      }
    });
  }
  window.onload = function () {
    fetchDataFromBackend();
    const getTotalCheckOut = localStorage.getItem('totalCheckout') || 0;
    totalAmountSpan.textContent = getTotalCheckOut
  };
function renderCartItems(data) {
    cartContainer.innerHTML = '';
    data.forEach((item, index) => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.className = 'col-md-6 mb-3 cart-item';
      cartItemDiv.setAttribute('data-price', item.moviePrice);
      cartItemDiv.setAttribute('mov_item', JSON.stringify(item));
      const storeMovCart = JSON.parse(localStorage.getItem('userMovieCart')) || []
      const movItemExisted = storeMovCart.find((obj)=> obj._id === item._id)
      cartItemDiv.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${item.movieName}</h5>
            <p class="card-text">Price: $${item.moviePrice}</p>
            <p class="card-text">Date: ${item.movieDate}</p>
            <div class="input-group">
              <button class="btn btn-outline-secondary" type="button" id="minusBtn-${index}">-</button>
              <span class="quantity m-2">${movItemExisted?movItemExisted.quantity:0}</span>
              <button class="btn btn-outline-secondary" type="button"  id="plusBtn-${index}">+</button>
            </div>
          </div>
        </div>
      `;
      cartContainer.appendChild(cartItemDiv);
      const minusBtn = document.getElementById(`minusBtn-${index}`);
      const plusBtn = document.getElementById(`plusBtn-${index}`);
      const quantitySpan = cartItemDiv.querySelector('.quantity');
      minusBtn.addEventListener('click', () => {
        let quantity = parseInt(quantitySpan.textContent);
        if (quantity > 0) {
          quantity--;
          quantitySpan.textContent = quantity;
          const itemData = JSON.parse(cartItemDiv.getAttribute('mov_item'));//cart obj
          console.log("in button click data ==>", itemData, quantity);
            updateTotalAmount(quantity, itemData);
        }
      });
      plusBtn.addEventListener('click', () => {
        let quantity = parseInt(quantitySpan.textContent);
        quantity++;
        quantitySpan.textContent = quantity; 
        const itemData = JSON.parse(cartItemDiv.getAttribute('mov_item'));//cart obj
        updateTotalAmount(quantity, itemData);
      });
    });
  }
//   for update price 
async function updateTotalAmount(quantity, movieObj) {
  const userMovCart =  {
    quantity: quantity,
    checkout: quantity * movieObj.moviePrice,
    ...movieObj,
    
  }
const storeMovCart = JSON.parse(localStorage.getItem('userMovieCart')) || [];
const IndexExisted = storeMovCart.findIndex((obj)=> obj._id === userMovCart._id)
if(IndexExisted == -1)
{
storeMovCart.push(userMovCart);
localStorage.setItem('userMovieCart', JSON.stringify(storeMovCart));
}
else{
    storeMovCart[IndexExisted] =  userMovCart;
    localStorage.setItem('userMovieCart', JSON.stringify(storeMovCart));
}
let totalCheckout = 0;
storeMovCart.forEach(item=>{
    totalCheckout += item.checkout
})
localStorage.setItem('totalCheckout', totalCheckout) 
const getTotalCheckOut = localStorage.getItem('totalCheckout') || 0;
totalAmountSpan.textContent = getTotalCheckOut
}