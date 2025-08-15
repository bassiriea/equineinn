let lang = 'fa';
document.getElementById('langSwitch').addEventListener('click', () => {
    lang = (lang === 'fa') ? 'en' : 'fa';
    document.body.style.direction = (lang === 'fa') ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-fa]').forEach(el => {
        el.innerText = (lang === 'fa') ? el.dataset.fa : el.dataset.en;
    });
    document.getElementById('langSwitch').innerText = (lang === 'fa') ? 'English' : 'فارسی';
});

// Horse form
const horseForm = document.getElementById('horseForm');
const horseList = document.getElementById('horseList');
horseForm.addEventListener('submit', e => {
    e.preventDefault();
    let horse = {
        name: horseForm.name.value,
        age: horseForm.age.value,
        breed: horseForm.breed.value
    };
    let horses = JSON.parse(localStorage.getItem('horses') || '[]');
    horses.push(horse);
    localStorage.setItem('horses', JSON.stringify(horses));
    renderHorses();
    horseForm.reset();
});
function renderHorses() {
    horseList.innerHTML = '';
    let horses = JSON.parse(localStorage.getItem('horses') || '[]');
    horses.forEach(h => {
        let li = document.createElement('li');
        li.textContent = `${h.name} - ${h.age} - ${h.breed}`;
        horseList.appendChild(li);
    });
}
renderHorses();

// Event form
const eventForm = document.getElementById('eventForm');
const eventList = document.getElementById('eventList');
eventForm.addEventListener('submit', e => {
    e.preventDefault();
    let ev = {
        type: eventForm.event.value,
        date: eventForm.date.value
    };
    let events = JSON.parse(localStorage.getItem('events') || '[]');
    events.push(ev);
    localStorage.setItem('events', JSON.stringify(events));
    renderEvents();
    eventForm.reset();
});
function renderEvents() {
    eventList.innerHTML = '';
    let events = JSON.parse(localStorage.getItem('events') || '[]');
    events.forEach(ev => {
        let li = document.createElement('li');
        li.textContent = `${ev.type} - ${ev.date}`;
        eventList.appendChild(li);
    });
}
renderEvents();

// Chart.js
new Chart(document.getElementById('statsChart'), {
    type: 'bar',
    data: {
        labels: ['اسب ۱', 'اسب ۲', 'اسب ۳'],
        datasets: [{
            label: 'رویدادها',
            data: [3, 5, 2],
            backgroundColor: 'rgba(75, 0, 130, 0.6)'
        }]
    },
    options: { responsive: true }
});
