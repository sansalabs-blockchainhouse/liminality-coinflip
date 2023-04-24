import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { useState } from 'react';
import toast from 'react-hot-toast';

import { useWallet } from '@solana/wallet-adapter-react';
import { formatDistance } from 'date-fns';

import { Coin } from '../components/Coin';
import { ConnectWallet } from '../components/ConnectWallet';
import MenuHamburger from '../components/menuHamburger';
import { ButtonRaffle } from '../components/RaffleHouse';
import { currencies } from '../constants/currencies';
import { useFlip } from '../hooks/mutations/useFlip';
import { useHistory } from '../hooks/useHistory';
import { Discord } from '../icons/Discord';
import { Twitter } from '../icons/Twitter';
import { formatWallet } from '../utils/formatWallet';

const LazyBetTabs = dynamic(() => import('../components/BetTabs'), {
  ssr: false
});

const LazyCoinTabs = dynamic(() => import('../components/CoinTabs'), {
  ssr: false
});

const LazySelectCurrency = dynamic(() => import('../components/SelectCurrency'), {
  ssr: false
});

const Home: NextPage = () => {
  const { connected } = useWallet();
  const flipMutation = useFlip();
  const { data: history, isLoading } = useHistory();

  const [selectedBetAmount, setSelectedBetAmount] = useState(0.05);
  const [selectedCoinSide, setSelectedCoinSide] = useState(0);
  const [selectedToken, setSelectedToken] = useState(currencies[0].value);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipResult, setFlipResult] = useState<undefined | 'HEADS' | 'TAILS'>(undefined);
  const [showFaqModal, setShowFaqModal] = useState(false);

  const handleOnClose = () => setShowFaqModal(false);

  async function handleFlip() {
    if (!connected) {
      return toast.error('Please connect your wallet');
    }

    flipMutation.mutate({
      setFlipResult: setFlipResult,
      isFlipping: setIsFlipping,
      selectedToken,
      selectedBetAmount,
      selectedCoinSide
    });
  }

  return (
    <>
      {/* HEADER */}
      <div className='flex items-center bg-[transparent] h-[72px] justify-between mb-6'>
        <div className='pl-2 flex justify-center items-center gap-40'>
          <Image src='/logo.gif' width={225} height={75} />
        </div>
        <div className='hidden gap-1 md:gap-5 md:flex '>
          <LazySelectCurrency
            selectedCurrency={selectedToken}
            setSelectedCurrency={setSelectedToken}
            currencies={currencies}
          />
          <ConnectWallet />
        </div>
        <MenuHamburger>
          <LazySelectCurrency
            selectedCurrency={selectedToken}
            setSelectedCurrency={setSelectedToken}
            currencies={currencies}
          />
        </MenuHamburger>
      </div>
      <div className='flex flex-col w-full h-full max-w-[600px] md:px-4 mx-auto '>
        <div className='flex items-center justify-between w-full bg-transparent h-full gap-[20px] md:flex-row md:justify-between'>
          <div className='flex flex-col order-2 w-[120px] gap-[12px] md:gap-[2rem] self-start h-full '>
            {/* APOSTAS */}
            <LazyBetTabs
              selected={selectedBetAmount}
              setSelected={setSelectedBetAmount}
              availableBets={currencies.find(token => token.value === selectedToken)?.betValues}
              isSolana={selectedToken === 'SOL'}
              selectedToken={selectedToken}
            />
            {/* LADO DA MOEDA E SELECT */}
            <LazyCoinTabs
              selectedCoinTab={selectedCoinSide}
              setSelectedCoinTab={setSelectedCoinSide}
            />
            <button
              className='p-3 mt-auto text-[20px] border border-white text-white font-bold bg-black uppercase transition ease-in-out  hover:bg-[#ff00b2] hover:border-[#ff00b2] hover:text-white disabled:cursor-not-allowed'
              onClick={handleFlip}
              disabled={flipMutation.isLoading}
            >
              FLIP
            </button>

            {/* </div> */}
          </div>

          <div className='flex  flex-col items-center justify-center h-full gap-10 md:order-2'>
            {' '}
            <Coin isFlipping={isFlipping} flipResult={flipResult} setFlipResult={setFlipResult} />
          </div>
        </div>
        {/* RECENT */}
        <div className='flex flex-col w-full h-full mx-auto mt-[32px] bg-[#000] lg:mx-0 rounded'>
          <div className='w-full flex justify-end items-center p-4 px-6 rounded-t-[10px]  border-b border-[#ff00b2] '>
            <h4 className='text-lg font-bold text-[#ff00b2] uppercase font-text'>Recent Plays</h4>
          </div>
          <div className='w-full rounded-b-[10px] p-3 backdrop:blur-lg'>
            {isLoading && <p>Loading...</p>}

            {history?.slice(0, 5)?.map((flip, index) => {
              const tokenName = currencies.find(token => token.mintAddress === flip.token)?.value;
              return (
                <div
                  className='flex items-center justify-between w-full my-4  last:mb-0 border-b border-[#6D605D]/60 pb-3'
                  key={index}
                >
                  <div className='flex items-center gap-2'>
                    <span className='text-xs uppercase min-w-[80px] text-[#F6EFDF] font-bold '>
                      {formatWallet(flip.wallet)}
                    </span>
                    <span className='text-[10px] uppercase font-thin text-[#ff00b2] min-w-[40px]'>
                      flipped
                    </span>
                    <span className='text-[10px] uppercase min-w-[55px] font-bold text-[#F6EFDF]'>
                      {flip.amount} {tokenName}
                    </span>
                    <span className='text-[10px] uppercase font-thin text-[#ff00b2]'>
                      and {flip.win ? 'won' : 'lost'}
                    </span>
                  </div>
                  <span className='h-full text-[10px] uppercase font-thin text-[#ff00b2]'>
                    {formatDistance(new Date(), new Date(flip.updatedAt), { addSuffix: false })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
