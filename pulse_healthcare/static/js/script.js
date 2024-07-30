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

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Simulate login process
    setTimeout(function() {
        // Redirect to the home page or another valid URL upon successful login
        window.location.href = '/home'; // Adjust URL as needed
    }, 1000); // Simulate a delay for login processing
});
