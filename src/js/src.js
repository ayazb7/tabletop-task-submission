window.addEventListener("garage-loaded", start, false);

const axios = require('axios');
const xhr = new XMLHttpRequest();
let currentIndex = 0;
let items = document.querySelectorAll('.carousel .car-container');

async function fetchCarDetails(reg) {
    console.log(`Fetching car details for reg: ${reg}`);
    const url = 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles';
    const apiKey = 'mG1zaRgSH21lGk5mHwqgV6Y4oGkm8UpX5VNbfHoN';
    xhr.open('POST', url);
    xhr.setRequestHeader('x-api-key', apiKey);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    }

    var data = JSON.stringify({"registrationNumber": reg});
    xhr.send(data);
}

function updateCarDisplay() {
    items[currentIndex].style.transform = 'none';
    items[currentIndex].style.zIndex = 1;
    items[currentIndex].style.filter = 'none';
    items[currentIndex].style.opacity = 1;
    items[currentIndex].innerHTML = createCarCardHTML(garage.cars[currentIndex]);

    for(var i = currentIndex + 1; i < items.lengh; i ++){
        stt++;
        items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
        items[i].innerHTML = createCarCardHTML(garage.cars[index]);
    }
     stt = 0;
    for(var i = (currentIndex - 1); i >= 0; i --){
        stt++;
        items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
        items[i].innerHTML = createCarCardHTML(garage.cars[index]);
    }

    // const previousIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : garage.cars.length - 1;
    // const nextIndex = currentIndex + 1 < garage.cars.length ? currentIndex + 1 : 0;

    // const previousCar = garage.cars[previousIndex];
    // const currentCar = garage.cars[currentIndex];
    // const nextCar = garage.cars[nextIndex];

    // document.getElementById('previousCar').innerHTML = createCarCardHTML(previousCar);
    // document.getElementById('currentCar').innerHTML = createCarCardHTML(currentCar);
    // document.getElementById('nextCar').innerHTML = createCarCardHTML(nextCar);
}

function createCarCardHTML(car) {
    return `
        <img src="${car.image || "./../images/car.png"}" alt="Car Image" class="car-image">
        <div class="car-info">
            <h2 class="make">${car.make || 'Unknown Make'}</h2>
            <p class="model">${car.model || 'Unknown Model'}</p>
            <p class="year">${car.year || 'Unknown Year'}</p>
        </div>
    `;
}0

function init() {
    if (garage.cars.length > 0) {
        updateCarDisplay(); 
    }
}

document.querySelector('.circle-button.left').addEventListener('click', () => {
    currentIndex = currentIndex + 1 < items.length ?  currentIndex + 1 : currentIndex;
    updateCarDisplay();
});

document.querySelector('.circle-button.right').addEventListener('click', () => {
    currentIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
    updateCarDisplay();
});

async function start() {
    console.log(`Fetching details for ${garage.count} cars`);
    for (const car of garage.cars) {
        if (car.reg) {
            const details = await fetchCarDetails(car.reg);
            console.log(`Received car details ${details}`);
            // if (details) {
            //     garage.updateCarDetails(car.reg, details.make, details.model, details.year, details.imageUrl);
            // }
        }
    }
    console.log('Car details updated');

    init(); 
}
