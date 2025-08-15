let mares = JSON.parse(localStorage.getItem('mares') || '[]');
let contracts = JSON.parse(localStorage.getItem('contracts') || '[]');
let stallions = JSON.parse(localStorage.getItem('stallions') || '[]');
let semenOrders = JSON.parse(localStorage.getItem('semenOrders') || '[]');

let role = null;

function saveData() {
  localStorage.setItem('mares', JSON.stringify(mares));
  localStorage.setItem('contracts', JSON.stringify(contracts));
  localStorage.setItem('stallions', JSON.stringify(stallions));
  localStorage.setItem('semenOrders', JSON.stringify(semenOrders));
}

function login() {
  role = document.getElementById('roleSelect').value;
  document.getElementById('loginSection').classList.add('hidden');
  if(role === 'owner') document.getElementById('ownerDashboard').classList.remove('hidden');
  if(role === 'vet') document.getElementById('vetDashboard').classList.remove('hidden');
  if(role === 'stallionOwner') document.getElementById('stallionDashboard').classList.remove('hidden');
  renderAll();
}

function registerMare() {
  const mare = {
    owner: document.getElementById('mareOwner').value,
    name: document.getElementById('mareName').value,
    age: document.getElementById('mareAge').value,
    breed: document.getElementById('mareBreed').value,
    lastHeat: document.getElementById('mareLastHeat').value,
    history: document.getElementById('mareHistory').value
  };
  mares.push(mare);
  saveData();
  renderOwnerMares();
}

function renderOwnerMares() {
  let container = document.getElementById('mareList');
  container.innerHTML = '';
  mares.forEach((m, idx) => {
    let div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<b>${m.name}</b> (${m.breed}, ${m.age} سال) - مالک: ${m.owner}
      <br><button class="action" onclick="requestContract(${idx})">درخواست قرارداد با دامپزشک</button>`;
    container.appendChild(div);
  });
}

function requestContract(mIdx) {
  contracts.push({mareIndex: mIdx, vetNotes: [], status: 'در انتظار تایید', paymentStatus: 'پیش پرداخت نشده'});
  saveData();
  alert('درخواست قرارداد ارسال شد');
  renderVetList();
}

function renderVetList() {
  let container = document.getElementById('vetMareList');
  container.innerHTML = '';
  contracts.forEach((c, idx) => {
    const mare = mares[c.mareIndex];
    let div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <b>مادیان: ${mare.name}</b> - مالک: ${mare.owner}
      <br>وضعیت: ${c.status} | پرداخت: ${c.paymentStatus}
      <textarea id="obs${idx}" placeholder="ثبت مشاهدات"></textarea>
      <button class="action" onclick="addObservation(${idx})">افزودن مشاهده</button>
      <button class="action" onclick="acceptContract(${idx})">تایید قرارداد</button>
      <button class="action" onclick="takePrepayment(${idx})">دریافت پیش پرداخت</button>
      <button class="action" onclick="finalPayment(${idx})">تسویه</button>`;
    container.appendChild(div);
  });
}

function addObservation(idx) {
  let note = document.getElementById('obs'+idx).value;
  contracts[idx].vetNotes.push({date: new Date().toLocaleDateString(), note});
  saveData();
  alert('مشاهده ثبت شد');
}

function acceptContract(idx) {
  contracts[idx].status = 'فعال';
  saveData();
  renderVetList();
}

function takePrepayment(idx) {
  contracts[idx].paymentStatus = 'پیش پرداخت دریافت شد';
  saveData();
  renderVetList();
}

function finalPayment(idx) {
  contracts[idx].paymentStatus = 'تسویه کامل';
  saveData();
  renderVetList();
}

function addStallion() {
  let name = document.getElementById('stallionName').value;
  stallions.push(name);
  saveData();
  renderStallions();
}

function renderStallions() {
  let cont = document.getElementById('stallionList');
  cont.innerHTML = '';
  stallions.forEach(st => {
    let div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `سیلمی: ${st}`;
    cont.appendChild(div);
  });
}

function renderSemenOrders() {
  let cont = document.getElementById('semenOrders');
  cont.innerHTML = '';
  semenOrders.forEach(order => {
    let div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `ارسال اسپرم از ${order.stallion} در تاریخ ${order.date}`;
    cont.appendChild(div);
  });
}

function renderAll() {
  renderOwnerMares();
  renderVetList();
  renderStallions();
  renderSemenOrders();
}
