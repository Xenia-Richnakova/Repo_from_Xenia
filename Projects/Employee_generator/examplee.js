
const Employees = require("C:/Users/richnx/Desktop/JS_projects/Repo_from_Xenia/Projects/result.json");

// make an array of employees ages to reuse it in medianAge() function 
let arrayOfAges = []
Employees.forEach((EmployeeAge) => {
    arrayOfAges.push(EmployeeAge);
 });


// make an array of all female workloads 
/* let FemaleEmployees = []
for (let i= 0; i < Employees.length; i++) {
  // i is an index of every employee from 0 to 19
  let gender = Employees[i].gender === "female";
  if(gender === true) {
    let workload = Employees[i].workload;
    FemaleEmployees.push(workload);
  } else { }
}
console.log(FemaleEmployees);*/



const justFemaleEmployees = Employees.filter(empolyee => empolyee.gender.includes("female"));


const sortedGroup = justFemaleEmployees.sort(function(a, b) {
    return (a.workload) - (b.workload);
});

console.log(sortedGroup);
/*
FemaleEmployees.sort(function(a, b) {
    return parseFloat(a.workload) - parseFloat(b.workload);
});*/
