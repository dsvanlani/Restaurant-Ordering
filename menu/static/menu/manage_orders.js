function complete_order() {
  // changes the status in the database
  fetch('/order/cart/complete_order', {
    method: 'POST',
    body: JSON.stringify({
    order_id: this.dataset.order_id,
  })
  })
  .then(response => response.json())
  .then(result => {
      document.querySelector('#order-'+this.dataset.order_id).remove()
  })
}
function tick() {
  document.querySelectorAll('.ticket').forEach(element => {
    minute = parseInt(element.querySelector('.minute_ticker').innerText)
    minute++
    element.querySelector('.minute_ticker').innerText = minute
  })
}

function parseMonth(string) {
  if (string == "Jan") {
    return 1
  } else if (string == "Feb") {
    return 2
  } else if (string == "Mar") {
    return 3
  } else if (string == "Apr") {
    return 4
  } else if (string == "May") {
    return 5
  } else if (string == "Jun") {
    return 6
  } else if (string == "Jul") {
    return 7
  } else if (string == "Aug") {
    return 8
  } else if (string == "Sep") {
    return 9
  } else if (string == "Oct") {
    return 10
  } else if (string == "Nov") {
    return 11
  } else if (string == "Dec") {
    return 12
  }
}

function display_ticket_view() {
  document.querySelector('#ticket_view').style.display = 'block'
  document.querySelector('#order_view').style.display = 'none'
  document.querySelector('#ticket-view-button').setAttribute('class','nav-link active btn btn-link')
  document.querySelector('#order-view-button').setAttribute('class','nav-link btn btn-link')
}

function display_order_view() {
  document.querySelector('#ticket_view').style.display = 'none'
  document.querySelector('#order_view').style.display = 'block'
  document.querySelector('#ticket-view-button').setAttribute('class','nav-link btn btn-link')
  document.querySelector('#order-view-button').setAttribute('class','nav-link active btn btn-link')

}
document.addEventListener("DOMContentLoaded", () => {

  // configure nav buttons
  document.querySelector('#ticket-view-button').onclick = display_ticket_view
  document.querySelector('#order-view-button').onclick = display_order_view

  //configure order buttons
  document.querySelectorAll('.complete_order_button').forEach( element => {
    element.onclick = complete_order
  })
  // hide order order
  document.querySelector('#order_view').style.display = 'none'

  setInterval(tick, 60000)
  // set the totals
  document.querySelectorAll('.grand_total').forEach(element => {
    order_id = element.dataset.order_id
    row = document.querySelector('#order-row-'+order_id)
    total = parseFloat(row.querySelector('.total').innerText)
    tax = parseFloat(row.querySelector('.tax').innerText)
    grand_total = (total + tax).toFixed(2)
    element.innerText = grand_total

  })

  // set the timers
  document.querySelectorAll('.ticket').forEach(element => {

    // TODO: get this to work right
    timestamp = element.dataset.timestamp
    timestamp_array = timestamp.split(' ')
    time = timestamp_array[3]
    year = parseInt(timestamp_array[2].slice(0,4))
    month = parseMonth(timestamp_array[0].slice(0,3)) - 1
    day = parseInt(timestamp_array[1].split(',')[0])
    time_array = time.split(':')
    hour = parseInt(time_array[0])
    if (timestamp_array[4] == 'p.m.') {
      hour = hour + 12
    }
    minute = parseInt(time_array[1])
    var timestamp_obj = new Date(year, month, day, hour, minute, 0, 0)
    console.log(timestamp_obj)
    var now = new Date()
    console.log(now)

    let delta = Math.abs(now - timestamp_obj)
    let delta_minutes = Math.floor(delta / (1000*60))

    element.querySelector('.minute_ticker').innerText = delta_minutes

  })
})
