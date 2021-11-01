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
const btn_delete_item = document.querySelector('#delete-item');

const VALID_CATEGORIES = [
  "mortgage", "charity", "tuition", "groceries", "gas", "shopping", "fast_food", "income"
]

const VALID_TENDER = [
  "cash", "check", "credit"
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
$(document).on("click", ".add", function(){
  var empty = false;
  var input = $(this).parents("tr").find('input[type="text"]');
      input.each(function(){
    if(!$(this).val()){
      $(this).addClass("error");
      empty = true;
    } else{
              $(this).removeClass("error");
          }
  });
  $(this).parents("tr").find(".error").first().focus();
  if(!empty){
    input.each(function(){
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
      items.push({key, value});
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
  <td><a class="edit" title="Edit" data-toggle="tooltip"><i class="fas fa-pen"></i></a></td>
  <td><a class="delete" title="Delete" data-toggle="tooltip"><i class="fas fa-trash"></i></a></td>
  `;

  tbody.append(tr);
}

/**
 * Google Chart - Megan
 */
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['Mortgage', 3],
    ['Groceries', 1],
    ['Gas', 1],
    ['Tuition', 1],
    ['Tithing', 2]
  ]);

  // Set chart options
  var options = {'title':'Trending Expenses',
                 'width':400,
                 'height':300};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);

  // End of Google Chart


  /**
 * Added an toggle add/edit item - Megan
 */
// $(document).ready(function(){
// 	$('[data-toggle="tooltip"]').tooltip();
// 	var actions = $("table td:last-child").html();
// 	// Append table with add row form on add new button click
//     $(".add-new").click(function(){
// 		$(this).attr("disabled", "disabled");
// 		var index = $("table tbody tr:last-child").index();
//         var row = '<tr>' +
//             '<td><input type="text" class="form-control" name="name" id="name"></td>' +
//             '<td><input type="text" class="form-control" name="department" id="department"></td>' +
//             '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
// 			'<td>' + actions + '</td>' +
//         '</tr>';
//     	$("table").append(row);		
// 		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
//         $('[data-toggle="tooltip"]').tooltip();


/**
 * Added an edit item - Megan
 */
// Edit row on edit button click
$(document).on("click", ".edit", function(){		
  $(this).parents("tr").find("td:not(:last-child)").each(function(){
$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
});		
$(this).parents("tr").find(".add, .edit").toggle();
$(".add-new").attr("disabled", "disabled");
});

/**
 * Added a delete item - Megan
 */
// Delete row on delete button click
$(document).on("click", ".delete", function(){
  $(this).parents("tr").remove();
  localStorage.removeItem("click");
$(".add-new").removeAttr("disabled");

});

}