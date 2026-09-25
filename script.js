const defaultProducts = [
["Dairy Milk","Chocolates","40g",50,40,"🍫"],["KitKat","Chocolates","37g",35,30,"🍫"],["5 Star","Chocolates","40g",25,20,"🍫"],["Perk","Chocolates","22g",15,10,"🍫"],["Munch","Chocolates","32g",15,10,"🍫"],
["Lay's Classic","Chips & Snacks","50g",25,20,"🥔"],["Kurkure Masala","Chips & Snacks","55g",25,20,"🌶️"],["Bingo Mad Angles","Chips & Snacks","60g",25,20,"🔺"],["Haldiram Bhujia","Chips & Snacks","200g",40,30,"🥨"],
["Fortune Oil","Oil & Ghee","1 L",175,150,"🛢️"],["Saffola Oil","Oil & Ghee","1 L",205,180,"🛢️"],["Amul Ghee","Oil & Ghee","500 ml",330,300,"🧈"],
["Aashirvaad Atta","Grocery","5 kg",320,280,"🌾"],["Rice","Grocery","5 kg",390,350,"🍚"],["Sugar","Grocery","1 kg",55,50,"🧂"],["Tata Salt","Grocery","1 kg",30,28,"🧂"],["Toor Dal","Grocery","1 kg",160,140,"🫘"],["Besan","Grocery","1 kg",115,100,"🌾"],
["Tata Tea","Tea & Beverages","250 g",140,120,"☕"],["Red Label","Tea & Beverages","250 g",150,130,"☕"],["Bournvita","Tea & Beverages","500 g",260,230,"🥤"],["Cold Drink","Tea & Beverages","750 ml",50,45,"🥤"],
["Surf Excel","Daily Needs","1 kg",180,160,"🧺"],["Lifebuoy Soap","Daily Needs","100 g",40,35,"🧼"],["Colgate","Daily Needs","200 g",125,110,"🪥"],["Dettol","Daily Needs","250 ml",110,95,"🧴"]
];
let products=JSON.parse(localStorage.getItem("kishanProducts")||"null")||defaultProducts;
function saveProducts(){localStorage.setItem("kishanProducts",JSON.stringify(products));}

function renderProducts(){
 const q=document.getElementById("search").value.toLowerCase(),cat=document.getElementById("category").value;
 const list=products.filter(p=>(cat==="all"||p[1]===cat)&&p[0].toLowerCase().includes(q));
 document.getElementById("products").innerHTML=list.map(p=>{
   const idx=products.indexOf(p),discount=Math.round((1-p[4]/p[3])*100);
   return `<article class="card"><div class="pic">${p[5]}<span class="offer">${discount}% OFF</span></div><h3>${p[0]}</h3><div class="cat">${p[1]} • ${p[2]}</div><div class="prices"><del>₹${p[3]}</del> <strong>₹${p[4]}</strong></div><div class="actions"><button class="add" onclick="addToCart(${idx})">🛒 Add to Cart</button><button class="buy" onclick="buyNow(${idx})">Buy Now</button></div></article>`
 }).join("")||"<p>Product नहीं मिला।</p>";
}
let cart=[];
function addToCart(i){const x=cart.find(x=>x.i===i);x?x.q++:cart.push({i,q:1});updateCart();}
function buyNow(i){cart=[{i,q:1}];updateCart();openCart();}
function updateCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.q,0);
 const box=document.getElementById("cartItems");let total=0;
 box.innerHTML=cart.map(x=>{const p=products[x.i];total+=p[4]*x.q;return `<div class="cart-row"><span>${p[5]} ${p[0]} (${p[2]})<br>₹${p[4]} × ${x.q}</span><span class="qty"><button onclick="changeQty(${x.i},-1)">−</button> ${x.q} <button onclick="changeQty(${x.i},1)">+</button></span></div>`}).join("")||"<p>Cart खाली है।</p>";
 document.getElementById("total").textContent=total;
}
function changeQty(i,d){const x=cart.find(x=>x.i===i);if(!x)return;x.q+=d;if(x.q<=0)cart=cart.filter(x=>x.i!==i);updateCart();}
function openCart(){document.getElementById("cartModal").style.display="flex";updateCart();}
function closeCart(){document.getElementById("cartModal").style.display="none";}
function orderWhatsApp(){
 if(!cart.length){alert("पहले product cart में add करें.");return}
 let msg="Namaste Kishan General Store!%0A%0AMujhe ye products chahiye:%0A",total=0;
 cart.forEach(x=>{const p=products[x.i];total+=p[4]*x.q;msg+=`%0A• ${p[0]} (${p[2]}) × ${x.q} = ₹${p[4]*x.q}`});
 msg+=`%0A%0ATotal: ₹${total}%0A%0ADelivery: Kaboolpur, Jaunpur%0AFree Home Delivery`;
 window.open("https://wa.me/916393243982?text="+msg,"_blank");
}
renderProducts();updateCart();
