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
