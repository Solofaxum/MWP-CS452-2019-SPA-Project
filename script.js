

window.onload = function singlePageApp() {

    // let GEOLOCATION_API_KEY;
    // let toke;
    // letAnimationId;
    // const outlet = document.querySelector('#outlet');
    GEOLOCATION_API_KEY = 'GsbAzLMtt611mbx5obQx05Pumn8wJeGJ'
    let outlate = document.querySelector('#outlate')
    let animationId;



    const logIn = `
       <h1> Please login</h1>
       User name: <input type="text" id="userName"><br><br>
       Password: <input type= "text" id= "password"><br><br>
       <input type="button" value="Login" onclick="loginDisplay()">`

    const myAnimation = `
    <div id= "animation"> welcome to liveliness </div>
    <textarea id = animationView"  rows="10" cols="30" stayle = "font-size:10px"> </textarea><br>
    <input type="button" value="Refresh Animation" onclick="refresh()">
    <input type="button" value="Logout" onclick="logout()">`

    const divDisplay = document.querySelector("#outlet");
    divDisplay.innerHTML = logIn;

    renderPage({ page: 'login' }, '/');
    function renderPage(state, url) {
        if (state.page === "login") {
            outlate.innerHTML = logIn;
            history.pushstate(state, null, url);
            addListener(state);
        }
        if (state.page === animation) {
            outlate.innerHTML = myAnimation;
            history.pushstate(state, null, url);
            addListener(state);
            fetchAnimation();
            fetchaddress();
        }
    }
    function addListener({ page }) {
        if (page === 'login') {
            document.querySelector('button').addEventListener('click, loginFunction');
        }
        if (page === 'animation') {
            document.querySelector('#refresh').addEventListener('click, fitchAnimation');
            document.querySelector('#logout').addEventListener('click, fitchAnimation');
        }
    }
function loginFunction(

}


