var courseAPI = 'http://localhost:3000/courses';
// start API
function start(){
    getCourse(renderCourses);
    handlerCreateForm();
}
start();

// ---------------------------------------------------------- //
function getCourse(callback) {
    fetch(courseAPI) 
        .then(res => { return res.json() })
        .then(callback);
}

function handleCreateCourse(data, callback) {
    // tuỳ chọn post dữ liệu của fetch
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };

    fetch(courseAPI, options)
        .then(res => res.json())
        .then(callback)
}

function handleDeleteCourse(id) {
        // tuỳ chọn post dữ liệu của fetch
        var options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
    
        fetch(`${courseAPI}/${id}`, options)
            .then(res => res.json())    
            .then(() => {
                var courseItem = document.querySelector(`.course-item-${id}`);
                if(courseItem) {
                    courseItem.remove();
                }
            });
}

function handleUpdateCourse(id) {
    // do tôi lười nên tối lấy luôn dữ liệu từ form create ở dưới
    var dataEdit = {
        name: document.querySelector('#name').value,
        description: document.querySelector('#description').value
    }

    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(dataEdit)
    };

    fetch(`${courseAPI}/${id}`, options)
        .then(res => res.json())
        .then(() => {
            getCourse(renderCourses);
        })
}

function renderCourses(courses) {
    var liseCourseBlock = document.querySelector("#list-course");
    var htmls = courses.map(items => {
        return `
            <li class="course-item-${items.id}">
                <h2>ID course: ${items.id}</h2>
                <h4>Name: ${items.name}</h4>
                <p>Description: ${items.description}</p>
                <button id="delete" onclick="handleDeleteCourse(${items.id})">Xoá</button>
                <button id="update" onclick="handleUpdateCourse(${items.id})">Sửa</button>
            </li>
        `;
    })
    liseCourseBlock.innerHTML = htmls.join('');
}

function handlerCreateForm() {
    var createBtn = document.querySelector('#create');
    // khi click vào form tạo mới thì insert dữ liệu lên API Server
    createBtn.addEventListener('click', () => {
        var nameVal = document.querySelector('#name').value;
        var descriptionVal = document.querySelector('#description').value;
        
        var formData = {
            name: nameVal,
            description: descriptionVal
        };

        // truyền dữ liệu khởi tạo vào
        handleCreateCourse(formData, () => {
            getCourse(renderCourses);
        });

    })
}

