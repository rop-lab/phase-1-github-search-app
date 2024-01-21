// Function 1: createEmployeeRecord
// This function takes an array of employee information and returns an object representing the employee record.
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Function 2: createEmployeeRecords
// This function takes an array of arrays, each containing employee information, and returns an array of employee records.
function createEmployeeRecords(arrOfArrays) {
  return arrOfArrays.map(createEmployeeRecord);
}

// Function 3: createTimeInEvent
// This function records an employee's clock-in time by adding an entry to the timeInEvents array.
function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  });
  return this;
}

// Function 4: createTimeOutEvent
// This function records an employee's clock-out time by adding an entry to the timeOutEvents array.
function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  });
  return this;
}

// Function 5: hoursWorkedOnDate
// This function calculates the hours worked by an employee on a specific date based on clock-in and clock-out times.
function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(event => event.date === date);
  const timeOut = this.timeOutEvents.find(event => event.date === date);

  if (timeIn && timeOut) {
    // Adjust the calculation to handle the conversion to hours properly
    return (timeOut.hour - timeIn.hour) / 100; // Convert to hours
  } else {
    // Return 0 if either timeIn or timeOut is not available
    return 0;
  }
}

// Function 6: wagesEarnedOnDate
// This function calculates the wages earned by an employee on a specific date based on hours worked and pay per hour.
function wagesEarnedOnDate(date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  return hoursWorked * this.payPerHour;
}

// Function 7: allWagesFor (provided in the challenge)
// No need to implement as it is provided.

// Function 8: findEmployeeByFirstName
// This function searches for an employee by their first name in a given array of employee records.
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName);
}

// Function 9: calculatePayroll
// This function calculates the total payroll for a given array of employee records.
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((totalPay, employee) => totalPay + allWagesFor.call(employee), 0);
}

/*
  We're giving you this function. Take a look at it; you might see some usage
  that's new and different. That's because we're avoiding a well-known, but
  sneaky bug that we'll cover in the next few lessons!

  As a result, the lessons for this function will pass, and it will be available
  for you to use if you need it!
*/
const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate.call(this, d);
  }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
