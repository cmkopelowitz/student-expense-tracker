//Add Item form inputs
const inp_date = document.querySelector("#date");
const inp_description = document.querySelector("#description");
const inp_category = document.querySelector("#category");
const inp_amount = document.querySelectorAll("#amount");
const inp_tender = document.querySelector("#tender");
const inp_type = document.querySelector('#type');
const tbody = document.querySelector('#tbody');
const add_item_form = document.querySelector('#add-item-form');
const budget_form = document.getElementById("budget-form");

const btn_add_item = document.querySelector('#add-item');
const btn_delete_item = document.querySelector('#delete-item');


budget_form.addEventListener("click", (e) => {
  location.replace("http://127.0.0.1:5500/budget.html");
})


const VALID_CATEGORIES = [
  "mortgage", "charity", "tuition", "groceries", "gas", "shopping", "fast_food", "income", "date_night"
]

const VALID_TENDER = [
  "cash", "check", "credit_card", "debit_card", "pending"
]

window.onload = () => {
  //render all items
  renderAllItems();

  add_item_form.addEventListener("submit", function (event) {
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
 * Added a "add after edit" item - Megan
 */
// Add row on add button click
$(document).on("click", ".add", function () {
  var empty = false;
  var input = $(this).parents("tr").find('input[type="text"]');
  input.each(function () {
    if (!$(this).val()) {
      $(this).addClass("error");
      empty = true;
    } else {
      $(this).removeClass("error");
    }
  });
  $(this).parents("tr").find(".error").first().focus();
  if (!empty) {
    input.each(function () {
      $(this).parent("td").html($(this).val());
    });
    $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").removeAttr("disabled");
  }
});


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
    const value = JSON.parse(localStorage.getItem(key));
    renderItem(key, value);
  }
}


/**
 * render items to table by specified date
 * @param {string} date "yyyy/mm/dd"
 */
function renderItemsByDate(date) {
  //clear the table
  tbody.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    if (date == value.completed) {
      renderItem(key, value);
    }
  }
}


/**
 * 
 * @returns [] obj
 */
function getItemsByCategory() {
  let items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    if (category == value.category) {
      items.push({ key, value });
    }
  }

  return items;
}


/**
 * render items to table by given category
 * @param {string} category 
 */
function renderItemsByCategory(category) {
  //clear the table
  tbody.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    if (category == value.category) {
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
    ${value.date}
  </th>
  <td>${value.description}</td>
  <td>${value.category}</td>
  <td>${value.amount}</td>
  <td>${value.type}</td>
  <td>${value.tender}</td>
  <td><a class="add visible" title="Add" data-toggle="tooltip"><i class="fas fa-list"></i></a>
  <a class="edit" title="Edit" data-toggle="tooltip"><i onclick="toggleAddEdit(this)" class="fas fa-pencil-alt"></i></i></a>
  <a class="delete" title="Delete" data-toggle="tooltip"><i class="fas fa-trash-alt"></i></a>
  </td>`;

  tbody.append(tr);
}


function toggleAddEdit(x) {
  x.classList.toggle("fa-list");
}

// Edit row on edit button click
$(document).on("click", ".edit", function () {
  $(this).parents("tr").find("td:not(:last-child)").each(function () {
    $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
  });
  $(this).parents("tr").find(".add, .edit").toggle();
  $(".add-new").attr("disabled", "disabled");
});

// Add row on add button click
$(document).on("click", ".add", function () {
  var empty = false;
  var input = $(this).parents("tr").find('input[type="text"]');
  input.each(function () {
    if (!$(this).val()) {
      $(this).addClass("error");
      empty = true;
    } else {
      $(this).removeClass("error");
    }
  });
  $(this).parents("tr").find(".error").first().focus();
  if (!empty) {
    input.each(function () {
      $(this).parent("td").html($(this).val());
    });
    // $(this).parents("tr").find(".add, .edit").toggle();
    // $(".add-new").removeAttr("disabled");
  }
});

// Delete row on delete button click
$(document).on("click", ".delete", function () {
  $(this).parents("tr").remove();
  $(".add-new").removeAttr("disabled");
});

function getSpendingByCategory() {
  if (localStorage.length === 0) {
    console.log('storage is empty!');
  }

  let categoryToExpense = new Map();
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    console.log(typeof value.amount)
    if (categoryToExpense.has(value.category)) {
      categoryToExpense.set(value.category, categoryToExpense.get(value.category) + Number(value.amount));
    } else {
      categoryToExpense.set(value.category, Number(value.amount));
    }
  }

  return Array.from(categoryToExpense);
}


// Google Charts - Megan
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Mortgage', 3],
    ['Groceries', 1],
    ['Gas', 1],
    ['Tuition', 1],
    ['Tithing', 2]
  ]);

  var options = {
    title: 'My Daily Activities'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}




