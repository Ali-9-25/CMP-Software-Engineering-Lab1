const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  console.log("Im here")
  const id = req.params.id;
  console.log(`the id is ${id}`)
  const employeeIndex = employee.findIndex(employee => employee.id === id);
  console.log(`the index is ${employeeIndex}`)
  if (employeeIndex != -1) {
    const removedEmployee = employee.splice(employeeIndex, 1)[0];
    res.status(200).json({ data: removedEmployee });
  }
  else {
    console.log("entered else")
    res.status(404).json({ error: "no employee with such id" });
    return;
  }

};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;
  const newEmployee = { id: id, name: name };
  const employeeIndex = employee.findIndex(employee => employee.id === newEmployee.id);
  if (employeeIndex == -1) {
    employee.push(newEmployee);
    res.status(200).json({ data: newEmployee });
  }
  else {
    res.status(400).json({ error: "another employee already exists with such id" });
    return;
  }




};
