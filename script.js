

window.onload = function singlePageApp() {

   
    // let toke;
    // letAnimationId;
    // const outlet = document.querySelector('#outlet');

    // let outlate = document.querySelector('#outlate');
    // let animationId;
    // let loged = false;
    let myLocation = "KEYO3z20eyf8ZaJpI88gkhQQbhe2MpIo1lC";

    const logInPage = `
       <h1> Please login</h1>
       User name: <input type="text" id="userName"><br><br>
       Password: <input type= "text" id= "password"><br><br>
       <input type="button" id="Login1" value="LogIn"">`

    const myAnimation = `
    <h1 id= "status"> "start" </h1>
    <div id= "animation"> welcome to Animation Stage </div>
    <textarea id = animationView"  rows="30" cols="50" stayle = "font-size:10px"> </textarea><br>
    <input type="button" value="Refresh Animation" onclick="refresh()">
    <input type="button" id="Logout" value="LogOut">`

    const myDiv = document.querySelector("#outlet");
    myDiv.innerHTML = logInPage;

    let log = document.querySelector("#Login1");
    log.addEventListener("click", login);

    function login() {
        myDiv.innerHTML = myAnimation;
        Event();

    }

    function logOutFunc() {
        myDiv.innerHTML = logInPage;
    }

    function Event() {
        const logout = document.querySelector("#Logout");
        logout.addEventListener("click", logOutFunc);
    }

    async function fetchLocation() {
        navigator.geolocation.getCurrentPosition(success, fail)
        async function success(position) {

        }
    }

}



