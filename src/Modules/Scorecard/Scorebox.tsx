interface ScoreBoxProps {
  value: number;
  color: string;
}

export const ScoreBox: React.FC<ScoreBoxProps> = (props) => {
  const { value, color } = props;
  return (
    <div className="score-box" style={{ backgroundColor: color }}>
      {value}
    </div>
  );
};
