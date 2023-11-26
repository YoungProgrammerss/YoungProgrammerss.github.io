// Function to display children's names from local storage
function displayChildrenNames() {
    // Get the elements where the names should be displayed
    const cardElements = [
        document.querySelector('.cardName1'),
        document.querySelector('.cardName2'),
        document.querySelector('.cardName3')
    ];

    let cardIndex = 0;

    // Iterate through local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        // Check if the key is for a child's name
        if (key.startsWith('child_')) {
            const childName = localStorage.getItem(key);

            // Safety check if the element exists and there's room for more children
            if (cardElements[cardIndex]) {
                cardElements[cardIndex].textContent = childName;
                cardIndex++;
            }

            if (cardIndex >= cardElements.length) {
                // We've filled all available spots
                break;
            }
        }
    }

    // If no children's names are found in local storage, set and display default names
    if (cardIndex === 0) {
        console.log("No children found in local storage. Setting default names.");
        localStorage.setItem('child_1', 'Sara Mohammed');
        localStorage.setItem('child_2', 'Abdullah Ahmad');
        cardElements[0].textContent = 'Sara Mohammed';
        cardElements[1].textContent = 'Abdullah Ahmad';
    }
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', displayChildrenNames);



