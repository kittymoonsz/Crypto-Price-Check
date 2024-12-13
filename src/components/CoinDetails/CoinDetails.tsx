import React from 'react';

interface CoinDetailsProps {
  type: 'main' | 'extra';
}

const CoinDetails = ({ type }: CoinDetailsProps) => {
  return (
    <div>
      <h3>{type === 'main' ? 'Main Coin Details' : 'Additional Details'}</h3>
      <p>Replace this with dynamic coin data.</p>
    </div>
  );
};

export default CoinDetails;

