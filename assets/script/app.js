// start API
function start(){
    getCourse(renderCourses);
    handlerCreateForm();
}
start();

var courseAPI = 'http://localhost:3000/courses';
// ---------------------------------------------------------- //
// hàm lấy dữ liệu từ JSON server và rồi in lên màn hình
function getCourse(callback) {
    fetch(courseAPI) 
        // lấy dữ liệu từ file json và sau đó truyền dữ liệu đó xuống cho hàm renderCourses xử lí
        .then(res => { return res.json() }) 
        .then(callback);
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

// ----------------------------- New/Create ----------------------------------------------
// hàm xử lí dữ liệu mới nhập vào và lưu lên JSON server
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

// hàm tạo mới khoá học
function handlerCreateForm() {
    var createBtn = document.querySelector('#create');
    // khi click vào form tạo mới thì insert dữ liệu lên API Server
    createBtn.addEventListener('click', () => {
        var formData = {
            name: document.querySelector('#name').value,
            description: document.querySelector('#description').value
        };

        // truyền dữ liệu khởi tạo vào
        handleCreateCourse(formData, () => {
            getCourse(renderCourses);
        });

    })
}
// ----------------------------- Delete ----------------------------------------------
function handleDeleteCourse(id) {
        // tuỳ chọn post dữ liệu của fetch
        var options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
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

// ----------------------------- Update ----------------------------------------------
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
        },
        body: JSON.stringify(dataEdit)
    };

    fetch(`${courseAPI}/${id}`, options)
        .then(res => res.json())
        .then(() => {
            getCourse(renderCourses);
        })
}



