

document.addEventListener('DOMContentLoaded', function () {
  const buttonLeft = document.getElementById('slideLeft');
  const buttonRight = document.getElementById('slideRight');
  const sortSelect = document.getElementById('sortTutors');

  buttonLeft.addEventListener('click', function () {
    slideLeft();
  });

  buttonRight.addEventListener('click', function () {
    slideRight();
  });

  sortSelect.addEventListener('change', function () {
    sortTutors();
  });
});

// scroll buttons
function slideLeft() {
  const teacherContainer = document.getElementById('scrollhorizontally');
  teacherContainer.scrollLeft -= 50;
}

function slideRight() {
  const teacherContainer = document.getElementById('scrollhorizontally');
  teacherContainer.scrollLeft += 50;
}

// sort a-z or z-a
function sortTutors() {
  const teacherContainer = document.getElementById('scrollhorizontally');
  const sortSelect = document.getElementById('sortTutors');
  const teachers = Array.from(teacherContainer.getElementsByClassName('teacher'));

  if (sortSelect.value === 'nameAsc') {
    teachers.sort((a, b) => a.querySelector('dd').textContent.localeCompare(b.querySelector('dd').textContent));
  } else if (sortSelect.value === 'nameDesc') {
    teachers.sort((a, b) => b.querySelector('dd').textContent.localeCompare(a.querySelector('dd').textContent));
  }

  teachers.forEach(teacher => teacherContainer.appendChild(teacher));
}
