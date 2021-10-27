

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Circle = ({ number=66, color="red" }) => {
  return (
    <>
      <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar
          value={(number / 2500) * 100}
          text={`${Math.round((number / 2500) * 100)}%`}
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",

            // Text size
            textSize: "16px",

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: color,
            textColor: color,
            trailColor: "#d6d6d6",
          })}
        />
        ;
      </div>
    </>
  );
};

export default Circle;