// Create button event
let button = document.getElementById("newWeatherBtn")
// Trigger event when button is clicked
button.addEventListener("click", changeText)

// Async function which will complete API request.
// Then parses the API response to return an OBJECT.

async function returnWeather() {
    console.log("Fetch request is running...");

    try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&daily=weathercode,temperature_2m_max,temperature_2m_min,rain_sum,precipitation_hours&temperature_unit=fahrenheit&timezone=GMT");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to pass in the API result.
// Generate todays date.
async function changeText(){
    // Take returnWeather Function and store as variable
    const newText = await returnWeather();

    const todayDate = new Date();
    date.textContent = todayDate;
    // If temperature is above 60 fahrenheit, change image to "sun"
    if (newText.daily.temperature_2m_max[0] > 60){
        let imageChange = document.getElementById("gif")
        imageChange.src = "./images/sun.gif"
    }
    // else keep current image

    // Parse API data and return new, required variables.
    let minTempOne = newText.daily.temperature_2m_min[0]
    let rainSum = newText.daily.rain_sum[0]
    let precipitationHours = newText.daily.precipitation_hours[0]
    let maxTempOne = newText.daily.temperature_2m_max[0]

    // Target where the weather information is going.
    let weatherLineOne = document.getElementById("weatherLineOne")
    let weatherLineTwo = document.getElementById("weatherLineTwo")
    let weatherLineThree = document.getElementById("weatherLineThree")
    let weatherLineFour = document.getElementById("weatherLineFour")

    // Variables to store weather info so we can console log easier too. 
    let temptStatement = `Today's maxmimum temperature will be ${maxTempOne} degree's fehrenheit. The minimum will be ${minTempOne} fehrenheit`;
    let temptStatement2 = `The minimum will be ${minTempOne} fehrenheit`;
    let rainStatement = `The rain sum will be ${rainSum} mm`
    let precipitationHrs = `The minimum precipitation hours will be ${precipitationHours} hours`

    // Ammend the text content in the HTML document with above results.
    weatherLineOne.textContent = temptStatement
    weatherLineTwo.textContent = temptStatement2;
    weatherLineThree.textContent = rainStatement;
    weatherLineFour.textContent = precipitationHrs;

    console.log(temptStatement);
    console.log(temptStatement2);
    console.log(rainStatement);
    console.log(precipitationHours);


}