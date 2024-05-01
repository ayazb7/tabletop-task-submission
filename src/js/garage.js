
const garage = {
    "count": 1,
    "cars":[{'reg':'AA19 AAA'},{'reg':'AA19EEE'},{}]
};

export const Garage = {   
    cars: [],
    count: 0,
    add(value){
        if (value && value.reg && typeof value.reg === 'string') {
            const normalizedReg = value.reg.replace(/\s+/g, '').toUpperCase();
            const exists = this.cars.some(car => car.reg === normalizedReg);
            if (!exists) {
                this.cars.push({ ...value, reg: normalizedReg });
                this.count += 1;
            }
        }
    },
    delete(reg){
        if (reg && typeof reg === 'string') {
            const normalizedReg = reg.replace(/\s+/g, '').toUpperCase();
            const index = this.cars.findIndex(car => car.reg === normalizedReg);
            if (index !== -1) {
                this.cars.splice(index, 1);
                this.count -= 1;
                return true;
            }
        }
        return false; 
    },
    get(reg){
        if (reg && typeof reg === 'string') {
            const normalizedReg = reg.replace(/\s+/g, '').toUpperCase();
            return this.cars.find(car => car.reg === normalizedReg);
        }
        return null; 
    }
}