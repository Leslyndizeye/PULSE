window.addEventListener('load', function() {
    // Show the loader and pulse text initially
    document.getElementById('loader').style.display = 'block';
    document.getElementById('pulse-text').style.display = 'block';
    
    // Set a timeout to hide the loader and pulse text after 4 seconds
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('pulse-text').style.display = 'none';
        document.querySelector('.wrapper').style.display = 'block';
    }, 3000); // 3000 milliseconds = 3 seconds
});

document.querySelector('.register').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Perform registration actions here, such as AJAX request

    // Redirect or take action after successful registration
    window.location.href = ""// Redirect to index.html upon successful registration; 
});
