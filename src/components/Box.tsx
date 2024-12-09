interface BoxProps {
  title: string;
  value: string;
}

const Box: React.FC<BoxProps> = ({ title, value }) => (
  <div className="box">
    <h3>{title}</h3>
    <div className="value-box">{value}</div>
  </div>
);

export default Box;

