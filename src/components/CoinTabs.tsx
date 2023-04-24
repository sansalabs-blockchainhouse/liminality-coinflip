import { Tab } from '@headlessui/react';
import cs from 'classnames';

interface CoinTabsProps {
  selectedCoinTab: number;
  setSelectedCoinTab: (value: number) => void;
}

const CoinTabs = ({ selectedCoinTab, setSelectedCoinTab }: CoinTabsProps) => {
  return (
    <Tab.Group selectedIndex={selectedCoinTab} onChange={setSelectedCoinTab}>
      <Tab.List className='flex flex-col gap-2 p-1 px-1 mx-auto w-[120px] h-fit bg-black md:mx-0'>
        <Tab>
          {({ selected }) => (
            <button
              className={cs('w-full h-full py-2 uppercase text-[#fff]', {
                'bg-[#ff00b2] text-[white]': selected
              })}
            >
              Heads
            </button>
          )}
        </Tab>
        <Tab>
          {({ selected }) => (
            <button
              className={cs('w-full h-full py-2 uppercase text-[#fff]', {
                'bg-[#ff00b2] text-[black]': selected
              })}
            >
              Tails
            </button>
          )}
        </Tab>
      </Tab.List>
    </Tab.Group>
  );
};

export default CoinTabs;
