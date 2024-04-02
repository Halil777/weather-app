import { useEffect, useState } from "react";
import axios from "axios";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SevereColdIcon from "@mui/icons-material/SevereCold";
import AirIcon from "@mui/icons-material/Air";
import WaterIcon from "@mui/icons-material/Water";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Stack } from "@mui/material";
import "../style.css";
import DigitalClock from "../components/DigitalClocks";

const iconBtnStyle = {
  background: "#fff",
  color: "#000",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  fontSize: "12px",
  padding: "10px",
  cursor: "pointer",
};

const iconStyle = {
  fontSize: "120px",
};

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: "",
  });

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isDayTime = () => {
    const hours = time.getHours();
    return hours >= 6 && hours < 19;
  };

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=21c4f1ec7ef1490dd4e801e25b46c4f1&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = "";
          if (res.data.weather[0].main === "Clouds") {
            imagePath = <CloudIcon sx={iconStyle} />;
          } else if (res.data.weather[0].main === "Clear") {
            imagePath = <WbSunnyIcon sx={{ ...iconStyle, color: "yellow" }} />;
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = <ThunderstormIcon sx={iconStyle} />;
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = <CloudQueueIcon sx={iconStyle} />;
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = <SevereColdIcon sx={iconStyle} />;
          } else {
            imagePath = <WbSunnyIcon sx={{ ...iconStyle, color: "yellow" }} />;
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
    <div
      className="container"
      style={{
        background: isDayTime()
          ? "url(./images/cloud.png)"
          : "url(./images/back.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "cover",
      }}
    >
      <Stack
        direction={"row"}
        width={"100%"}
        justifyContent={"flex-end"}
        pr={10}
      >
        <DigitalClock />
      </Stack>
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <IconButton onClick={handleClick}>
            <SearchIcon sx={iconBtnStyle} />
          </IconButton>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="winfo">
          {data.image}
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <WaterIcon sx={{ fontSize: "60px" }} />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <AirIcon sx={{ fontSize: "50px" }} />
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
