import Box from './Box';

interface BoxContainerProps {
  data: {
    variation: string;
    token: string;
    price: string;
    volume: string;
    marketcap: string;
  };
}

const BoxContainer: React.FC<BoxContainerProps> = ({ data }) => (
  <div className="box-container">
    <Box title="Token" value={data.token} />
    <Box title="Variation" value={data.variation} />
    <Box title="Price" value={data.price} />
    <Box title="Volume" value={data.volume} />
    <Box title="Market Cap" value={data.marketcap} />
  </div>
);

export default BoxContainer;

