function populate_cart() {

  // make sure list is empty
  document.querySelectorAll('li').forEach( element => {
    element.remove()
  })

  //initialize some variables
  const tax_rate = .075
  let total = 0.0
  let tax = 0.0
  let grand_total = 0.0

  cart_array = JSON.parse(localStorage.getItem('cart_array'))

  if (localStorage.getItem('cart_array') && cart_array.length != 0) { // if theres items in the cart

    for (i=0; i < cart_array.length; i++) {

      object = cart_array[i]
      // make element
      var li = document.createElement('li')
      li.innerText = object.item_name + ' - $' + object.price
      li.setAttribute('id', 'item-' + String(i))
      li.setAttribute('class', 'cart_item list-group-item')
      // make remove button
      var button = document.createElement('button')
      button.innerText = "remove"
      button.onclick = remove_from_cart
      button.setAttribute('class', 'btn btn-sm btn-link')
      button.setAttribute('data-price', object.price)
      button.setAttribute('data-cart_location', i)
      li.appendChild(button) // append the button onto the li
      // make description text
      var special_request = document.createElement("small")
      special_request.innerHTML = '<br>' + object['special_request']
      li.appendChild(special_request)
      document.querySelector('#cart_list').appendChild(li) // append li onto the list


          // calculate totals
      price = parseFloat(object.price)
      total = total + price
      tax = tax + tax_rate * price
      grand_total = grand_total + price + (price * tax_rate)

        // update totals
      document.querySelector('#total').innerText = total.toFixed(2)
      document.querySelector('#tax').innerText = tax.toFixed(2)
      document.querySelector('#grand_total').innerText = grand_total.toFixed(2)
    }


  } else {
    document.querySelector('#total').innerText = "0.00"
    document.querySelector('#tax').innerText = "0.00"
    document.querySelector('#grand_total').innerText = "0.00"

    // update cart list
    let li = document.createElement("li")
    li.innerText = "Cart is empty."
    li.setAttribute('class', 'list-group-item')
    document.querySelector('#cart_list').appendChild(li)

    // disable continue button
    document.querySelector('#continue_button').disabled = true
        }
}


function remove_from_cart() {
  // splice the item out of the cart_array
  cart_index = this.dataset.cart_location
  cart_array = JSON.parse(localStorage.getItem('cart_array'))
  cart_array.splice(cart_index, 1)
  localStorage.setItem('cart_array', JSON.stringify(cart_array))
  // update the count in cart
  document.querySelector('#cart_length').innerText = ' (' + cart_array.length + ')'

  populate_cart()

}

function place_order() {
  // get values for customer name, customer email, total, tax, items
  name = document.querySelector('#name_field').value
  email = document.querySelector('#email_field').value
  total = document.querySelector('#total').innerText
  tax = document.querySelector('#tax').innerText
  items_array = JSON.stringify(localStorage.getItem('cart_array'))

  fetch('/order/cart/place_order', {
    method: 'POST',
    body: JSON.stringify({
    customer_Name: name,
    customer_Email: email,
    total: total,
    tax: tax,
    items_array: items_array
  })
  })
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if (result.message == "success") {

      // clear cart
      localStorage.clear()
      // change view
      document.querySelector('#cart_list_view').style.display = 'none'
      document.querySelector('#confirmation_view').style.display = 'block'
      // enter info
      document.querySelector('#customer_Name').innerText = result.customer_Name
      document.querySelector('#pickup_time').innerText = result.pickup_time
      // change cart number
      document.querySelector('#cart_length').innerText = "(0)"

    }


  })
  return false
}

function check_fields() {
  if (email_field.value && name_field.value) {
    place_order_button.disabled = false
  } else {
    place_order_button.disabled = true
  }
}


document.addEventListener("DOMContentLoaded", () => {
  // configure the place order button
  place_order_button = document.querySelector("#place_order_button")
  place_order_button.onclick = place_order
  place_order_button.disabled = true
  // place order button is disabled if boxes are not full
  name_field = document.querySelector('#name_field')
  name_field.addEventListener("keyup", check_fields)
  email_field = document.querySelector('#email_field')
  email_field.addEventListener("keyup", check_fields)

  populate_cart()

})
