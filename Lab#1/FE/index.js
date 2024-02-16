function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        // deleteButton.addEventListener('click', function(item.id) {
        //   // Call a function to handle the delete action
        //   handleDeleteButtonClick(item.id);
        // });
        deleteButton.addEventListener('click', function () {
          // Call a function to handle the delete action
          deleteEmployee(item.id);
        });
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// // Example of calling fetchEmployees() when the page loads
// document.addEventListener('DOMContentLoaded', fetchEmployees);

// TODO
// add event listener to submit button
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('employeeForm');
  const submitButton = document.getElementById('submitButton');

  submitButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Call a function to handle the form submission
    createEmployee();
  });
});



// TODO
// add event listener to delete button
//added inside fetchEmployees


// TODO
function createEmployee() {

  // get data from input field
  const employeeNameElement = document.getElementById("name");
  const employeeName = employeeNameElement.value;

  // Retrieve the value from the input element
  const employeeIdElement = document.getElementById("id");
  const employeeId = employeeIdElement.value;
  // send data to BE
  const reqBody = { id: employeeId, name: employeeName };

  //make request sending this object to supposedy "https://localhost:3000/api/v1/employee" with post method
  // Make a POST request to the backend API
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Employee created successfully:', data);

      // Call fetchEmployees to update the table with the latest data
      fetchEmployees();

      // Optionally, clear the input fields after successful submission
      employeeNameElement.value = '';
      employeeIdElement.value = '';
    })
    .catch(error => {
      console.error('Error creating employee:', error);
      alert("Can't create 2 employees with the same id")
    });

  // call fetchEmployees
  fetchEmployees();
}

// TODO
function deleteEmployee(id) {
  // get id

  // send id to BE

  //make request sending this object to supposedy "https://localhost:3000/api/v1/employee:id" with post method
  // Make a DELETE request to the backend API
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Employee deleted successfully:', data);

      // Call fetchEmployees to update the table with the latest data
      fetchEmployees();
    })
    .catch(error => {
      console.error('Error deleting employee:', error);
    });

  // call fetchEmployees
  fetchEmployees();
}

fetchEmployees()
