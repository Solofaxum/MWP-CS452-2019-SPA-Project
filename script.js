

window.onload = function singlePageApp() {


    let animationId, pass, user;
    //personal API locationlocation API key
    let myLocation = "O3z20eyf8ZaJpI88gkhQQbhe2MpIo1lC";
    //Token state id: indicator of user correctly logged in or not.
    let tokenn = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjciLCJ1c2VybmFtZSI6Im13cCJ9.U9ciwh5lcPwFlJdxhNQkeiMc7AMYAnawfKNidw8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA`



    //Login page 
    const loginTemp = `
       <div id="center" rows="30" cols="50" stayle = "font-size:10px">
       <link rel="stylesheet" href="css.css">
       <h1> Please login</h1>
       Username: <input type="text" id="userName" placeholder="Enter your username"><br><br>
       Password: <input type= "text" id= "passWord" placeholder="Enter your password"><br><br>
       <input type="button" id="Login1" value="LogIn""></div>`


    //Animation page 
    const animationTemp = `
         <link rel="stylesheet" href="css.css">
         <h1 id= "animation"> </h1>
         <div class ="animate-page"> The World of Animation: Click Refresh and Enjoy! </div>
         <textarea id = "animationView"  rows="30" cols="50" stayle = "font-size:10px"></textarea><br>
         <button type="button" id="animationn"  >Refresh</button>
         <input type="button" id="Logg" value="LogOut">`


    //login template creation 
    const mainDiv = document.querySelector("#outlet");
    mainDiv.innerHTML = loginTemp;

    //add listner to login button
    let callLog = document.querySelector("#Login1");
    callLog.addEventListener("click", login);
    logFunc()
    //login function
    function login() {
        //securing the login page
        user = document.getElementById("userName").value;
        pass = document.getElementById('passWord').value;
        if (user === 'mwp' && pass === '123') {
            alert("you are logedin")
            mainDiv.innerHTML = animationTemp;
            //handling the history changes
            history.pushState({loginTemp:1}, "title", "index.html")
            window.addEventListener("popstate", function(event){
                if (event.state.loginTemp===1){
                    clearInterval(animationId)
                    logFunc()
            }
        })
            logOutFunc();
            fetchLocation();
            fitchLoging();
            animationArray();
           fitchAnimation();
            document.getElementById("animationn").addEventListener("click", animationArray);
        } else {
            alert('user name or password is not correct')
        
        }
    }
    //back to login page and using addlistner to go back again to animation page
    function logFunc() {

        clearInterval(animationId);
        mainDiv.innerHTML = loginTemp;
        let callLog = document.querySelector("#Login1");
        callLog.addEventListener("click", login);
        history.pushState(loginTemp, "title", "index.html")
    }

    //add listner to logout button and refresh button
    function logOutFunc() {

        const logout = document.querySelector("#Logg");
        logout.addEventListener("click", logFunc);
        document.getElementById("animationn").addEventListener("click", animationArray);
    }

    //fetching geolocation API Key
    async function fetchLocation() {

        navigator.geolocation.getCurrentPosition(success, fail)

        async function success(position) {

            console.log(position);
            //finding personal location position
            const Longitude = position.coords.longitude;
            const Latitude = position.coords.latitude;

            let response = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${myLocation}&location=${Latitude},${Longitude}&includeRoadMetadata=true&includeNearestIntersection=true`)
            response = await response.json()
            const city = response.results[0].locations[0].adminArea5;
            const state = response.results[0].locations[0].adminArea3;
            const country = response.results[0].locations[0].adminArea1;
            let outPut = `Welcome all from ${city} , ${state}, ${country}!`;
            let result = document.querySelector("#animation");
            result.innerHTML = outPut;

        }

        async function fail() {
            document.querySelector("#animation").innerHTML = `Well Come anonymous`;
        }
    }


    //login status state: whether users are logged in or not
    async function fitchLoging() {

        let response = await fetch('http://mumstudents.org/api/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    "username": "mwp",
                    "password": "123"
                })
            });

        const respData = await response.json();
        const myToken = respData.token;
        console.log(myToken);
    }


    //fetching the available Animation ID with the help of personal users token.
    async function fitchAnimation() {

        const response = await fetch('http://mumstudents.org/api/animation',
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${tokenn}`
                }
            })

        const animation = await response.text();
        console.log(animation);
        return animation;
    }


    // changing available Datas in to separated array and animate with settime interval
    function animationArray() {
        //clear the setInterval time
        clearInterval(animationId);
        console.log(fitchAnimation());
        fitchAnimation().then(animate => {
            const frames = animate.split('=====\n')
            history.pushState(frames, document.title, "index.html")
            const framesLength = frames.length;
            let currentFrame = 0;
            animationId = setInterval(() => {
                document.querySelector('#animationView').value = frames[currentFrame];
                currentFrame++;
                if (currentFrame === framesLength)
                    currentFrame = 0;
            }, 200)
        });

    };

    //adding rout contron system
    window.addEventListener("popstate", () => {
        let currentFrame = 0;
        clearInterval(animationId);
        animationId = setInterval(() => {
            document.querySelector('#animationView').value = history.state[currentFrame];
            currentFrame++;
            if (currentFrame === framesLength)
                currentFrame = 0;
        }, 200)

    })

}



