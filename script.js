let currentRole = null;

document.getElementById('login-btn').addEventListener('click', () => {
    currentRole = document.getElementById('role-select').value;
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('dashboard-title').innerText =
        currentRole === 'mare' ? 'داشبورد مالک مادیان' :
        currentRole === 'vet' ? 'داشبورد دامپزشک' : 'داشبورد مالک سیلمی';
    renderDashboard();
    if (currentRole === 'mare') loadStallionList();
});

document.getElementById('logout-btn').addEventListener('click', () => {
    location.reload();
});

function loadData() {
    return JSON.parse(localStorage.getItem('equineData') || '[]');
}

function saveData(data) {
    localStorage.setItem('equineData', JSON.stringify(data));
}

function loadStallionList() {
    // ساخت لیست نمونه سیلمی‌ها
    let select = document.getElementById('stallion-choice');
    select.innerHTML = '<option value="">انتخاب سیلمی</option>';
    ['سیلمی الف','سیلمی ب','سیلمی ج'].forEach(name => {
        let opt = document.createElement('option');
        opt.value = name;
        opt.innerText = name;
        select.appendChild(opt);
    });
}

// مالک مادیان: ارسال درخواست
document.getElementById('request-insemination').addEventListener('click', () => {
    let mareName = document.getElementById('mare-name').value.trim();
    let stallionName = document.getElementById('stallion-choice').value;
    if (!mareName || !stallionName) {
        alert('لطفاً تمام فیلدها را پر کنید.');
        return;
    }
    let data = loadData();
    data.push({
        mareName,
        stallionName,
        status: 'در انتظار بررسی دامپزشک'
    });
    saveData(data);
    renderDashboard();
    document.getElementById('mare-name').value = '';
    document.getElementById('stallion-choice').value = '';
});

// رندر داشبورد هر نقش
function renderDashboard() {
    let data = loadData();
    document.querySelectorAll('.dashboard').forEach(sec => sec.style.display = 'none');

    if (currentRole === 'mare') {
        document.getElementById('mare-dashboard').style.display = 'block';
        let list = document.getElementById('mare-requests');
        list.innerHTML = '';
        data.forEach((req, index) => {
            let li = document.createElement('li');
            li.innerText = `${req.mareName} - ${req.stallionName} | وضعیت: ${req.status}`;
            list.appendChild(li);
        });
    } else if (currentRole === 'vet') {
        document.getElementById('vet-dashboard').style.display = 'block';
        let list = document.getElementById('vet-requests');
        list.innerHTML = '';
        data.forEach((req, index) => {
            let li = document.createElement('li');
            li.innerHTML = `${req.mareName} - ${req.stallionName} | وضعیت: ${req.status} 
            ${req.status === 'در انتظار بررسی دامپزشک' ? `<button onclick="vetApprove(${index})">تأیید و ارسال به مالک سیلمی</button>` : ''}`;
            list.appendChild(li);
        });
    } else if (currentRole === 'stallion') {
        document.getElementById('stallion-dashboard').style.display = 'block';
        let list = document.getElementById('stallion-requests');
        list.innerHTML = '';
        data.forEach((req, index) => {
            let = document.createElement('li');
            li.innerHTML = `${req.mareName} - ${req.stallionName} | وضعیت: ${req.status} 
            ${req.status === 'در انتظار ارسال اسپرم' ? `<button onclick="sendSperm(${index})">تأیید ارسال اسپرم</button>` : ''}`;
            list.appendChild(li);
        });
    }
}

function vetApprove(index) {
    let data = loadData();
    data[index].status = 'در انتظار ارسال اسپرم';
    saveData(data);
    renderDashboard();
}

function sendSperm(index) {
    let data = loadData();
    data[index].status = 'اسپرم ارسال شد - در انتظار تلقیح';
    saveData(data);
    renderDashboard();
}
