const dtoOut = [{
    gender: "male",
    birthdate: "1993-08-07T00:00:00.000Z",
    name: "Vratislav",
    surname: "Sýkora",
    workload: 40
  }]
  
  const input_data = {
    count: 20,  // amount of employees
    age: {      // age range in between the employee should be generated
      min: 19, 
      max: 35
    }
  }
  
  
  const randWorkloads = [10, 20, 30, 40];
  const male_name1 = ["Juraj","Jurij","Georgios","Jiřík","Jerzy","Georg","Georgij","Jorge","Jirka","Jegor","Georgius","Jiříček","Gyorgy","Jorgen","Jirouš","Domingo","Domokos","Radim","Radomír","Radoslav","Ctirad","Radko","Radoš","Wenzel","Venda","Viačeslav","Vašek","Véna","Venca","Vencel"];
  const male_name2 = ["Tůma","Šťastný","Staněk","Jaroš","Dostál","Štěpánek","Polák","Ševčík","Slavík","Sedlák","Růžička","Matoušek","Kubíček","Procházka"];
  const female_name1 = ["Terezie","Zina","Terezia","Tea","Terezka","Terezička","Terka","Terča","Rézinka","Rézka", "Věra","Viktorie","Hedvika","Berenika","Verona","Nika","Věrka","Vera","Lenka","Helena","Magdalena","Magdaléna","Alenka","Ali","Lucia","Luca","Jasna","Jasněna","Luciána","Lucina","Lucka","Lucík","Lucinka"];
  const female_name2 = ["Žáková","Vávrová","Vaňková","Tichá","Veselá","Lišková","Kovářová","Bártová","Zemanová","Valentová","Němečková","Moravcová","Bednářová","Macháčková","Urbanová","Žáková","Vaňková","Vávrová"];

    // now we store into to the variable all the keys of given array, number of every key is an index of every element of the array 
  let maleNameIndexes = [...Array(male_name1.length).keys()];
  let maleSurNameIndexes = [...Array(male_name2.length).keys()];
  let femaleNameIndexes = [...Array(female_name1.length).keys()];
  let femaleSurNameIndexes = [...Array(female_name2.length).keys()];
  
  // function to get a random item from an array
function getRandomItem(arr) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);
  // get random item
  const item = arr[randomIndex];

  return item;
}


  // this will randomly choose an value in between the range we already defined ininput_data
  function getRandomArbitrary(min, max) {
    return parseInt(Math.floor(Math.random() * (max - min) + min));
  }
  
  function main(input_data) {
    // how many employees work in the company
    let dtoIn_counter = input_data.count

    // minimal age of employees
    let dtoIn_min = input_data.age.min
    // maximal age of employees
    let dtoIn_max = input_data.age.max
    //output data
    const arr = [...Array(dtoIn_counter).keys()]

    // reduce specified callback function to all the element in the array
    const result = arr.reduce((acc) => {
        // in the value gender we have function which randomly choose gender based on getRandomArbitrary
      const gender = getRandomArbitrary(1, 3) === 1 ? "male" : "female";
      let name;
      let surname;
        // with getRandomItem I am choosing random element of the array randWorkloads
      let workload = getRandomItem(randWorkloads);
        // this will randomly choose an age in between the range we already defined in input_data
      const age = parseInt(getRandomArbitrary(dtoIn_min, dtoIn_max + 1))

        // this code block describes what will happend if female will be chosen
      if (gender === "female") {
          // this variable define how to randomly choose one element (key) (index) from array female_name1
        let nameIndex = Math.floor(Math.random() * (femaleNameIndexes.length));
          
          // this will assign real name (not index/ key anymore) from the array female_name1 to the object property name
        name = female_name1[nameIndex];
          // with this we make sure, that the name will be not used more then once (delete number nameIndex from femaleNameIndexes only once)
        femaleNameIndexes.splice(nameIndex, 1);

        // same process with but with female surname 
        let surnameIndex = Math.floor(Math.random() * (femaleSurNameIndexes.length));
      
        surname = female_name2[surnameIndex];
        femaleSurNameIndexes.splice(surnameIndex, 1);
  
        // this codeblock will be executed if male will be chosen
      } else {
        // same process with but with male name 
        let nameIndex = Math.floor(Math.random() * (maleNameIndexes.length));
        
        name = male_name1[nameIndex];
        maleNameIndexes.splice(nameIndex, 1);

        // same process with but with male surname
        let surnameIndex = Math.floor(Math.random() * (maleSurNameIndexes.length));
        
        surname = male_name2[surnameIndex];
        maleSurNameIndexes.splice(surnameIndex, 1);
      }

      // now we have defined structure of the object newEmployee
      const newEmployee = {
        name,
        surname,
        gender,
        workload,
        age
      }
      return [...acc, newEmployee]
    }, [])
    return result
  

  }
  
  console.log(main(input_data))

 /* const today = new Date("25 November 2022 14:48 UTC");
  console.log(today.toISOString());
*/


