
        // Store reservations in localStorage
        if (!localStorage.getItem('reservations')) {
            localStorage.setItem('reservations', JSON.stringify([]));
        }

        // Navigation functions
        function showSection(sectionId) {
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Close mobile menu if open
            const navbar = document.querySelector('.navbar');
            navbar.classList.remove('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Load reservations if admin section
            if (sectionId === 'admin') {
                loadReservations();
            }
        }

        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navbar = document.querySelector('.navbar');
        
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });

        // Header Background on Scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
            } else {
                header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });

        // Modified reservation form submission
        document.getElementById('reservation-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                partySize: document.getElementById('party-size').value,
                occasion: document.getElementById('occasion').value,
                specialRequests: document.getElementById('special-requests').value,
                timestamp: new Date().toISOString()
            };
            
            // Get existing reservations
            const reservations = JSON.parse(localStorage.getItem('reservations'));
            
            // Add new reservation
            reservations.push(formData);
            localStorage.setItem('reservations', JSON.stringify(reservations));
            
            // Show success message
            const successMessage = document.getElementById('reservation-success');
            successMessage.style.display = 'block';
            
            // Reset form
            this.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        });

        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMessage = document.getElementById('contact-success');
            successMessage.style.display = 'block';
            
            // Reset form
            this.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        });

        // Set minimum date for reservations to today
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('date').setAttribute('min', today);
        });

        // Admin functions
        function loadReservations() {
            const reservations = JSON.parse(localStorage.getItem('reservations'));
            const tableBody = document.getElementById('reservations-body');
            
            // Clear existing rows
            tableBody.innerHTML = '';
            
            // Add each reservation to the table
            reservations.forEach((reservation, index) => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${reservation.firstName} ${reservation.lastName}</td>
                    <td>${new Date(reservation.date).toLocaleDateString()}</td>
                    <td>${reservation.time}</td>
                    <td>${reservation.partySize}</td>
                    <td>${reservation.email}<br>${reservation.phone}</td>
                    <td>${reservation.specialRequests || 'None'}</td>
                    <td>
                        <button class="btn btn-small" onclick="confirmReservation(${index})">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn btn-small btn-danger" onclick="deleteReservation(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
        }

        function confirmReservation(index) {
            const reservations = JSON.parse(localStorage.getItem('reservations'));
            alert(`Reservation confirmed for ${reservations[index].firstName} ${reservations[index].lastName}`);
            loadReservations();
        }

        function deleteReservation(index) {
            if (confirm('Are you sure you want to delete this reservation?')) {
                const reservations = JSON.parse(localStorage.getItem('reservations'));
                reservations.splice(index, 1);
                localStorage.setItem('reservations', JSON.stringify(reservations));
                loadReservations();
            }
        }

        function refreshReservations() {
            loadReservations();
        }
        
        // Add this to your existing script

// Store reservations in localStorage
if (!localStorage.getItem('reservations')) {
    localStorage.setItem('reservations', JSON.stringify([]));
}

// Modified reservation form submission
document.getElementById('reservation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        partySize: document.getElementById('party-size').value,
        occasion: document.getElementById('occasion').value,
        specialRequests: document.getElementById('special-requests').value,
        timestamp: new Date().toISOString()
    };
    
    // Get existing reservations
    const reservations = JSON.parse(localStorage.getItem('reservations'));
    
    // Add new reservation
    reservations.push(formData);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    
    // Show success message
    const successMessage = document.getElementById('reservation-success');
    successMessage.style.display = 'block';
    
    // Reset form
    this.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
});

    // Admin functions
    function loadReservations() {
        const reservations = JSON.parse(localStorage.getItem('reservations'));
        const tableBody = document.getElementById('reservations-body');
        
        // Clear existing rows
        tableBody.innerHTML = '';
        
        // Add each reservation to the table
        reservations.forEach((reservation, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${reservation.firstName} ${reservation.lastName}</td>
                <td>${new Date(reservation.date).toLocaleDateString()}</td>
                <td>${reservation.time}</td>
                <td>${reservation.partySize}</td>
                <td>${reservation.email}<br>${reservation.phone}</td>
                <td>${reservation.specialRequests || 'None'}</td>
                <td>
                    <button class="btn btn-small" onclick="confirmReservation(${index})">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn btn-small btn-danger" onclick="deleteReservation(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }

    function confirmReservation(index) {
        const reservations = JSON.parse(localStorage.getItem('reservations'));
        alert(`Reservation confirmed for ${reservations[index].firstName} ${reservations[index].lastName}`);
        loadReservations();
    }

    function deleteReservation(index) {
        if (confirm('Are you sure you want to delete this reservation?')) {
            const reservations = JSON.parse(localStorage.getItem('reservations'));
            reservations.splice(index, 1);
            localStorage.setItem('reservations', JSON.stringify(reservations));
            loadReservations();
        }
    }

    function refreshReservations() {
        loadReservations();
    }

    // Load reservations when admin section is shown
    document.getElementById('admin-link').addEventListener('click', function() {
        showSection('admin');
        loadReservations();
    });
    