//variables
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCart = document.querySelector('#clear-cart');

//Event Listeners
//load the event listeners
loadListeners();

function loadListeners() {
    
    //add courses to shopping cart
    courses.addEventListener('click', buyCourse);

    //remove courses from shopping cart
    shoppingCartContent.addEventListener('click', removeCourse);

    //clear cart button
    clearCart.addEventListener('click', clearAllCart);

    //loading storage from local storage
    document.addEventListener('DOMContentLoaded', loadStorage);
}



//Function used to buy course
function buyCourse(e) {
    e.preventDefault();

    if (e.target.classList.contains('add-to-cart')) {
        //fetch the course values
        const course = e.target.parentElement.parentElement;
        getCourseInfo(course)
    }
};



//getting the course details
function getCourseInfo(course) {
    //storing this information in a variable

    const courseDetails = {
        img: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }

    //sending details to the shopping cart
    addCourse(courseDetails);
};


//adding course to the shopping cart
function addCourse(course) {
    
    //add new rows to the table
    const row = document.createElement('tr');

    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.img}">
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `
    
    shoppingCartContent.appendChild(row);

    //saving courses in local storage
    saveCourses(course);
};



//saving coursess in local storage
function saveCourses(course) {

    //recollecting the new information from localStorage
    let courses = getCoursesFromSTorage();                                                                          

    //adding the new cpurse
    courses.push(course)

    //Setting the coursese to local storage   
    localStorage.setItem( 'courses', JSON.stringify(courses))
};



//get courses from local storage
function getCoursesFromSTorage() {
    
    let courses;

    if (localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'))
    }

    return courses;
};



//loading storage
function loadStorage() {
    //fetching existing data
    let courses = getCoursesFromSTorage();
    // return console.log(courses)
    //displaying on cart
    courses.forEach(course => {
        
        const row = document.createElement('tr');

        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.img}">
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;

        shoppingCartContent.appendChild(row);
    });

};


//removing course on the client side
function removeCourse (e) {
    let cousreRow, courseId;

    //target the remove class
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        cousreRow = e.target.parentElement.parentElement;
        courseId = cousreRow.querySelector('a').getAttribute('data-id');
    };

    //function to remiove from storage
    removeCourseFromStorage(courseId);
};


//removing course from storage
function removeCourseFromStorage(id) {
    
    let courses = getCoursesFromSTorage();

    courses.forEach((courseLS, index) => {
        if (id === courseLS.id) {
            // return console.log(course)
            courses.splice(index, 1)
        }
    });

    //set remaining value to localStorage
    localStorage.setItem('courses', JSON.stringify(courses));
}


//clearing the cart
function clearAllCart() {
    // shoppingCartContent.innerHTML = '';

    //using the firstchild method of the shopping cart
    while (shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild)
    };

    clearStorage();
};


//to clear the whole storage
function clearStorage() {
    
    localStorage.removeItem('courses');
}