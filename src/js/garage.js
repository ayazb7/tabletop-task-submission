export class Car {
    constructor(registrationNumber, make = null, model = null, image = null, year = null) {
        this.reg = registrationNumber.replace(/\s+/g, '').toUpperCase();
        this.make = make;
        this.model = model;
        this.image = image;
        this.year = year;
    }

    log() {
        console.log(`Car Details - Reg: ${this.reg}, Make: ${this.make}, Model: ${this.model}, Year: ${this.year}, Image: ${this.image}`);
    }

    setMake(make) {
        this.make = make;
    }

    setModel(model) {
        this.model = model;
    }

    setImage(image) {
        this.image = image;
    }

    setYear(year) {
        this.year = year;
    }
}


const garage = {
    "count": 0,
    "cars":[]
};

export const Garage = {   
    cars: [],
    count: 0,
    add(value){
        if (value && value.reg && typeof value.reg === 'string') {
            const exists = this.cars.some(car => car.reg === value.reg);
            if (!exists) {
                const newCar = new Car(value.reg, value.make, value.model, value.image, value.year);
                console.log('Adding new car');
                newCar.log();
                this.cars.push(newCar);
                this.count += 1;
            }
        }
    },
    delete(registrationNumber) {
        if (registrationNumber && typeof registrationNumber === 'string') {
            const normalizedReg = registrationNumber.replace(/\s+/g, '').toUpperCase();
            const index = this.cars.findIndex(car => car.reg === normalizedReg);
            if (index !== -1) {
                this.cars.splice(index, 1);
                this.count -= 1;
                return true;
            }
        }
        return false;
    },
    get(registrationNumber) {
        const normalizedReg = registrationNumber.replace(/\s+/g, '').toUpperCase();
        return this.cars.find(car => car.reg === normalizedReg);
    },
    updateCarDetails(registrationNumber, make, model, year, image) {
        const car = this.get(registrationNumber);
        if (car) {
            car.setMake(make);
            car.setModel(model);
            car.setImage(image);
            car.setYear(year);
        }
    }
}