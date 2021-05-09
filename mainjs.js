//Putting function right when window load to give realtime 
window.addEventListener('load', ()=>{
    //Declaring all the variable used; 
    let lon;
    let lat;
    let tempdes = document.querySelector('.temperature-description');
    let tempdeg = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');


    //Putting the main function in if statement because if browser dont support or allow we have the answer on the web page :D 

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            //Putting the longitue and latitude of current location into variables
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(lon)
            
            //Using proxy because OpenWeather may not support local host
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const proxy2 = 'http://gobetween.oklabs.org/'

            //Getting the api form OpenWeatherMap by putting the longitude and latitude in the adress along with api id
            const api = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8722d128142ac877fc347d0a2ea8829b`;

            //Fetching the API
            fetch(api)
            .then(response =>{
                return response.json();
            
            })
            .then(data =>{
                //Displaying all the data we got from api in console log
                console.log(data);
                //set DOM elements from the API
                const currentTemperature =data.main.temp - 273.15;
                const currentDescription = data.weather[0].description;
                const currentTimezone = data.name;
                tempdeg.textContent = currentTemperature.toFixed(2);
                tempdes.textContent = currentDescription.charAt(0).toUpperCase() + currentDescription.slice(1);
                locationTimezone.textContent = currentTimezone;

                setIcons('PARTLY_CLOUDY_DAY', document.querySelector('.icon'))
                
                //Change temperature to celsius or fareheit


            })
        });

         
    }
    else{
        //If the funciton wont work then this will happen
        locationTimezone.textContent = "Your browser dont support this funtion;<br> Or browser don't have permission to access the location"
    }

    // //Setting the animater icon for the weather type
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"})
        const currentIcon = 'PARTLY_CLOUDY_DAY';
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
    temperatureSection.addEventListener('click', () =>{
        if(temperatureSpan.textContent === "F"){
            temperatureSpan.textContent = "C";
            // tempdeg.textContent = RealTemp;
            tempdeg.textContent = (tempdeg.textContent - 32)/1.8;   
            let RealTemp = tempdeg.textContent;
            let float = parseFloat(RealTemp);
            tempdeg.textContent = float.toFixed(2);

        }
        else{
            temperatureSpan.textContent = "F";
            tempdeg.textContent = 1.8 * tempdeg.textContent + 32;
            let RealTemp = tempdeg.textContent;
            let float = parseFloat(RealTemp);
            tempdeg.textContent = float.toFixed(2);
        }
    })
    

})

