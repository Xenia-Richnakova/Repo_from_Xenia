const Crypto = require("crypto");
const fs = require("fs");

// import default constants
const MaleNames = require("./maleNames.json");
const FemaleNames = require("./femaleNames.json");
const MaleSurnames = require("./maleSurnames.json");
const FemaleSurnames = require("./femaleSurnames.json");
const Workload = require("./workload.json");

// define dtoIn
const dtoIn = {
  count: 100,
  age: {
    min: 20,
    max: 40,
  },
};

// get random gender
function getRandomGender() {
  const randomNumber = Math.random();
  if (randomNumber < 0.5) return "male";
  else return "female";
}

// get random name
function getRandomName(gender) {
  if (gender === "male") {
    const randomIndex = Math.floor(Math.random() * MaleNames.length);
    return MaleNames[randomIndex];
  } else {
    const randomIndex = Math.floor(Math.random() * FemaleNames.length);
    return FemaleNames[randomIndex];
  }
}

function getRandomSurname(gender) {
  if (gender === "male") {
    const randomIndex = Math.floor(Math.random() * MaleSurnames.length);
    return MaleSurnames[randomIndex];
  } else {
    const randomIndex = Math.floor(Math.random() * FemaleSurnames.length);
    return FemaleSurnames[randomIndex];
  }
}

function getRandomWorkload() {
  const randomIndex = Math.floor(Math.random() * Workload.length);
  return Workload[randomIndex];
}

function getRandomBirthDate({ min, max }) {
  const today = new Date();
  const randomAge = Math.floor((Math.random() * (max - min) + min) * 100) / 100;
  const randomMilis = randomAge * 1000 * 60 * 60 * 24 * 365;
  return new Date(today.setTime(today.getTime() - randomMilis));
}

// define main function
function main(input) {
  let dtoOut = [];
  // validate dtoIn
  // TODO

  // generat dtoIn.count number of employees
  for (let i = 0; i < input.count; i++) {
    const gender = getRandomGender();
    dtoOut.push({
      id: Crypto.randomBytes(8).toString("hex"),
      name: getRandomName(gender),
      surname: getRandomSurname(gender),
      gender,
      dateOfBirth: getRandomBirthDate(input.age),
      workload: getRandomWorkload(),
    });
  }

  return dtoOut;
}

const result = main(dtoIn);
fs.writeFile("./result.json", JSON.stringify(result, null, 2));
