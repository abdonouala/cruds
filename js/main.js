let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let categorie = document.getElementById('categories');
let submit = document.getElementById('create');
let total = document.getElementById('total');

function getTotal(){
    if(price.value !== ''){
        let result = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    } else {
        total.style.backgroundColor = 'red';
        total.innerHTML = 'Total';
    }
}

let datapro;

if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

submit.onclick = function(){
   let newpro = {
       title: title.value,
       price: price.value,
       taxes: taxes.value,
       ads: ads.value,
       discount: discount.value,
       total: total.innerHTML, // Update to use total.innerHTML instead of total.value
       count: count.value,
       categorie: categorie.value,
   };

   datapro.push(newpro);
   localStorage.setItem('product', JSON.stringify(datapro));
   showData();
   clearData();
}

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    categorie.value = '';
    total.innerHTML = ''; // Clear the total
    total.style.backgroundColor = ''; // Reset the background color
}

function showData() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td> <!-- Adjusted index to start from 1 -->
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].count}</td>
            <td>${datapro[i].categorie}</td>
            <td><button onclick="updateData(${i})">Update</button></td> <!-- Added update functionality -->
            <td><button onclick="delate(${i})">Delete</button></td>
        </tr>`;
    }

    document.getElementById('tbody').innerHTML = table;

    let btndel = document.getElementById('delateAll');
    if(datapro.length > 0) {
        btndel.innerHTML = `<button onclick="delateall()">Delete All</button>`;
    } else {
        btndel.innerHTML = ''; 
    }
}

showData();

function delate(i){
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}

function delateall() {
    datapro = [];
    localStorage.clear();
    showData();
}

function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    count.value = datapro[i].count;
    categorie.value = datapro[i].categorie;

    
    getTotal();

    
    delate(i);

   
    window.scrollTo(0, 0);
}
