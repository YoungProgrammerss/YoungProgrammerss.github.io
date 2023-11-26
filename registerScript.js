//Register a new kid js

//validate form inputs
function validateFormInputs() {
  var firstname = document.getElementById('firstname').value;
  var lastname = document.getElementById('lastname').value;
  var dateOfBirth = document.getElementById('Date').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  var photo = document.getElementById('photo').files[0];

  if (!firstname || !lastname || !dateOfBirth || !phone || !email || !photo) {
      alert('Please fill in all the fields and upload a photo.');
      return false;
  }

  if (/^\d/.test(firstname) || /^\d/.test(lastname)) {
      alert('The name fields cannot start with numbers.');
      return false;
  }

  if (!/^\d{10}$/.test(phone)) {
      alert('The phone number should be exactly 10 digits long.');
      return false;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
      return false;
  }

  var yearLimit = new Date('2017-01-01');
  if (new Date(dateOfBirth) > yearLimit) {
      alert('Children younger than 6 years old are not accepted.');
      return false;
  }

  var agreeCheckbox = document.getElementById('AgreeCheckbox').querySelector('input[type="checkbox"]');
  if (!agreeCheckbox.checked) {
      alert('You must agree to the terms.');
      return false;
  }

  return true;
}

//display and print the child's information
function displayChildInfoForPrint(firstname, lastname, dateOfBirth, gender, phone, email, photo) {
  var printWindow = window.open('', 'PRINT', 'height=600,width=800');

  if (photo) {
      var reader = new FileReader();
      reader.onload = function (e) {
          printWindow.document.write(`
              <html>
              <head><title>Print Child Information</title></head>
              <body>
                  <div class="child-info">
                      <img src="${e.target.result}" alt="Child Photo" style="width:100px;height:100px;">
                      <h1>Child Information</h1>
                      <p><strong>Child Name:</strong> ${firstname} ${lastname}</p>
                      <p><strong>DOB:</strong> ${dateOfBirth}</p>
                      <p><strong>Gender:</strong> ${gender}</p>
                      <p><strong>Phone:</strong> ${phone}</p>
                      <p><strong>Email:</strong> ${email}</p>
                  </div>
              </body>
              </html>
          `);
          printWindow.document.close();
          printWindow.focus();
          printWindow.onload = function() {
              printWindow.print();
              printWindow.close();
          };
      };
      reader.readAsDataURL(photo);
  } else {
      printWindow.document.write(`
          <html>
          <head><title>Print Child Information</title></head>
          <body>
              <div class="child-info">
                  <h1>Child Information</h1>
                  <p><strong>Child Name:</strong> ${firstname} ${lastname}</p>
                  <p><strong>DOB:</strong> ${dateOfBirth}</p>
                  <p><strong>Gender:</strong> ${gender}</p>
                  <p><strong>Phone:</strong> ${phone}</p>
                  <p><strong>Email:</strong> ${email}</p>
              </div>
          </body>
          </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
  }
}

//handle form submission
function handleFormSubmission(event) {
  event.preventDefault();

  if (validateFormInputs()) {
      var firstname = document.getElementById('firstname').value;
      var lastname = document.getElementById('lastname').value;

      
      var childKey = 'child_' + firstname + '_' + lastname;
      localStorage.setItem(childKey, firstname + ' ' + lastname);

      
      var dateOfBirth = document.getElementById('Date').value;
      var gender = document.getElementById('gender').value;
      var phone = document.getElementById('phone').value;
      var email = document.getElementById('email').value;
      var photo = document.getElementById('photo').files[0];

      displayChildInfoForPrint(firstname, lastname, dateOfBirth, gender, phone, email, photo);
  }
}

//populate the 'Choose Kids' dropdown


function populateKidsDropdown() {
  var dropdown = document.getElementById('ChooseKids');
  if (dropdown) {
    
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    
    if (key.indexOf('child_') === 0) {
        var childName = localStorage.getItem(key);
        var option = document.createElement('option');
        option.value = childName;
        option.textContent = childName;
        dropdown.appendChild(option);
    }
}
  }
}

//Course enrollment js

// Event listener
document.addEventListener('DOMContentLoaded', function() {
  populateKidsDropdown();
  var form = document.querySelector('.evaluationForm');
  if(form) {
      form.addEventListener('submit', handleFormSubmission);
  }
});   

document.addEventListener("DOMContentLoaded", function () {
  populateCourseList();
});

const coursesArray = [
  { course: "Introduction to coding", tutor: "Jessica Ibbott", prerequisite: "None", image: "images/scratch_coding.jpg" },
  { course: "Introduction to web-Development", tutor: "Huxley Victors", prerequisite: "None", image: "images/webCodingKids.jpg" },
  { course: "Young game creator", tutor: "Pepper Mason", prerequisite: "Minecraft modding", image: "images/GameDeveloper.jpg" },
  { course: "Coding with python", tutor: "Sharif Dabney", prerequisite: "None", image: "images/Python_Programming.jpg" },
  { course: "Arduino Basics", tutor: "Jessica Ibbott", prerequisite: "Coding with python", image: "images/Arduino.png" },
  { course: "Minecraft modding", tutor: "Tatton Towner", prerequisite: "Coding with python", image: "images/MaincraftModding.jpg" },
  { course: "Advanced Python Programming", tutor: "Huxley Victors", prerequisite: "Coding with python", image: "images/AdvancedPython.jpeg" },
  { course: "Web Development Fundamentals", tutor: "Kristy Roderick", prerequisite: "Introduction to web-Development", image: "images/advancedWeb.jpeg" },
  { course: "Game Design Principles", tutor: "Pepper Mason", prerequisite: "Young game creator", image: "images/GameDesignAdvanced.png" },
];

const tutorsSet = new Set();
const prerequisitesSet = new Set();

coursesArray.forEach(course => {
  tutorsSet.add(course.tutor);
  prerequisitesSet.add(course.prerequisite);
});




//add options to dropdown lists.
function populateDropdown(selectElement, values) {
  selectElement.innerHTML = ""; 
  const optionAll = document.createElement("option");
  optionAll.value = "All";
  optionAll.textContent = "All";
  selectElement.appendChild(optionAll);

  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value === "" ? "None" : value;
    selectElement.appendChild(option);
  });
}
//Add courses
function populateCourseList() {
  const courseList = document.getElementById("courseList");

  courseList.innerHTML = "";

  coursesArray.forEach(course => {
    const listItem = document.createElement("li");
    listItem.className = "courseListItem";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "course";
    checkbox.value = course.course;
    listItem.appendChild(checkbox);

    const img = document.createElement("img");
    img.src = course.image;
    img.alt = course.course;
    img.className = "coursePic";
    listItem.appendChild(img);

    const label = document.createElement("label");
    label.textContent = course.course;
    label.className = "courseLabel";
    listItem.appendChild(label);

    courseList.appendChild(listItem);
  });

  populateDropdown(document.getElementById("Tutor"), tutorsSet);
  populateDropdown(document.getElementById("Prerequisite"), prerequisitesSet);
}
//Filtering
function filterCourses() {
  const selectedPrerequisite = document.getElementById("Prerequisite").value;
  const selectedTutor = document.getElementById("Tutor").value;
  const courseList = document.getElementById("courseList");

  courseList.innerHTML = "";

  coursesArray.forEach(course => {
    const coursePrerequisite = course.prerequisite;
    const courseTutor = course.tutor;

    if (
      (selectedPrerequisite === "All" || selectedPrerequisite === coursePrerequisite) &&
      (selectedTutor === "All" || selectedTutor === courseTutor)
    ) {
      const listItem = document.createElement("li");
      listItem.className = "courseListItem";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "course";
      checkbox.value = course.course;
      listItem.appendChild(checkbox);

      const img = document.createElement("img");
      img.src = course.image;
      img.alt = course.course;
      img.className = "coursePic";
      listItem.appendChild(img);

      const label = document.createElement("label");
      label.textContent = course.course;
      label.className = "courseLabel";
      listItem.appendChild(label);

      courseList.appendChild(listItem);
    }
  });
}
//Validation and resetting
function validateForm() {
  const selectedChild = document.getElementById("ChooseKids").value;
  const selectedCourses = document.querySelectorAll("[name='course']:checked");

  if (selectedChild === "") {
    alert("Please choose a child to enroll.");
    return false;
  }

  if (selectedCourses.length === 0) {
    alert("Please choose at least one course to enroll.");
    return false;
  }


  displayEnrollmentInformation(selectedChild, selectedCourses);


  const form = document.querySelector('.evaluationForm');
  if (form) {
    form.reset(); 


    const checkboxes = document.querySelectorAll("[name='course']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }


  document.getElementById("Prerequisite").value = "All";
  document.getElementById("Tutor").value = "All";
  filterCourses();
  document.getElementById("ChooseKids").value = "";
  document.getElementById("Prerequisite").value = "All";
  document.getElementById("Tutor").value = "All";
  document.getElementById("PaymentForm").value = "";
  document.getElementById("AgreeCheckbox").querySelector("[type='checkbox']").checked = true;

  return false;
}


//print the child's information.
function displayEnrollmentInformation(child, courses) {
  const previousInfo = document.getElementById("enrollmentInfo");
  if (previousInfo) {
    previousInfo.remove();
  }

  const infoDiv = document.createElement("div");
  infoDiv.id = "enrollmentInfo";

  const childName = document.createElement("p");
  childName.textContent = `Child: ${child}`;
  infoDiv.appendChild(childName);

  const coursesList = document.createElement("ul");

  courses.forEach(course => {
    const listItem = document.createElement("li");
    const courseValue = course.value;
    const courseTutor = coursesArray.find(c => c.course === courseValue).tutor;
    listItem.textContent = `${courseValue} (Tutor: ${courseTutor})`;
    coursesList.appendChild(listItem);
  });

  infoDiv.appendChild(coursesList);


  var insertBeforeElement = document.querySelector(".evaluationContent");


  if (insertBeforeElement) {

    insertBeforeElement.parentNode.insertBefore(infoDiv, insertBeforeElement);
  } else {
 
    document.querySelector("main").appendChild(infoDiv);
  }
}




