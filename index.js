
updateTableContent();
var count = 0;
document.getElementById("add").addEventListener("click", function () {
  var item = document.getElementById("item-name").value;
  var qty = document.getElementById("qty-no").value;
  var date = document.getElementById("doe").value;

  // making object of above data and store it in array present in local storage
  const arr = JSON.parse(localStorage.getItem("data-items"));

  // adding color to items whose month is same as registered item month
  var color="" ;
  
      var itemMonth = new Date(date).getMonth();
      var currentMonth = new Date().getMonth();
  
      if( itemMonth === currentMonth ){
        color  = "red";
      }

  const item_obj = {
    item: item,
    qty: qty,
    date: date,
  };

  arr.push(item_obj);

  localStorage.setItem("data-items", JSON.stringify(arr));

  if (validate(date, qty)) {
    document.getElementById("table-content").innerHTML += `<tr class="row ${color}">
<td>${item}</td>
<td class="middle-col">${qty}</td>
<td>${date}</td>
<td class="rightmost-col"><input type="checkbox" id="${count}"></td>
</tr>`;
    count++;
    document.getElementById("item-name").value = "";
    document.getElementById("qty-no").value = "";
    document.getElementById("doe").value = "";
  } else {
    alert(`
    Check if you have added passed date or today's date.
    Check if quantity if negative or zero.
    Check if any of the fields is empty.
    `);
  }

  addCheckBoxListener();

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

function updateTableContent(){
  if (localStorage.getItem("data-items") == null) {
    const data_array = [];
    localStorage.setItem("data-items", JSON.stringify(data_array));
  } else {
    const arr = JSON.parse(localStorage.getItem("data-items"));
  
    // comparator function
    arr.sort(function (obj1, obj2) {
      const d1 = new Date(obj1.date);
      const d2 = new Date(obj2.date);
  
      if (d1 > d2) {
        return 1;
      } else if (d1 == d2) {
        return 0;
      } else {
        return -1;
      }
    });
  
    for (var i = 0; i < arr.length; i++) {
  
      let color="" ;
  
      let itemMonth = new Date(arr[i].date).getMonth();
      let currentMonth = new Date().getMonth();
  
      if( itemMonth === currentMonth ){
        color  = "red";
      }
      
      document.getElementById("table-content").innerHTML += `<tr class="row ${color} ">
          <td>${arr[i].item}</td>
          <td class="middle-col ">${arr[i].qty}</td>
          <td>${arr[i].date}</td>
          <td class="rightmost-col" ><input type="checkbox" ></td>
          </tr>`;
    }
  
  }
}





function refresh(){

  const arr = JSON.parse(localStorage.getItem("data-items"));

  document.getElementById("table-content").innerHTML=""

  for (var i = 0; i < arr.length; i++) {
  
    let color="" ;

    let itemMonth = new Date(arr[i].date).getMonth();
    let currentMonth = new Date().getMonth();

    if( itemMonth === currentMonth ){
      color  = "red";
    }
    
    document.getElementById("table-content").innerHTML += `<tr class="row ${color} ">
        <td>${arr[i].item}</td>
        <td class="middle-col ">${arr[i].qty}</td>
        <td>${arr[i].date}</td>
        <td class="rightmost-col" ><input type="checkbox" ></td>
        </tr>`;
  }

}

addCheckBoxListener();

function addCheckBoxListener(){
  for(var x of document.querySelectorAll('#table-content  input[type="checkbox"]')){

    console.log(x);
  
    x.addEventListener('click',function(){
      let updatedQty = prompt('how many items you have consumed? ');
  
      let data_array = JSON.parse(localStorage.getItem('data-items'));
  
      let actualQty = data_array[Number(x.id)].qty;
  
      if(actualQty-updatedQty>=0){
        data_array[Number(x.id)].qty -=updatedQty;
        
        if(actualQty-updatedQty==0)
        data_array.splice(Number(x.id), 1);
        
      localStorage.setItem('data-items', JSON.stringify(data_array));
  
     
      refresh();
  
      }
      else{
        alert('entered quantity is not valid');
      }
  
  })
  
  }
  
}