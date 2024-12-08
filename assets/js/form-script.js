document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;

    // Add event listeners to navigation buttons
    const nextButtons = document.querySelectorAll('[data-next-page]');
    const prevButtons = document.querySelectorAll('[data-prev-page]');

    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageNumber = parseInt(this.getAttribute('data-next-page'));
            nextPage(pageNumber);
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageNumber = parseInt(this.getAttribute('data-prev-page'));
            prevPage(pageNumber);
        });
    });

    // Submit button event listener
    const submitButton = document.querySelector('[data-submit-form]');
    if (submitButton) {
        submitButton.addEventListener('click', submitForm);
    }

    function nextPage(current) {
        if (validatePage(current)) {
            document.getElementById(`page${current}`).classList.remove('active');
            document.getElementById(`page${current + 1}`).classList.add('active');
            currentPage = current + 1;
        }
    }

    function prevPage(current) {
        document.getElementById(`page${current}`).classList.remove('active');
        document.getElementById(`page${current - 1}`).classList.add('active');
        currentPage = current - 1;
    }

    function validatePage(page) {
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        if (page === 1) {
            // Validate Name
            const name = document.getElementById('name').value.trim();
            if (!name) {
                document.getElementById('nameError').textContent = 'Name is required';
                isValid = false;
            }

            // Validate Email
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Invalid email format';
                isValid = false;
            }

            // Validate Country
            const country = document.getElementById('country').value;
            if (!country) {
                document.getElementById('countryError').textContent = 'Country is required';
                isValid = false;
            }

            // Validate Gender
            const gender = document.querySelector('input[name="gender"]:checked');
            if (!gender) {
                document.getElementById('genderError').textContent = 'Gender is required';
                isValid = false;
            }
        }

        if (page === 2) {
            // Validate Medical Condition
            const medicalCondition = document.querySelector('input[name="medicalCondition"]:checked');
            if (!medicalCondition) {
                document.getElementById('medicalConditionError').textContent = 'Please select an option';
                isValid = false;
            }

            // Validate Medical Details if Yes is selected
            if (medicalCondition && medicalCondition.value === 'Yes') {
                const medicalDetails = document.getElementById('medicalDetails').value.trim();
                if (!medicalDetails) {
                    document.getElementById('medicalDetailsError').textContent = 'Please provide medical condition details';
                    isValid = false;
                }
            }
        }

        return isValid;
    }

    function submitForm() {
        if (validatePage(2)) {
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                country: document.getElementById('country').value,
                gender: document.querySelector('input[name="gender"]:checked').value,
                medicalCondition: document.querySelector('input[name="medicalCondition"]:checked').value,
                medicalDetails: document.getElementById('medicalDetails').value
            };

            // Display submission summary
            const summaryDiv = document.getElementById('submissionSummary');
            summaryDiv.innerHTML = `
                <h3>Submission Summary</h3>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Country:</strong> ${formData.country}</p>
                <p><strong>Gender:</strong> ${formData.gender}</p>
                <p><strong>Medical Condition:</strong> ${formData.medicalCondition}</p>
                ${formData.medicalCondition === 'Yes' ? `<p><strong>Medical Details:</strong> ${formData.medicalDetails}</p>` : ''}
            `;
            summaryDiv.style.display = 'block';

            // Optional: You could send this data to a server here
            console.log('Form Submitted', formData);
        }
    }

    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }
});