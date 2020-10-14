
function add_item_to_cart () {

  cart_array = JSON.parse(localStorage.getItem('cart_array'))

  // get info from special request field + quantity field
  special_request = document.querySelector('#special_request-' + this.dataset.item_id).value
  quantity = parseInt(document.querySelector('#quantity-' + this.dataset.item_id).value)

  // make new item_obj to store in local localStorage
  item_obj = {"item_id": this.dataset.item_id,
              "item_name": this.dataset.item_name,
              "special_request": special_request,
              "price": this.dataset.item_price
            }

  // check if cart is empty
  if ( cart_array == null || cart_array.length == 0 ) {
    var cart_array = new Array()
    for (i=0; i<quantity; i++) {
      cart_array.push(item_obj)
    }
    localStorage.setItem('cart_array', JSON.stringify(cart_array))
  } else { // its not empty
    cart_array = JSON.parse(localStorage.getItem('cart_array'))

    for (i=0; i<quantity; i++) {
      cart_array.push(item_obj)
    }
    localStorage.setItem('cart_array', JSON.stringify(cart_array))
  }
  // reset the form
  document.querySelector('#modal_form-'+this.dataset.item_id).reset()
  // update cart length in navbar
  document.querySelector('#cart_length').innerText = " (" + (cart_array.length) + ")"

}

document.addEventListener("DOMContentLoaded", () => {
  // configure all of the add item buttons
  document.querySelectorAll('.add-item-button').forEach( element => {
    element.onclick = add_item_to_cart
  })

})
