// Load a new image from the PHP script
function loadNewImage() {
  // Make an AJAX request to the PHP script
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://kyvera.000webhostapp.com/UpdateImage.php", true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      // If the request was successful, update the image source on the page
      var img = document.getElementById("my-image");
      img.src = "https://kyvera.000webhostapp.com/selected/selected.png?" + new Date().getTime();
    }
  };
  xhr.send();
}

// Call the loadNewImage() function when the page is loaded
window.addEventListener("load", loadNewImage);
