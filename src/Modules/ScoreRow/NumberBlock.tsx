import { Icon } from "@blueprintjs/core";
import { BlockState } from ".";

interface NumberBlockProps {
  number: number;
  color: string;
  state: BlockState;
  onClick: () => void;
}

export const NumberBlock: React.FC<NumberBlockProps> = (props) => {
  const { number, color, state, onClick } = props;
  const renderText = () => {
    if (number === -1) {
        return "";
    }
    if (state === "open" || state === "checked") {
      return number === 0 ? (
        <Icon icon="lock" color={state === "checked" ? "white" : "black"} />
      ) : (
        number
      );
    }
    if (state === "disabled") {
      return "";
    }
  };

  let backcolor = state === "checked" ? "black" : undefined;
  if (number === -1 && state ==="checked") backcolor = "red";
  return (
    <div
      className="number-block"
      onClick={onClick}
      style={{
        color: color,
        backgroundColor: backcolor,
      }}
      key={number}
    >
      {renderText()}
    </div>
  );
};
