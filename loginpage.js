loginContent = `<section class="loginSectionContainer">
    <div class="title-discription">
        <h4 class="loginPageHeading">Login</h4>
        <p class="loginPageDescription">Welcome to Result Management System, please put you login credentials below to start using the app</p>
    </div>
    <div class="formContainer">
        <form action="">
            <div class="formContent">
                <div id='loginErrorCon'>
                    <p id='loginErrorTxt'>Please check your username and password</p>
                </div>
                <div class="inputDetails">
                    <div class="inputFields">
                        <span class="inputDetailsTitle">E-mail</span>
                        <input  type="text" id='emailField'>
                    </div>
                    <div class="inputFields">
                        <span class="inputDetailsTitle">Password</span>
                        <input type="password" id='passField'>
                    </div>
                </div>
            </div>              
            <div class="forgotPassCnt">
                <span >Forgot password?</span>
            </div>
            <hr class="loginhr">
            <div class="loginBtnCnt">
                <input type="button" value="Login" class="loginBtn" id='loginBtn'>
            </div>
        </form>
        <div class="createAc">
            <p class="createAcTxt">Don't have an account? <button id='signUpBtn'>Sign up</button> </p>
        </div>
    </div>`
signupContent = `<div class="title-discription">
        <h4 class="loginPageHeading">Create new Account</h4>
        <p class="loginPageDescription">Now create a new account and use out services for free!</p>
    </div>
    <div class="formContainer">
        <form action="">
            <div class="formContent">
                <div class="inputDetails">
                    <div class="inputFields">
                        <span class="inputDetailsTitle">Name</span>
                        <input  type="text" id='nameField'>
                    </div>
                    <div class="inputFields">
                        <span class="inputDetailsTitle">E-mail</span>
                        <input  type="email" id='emailField'>
                        <div class="errorCon" id='emailErrorPoper'>
                            <p id='emailErrorTxt'></p>
                        </div>
                    </div>
                    <div class="inputFields">
                        <span class="inputDetailsTitle">Password</span>
                        <input type="password" id='passwordField'>
                    </div>
                    <div class="inputFields">
                        <span class="inputDetailsTitle">Confirm Password</span>
                        <input type="password" id='confirmPassword'>
                        <div class="errorCon" id='passErrorPoper' >
                            <p id='passErrorTxt'></p>
                        </div>
                    </div>
                </div>
            </div>             
            <hr class="loginhr">
            <div class="loginBtnCnt">
                <input type="button" value="Create Account" class="loginBtn" id="submitBtn" >
            </div>
        </form>
        <div class="createAc">
            <p class="createAcTxt">Already a member <button id="loginBtn">Login</button> </p>
        </div>
    </div>`


container = document.getElementById('loginsingupCnt')
body = document.querySelector('body')
emailErrors = ['Enter a valid email id', 'Email already exists']
passErrors = ['Password not match', 'Weak Password']
userdetails = [{
    'username':'Nandhu Santhosh',
    'email':'nandhusanthosh87@gmail.com',
    'password':'nandhu@123'
},{
    'username':'Anandhu Santhosh',
    'email':'anandhusanthosh2005@gmail.com',
    'password':'anandhu@123'
}]
body.addEventListener('load', tologin())


function tosignup() {
    loader(signupContent)


    loginBtn = document.getElementById('loginBtn')
    loginBtn.addEventListener('click', tologin)
    emailField = document.getElementById('emailField')
    confirmPassField = document.getElementById('confirmPassword')
    confirmPassField.addEventListener('blur', passwordChecker)
    emailField.addEventListener('blur',emailChecker)
    submit = document.getElementById('submitBtn')
    submit.addEventListener('click', submitaction)
}
function tologin(){
    loader(loginContent)

    loginBtn = document.getElementById('loginBtn')
    loginBtn.addEventListener('click', loginChecker)
    signUpBtn = document.getElementById('signUpBtn')
    signUpBtn.addEventListener('click', tosignup)
}
function loader(content){
    container.innerHTML = ''
    con = document.createElement('section')
    con.classList.add('loginSectionContainer')
    con.innerHTML = content
    container.append(con)
}
//THIS FUNCTION IS CALLED WHEN WE CLICK THE SUBMIT BUTTON AND IT STORES THE DATA IF THERE IS NO PASSWORD ERROR AND EMAIL ERROR
function submitaction() {
    username = document.getElementById('nameField').value
    email = document.getElementById('emailField').value
    password = document.getElementById('passwordField').value
    passwordTwo = document.getElementById('confirmPassword').value

    passwordChecker()
    emailChecker()  
    if (passStatus == -1 && emailStatus == -1) {
        dataCollector(username, email, password);
    }
}
function dataCollector(username, email, password){
    data = {
        'username': username,
        'email': email,
        'password':password
    }
    userdetails.push(data)
    alert('Account created Sucessfully!, now login using your username and password')
    tologin()
}
//PASSWORD CHECKER MAKES SURE THAT BOTH THE PASSWORDS ARE THE SAME
function passwordChecker(){
    password = document.getElementById('passwordField').value
    passwordTwo = document.getElementById('confirmPassword').value
    errorCon = document.getElementById('passErrorPoper')
    if (password != passwordTwo){
        confirmPassField.classList.add('different')
        errorCon.style.display = 'block'
        passStatus = 0;
        errorCon.innerHTML = passErrors[passStatus]
    }else{
        passStatus = -1;
        try{
            errorCon.style.display = 'none'
            confirmPassField.classList.remove('different')
        }
        catch{}
    }
}

//EMAIL CHECKER FUNCTION CHECKS WHETHER THE EMAIL IS USED WITH ANY OTHER ACCOUNTS
function emailChecker(){
    emailStatus = -1
    email = emailField.value
    userdetails.forEach(element => {
            if (element['email'] == email){
            emailStatus = 1;
        }
    });
    extension = email.slice(-10)
    if(extension != '@gmail.com'){
        emailStatus = 0;
    }
    emailerrorHandlerFunction(emailStatus)
}
function emailerrorHandlerFunction(status) {
    errorCon = document.getElementById('emailErrorPoper')
    if (status >= 0){
        errorCon.style.display = 'block'
        errorMsg = document.getElementById('emailErrorTxt')
        errorMsg.innerHTML = emailErrors[status]
        emailField.classList.add('different')
    }else{
            errorCon.style.display = 'none'
            emailField.classList.remove('different')
    }
}
///////////////////////////////////////////////////////////
function loginChecker() {
    errorCon = document.getElementById('loginErrorCon')
    email = document.getElementById('emailField').value
    pass = document.getElementById('passField').value
    fieldremover()

    userStatus = false
    for( i = 0; i< userdetails.length ; i++){
        element=userdetails[i]
        if(element['email'] == email){
            userStatus = true;
            id = i;
        }
    }
    if (userStatus){
        if (pass == userdetails[id]['password']){
            errorCon.style.display = 'none'
            window.location.href = 'home.html';
        }else{
            errorCon.style.display = 'block'
        }
    }else{
        errorCon.style.display = 'block' 
    }
}
function fieldremover() {
    document.getElementById('emailField').value = ''
    document.getElementById('passField').value = ''
}