// First, define the paths to the images and selected folders
const imagesFolder = '/images/';
const selectedFolder = '/selected/';

// Delete the previous "selected.png" file, if it exists
const fileSystem = new ActiveXObject("Scripting.FileSystemObject");
const selectedFilePath = selectedFolder + '\\selected.png';
if (fileSystem.FileExists(selectedFilePath)) {
  const selectedFile = fileSystem.GetFile(selectedFilePath);
  selectedFile.Delete();
}

// Get all files in the images folder
const imageFiles = fileSystem.GetFolder(imagesFolder).Files;

// Select a random image file
const randomIndex = Math.floor(Math.random() * imageFiles.Count);
const randomImageFile = imageFiles.Item(randomIndex);

// Move the random image file to the selected folder and rename it
const selectedFilePathNew = selectedFolder + '\\selected.png';
randomImageFile.Move(selectedFilePathNew);

// Log a message to confirm the selected file has been moved
console.log('Selected image file has been moved to the "selected" folder.');
