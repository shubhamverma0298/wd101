document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    // Validate age (between 18 and 55 years)
    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55 years.');
        return;
    }

   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
    }

    const user = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        terms: terms
    };

    saveUser(user);
    loadUsers();
    document.getElementById('registrationForm').reset();
});

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function saveUser(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
    const usersTableBody = document.getElementById('usersTable').querySelector('tbody');
    usersTableBody.innerHTML = '';

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.terms ? 'true' : 'false'}</td>
        `;
        
        usersTableBody.appendChild(row);
    });
}

// Load users on page load
window.onload = loadUsers;
