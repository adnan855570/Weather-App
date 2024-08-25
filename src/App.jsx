import { useState } from "react";
import "./App.css";
import Highlights from "./components/Highlights";
import Temprature from "./components/Temperature";
import { useEffect } from "react";

function App() {
  // setting states
  const [city, setCity] = useState("Attock");
  const [weatherData, setWeatherData] = useState(null);
  // api url
  const apiURL = `https://api.weatherapi.com/v1/current.json?key=d32e444e520746a7805223829242308&q=${city}&aqi=no`;

  // calling api
  useEffect(() => {
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch(() => {
        console.log(e);
      });
  }, [city]);
  return (
    <div className="bg-[#1F213A] h-screen flex justify-center align-top">
      {/* left container  */}
      <div className="mt-40 w-1/3 h-1/3">
        {/* if weatherdata is available we will render the Temprature otherwise we will wait for its availability so that our app does not crash  */}
        {weatherData && (
          <Temprature
            setCity={setCity}
            stats={{
              temp: weatherData.current.temp_c,
              condition: weatherData.current.condition.text,
              isDay: weatherData.is_day,
              location: weatherData.location.name,
              time: weatherData.location.localtime,
            }}
          />
        )}
      </div>
      {/* Right container  */}
      <div className="mt-40 w-1/5 h-1/3 p-10 grid grid-cols-2 gap-6">
        <h2 className="text-slate-200 text-2xl col-span-2">
          Today's Highlights
        </h2>
        {weatherData && (
          <>
            <Highlights
              stats={{
                title: "Wind Status",
                value: weatherData.current.wind_mph,
                unit: "mph",
                direction: weatherData.current.wind_dir,
              }}
            />
            <Highlights
              stats={{
                title: "Humidity",
                value: weatherData.current.humidity,
                unit: "%",
              }}
            />
            <Highlights
              stats={{
                title: "Visibility",
                value: weatherData.current.vis_miles,
                unit: "miles",
              }}
            />
            <Highlights
              stats={{
                title: "Air Pressure",
                value: weatherData.current.pressure_mb,
                unit: "mb",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
