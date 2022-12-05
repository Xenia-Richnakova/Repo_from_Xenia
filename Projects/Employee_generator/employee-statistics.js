
const Employees = require("C:/Users/richnx/Desktop/JS_projects/Repo_from_Xenia/Projects/result.json");


function main() {
  
  // with this I aget min and max age
  let lowest = Number.POSITIVE_INFINITY;
  let highest = Number.NEGATIVE_INFINITY;
  for (let i=Employees.length-1; i>=0; i--) {
    // i is an index of every employee from 19 to 0
    let ages = Employees[i].age;
    if (ages < lowest) lowest = ages;
    if (ages > highest) highest = ages;
  }

  // make an average of all ages 
  let sumOfAllAges = 0
  for (let i= 0; i < Employees.length; i++) {
    // i is an index of every employee from 0 to 19
    let ages = Employees[i].age;
    sumOfAllAges += ages;
  }
  let avg = sumOfAllAges / Employees.length;
  // rounded to one decimal place
  let average = Math.round(avg * 10) / 10;

// make an array of employees ages to reuse it in median() function 
let arrayOfAges = []
for (let i= 0; i < Employees.length; i++) {
  // i is an index of every employee from 0 to 19
  let ages = Employees[i].age;
  arrayOfAges.push(ages);
  }

// explanation: sort() method executes the provided function for each value of the array from left to right, it sorts in ascending order
// explanation: (a, b) => a- b); "a" is an accumulator it is an umber we end with, "b" is the current array element 

  function median(arr) {
  const arraySorted = arr.sort();
    // if sorted array of ages is divisible by two without a remainder, then (?) take a middle element + midle element-1 divided by 2, else (:)...
  return arraySorted.length % 2 === 0 ? (arraySorted[arraySorted.length/2 - 1] + arraySorted[arraySorted.length/2]) /2 : arraySorted[Math.floor(arraySorted.length/2)];
  }

  // pick just female employees
    /* .filter an employee (I could name it how I want, it is just an item of the group of objects), from employees I want to pick
     only a property with value "female " */
  const justFemaleEmployees = Employees.filter(empolyee => empolyee.gender.includes("female"));

// make an average of all Female workloads
let sumOfAllFemaleWorkloads = 0
for (let i= 0; i < justFemaleEmployees.length; i++) {
  // i is an index of every employee from 0 to amount of all female employees (-1)
  let workloads = justFemaleEmployees[i].workload;
  sumOfAllFemaleWorkloads += workloads;
}
let averageOfFemaleWorkloads = sumOfAllFemaleWorkloads / justFemaleEmployees.length;

// make an array of all employees Workloads
let arrayOfAllEmployeesWorkloads = []
for (let i= 0; i < Employees.length; i++) {
  // i is an index of every employee from 0 to 19
  let workloads = Employees[i].workload;
  arrayOfAllEmployeesWorkloads.push(workloads);
  }

// sorted objects based on workloads ascending, "a" is current, "b" is next 
  const sortedByWorkloadAsc = Employees.sort(function(a, b) {
    return (a.workload) - (b.workload);
});
  

  const dtoOut = {
    maleCount: 0,
    femaleCount: 0,
    workload10: 0,
    workload20: 0,
    workload30: 0,
    workload40: 0,
    minimalAge: lowest,
    maximalAge: highest,
    averageAge: average,
    medianAge: median(arrayOfAges),
    medianWorkload: median(arrayOfAllEmployeesWorkloads),
    averageWomenWorkload: averageOfFemaleWorkloads,
    sortedByWorkload: sortedByWorkloadAsc
    
  };
  
  /* for each employee (item) from list of objects Employees applies, if property gender will have a value "male" then ("?") add +1 to 
   already defined maleCount property, else (":") add +1 to femaleCount */
  Employees.forEach((employee) => {
    employee.gender === "male" ? dtoOut.maleCount += 1 : dtoOut.femaleCount++;
  });

  // i = 0 means, i starts at employee 0, then +1;+1;+1 and so on until employee 19 (cause we´ve generate 20 employees)
 
  for(let i = 0; i < Employees.length; i++) {
    let employee = Employees[i];
    if(employee.workload === 10) {
      dtoOut.workload10 ++;
    } 
    if(employee.workload === 20) {
      dtoOut.workload20 ++;
    } 
    if(employee.workload === 30) {
      dtoOut.workload30 ++;
    } 
    if(employee.workload === 40) {
      dtoOut.workload40 ++;
    }
  };


  // "?" is then; ":" is else 

  return dtoOut;
}

console.log(main());
