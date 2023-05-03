// First, we need to define the paths to the folders that contain the images
const imagesFolder = 'images/';
const selectedFolder = 'selected/';

// Next, we create a function that will be called when the website is loaded
window.onload = function() {
  // 1. Delete the existing "selected.png" image from the "selected" folder
  const existingSelectedImage = selectedFolder + 'selected.png';
  if (checkIfFileExists(existingSelectedImage)) {
    deleteFile(existingSelectedImage);
  }

  // 2. Select a random image from the "images" folder
  const imageFiles = getFileList(imagesFolder);
  const randomImageFile = imageFiles[Math.floor(Math.random() * imageFiles.length)];

  // 3. Move the random image to the "selected" folder and rename it "selected.png"
  copyFile(imagesFolder + randomImageFile, selectedFolder + 'selected.png');
};

// Function to get a list of files in a directory
function getFileList(directory) {
  const files = [];
  const fileList = document.getElementById('fileList');
  const fileInput = document.createElement('input');
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('webkitdirectory', '');
  fileInput.setAttribute('directory', '');
  fileInput.setAttribute('multiple', '');
  fileInput.addEventListener('change', function() {
    const fileList = this.files;
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i].webkitRelativePath);
    }
  });
  fileInput.click();
  return files;
}

// Function to check if a file exists
function checkIfFileExists(filepath) {
  const xhr = new XMLHttpRequest();
  xhr.open('HEAD', filepath, false);
  xhr.send();
  return xhr.status !== 404;
}

// Function to delete a file
function deleteFile(filepath) {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', filepath, false);
  xhr.send();
}

// Function to copy a file
function copyFile(source, destination) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', source, true);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    const blob = new Blob([xhr.response], {type: 'image/png'});
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function() {
      const dataURL = reader.result;
      const img = new Image();
      img.src = dataURL;
      img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0);
        const data = canvas.toDataURL('image/png');
        const anchor = document.createElement('a');
        anchor.href = data;
        anchor.download = destination;
        anchor.click();
      };
    };
  };
  xhr.send();
}
