window.addEventListener('load', function() {
    // Show the loader and pulse text initially
    document.getElementById('loader').style.display = 'block';
    document.getElementById('pulse-text').style.display = 'block';
    
    // Set a timeout to hide the loader and pulse text after 3 seconds
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('pulse-text').style.display = 'none';
        document.querySelector('.wrapper').style.display = 'block';
    }, 3000); // 3000 milliseconds = 3 seconds
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve the form data
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate password confirmation
    if (password !== confirmPassword) {
        document.getElementById('confirm-password-error').textContent = 'Passwords does not match.';
        return;
    }

    // Proceed with form submission if passwords match
    this.submit(); // Submit the form normally
});
