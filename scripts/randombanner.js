// Step 1: read text file and save contents to variable
fetch('/selected/placeholder.txt')
  .then(response => response.text())
  .then(text => {
    const placeholder = text.trim();

    // Step 2: rename selected.png file
    fetch(`/images/selected.png?rename=${placeholder}`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          console.log('Selected image renamed successfully');
        } else {
          console.error('Failed to rename selected image');
        }

        // Step 3: select random image and save name to placeholder.txt
        fetch('/images')
          .then(response => response.text())
          .then(text => {
            const images = text.split('\n').filter(file => file.endsWith('.png'));
            const selected = images[Math.floor(Math.random() * images.length)];
            fetch('/selected/placeholder.txt', {
              method: 'PUT',
              body: selected
            })
              .then(response => {
                if (response.ok) {
                  console.log('Placeholder file updated successfully');
                } else {
                  console.error('Failed to update placeholder file');
                }

                // Step 4: rename newly selected image
                fetch(`/images/${selected}?rename=selected.png`, { method: 'POST' })
                  .then(response => {
                    if (response.ok) {
                      console.log('Newly selected image renamed successfully');
                    } else {
                      console.error('Failed to rename newly selected image');
                    }
                  });
              });
          });
      });
  });
