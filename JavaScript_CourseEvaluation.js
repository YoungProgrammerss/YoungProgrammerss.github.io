 document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const coursesDropdownList = document.getElementById('course-dropdown');
    const Starsrating = document.querySelectorAll('input[name="star"]');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Check if a course is selected
        const selectedCourse = coursesDropdownList.options[coursesDropdownList.selectedIndex].text;
        if (selectedCourse === 'Select an option') {
            alert('Submission is invalid; You did not choose a course.');
            return;
        }

        // Check if a rating is selected
        let selectedStarsRating = null;
        Starsrating.forEach(input => {
            if (input.checked) {
                selectedStarsRating = input.id.replace('star', ''); // Get the number part of the id star rating
            }
        });

        if (!selectedStarsRating) {
            alert('Submission is invalid; You did not rate the course.');
            return;
        }

        // If both course and rating are selected
        alert(`Thank you for your feedback!\nYour rating for course ${selectedCourse} is ${selectedStarsRating}`);
    });
});