/* global Vue, fetch */

const app = new Vue({
  el: '#app',
  data: {
    entries: [],
    singleProduct: false,
    host: false,
    marketplaces: [
      'vending.e-rob.nl',
    ]
  },
  mounted () {
    if (window.location.hash && window.location.hash.slice(1)) {
      this.singleProduct = window.location.hash.slice(1)
    }

    this.host = window.location.hostname.split('.')[0]
  }
})

function refresh () {
  fetch('https://marketplace.e-rob.nl/api/collections/get/uploads?token=account-311b5b245eceac5ab10804a2c0417d&sort[_created]=-1')
    .then(collection => collection.json())
    .then(collection => {
      if (app.singleProduct) {
        for (let entry of collection.entries) {
          if (entry._id === app.singleProduct) {
            app.entries = [entry]
          }
        }
      } else {
        app.entries = collection.entries
      }
    })
}

setInterval(refresh, 5000)
refresh()
