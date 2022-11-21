updateTableContent();

document.getElementById("add").addEventListener("click", function () {

  var item = document.getElementById("item-name").value;
  var qty = document.getElementById("qty-no").value;
  var date = document.getElementById("doe").value;

  if(!validate(date, qty)||item==""){
    alert(`
    Check if you have added passed date or today's date.
    Check if quantity if negative or zero.
    Check if any of the fields is empty.
    `);
  }
  else {
  
  const arr = JSON.parse(localStorage.getItem("data-items"));

  var color = "";

  var itemMonth = new Date(date).getMonth();
  var currentMonth = new Date().getMonth();

  if (itemMonth === currentMonth) {
    color = "red";
  }

  const item_obj = {
    item: item,
    qty: qty,
    date: date,
  };

  arr.push(item_obj);

  localStorage.setItem("data-items", JSON.stringify(arr));

  window.location.reload();
  
  }
  
});

function validate(date, qty) {
  var b = true;
  date += "";

  const dateObj = new Date(date);

  if (
    qty <= 0 ||
    dateObj < new Date() ||
    document.getElementById("item-name").val == "" ||
    document.getElementById("qty-no").val == "" ||
    document.getElementById("doe").val == ""
  ) {
    b = false;
  }

  return b;
}

function updateTableContent() {

  document.getElementById("table-content").innerHTML = "";

  if (localStorage.getItem("data-items") == null) { // if the data-items array is not present in local storage creating local storage
      const data_array = [];
      localStorage.setItem("data-items", JSON.stringify(data_array));
  }
  else { 

    const arr = JSON.parse(localStorage.getItem("data-items"));
    
    arr.sort(dateComparator); // sort the data according to date in ascending order.

    localStorage.setItem("data-items", JSON.stringify(arr));

    highlightRows();

  }
      
}


function dateComparator(obj1, obj2) {
  const d1 = new Date(obj1.date);
  const d2 = new Date(obj2.date);

  if (d1 > d2) {
    return 1;
  } else if (d1 == d2) {
    return 0;
  } else {
    return -1;
  }
}

function highlightRows(){

  const arr = JSON.parse(localStorage.getItem('data-items'));
  arr.forEach(colorIt);

}

function colorIt(val,i, arr){

  console.log(val);

    let color = "";
    let itemMonth = new Date(val.date).getMonth();
    let currentMonth = new Date().getMonth();

    if (itemMonth === currentMonth) {
      color = "red";
    }
    if(new Date(val.date)>=new Date()){

      document.getElementById("table-content").innerHTML += `<tr class="row" style="background-color:${color};">
      <td>${val.item}</td>
      <td class="middle-col ">${val.qty}</td>
      <td>${val.date}</td>
      <td class="rightmost-col" ><input type="checkbox" id=${"val"+i} ></td>
      </tr>`;

    }
    else{
      arr.splice(i,1);
    }
    

    console.log(i);
}


function clearStorage(){

  var x = confirm("Are you sure that you want to delete all data?")

  if(x==true){
    localStorage.clear();
    window.location.reload();
  }

}