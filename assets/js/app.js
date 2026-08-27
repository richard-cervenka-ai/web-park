const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const money = value => `${value.toLocaleString('cs-CZ')} Kč`;

const products = [
  {id:'mug',name:'Park Bistro hrnek',price:329,icon:'☕',desc:'Keramický hrnek s minimalistickým logem.'},
  {id:'thermo',name:'Termohrnek To Go',price:449,icon:'🥤',desc:'Nerezový termohrnek na ranní procházku.'},
  {id:'tote',name:'Plátěná taška',price:299,icon:'👜',desc:'Pevná bavlněná taška na nákup i piknik.'},
  {id:'cap',name:'Kšiltovka Park',price:399,icon:'🧢',desc:'Lehká šestipanelová kšiltovka s výšivkou.'},
  {id:'tee',name:'Tričko Park Club',price:599,icon:'👕',desc:'Měkké bavlněné tričko v unisex střihu.'},
  {id:'poster',name:'Plakát Park Bistro',price:249,icon:'🖼️',desc:'Limitovaný ilustrátorský plakát A3.'},
  {id:'beans',name:'Zrnková káva 250 g',price:279,icon:'🫘',desc:'House blend pro filtr i espresso.'},
  {id:'notebook',name:'Notes Park',price:199,icon:'📓',desc:'Linkovaný zápisník pro nápady z parku.'},
  {id:'pin',name:'Smaltovaný odznak',price:129,icon:'📍',desc:'Malý smaltovaný odznak Park Bistro.'},
  {id:'blanket',name:'Pikniková deka',price:799,icon:'🧺',desc:'Sbalitelná deka pro dlouhá odpoledne v trávě.'}
];

let cart = JSON.parse(localStorage.getItem('park-bistro-cart') || '[]');
const saveCart = () => localStorage.setItem('park-bistro-cart', JSON.stringify(cart));
const cartQty = () => cart.reduce((sum, item) => sum + item.qty, 0);
const cartTotal = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);

function showToast(message){
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function renderProducts(){
  $('#products-grid').innerHTML = products.map(p => `
    <article class="product-card">
      <div class="product-art" aria-hidden="true">${p.icon}</div>
      <h3>${p.name}</h3><p>${p.desc}</p>
      <div class="product-row"><span class="product-price">${money(p.price)}</span><button class="add-product" type="button" data-add="${p.id}">Přidat</button></div>
    </article>`).join('');
}

function renderCart(){
  $('#cart-count').textContent = cartQty();
  $('#cart-total').textContent = money(cartTotal());
  $('#checkout-total').textContent = money(cartTotal());
  const host = $('#cart-items');
  if(!cart.length){ host.innerHTML = '<div class="cart-empty"><div style="font-size:42px">🛍️</div><p>Košík je zatím prázdný.</p><a class="text-link" href="#shop" id="browse-shop">Prohlédnout obchod →</a></div>'; return; }
  host.innerHTML = cart.map(item => `
    <div class="cart-line">
      <div class="cart-thumb">${item.icon}</div>
      <div><h3>${item.name}</h3><p>${money(item.price)} / ks</p><div class="qty"><button type="button" data-dec="${item.id}" aria-label="Odebrat kus">−</button><span>${item.qty}</span><button type="button" data-inc="${item.id}" aria-label="Přidat kus">+</button></div></div>
      <strong>${money(item.price * item.qty)}</strong>
    </div>`).join('');
}

function openCart(){ $('#cart-drawer').classList.add('open'); $('#cart-drawer').setAttribute('aria-hidden','false'); $('#drawer-backdrop').hidden=false; document.body.classList.add('no-scroll'); }
function closeCart(){ $('#cart-drawer').classList.remove('open'); $('#cart-drawer').setAttribute('aria-hidden','true'); $('#drawer-backdrop').hidden=true; document.body.classList.remove('no-scroll'); }
function openModal(id){ $(id).hidden=false; document.body.classList.add('no-scroll'); }
function closeModal(id){ $(id).hidden=true; document.body.classList.remove('no-scroll'); }

function addToCart(id){
  const product = products.find(p=>p.id===id); if(!product) return;
  const existing = cart.find(item=>item.id===id);
  if(existing) existing.qty += 1; else cart.push({...product,qty:1});
  saveCart(); renderCart(); showToast(`${product.name} přidán do košíku`);
}
function changeQty(id,delta){
  const item = cart.find(p=>p.id===id); if(!item) return;
  item.qty += delta; if(item.qty<=0) cart = cart.filter(p=>p.id!==id);
  saveCart(); renderCart();
}

// Mobile navigation
const menuToggle = $('.menu-toggle'); const navLinks = $('.nav-links');
menuToggle?.addEventListener('click',()=>{const open=navLinks.classList.toggle('is-open'); menuToggle.setAttribute('aria-expanded',String(open));});
$$('.nav-links a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('is-open');menuToggle?.setAttribute('aria-expanded','false');}));

// Menu filters
$$('.filter').forEach(button=>button.addEventListener('click',()=>{$$('.filter').forEach(b=>b.classList.remove('active'));button.classList.add('active');const filter=button.dataset.filter;$$('.menu-item').forEach(item=>{item.hidden=filter!=='all'&&item.dataset.category!==filter;});}));

// Shop
renderProducts(); renderCart();
$('#products-grid').addEventListener('click',e=>{const id=e.target.closest('[data-add]')?.dataset.add;if(id)addToCart(id);});
$('#cart-items').addEventListener('click',e=>{const inc=e.target.closest('[data-inc]')?.dataset.inc;const dec=e.target.closest('[data-dec]')?.dataset.dec;if(inc)changeQty(inc,1);if(dec)changeQty(dec,-1);if(e.target.id==='browse-shop')closeCart();});
$('#cart-button').addEventListener('click',openCart); $('#close-cart').addEventListener('click',closeCart); $('#drawer-backdrop').addEventListener('click',closeCart);
$('#clear-cart').addEventListener('click',()=>{cart=[];saveCart();renderCart();showToast('Košík byl vyprázdněn');});
$('#checkout-button').addEventListener('click',()=>{if(!cart.length){showToast('Nejdřív přidej něco do košíku');return;}closeCart();openModal('#checkout-modal');});
$$('.close-modal').forEach(b=>b.addEventListener('click',()=>closeModal('#checkout-modal')));

// Checkout prototype
$('#checkout-form').addEventListener('submit',e=>{
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const order = {id:`PB-${Date.now().toString().slice(-6)}`,name:data.get('name'),email:data.get('email'),phone:data.get('phone'),items:cart,total:cartTotal(),createdAt:new Date().toISOString()};
  const orders = JSON.parse(localStorage.getItem('park-bistro-orders') || '[]'); orders.push(order); localStorage.setItem('park-bistro-orders',JSON.stringify(orders));
  cart=[];saveCart();renderCart();e.currentTarget.reset();closeModal('#checkout-modal');
  $('#success-title').textContent='Objednávka přijata';$('#success-text').textContent=`Číslo objednávky ${order.id}. Potvrzení jsme připravili pro ${order.email}. Celkem ${money(order.total)}.`;openModal('#success-modal');
});

// Reservation system
const reservationDate = $('#reservation-date');
const today = new Date(); const isoToday = new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10); reservationDate.min=isoToday; reservationDate.value=isoToday;
$('#reservation-form').addEventListener('submit',e=>{
  e.preventDefault();
  const data = new FormData(e.currentTarget); const date = data.get('date'); const time=data.get('time');
  const key = `${date} ${time}`; const reservations=JSON.parse(localStorage.getItem('park-bistro-reservations')||'[]');
  if(reservations.some(r=>r.slot===key)){showToast('Tento čas je v prototypu již rezervovaný. Vyber jiný.');return;}
  const reservation={id:`R-${Date.now().toString().slice(-6)}`,slot:key,name:data.get('name'),email:data.get('email'),guests:data.get('guests'),note:data.get('note'),createdAt:new Date().toISOString()};
  reservations.push(reservation);localStorage.setItem('park-bistro-reservations',JSON.stringify(reservations));
  e.currentTarget.reset();reservationDate.value=isoToday;
  $('#success-title').textContent='Rezervace potvrzena';$('#success-text').textContent=`Rezervace ${reservation.id}: ${reservation.guests}, ${date} v ${time}. Potvrzení jsme připravili pro ${reservation.email}.`;
  openModal('#success-modal');
});

$('.close-success').addEventListener('click',()=>closeModal('#success-modal'));
$$('.modal').forEach(modal=>modal.addEventListener('click',e=>{if(e.target===modal)closeModal(`#${modal.id}`);}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeCart();closeModal('#checkout-modal');closeModal('#success-modal');}});

// Dynamic opening status: illustrative hours for the demo venue.
function updateOpenStatus(){
  const now=new Date(); const day=now.getDay(); const hour=now.getHours()+now.getMinutes()/60; const weekend=day===0||day===6; const openHour=weekend?9:8; const closeHour=weekend?21:20; const isOpen=hour>=openHour&&hour<closeHour; const el=$('#open-status'); el.textContent=isOpen?`● Otevřeno · dnes do ${closeHour}:00`:`● Zavřeno · otevíráme v ${openHour}:00`; el.classList.toggle('closed',!isOpen);
}
updateOpenStatus();
