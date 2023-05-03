// define the paths to the folders that contain the images
const imagesFolder = 'images/';
const selectedFolder = 'selected/';

// use the FileReader to read and copy the image file
const reader = new FileReader();

// create a function that will be called when the website is loaded
window.onload = function() {
  // Delete the existing "selected.png" image from the "selected" folder
  const existingSelectedImage = selectedFolder + 'selected.png';
  if (fs.existsSync(existingSelectedImage)) {
    fs.unlinkSync(existingSelectedImage);
  }

  // Select a random image from the "images" folder
  const imageFiles = fs.readdirSync(imagesFolder);
  const randomImageFile = imageFiles[Math.floor(Math.random() * imageFiles.length)];

  // Move the random image to the "selected" folder and rename it "selected.png"
  const sourcePath = imagesFolder + randomImageFile;
  const destinationPath = selectedFolder + 'selected.png';
  fs.copyFileSync(sourcePath, destinationPath);
};

