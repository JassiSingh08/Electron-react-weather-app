import React, { useEffect, useState } from "react";

const Weather = () => {
  const [country, setCountry] = useState(""); 
  const [weatherData, setWeatherData] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false); 
  const [error, setError] = useState("");

  const handleWeather = async () => {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=672987df33ee4f6a89874739231710&q=${country}&aqi=no`; // Replace with your API key

    try {
      const res = await fetch(apiUrl);

      if (!res.ok) {
        setError("Country not found!");
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setError("");
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (buttonPressed) {
      handleWeather();
    }
    // eslint-disable-next-line
  }, [buttonPressed]);

  const handleSubmit = () => {
    setButtonPressed(true);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleWeather();
    }
  };

  return (
    <div className="p-6 italic flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold">Today's Weather</h2>
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="text"
          className="border rounded p-3 w-64 text-black uppercase"
          placeholder="Enter country name"
          onChange={(e) => setCountry(e.target.value)}
          onKeyDown={handleEnterPress}
        />
        <button
          className="bg-blue-500 text-white rounded-full text-l p-4"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      {error
        ? `${error}`
        : weatherData && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-center">
                Weather for {weatherData.location.name},{" "}
                {weatherData.location.country}
              </h3>
              <p className="text-xl text-center">
                Temperature: {weatherData.current.temp_c} °C
              </p>
              <p className="text-xl text-center">
                Weather: {weatherData.current.condition.text}
              </p>
              <img
                src={`https:${weatherData.current.condition.icon}`}
                alt="Weather Icon"
                className="mx-auto"
              />
            </div>
          )}
    </div>
  );
};

export default Weather;
