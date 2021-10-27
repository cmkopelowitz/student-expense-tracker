//Add Item form inputs
const inp_date = document.querySelector("#date");
const inp_description = document.querySelector("#description");
const inp_category = document.querySelector("#category");
const inp_amount = document.querySelectorAll("#amount");
const inp_tender = document.querySelector("#tender");
const inp_type = document.querySelector('#type');
const tbody = document.querySelector('#tbody');
const add_item_form = document.querySelector('#add-item-form');

const btn_add_item = document.querySelector('#add-item');

window.onload = () => {
  //render all items
  renderAllItems();

  add_item_form.addEventListener("submit", function(event) {
    event.preventDefault();
    let data = new FormData(add_item_form);
    let item = {
      date: data.get('date'),
      description: data.get('description'),
      category: data.get('category'),
      amount: data.get('amount'),
      tender: data.get('tender'),
      type: data.get('type'),
    }

    addItem(item);
  });

};

/**
 * create and store an item into local storage
 */
function addItem(item) {
  const key = Date.now();

  localStorage.setItem(key, JSON.stringify(item));
}

/**
 * render every item in localStorage into table
 */
function renderAllItems() {
  //clear the table
  tbody.innerHTML = '';

  if (localStorage.length === 0) {
    console.log('storage is empty!');
  }

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key != 'counter') {
      const value = JSON.parse(localStorage.getItem(key));
      renderItem(key, value);
    }
  }
}

/**
 * render a single item and append to table
 * @param {timestamp} key 
 * @param {obj} value 
 */
function renderItem(key, value) {
  let tr = document.createElement("TR");
  tr.setAttribute('data-key', key);
  tr.innerHTML = `
  <th scope="row">
    <input type="checkbox"> ${value.date}
  </th>
  <td>${value.description}</td>
  <td>${value.category}</td>
  <td>${value.amount}</td>
  `;

  tbody.append(tr);
}
