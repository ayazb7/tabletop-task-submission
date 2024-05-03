window.addEventListener("garage-loaded", start, false);

const axios = require('axios');
let currentIndex = 0;
let items = document.querySelectorAll('.carousel .car-container');

async function fetchCarDetails(reg) {
    console.log(`Fetching car details for reg: ${reg}`);
    const url = 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles';
    const apiKey = 'mG1zaRgSH21lGk5mHwqgV6Y4oGkm8UpX5VNbfHoN';
    const headers = {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(url, {"registrationNumber": reg}, {headers});
        console.log(`Status for vehicle: ${reg}, ${response.status}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching details for ${reg}: ${error}`);
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
        } else if (error.request) {
            console.error(error.request);
        } else {
            console.error('Error', error.message);
        }
        return null;
    }
}

function updateCarDisplay() {
    items = document.querySelectorAll('.carousel .car-container');
    console.log(`Current index: ${currentIndex}`);
    items[currentIndex].innerHTML = createInnerCarCardHTML(garage.cars[currentIndex]);
    items[currentIndex].style.transform = 'none';
    items[currentIndex].style.zIndex = 1;
    items[currentIndex].style.filter = 'none';
    items[currentIndex].style.opacity = 1;

    let counter = 0;
    for (var i = currentIndex - 1; i >= 0; i--) {
        counter++;
        items[i].innerHTML = createInnerCarCardHTML(garage.cars[i]);
        items[i].style.transform = `translateX(${-100*counter}px) scale(${1 - 0.2 * counter}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -counter;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = counter > 2 ? 0 : 0.6;
    }

    counter = 0;
    for (var i = currentIndex + 1; i < garage.count; i++) {
        counter++;
        items[i].innerHTML = createInnerCarCardHTML(garage.cars[i]);
        items[i].style.transform = `translateX(${100*counter}px) scale(${1 - 0.2 * counter}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -counter;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = counter > 2 ? 0 : 0.6;
    }
}

function createCarCardHTML(car, index) {
    car.log();
    return `
        <div class="car-container" id="Car-${index}">
            <img src="${car.image || 'images/car.png'}" alt="Car Image" class="car-image">
            <div class="car-info">
                <h2 class="make">${car.make || 'Unknown Make'}</h2>
                <p class="model">${car.model || 'Unknown Model'}</p>
                <p class="year">${car.year || 'Unknown Year'}</p>
            </div>
        </div>
    `;
}

function createInnerCarCardHTML(car, index) {
    car.log();
    return `
        <img src="${car.image || 'images/car.png'}" alt="Car Image" class="car-image">
        <div class="car-info">
            <h2 class="make">${car.make || 'Unknown Make'}</h2>
            <p class="model">${car.model || 'Unknown Model'}</p>
            <p class="year">${car.year || 'Unknown Year'}</p>
        </div>
    `;
}

function init() {
    if (garage.cars.length > 0) {
        updateCarDisplay(); 
    }
}

function initCarousel() {
    const carousel = document.querySelector('.carousel');
    carousel.innerHTML = '';

    if (garage.cars.length > 0) {
        garage.cars.forEach((car, index) => {
            carousel.innerHTML += createCarCardHTML(car, index);
        });
    }

    updateCarDisplay();
}

document.querySelector('.circle-button.left').addEventListener('click', () => {
    if (currentIndex - 1 >= 0) {
        currentIndex--;
        updateCarDisplay();
    }
});

document.querySelector('.circle-button.right').addEventListener('click', () => {
    if (currentIndex + 1 < garage.count) {
        currentIndex++;
        updateCarDisplay();
    }
});

document.querySelector('.add-vehicle-button').addEventListener('click', function() {
    document.getElementById('addVehicleModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
});

document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('addVehicleModal').style.display = 'none';
    document.body.style.overflow = 'auto'; 
});

document.getElementById('submitVehicle').addEventListener('click', async function() {
    var regNumber = document.getElementById('regNumber').value;
    if (regNumber) {
        const details = await fetchCarDetails(regNumber);
        if (details) {
            garage.add({ "reg": regNumber, "make": details.make, "model": details.model, "image": details.image, "year": details.yearOfManufacture})
            currentIndex = garage.count - 1;
            initCarousel();
            document.getElementById('addVehicleModal').style.display = 'none';
            document.body.style.overflow = 'auto'; 
        }
    } else {
        console.error('Registration number is required');
    }
});

window.onclick = function(event) {
    let modal = document.getElementById('addVehicleModal');
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

async function start() {
    console.log(`Fetching details for ${garage.count} cars`);
    for (const car of garage.cars) {
        if (car.reg) {
            const details = await fetchCarDetails(car.reg);
            console.log(`Received car details ${details}`);
            if (details) {
                garage.updateCarDetails(car.reg, details.make, details.model, details.yearOfManufacture, details.image);
            }
        }
    }
    console.log('Car details updated');

    initCarousel(); 
}
