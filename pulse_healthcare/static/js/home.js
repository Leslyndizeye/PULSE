window.addEventListener('load', function() {
  // Show the loader and pulse text initially
  document.getElementById('loader').style.display = 'block';
  document.getElementById('pulse-text').style.display = 'block';
  
  // Set a timeout to hide the loader and pulse text after 3 seconds
  setTimeout(function() {
      document.querySelector('.loader-background').style.display = 'none';
  }, 3000); // 3000 milliseconds = 3 seconds
});