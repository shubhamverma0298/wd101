document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    // Validate age
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55.');
        return;
    }

    // Add entry to table
    const table = document.getElementById('entriesBody');
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = name;
    newRow.insertCell(1).innerText = email;
    newRow.insertCell(2).innerText = password;
    newRow.insertCell(3).innerText = dob; 
    newRow.insertCell(4).innerText = terms ? 'true' : 'false';

    // Store data in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password, dob, terms });
    localStorage.setItem('users', JSON.stringify(users));
});

// Load stored data on page load
window.onload = function() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const table = document.getElementById('entriesBody');
    users.forEach(user => {
        const newRow = table.insertRow();
        newRow.insertCell(0).innerText = user.name;
        newRow.insertCell(1).innerText = user.email;
        newRow.insertCell(2).innerText = user.password;
        newRow.insertCell(3).innerText = user.dob;
        newRow.insertCell(4).innerText = user.terms ? 'true' : 'false' ;
    });
};

// Clear data function
document.getElementById('clearData').addEventListener('click', function() {
    // Clear localStorage
    localStorage.removeItem('users');

    // Clear table
    const table = document.getElementById('entriesBody');
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
});
