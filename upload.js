const message = document.getElementById('message')

async function upload () {
  const title = document.getElementById('title').value
  const price = document.getElementById('price').value
  const pictures = document.getElementById('pictures').files[0]
  const formData = new FormData()

  formData.append('pictures', pictures)

  const response = await fetch('https://assets.e-rob.nl', {method: 'POST', body: formData})
  const url = await response.text()

  fetch('https://marketplace.e-rob.nl/api/collections/save/uploads?token=account-311b5b245eceac5ab10804a2c0417d', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          data: {title, price, image:url}
      })
  })
  .then(res=>res.json())
  .then(entry => console.log(entry))

  message.innerHTML = 'Image uploaded!!!!!!!!!'
}
