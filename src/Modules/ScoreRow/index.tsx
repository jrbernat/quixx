import { useEffect, useState } from "react";
import "./index.css";
import { NumberBlock } from "./NumberBlock";

interface ScoreRowProps {
  color: string;
  direction: "forwards" | "backwards";
  setCount: (val: number) => void;
}

const FORWARD = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0];
const BACKWARD = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 0];

export type BlockState = "checked" | "disabled" | "open";

const ScoreRow: React.FC<ScoreRowProps> = (props) => {
  const { color, direction, setCount } = props;
  const vals = direction === "forwards" ? FORWARD : BACKWARD;

  const [checkMap, setCheckMap] = useState<BlockState[]>(
    Array(12).fill("open")
  );

  const getCount = () => {
    return checkMap.reduce(
      (prev, current) => (current === "checked" ? prev + 1 : prev),
      0
    );
  };

  useEffect(() => {
    setCount(getCount());
  }, [checkMap]);

  const setChecked = (n: number) => {
    // only auto checked
    if (n === 11) return;

    if (checkMap[n] === "open") {
      let count = getCount();

      // need 5 checked
      if (n === 10 && count < 5) return;
      setCheckMap((p) => {
        let prev = [...p];
        prev.forEach((val, i) => {
          if (i < n) {
            if (val === "open") {
              prev[i] = "disabled";
            }
          }
          if (i === n) {
            if (n === 10) {
              prev[11] = "checked";
            }
            prev[i] = "checked";
          }
        });
        return [...prev];
      });
    }
    if (checkMap[n] === "checked") {
      let lastCheckedAll = -1;
      let lastCheckedSmaller = -1;
      checkMap.forEach((val, i) => {
        if (val === "checked") {
          if (i === 11) return;
          if (i < n) lastCheckedSmaller = i;
          lastCheckedAll = i;
        }
      });

      if (n < lastCheckedAll) return;

      setCheckMap((p) => {
        let prev = [...p]
        prev.forEach((val, i) => {
          if (i > lastCheckedSmaller && i < n) {
            prev[i] = "open";
          }
          if (i === n) prev[i] = "open";
        });
        prev[11] = "open"
        return [...prev];
      });
    }
  };

  return (
    <div className="score-row-container" style={{ backgroundColor: color }}>
      <div className="score-row">
        {vals.map((n, i) => (
          <NumberBlock
            color={color}
            number={n}
            onClick={() => setChecked(i)}
            state={checkMap[i]}
          />
        ))}
      </div>
    </div>
  );
};

export default ScoreRow;
