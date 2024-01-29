document.addEventListener('DOMContentLoaded', () => {
  const itemList = document.getElementById('item-list')

  async function requestItems() {
    itemList.innerHTML = ''

    const response = await fetch('/records')
    const items = await response.json()

    items.forEach((item) => {
      const list = document.createElement('li')
      list.textContent = item.name
      itemList.appendChild(list)
    })
  }

  const record = document.getElementById('record')

  window.getRecordById = async function () {
    record.innerHTML = ''

    const id = document.getElementById('id').value
    const response = await fetch(`/records/${id}`)
    const item = await response.json()
    console.log(item)
    let list = document.createElement('li')
    list.textContent = item.name
    record.appendChild(list)
  }

  requestItems()
  window.updateItemFromIndex = async function () {
    const updateId = document.getElementById('update-form')
  }
})
