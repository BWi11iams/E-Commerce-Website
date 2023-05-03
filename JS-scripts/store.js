if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


window.onload = function() {
    displayCartItems();
  };

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function removeCartItem(event) {
    console.log('Button clicked');
    var buttonClicked = event.target;
    if (buttonClicked.classList.contains("btn-danger")) {
      var cartRow = buttonClicked.closest(".cart-row");
      var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
      // loop through cart items and remove the matching item
      for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        if (cartItem.title === cartRow.querySelector(".cart-item-title").innerText) {
          cartItems.splice(i, 1);
          break;
        }
      }
  
      // update local storage with the new cart items
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
      // remove the cart row and update the cart total
      cartRow.remove();
      updateCartTotal();
    }
  }


function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var price = parseFloat(price.replace('£', '')).toFixed(2);
    var quantity = shopItem.getElementsByClassName('shop-item-quantity')[0].value
    var imageSrc = document.getElementById('ProductImg').src;
    addItemToCart(title, price, imageSrc, quantity)
}

function addItemToCart(title, price, imageSrc, quantity) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    var itemExists = false;
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].title === title) {
            cartItems[i].quantity++;
            itemExists = true;
            break;
        }
    }
    if (!itemExists) {
        cartItems.push({
            title: title,
            price: price,
            imageSrc: imageSrc,
            quantity: quantity,
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function displayCartItems() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    var cartItemsTableBody = document.querySelector(".cart-items");
  
    // loop through cart items and insert them into table
    for (var i = 0; i < cartItems.length; i++) {
      var cartItem = cartItems[i];
      var cartRow = document.createElement("tr");
      cartRow.classList.add("cart-row");
      var cartRowContents = `
        <td>
          <img src="${cartItem.imageSrc}">
          <div>
            <p class="cart-item-title">${cartItem.title}</p>
            <small>£${cartItem.price}</small>
            <br>
            <button class="btn btn-danger" type="button" onclick="removeCartItem(event)">Remove</button>
          </div>
        </td>
        <td><input class="cart-quantity-input" type="number" value="${cartItem.quantity}"></td>
        <td class="cart-price">£${cartItem.price}</td>`;
      cartRow.innerHTML = cartRowContents;
      cartItemsTableBody.appendChild(cartRow);
    }
  }

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('£', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    
    // Get the cart row element
    var cartRow = input.closest('.cart-row');
    
    // Get the product title from the cart row element
    var title = cartRow.querySelector('.cart-item-title').innerText;
    
    // Get the current cart from localStorage
    var cart = JSON.parse(localStorage.getItem('cartItems'));
    
    // Update the quantity for the product in the cart
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].title === title) {
        cart[i].quantity = input.value;
        break;
      }
    }
    
    // Update the cart in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));
    
    // Update the cart total
    updateCartTotal();
  }
  
  // Set up event delegation for quantity inputs
  var cartItems = document.querySelector('.cart-items');
  cartItems.addEventListener('change', function(event) {
    if (event.target && event.target.matches('.cart-quantity-input')) {
      quantityChanged(event);
    }
  });

window.addEventListener('load', updateCartTotal);
