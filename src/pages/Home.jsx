import { useState, useEffect } from "react";
import axios from "axios";
import "../style.css";

function Home() {
  const [temp, setTemp] = useState("55");
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: "",
  });

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=21c4f1ec7ef1490dd4e801e25b46c4f1&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = "";
          if (res.data.weather[0].main === "Clouds") {
            imagePath = "/images/cloud.png";
          } else if (res.data.weather[0].main === "Clear") {
            imagePath = "/images/cloud1.png";
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = "/images/cloud2.png";
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = "/images/cloud.png";
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = "/images/cloud1.png";
          } else {
            imagePath = "/images/cloud2.png";
          }
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("Invalid City Name");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleClick}>
            <img src="/images/search.png" alt="search png" />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="winfo">
          <img
            src={temp >= 22 ? "/images/cloud2.png" : "/images/cloud.png"}
            style={{ width: "100%" }}
            alt="cloud png"
          />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/images/humidity.png" alt="humidity" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/images/wind.png" alt="wind" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
