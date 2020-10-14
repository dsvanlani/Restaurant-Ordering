document.addEventListener("DOMContentLoaded", () => {
  // counts the items in cart and updates the navbar
  if (localStorage.getItem('cart_array')) {
  count = JSON.parse(localStorage.getItem('cart_array')).length
  document.querySelector('#cart_length').innerText = " (" + count + ")"
    } else {
  document.querySelector('#cart_length').innerText = " (0)"
}
})
