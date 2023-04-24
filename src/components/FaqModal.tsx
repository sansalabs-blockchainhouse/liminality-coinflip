import React from 'react';

import { Discord } from '../icons/Discord';
import { Twitter } from '../icons/Twitter';

interface ModalProps {
  visible: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose: React.ReactEventHandler<{}>;
}

export default function FaqModal({ visible, onClose }: ModalProps) {
  if (!visible) return null;
  //
  return (
    <div className='fixed inset-0 bg-black/50 font-text text-black backdrop-blur-sm flex justify-center items-center z-40'>
      <div className='flex pl-5 gap-10 h-[400px] flex-col max-w-2xl rounded-lg justify-start bg-[#712ea1]/90 pr-7 py-2 bg-opacity-80 backdrop-blur-sm overflow-y-scroll snap-start scrollbar-thumb-gray-500 scrollbar-thin'>
        <div className='z-50 pt-4 font-text flex items-center justify-between text-[#FFFF00] text-[20px] md:text-[32px]'>
          <h1 className='font-body'>
            Space<span className='text-white font-body'>Degen</span>
          </h1>
          <div className='flex flex-row gap-5'>
            <a className='pointer' href='#'>
              <Discord />
            </a>
            {/* <a className='pointer' href='#'>
              <Twitter />
            </a> */}
          </div>
          <button
            onClick={onClose}
            className=' text-white bg-red-600 px-3 py-[2px] rounded text-[20px] hover:bg-red-700 max-w-[50px]'
          >
            X
          </button>
        </div>
        <div>
          <h3 className='text-[1.2rem] text-white'>Why Space Degen Coinflip?</h3>
          <p className='text-zinc-300'>
            We wanted to create a Coinflip game where Flippers could use their Atlas and Polis
            tokens to play, hence Space Degen Coinflip. Odds are 50/50 with a 5% fee.
          </p>
        </div>
        <div>
          <h3 className='text-[1.2rem] text-white'>How do I get ahold of Space Degen Coinflip?</h3>
          <p className='text-zinc-300'>
            Join our{' '}
            <span className='font-bold uppercase bg-red-500 px-2 py-[2px] rounded-sm text-white text-[16px]'>
              <a href=''>Discord</a>
            </span>{' '}
            group for more info, assistance or whatever.
          </p>
        </div>
        <div>
          <h3 className='text-[1.2rem] text-white'>
            What does the future hold for Space Degen Coinflip?
          </h3>
          <p className='text-zinc-300'>
            Look for other space themed web3 tokens here shortly as well as our Affiliate Network
            coming soon!
          </p>
        </div>
        <div>
          <h3 className='text-[1.2rem] text-white'>How To Play</h3>
          <p className='text-zinc-300'>1. Connect your Phantom Wallet</p>
          <p className='text-zinc-300'>2. Pick either heads or tails</p>
          <p className='text-zinc-300'>3. Select your desired token and flip amount</p>
          <p className='text-zinc-300'>4. Click “Flip”</p>
          <p className='text-zinc-300'>5. Click approve and wait for coin to spin</p>
        </div>
        <div>
          <h3 className='text-[1.2rem] text-white'>RESPONSIBLE FLIPPING</h3>
          <p className='text-zinc-300'>
            Have fun but please only play with tokens you can afford to part with.{' '}
          </p>
        </div>
        <div>
          <h3 className='text-[1.2rem] text-white'>ASSISTANCE</h3>
          <p className='text-zinc-300'>Call 1-800-522-4700</p>
          <p className='text-zinc-300'>Chat ncpgambling.org/chat</p>
          <p className='text-zinc-300'>Text 1-800-522-4700</p>
        </div>
      </div>
    </div>
    // </div>
  );
}
