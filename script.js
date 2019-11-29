

window.onload = function singlePageApp() {
    let picAni = `
    
     o
    /#\
    _|_
   =====
    \o/
     #
   _/ \_
    `;
    let framesLength;
    let tokenn, animationId;
    let myLocation = "O3z20eyf8ZaJpI88gkhQQbhe2MpIo1lC";

    const logInPage = `
    <link rel="stylesheet" href="css.css">
       <h1> Please login</h1>
       User name: <input type="text" id="userName" value="mwp"><br><br>
       Password: <input type= "text" id= "password" value= "123"><br><br>
       <input type="button" id="Login1" value="LogIn"">`

    const myAnimation = `
    <link rel="stylesheet" href="css.css">
    <h1 id= "animation"> </h1>
    <div class ="animate-page"> The World of Animation: Click Refresh and Enjoy! </div>
    <textarea id = "animationView"  rows="30" cols="50" stayle = "font-size:10px"></textarea><br>
    <button type="button" id="animationn"  >Refresh</button>
    <input type="button" id="Logg" value="LogOut">`

    const myDiv = document.querySelector("#outlet");
    myDiv.innerHTML = logInPage;

    let log = document.querySelector("#Login1");
    log.addEventListener("click", login);

    function login() {

        myDiv.innerHTML = myAnimation;
        logOutFunc();
        fetchLocation()
        fitchLoging()
        fitchAnimation();
    }

    function logFunc() {

        myDiv.innerHTML = logInPage;
        animationss();
    }

    function logOutFunc() {
        const frames = picAni.split('=====')
        const framesLength = frames.length;
        let currentFrame = 0;

        const logout = document.querySelector("#Logg");
        logout.addEventListener("click", logFunc);


        document.getElementById("animationn").addEventListener("click", function () {
            console.log(fitchAnimation());
            fitchAnimation().then(reso => {
                const frames = reso.split('=====\n')
                const framesLength = frames.length;
                let currentFrame = 0;
                animationId = setInterval(() => {
                    document.querySelector('#animationView').value = frames[currentFrame];
                    currentFrame++;
                    if (currentFrame === framesLength)
                        currentFrame = 0;
                }, 200)
            });

        });

    }

    async function fetchLocation() {
        navigator.geolocation.getCurrentPosition(success, fail)

        async function success(position) {
            console.log(position);

            const Longitude = position.coords.longitude;
            const Latitude = position.coords.latitude;


            let response = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${myLocation}&location=${Latitude},${Longitude}&includeRoadMetadata=true&includeNearestIntersection=true`)
            response = await response.json()
            const city = response.results[0].locations[0].adminArea5;
            const state = response.results[0].locations[0].adminArea3;
            const country = response.results[0].locations[0].adminArea1;
            const zipCode = response.results[0].locations[0].postalCode;

            let outPut = `Well Come all from ${city} , ${state}, ${country}, ${zipCode}`;
            let result = document.querySelector("#animation");
            result.innerHTML = outPut;

        }
        function fail() {
            document.querySelector("#animation").innerHTML = `Well Come anonymous`;
        }
    }

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

    }


    tokenn = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjciLCJ1c2VybmFtZSI6Im13cCJ9.U9ciwh5lcPwFlJdxhNQkeiMc7AMYAnawfKNidw8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA`

    async function fitchAnimation() {
        if (animationId) clearInterval(animationId);
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

}



