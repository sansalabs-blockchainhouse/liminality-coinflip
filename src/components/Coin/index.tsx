import { Dispatch, SetStateAction, useEffect } from 'react';

import { FlippingCoin } from './FlippingCoin';
import { StoppedCoin } from './StoppedCoin';

interface CoinProps {
  isFlipping: boolean;
  flipResult: 'HEADS' | 'TAILS' | undefined;
  setFlipResult: Dispatch<SetStateAction<undefined | 'HEADS' | 'TAILS'>>;
}

const Coin = ({ isFlipping, flipResult, setFlipResult }: CoinProps) => {
  useEffect(() => {
    if (flipResult) {
      console.log('rodando');
      setTimeout(() => setFlipResult(undefined), 2000);
      console.log('rodei');
    }
  }, [flipResult, setFlipResult]);

  return (
    <>
      {flipResult ? (
        <StoppedCoin flipResult={flipResult} />
      ) : (
        <FlippingCoin isFlipping={isFlipping} />
      )}
    </>
  );
};

export { Coin };
