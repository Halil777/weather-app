import { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness2Icon from "@mui/icons-material/Brightness2";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isDayTime = () => {
    const hours = time.getHours();
    return hours >= 6 && hours < 18;
  };

  return (
    <>
      <Stack spacing={1} alignItems="center">
        {isDayTime() ? (
          <WbSunnyIcon sx={{ color: "orange", fontSize: "45px" }} />
        ) : (
          <Brightness2Icon sx={{ color: "orange", fontSize: "45px" }} />
        )}
        <Typography variant="h5" color="#fff">
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </Typography>
      </Stack>
    </>
  );
};

export default DigitalClock;
