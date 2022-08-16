import { useState } from "react";
import ScoreRow from "../ScoreRow";
import { NumberBlock } from "../ScoreRow/NumberBlock";
import "./index.css";
import { ScoreBox } from "./Scorebox";

const ColorMap = {
  yellow: "#fcba03",
  red: "#e04534",
  blue: "#5454c4",
  green: "#69b86f",
};

const Scores = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];
const GetScore = (value: number) => {
  return Scores[value];
};

const Scorecard: React.FC = () => {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [numStrikes, setNumStrikes] = useState(0);

  const fullScore = [score1, score2, score3, score4].reduce(
    (prev, current) => prev + GetScore(current),
    0
  ) - numStrikes * 5;
  if (fullScore === 312) {
    return <div className="penis">PENIS</div>;
  }
  return (
    <div className="scorecard-container">
      <div className="scorecard">
        <ScoreRow
          color={ColorMap["red"]}
          direction={"forwards"}
          setCount={setScore1}
        />
        <ScoreRow
          color={ColorMap["yellow"]}
          direction={"forwards"}
          setCount={setScore2}
        />
        <ScoreRow
          color={ColorMap["green"]}
          direction={"backwards"}
          setCount={setScore3}
        />
        <ScoreRow
          color={ColorMap["blue"]}
          direction={"backwards"}
          setCount={setScore4}
        />
      </div>
      <div className="strike-container">
        <div className="strikes">
        {[1, 2, 3, 4].map((n) => (
          <NumberBlock
            number={-1}
            color={""}
            state={numStrikes >= n ? "checked" : "open"}
            onClick={() => {
              if (numStrikes === n - 1) {
                setNumStrikes(n);
              }
              if (numStrikes === n) {
                setNumStrikes(n - 1);
              }
            }}
          />
        ))}
        </div>
      </div>
      <div className="score-box-container">
        <ScoreBox value={GetScore(score1)} color={ColorMap["red"]} />
        +
        <ScoreBox value={GetScore(score2)} color={ColorMap["yellow"]} />
        +
        <ScoreBox value={GetScore(score3)} color={ColorMap["green"]} />
        +
        <ScoreBox value={GetScore(score4)} color={ColorMap["blue"]} />
        -
        <ScoreBox value={5 * numStrikes} color={"lightgray"}/>
        =
        <ScoreBox value={fullScore} color="purple" />
      </div>
    </div>
  );
};

export default Scorecard;
