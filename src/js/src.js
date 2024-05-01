window.addEventListener("garage-loaded", start, false);

async function fetchCarDetails(reg) {
    try {
        const proxyUrl = 'http://localhost:8080/';
        const targetUrl = 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles';
        const response = await fetch('http://0.0.0.0:8080/'+ targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'mG1zaRgSH21lGk5mHwqgV6Y4oGkm8UpX5VNbfHoN',
                'origin': 'http://localhost:8080',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ registrationNumber: reg })
        });
        if (!response.ok) {
            throw new Error('Error in response for car details: ', reg);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error('Error fetching car details: ', reg, e);
        return null;
    }
}

async function start() {
    console.log(`Fetching details for ${garage.count} cars`);
    for (const car of garage.cars) {
        if (car.reg) {
            const details = await fetchCarDetails(car.reg);
            console.log(`Received car details ${details}`);
            // if (details) {
            //     Garage.updateCarDetails(car.reg, details.make, details.model, details.year, details.imageUrl);
            // }
        }
    }
    console.log('Car details updated');
}
