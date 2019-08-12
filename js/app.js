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
}

//Function
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
};

function removeCourse (e) {
    e.preventDefault();

    //target the remove class
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
    };
}

function clearAllCart() {
    shoppingCartContent.innerHTML = '';
}