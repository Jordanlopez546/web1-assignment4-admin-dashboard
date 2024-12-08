document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('multi-step-form');
  const pages = document.querySelectorAll('.form-page');
  const medicalConditionRadios = document.getElementsByName('has-condition');
  const conditionDetailsSection = document.querySelector('.condition-details');
  const submissionResult = document.getElementById('submission-result');
  const resultContent = document.getElementById('result-content');

  // Medical Condition Radio Toggle
  medicalConditionRadios.forEach(radio => {
      radio.addEventListener('change', function() {
          conditionDetailsSection.style.display = 
              this.value === 'yes' ? 'block' : 'none';
      });
  });

  // Form Submission
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm()) {
          displaySubmissionResult();
      }
  });
});

// Page Navigation
function nextPage(currentPage) {
  if (validatePage(currentPage)) {
      document.getElementById(`page${currentPage}`).classList.remove('active');
      document.getElementById(`page${currentPage + 1}`).classList.add('active');
  }
}

function prevPage(currentPage) {
  document.getElementById(`page${currentPage}`).classList.remove('active');
  document.getElementById(`page${currentPage - 1}`).classList.add('active');
}

// Form Validation
function validatePage(pageNumber) {
  let isValid = true;

  if (pageNumber === 1) {
      // Validate Name
      const name = document.getElementById('name');
      const nameError = document.getElementById('name-error');
      if (!name.value.trim()) {
          nameError.textContent = 'Name is required';
          isValid = false;
      } else {
          nameError.textContent = '';
      }

      // Validate Email
      const email = document.getElementById('email');
      const emailError = document.getElementById('email-error');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
          emailError.textContent = 'Please enter a valid email';
          isValid = false;
      } else {
          emailError.textContent = '';
      }

      // Validate Country
      const country = document.getElementById('country');
      const countryError = document.getElementById('country-error');
      if (country.value === '') {
          countryError.textContent = 'Please select a country';
          isValid = false;
      } else {
          countryError.textContent = '';
      }

      // Validate Gender
      const genderError = document.getElementById('gender-error');
      const genderSelected = document.querySelector('input[name="gender"]:checked');
      if (!genderSelected) {
          genderError.textContent = 'Please select a gender';
          isValid = false;
      } else {
          genderError.textContent = '';
      }
  }

  return isValid;
}

function validateForm() {
  let isValid = true;

  // Validate first page
  isValid = validatePage(1);

  // Validate medical condition
  const hasCondition = document.querySelector('input[name="has-condition"]:checked');
  const conditionDetails = document.getElementById('condition-details');
  const conditionError = document.getElementById('condition-error');

  if (hasCondition && hasCondition.value === 'yes') {
      if (!conditionDetails.value.trim()) {
          conditionError.textContent = 'Please describe your medical condition';
          isValid = false;
      } else {
          conditionError.textContent = '';
      }
  }

  return isValid;
}

function displaySubmissionResult() {
  // Collect form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const country = document.getElementById('country').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const hasCondition = document.querySelector('input[name="has-condition"]:checked').value;
  const conditionDetails = hasCondition === 'yes' 
      ? document.getElementById('condition-details').value 
      : 'None';

  // Display submission result
  const resultHTML = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Gender:</strong> ${gender}</p>
      <p><strong>Medical Condition:</strong> ${conditionDetails}</p>
  `;

  const submissionResult = document.getElementById('submission-result');
  const resultContent = document.getElementById('result-content');
  
  resultContent.innerHTML = resultHTML;
  submissionResult.style.display = 'block';
}