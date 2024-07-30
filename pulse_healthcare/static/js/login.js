window.addEventListener('load', function() {
    // Show the loader and pulse text initially
    document.getElementById('loader').style.display = 'block';
    document.getElementById('pulse-text').style.display = 'block';

    // Hide the loader and pulse text after 5 seconds
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('pulse-text').style.display = 'none';
        document.querySelector('.wrapper').style.display = 'block'; // Show the form
    }, 5000);
});
