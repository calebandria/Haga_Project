const firstname = document.getElementsByClassName(".firstname");
const familyname = document.getElementsByClassName(".familyname");
const phoneNumber= document.getElementsByClassName(".phoneNumber");
const password = document.getElementsByClassName(".password");
const eyes = document.querySelectorAll(".fa-solid")

eyes.forEach(eye =>{
    eye.addEventListener('click' , () =>{
        eye.classList.add('fa-eye-slash')
        if(eye.classList.contains('fa-eye')){
            eye.classList.add('fa-eye-slash')
          /*   password[0].removeAttribute('type') */
            password[0].setAttribut('type','text')
        }

    })
})