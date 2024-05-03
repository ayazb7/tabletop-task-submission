import "./../css/style.css";
import "./src.js";

const garageLoadedEvent = new Event("garage-loaded");

function init() {
  // garage.delete("DR13NGH");
  const cars = [
    { "reg": "AA19AAA", "model": "Audi", "make": "Q4 e-tron", "image": "./../images/car.png", "year": 2019},
    { "reg": "ER19BAD", "model": "Tesla", "make": "Model S", "image": "./../images/car.png", "year": 2020},
    { "reg": "L2WPS", "model": "BMW", "make": "iX", "image": "./../images/car.png", "year": 2018},
    { "reg": "AA19 SRN", "model": "Nissan", "make": "Micra", "image": "./../images/car.png", "year": 2008},
  ];
  cars.forEach((car) => {garage.add(car);});
  // const cars = [
  //   { "reg": "AA19AAA" },
  //   {},
  //   { "reg": "ER19BAD" },
  //   { "reg": "ER19 NFD" },
  //   { "reg": "L2WPS" },
  //   { "reg": "AA19 SRN" },
  //   { "rag": "AA19 SRN" }
  // ];
  // cars.forEach((car) => {garage.add(car);});
  // const del_res = garage.delete("AA19EEE");
  // console.log("T1: ", del_res);
  // console.log("T2: ", garage.get("DR13NGH"));
  // console.log("T3: ", garage.get("AA19SRN")["reg"] == "AA19SRN");
  window.dispatchEvent(garageLoadedEvent);
  console.log(`Garage Loaded with ${garage.cars.length} cars`);
}

window.addEventListener("load", init);
