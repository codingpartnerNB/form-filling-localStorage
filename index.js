// let btn = document.querySelector('.btn');
// btn.addEventListener('click',(event)=>{
//     event.preventDefault();
//     document.querySelector('.myForm').style.backgroundColor='aqua';
// });

// btn.addEventListener('mouseover',(event)=>{
//     event.preventDefault();
//     document.querySelector('h1').style.backgroundColor = 'blue';
//     document.querySelector('h1').style.color = 'white';
// });

// btn.addEventListener('mouseout',(event)=>{
//     event.preventDefault();
//     document.querySelector('h3').textContent = 'Hello';
// });


let myForm = document.querySelector('.myForm');
let nameInput = document.querySelector('#name');
let emailInput = document.querySelector('#email');
let userDetail = document.querySelector('#userDetail');
// let msg = document.querySelector('.msg');

myForm.addEventListener('submit', onSubmit);

userDetail.addEventListener('click', deleteData);

userDetail.addEventListener('click', editData);

function onSubmit(event) {
    event.preventDefault();
    if (nameInput.value === '' || emailInput.value === '') {
        // msg.classList.add('error');
        // msg.innerHTML = 'Please enter all fields';

        // creating error element
        let msg = document.createElement("div");
        msg.className = "error";
        msg.appendChild(document.createTextNode("Please enter all fields"));
        let label = document.querySelector('label[for="name"]');
        myForm.insertBefore(msg,label);
        setTimeout(() => msg.remove(), 2000);
    }
    else {
        const li = document.createElement('li');
        const deleteBtn = document.createElement('input');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.className = 'btn marginLeft delete';
        deleteBtn.setAttribute('value', 'Delete');
        const editBtn = document.createElement('input');
        editBtn.setAttribute('type','button');
        editBtn.className = "btn marginLeft edit";
        editBtn.setAttribute('value','Edit');   
        li.appendChild(document.createTextNode(`${nameInput.value}:${emailInput.value}`));
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        userDetail.appendChild(li);

        //Storing details in localStorage
        // localStorage.setItem('Name',nameInput.value);
        // localStorage.setItem('Email',emailInput.value);

        // //Storing object in localStorage with single user
        // let userData = {
        //     'Name':nameInput.value,
        //     'Email':emailInput.value
        // };
        // localStorage.setItem('User',JSON.stringify(userData));
        // // console.log(JSON.parse(localStorage.getItem('User')));

        //Storing object in localStorage with multiple users
        let userData = {
            'Name': nameInput.value,
            'Email': emailInput.value
        };
        localStorage.setItem(emailInput.value, JSON.stringify(userData));

        //clearing fields
        nameInput.value = '';
        emailInput.value = '';
    }
}

function deleteData(event) {
    event.preventDefault();
    if (event.target.classList.contains('delete')) {
        // Method 1
        let li = event.target.parentElement.textContent.split(":");
        localStorage.removeItem(li[1]);
        // Method 2
        // let keys = Object.keys(localStorage);
        // let li = event.target.parentElement.textContent.split(":");
        // if (keys.includes(li[1])) {
        //     localStorage.removeItem(li[1]);
        // }
        let listIt = event.target.parentElement;
        userDetail.removeChild(listIt);
    }
}

function editData(event){
    if(event.target.classList.contains('edit')){
        let li = event.target.parentElement.textContent.split(":");
        nameInput.value = li[0];
        emailInput.value = li[1];
        localStorage.removeItem(li[1]);
        userDetail.removeChild(event.target.parentElement);
    }
}