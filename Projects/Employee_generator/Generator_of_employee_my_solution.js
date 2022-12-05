const Crypto = require("crypto");
const fs = require("fs");


const dtoOut = [{
  gender: "male",
  birthdate: "1993-08-07T00:00:00.000Z",
  name: "Vratislav",
  surname: "Sýkora",
  workload: 40
}];

const input_data = {
  count: 20,  // amount of employees
  age: {      // age range in between the employee should be generated
    min: 20,
    max: 40
  }

};
let arr = new Array(input_data.age);
console.log(arr);


// Validation
function main(input_data) {

  if (!(typeof (input_data.count) === 'number') || input_data.count <= 0) {
    throw 'Amount of employees must be a number higher than 0';
  }

  if (!(typeof (input_data.age.min) === 'number') || !(typeof (input_data.age.max) === 'number') || input_data.age.min <= 0 || input_data.age.max <= 0) {
    throw 'Age must be a number higher than 0';
  }

  if (input_data.age.min < 18 || input_data.age.min > 75) {
    throw 'Minimal range of ages must be between 18 and 75';
  }

  if (input_data.age.max < 18 || input_data.age.max > 75) {
    throw 'Maximal range of ages must be between 18 and 75';
  }

  else {
    return generateEmployees(input_data);
  }
}

function range(last) {
  let result = [];
  for (let i = 0; i < last; i += 1) {
    result.push(i);
  }
  return result;
}

function randomInt(intNumber) {
  return Math.floor(Math.random() * (intNumber))
}

const randWorkloads = [10, 20, 30, 40];
const male_name1 = ["Juraj", "Jurij", "Georgios", "Jiřík", "Jerzy", "Georg", "Georgij", "Jorge", "Jirka", "Jegor", "Georgius", "Jiříček", "Gyorgy", "Jorgen", "Jirouš", "Domingo", "Domokos", "Radim", "Radomír", "Radoslav", "Ctirad", "Radko", "Radoš", "Wenzel", "Venda", "Viačeslav", "Vašek", "Véna", "Venca", "Vencel"];
const male_name2 = ["Tůma", "Šťastný", "Staněk", "Jaroš", "Dostál", "Štěpánek", "Polák", "Ševčík", "Slavík", "Sedlák", "Růžička", "Matoušek", "Kubíček", "Procházka"];
const female_name1 = ["Terezie", "Zina", "Terezia", "Tea", "Terezka", "Terezička", "Terka", "Terča", "Rézinka", "Rézka", "Věra", "Viktorie", "Hedvika", "Berenika", "Verona", "Nika", "Věrka", "Vera", "Lenka", "Helena", "Magdalena", "Magdaléna", "Alenka", "Ali", "Lucia", "Luca", "Jasna", "Jasněna", "Luciána", "Lucina", "Lucka", "Lucík", "Lucinka"];
const female_name2 = ["Žáková", "Vávrová", "Vaňková", "Tichá", "Veselá", "Lišková", "Kovářová", "Bártová", "Zemanová", "Valentová", "Němečková", "Moravcová", "Bednářová", "Macháčková", "Urbanová", "Žáková", "Vaňková", "Vávrová"];

// now we store into to the variable all the keys of given array, number of every key is an index of every element of the array 
// if there would be not these 3 dots, we would store just a first index of every array = all the objects wuld be same 
let maleNameIndexes = range(male_name1.length);
let maleSurNameIndexes = range(male_name2.length);
let femaleNameIndexes = range(female_name1.length);
let femaleSurNameIndexes = range(female_name2.length);

// function to get a random item from an array
function getRandomItem(arr) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);
  // get random item
  const item = arr[randomIndex];

  return item;
}

function getRandomBirthDate({ min, max }) {
  const today = new Date();
  // randomAge generate random number between min and max, e. g. 22.36
  const randomAge = Math.floor((Math.random() * (max - min) + min) * 100) / 100;
  // this makes from year (age) 22.36 a value in milisecond
  const randomMilis = randomAge * 1000 * 60 * 60 * 24 * 365;
  return [new Date(today.setTime(today.getTime() - randomMilis)), Math.floor(randomAge)];
}


function makeRandomEmployee() {
    // with getAge I get an array from getRandomBirthDate, so [ISO date, age of an employee (e.g 22.35)]
    let getAge= getRandomBirthDate(input_data.age);
    // now I pick from getAge array only second element = e.g 22.35 and with Math.floor() I round it down 
    let ageOfEmployee = getAge[1]
    // now I pick from getAge array only first element = ISO date
    let birthdate = getAge[0]

    // get random int 1-2 by Crypto.randomInt because 3 is excluded
    const gender = Crypto.randomInt(1, 3) === 1 ? "male" : "female";
    let name;
    let surname;
    // with getRandomItem I am choosing random element of the array randWorkloads
    let workload = getRandomItem(randWorkloads);

    // this code block describes what will happend if female will be chosen
    if (gender === "female") {
      // this variable define how to randomly choose one element (key) (index) from array female_name1
      let nameIndex = randomInt(femaleNameIndexes.length);

      // this will assign real name (not index/ key anymore) from the array female_name1 to the object property name
      name = female_name1[nameIndex];
      // with this we make sure, that the name will be not used more then once (delete number nameIndex from femaleNameIndexes only once)
      femaleNameIndexes.splice(nameIndex, 1);

      // same process with but with female surname 
      let surnameIndex = randomInt(femaleSurNameIndexes.length);

      surname = female_name2[surnameIndex];
      femaleSurNameIndexes.splice(surnameIndex, 1);

      // this codeblock will be executed if male will be chosen
    } else {
      // same process with but with male name 
      let nameIndex = randomInt(maleNameIndexes.length);

      name = male_name1[nameIndex];
      maleNameIndexes.splice(nameIndex, 1);

      // same process with but with male surname
      let surnameIndex = randomInt(maleSurNameIndexes.length);

      surname = male_name2[surnameIndex];
      maleSurNameIndexes.splice(surnameIndex, 1);
    }

    // now we have defined structure of the object newEmployee
    const newEmployee = {
      id: Crypto.randomBytes(4).toString("hex"),
      name,
      surname,
      gender,
      workload,
      dateOfBirth: birthdate,
      age: ageOfEmployee
    }
    return newEmployee;
}

function generateEmployees(input_data) {
  // how many employees work in the company
  let dtoIn_counter = input_data.count
  //output data
  const arr = range(dtoIn_counter);

  let result = [];
  for(let i = 0; i < arr.length; i++) {
    result.push(makeRandomEmployee());
  }
  return result;
}

const result = main(input_data);
fs.writeFileSync("./result.json", JSON.stringify(result, null, 2));
