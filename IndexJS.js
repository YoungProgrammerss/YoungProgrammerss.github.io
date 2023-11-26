// switch themes
document.addEventListener('DOMContentLoaded', function () {
    const customizeButton = document.getElementById('customizeButton');
    const root = document.documentElement;


    let isGreenTheme = localStorage.getItem('isGreenTheme') === 'true';


    applyTheme();

    function applyTheme() {
        if (isGreenTheme) {
            root.classList.add('green-theme');
        } else {
            root.classList.remove('green-theme');
        }
    }

    customizeButton.addEventListener('click', function () {

        isGreenTheme = !isGreenTheme;
        

        localStorage.setItem('isGreenTheme', isGreenTheme);

        applyTheme();
    });
});

//scroll buttons
document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.slideRight').forEach(button => {
        button.addEventListener('click', function () {
            this.closest('.ReviewsContainer').querySelector('.scrollhorizontally').scrollLeft += 50;
        });
    });

    document.querySelectorAll('.slideLeft').forEach(button => {
        button.addEventListener('click', function () {
            this.closest('.ReviewsContainer').querySelector('.scrollhorizontally').scrollLeft -= 50;
        });
    });

});

