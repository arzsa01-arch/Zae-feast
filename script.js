/* =====================================
   DATA KERANJANG
===================================== */

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

/* =====================================
   UPDATE COUNTER KERANJANG
===================================== */

function updateCartCount(){

let total = 0;

cart.forEach(item => {

total += item.qty;

});

let counter =
document.getElementById(
"cartCount"
);

if(counter){

counter.innerText = total;

}

}

/* =====================================
   TAMBAH KE KERANJANG
===================================== */

function addCart(nama,harga){

let item =
cart.find(
x => x.nama === nama
);

if(item){

item.qty++;

}else{

cart.push({

nama:nama,
harga:harga,
qty:1

});

}

saveCart();

showNotification(
nama + " ditambahkan"
);

}

/* =====================================
   SIMPAN LOCAL STORAGE
===================================== */

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCartCount();

}

/* =====================================
   NOTIFIKASI
===================================== */

function showNotification(text){

let notif =
document.createElement("div");

notif.className =
"notification";

notif.innerText =
text;

document.body.appendChild(
notif
);

setTimeout(()=>{

notif.remove();

},2000);

}

/* =====================================
   FILTER MENU
===================================== */

function filterMenu(
category,
button
){

let cards =
document.querySelectorAll(
".menu-card"
);

cards.forEach(card=>{

let cardCategory =
card.getAttribute(
"data-category"
);

if(
category === "all"
){

card.style.display =
"block";

}else{

if(
cardCategory === category
){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

}

});

/* tombol aktif */

document
.querySelectorAll(
".category-btn"
)
.forEach(btn=>{

btn.classList.remove(
"active"
);

});

button.classList.add(
"active"
);

}

/* =====================================
   SEARCH MENU
===================================== */

function searchMenu(){

let keyword =
document
.getElementById(
"searchInput"
)
.value
.toLowerCase();

let cards =
document.querySelectorAll(
".menu-card"
);

cards.forEach(card=>{

let title =
card.querySelector("h3")
.innerText
.toLowerCase();

if(
title.includes(keyword)
){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

});

}

/* =====================================
   HALAMAN CART
===================================== */

function renderCart(){

let container =
document.getElementById(
"cartItems"
);

if(!container) return;

container.innerHTML = "";

let totalHarga = 0;

cart.forEach((item,index)=>{

let subtotal =
item.harga *
item.qty;

totalHarga += subtotal;

container.innerHTML += `

<div class="cart-item">

<div class="cart-info">

<h3>${item.nama}</h3>

<p>
Rp ${item.harga.toLocaleString()}
</p>

</div>

<div class="cart-actions">

<button
onclick="decreaseQty(${index})">
-
</button>

<span>
${item.qty}
</span>

<button
onclick="increaseQty(${index})">
+
</button>

<button
class="delete-btn"
onclick="removeItem(${index})">

Hapus

</button>

</div>

</div>

`;

});

let totalElement =
document.getElementById(
"totalHarga"
);

if(totalElement){

totalElement.innerText =
"Total : Rp " +
totalHarga.toLocaleString();

}

}

/* =====================================
   TAMBAH JUMLAH
===================================== */

function increaseQty(index){

cart[index].qty++;

saveCart();

renderCart();

}

/* =====================================
   KURANG JUMLAH
===================================== */

function decreaseQty(index){

cart[index].qty--;

if(
cart[index].qty <= 0
){

cart.splice(index,1);

}

saveCart();

renderCart();

}

/* =====================================
   HAPUS ITEM
===================================== */

function removeItem(index){

if(
confirm(
"Hapus item ini?"
)
){

cart.splice(index,1);

saveCart();

renderCart();

}

}

/* =====================================
   KOSONGKAN KERANJANG
===================================== */

function clearCart(){

if(
confirm(
"Hapus semua pesanan?"
)
){

cart = [];

saveCart();

renderCart();

}

}

/* =====================================
   CHECKOUT WHATSAPP
===================================== */

function checkoutWA(){

let nama =
document
.getElementById(
"nama"
)?.value;


let catatan =
document
.getElementById(
"catatan"
)?.value;

if(
!nama ||
nama.trim() === ""
){

alert(
"Masukkan nama terlebih dahulu"
);

return;

}

if(
cart.length === 0
){

alert(
"Keranjang masih kosong"
);

return;

}

let pesan =
"🍽 PESANAN BARU%0A%0A";

pesan +=
"👤 Nama : " +
nama +
"%0A";


let total = 0;

cart.forEach(item=>{

let subtotal =
item.harga *
item.qty;

total += subtotal;

pesan +=

"• " +

item.nama +

" x " +

item.qty +

" = Rp " +

subtotal.toLocaleString()

+

"%0A";

});

pesan +=

"%0A💰 Total : Rp " +

total.toLocaleString();

if(
catatan &&
catatan.trim() !== ""
){

pesan +=

"%0A%0A📝 Catatan:%0A" +

catatan;

}

/* NOMOR WA */

let nomorWA =
"6285789537497";

window.open(

"https://wa.me/" +

nomorWA +

"?text=" +

pesan,

"_blank"

);

}

/* =====================================
   LOAD AWAL
===================================== */

updateCartCount();

renderCart();