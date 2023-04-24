import Image from 'next/image';

import { Dispatch, SetStateAction } from 'react';

import { Tab } from '@headlessui/react';
import cs from 'classnames';

import { Solana } from '../icons/Solana';

interface BetTabsProps {
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
  availableBets?: number[];
  isSolana: boolean;
  selectedToken: any;
}

const BetTabs = ({
  selected,
  setSelected,
  availableBets = [0.05, 0.1, 0.25, 0.5, 0.75, 1],
  isSolana,
  selectedToken
}: BetTabsProps) => {
  console.log(selectedToken);
  return (
    <Tab.Group>
      <Tab.List className='flex flex-col items-center justify-between  gap-1 mx-auto w-full h-fit bg-[black] md:mx-0'>
        {availableBets.map(bet => (
          <Tab key={bet}>
            <button
              className={cs(
                'outline-none flex items-center gap-1 my-1 text-[16px] w-[110px] py-2 px-2 justify-end uppercase text-[#fff]',
                {
                  'bg-[#ff00b2] text-[white] outline-none': selected === bet
                }
              )}
              onClick={() => setSelected(bet)}
            >
              {bet}{' '}
              {selectedToken === 'KADA' && (
                <Image src='/kada.png' width={30} height={30} alt='kada token' />
              )}
              {selectedToken === 'BONK' && (
                <Image src='/bonk.jpeg' width={30} height={30} alt='kada token' />
              )}
              {isSolana && <Solana isSelected={selected === bet} />}
            </button>
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
};

export default BetTabs;
