import Image from 'next/image';

import { Dispatch, Fragment, SetStateAction } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

import { currencies } from '../constants/currencies';
import { Solana } from '../icons/Solana';

type Currencies = typeof currencies;

interface SelectCurrencyProps {
  selectedCurrency: string;
  setSelectedCurrency: Dispatch<SetStateAction<string>>;
  currencies: Currencies;
}

const SelectCurrency = ({
  selectedCurrency,
  setSelectedCurrency,
  currencies
}: SelectCurrencyProps) => {
  return (
    <div className='w-full max-w-[157px] h-[44px] rounded-lg'>
      <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
        <div className='relative h-full'>
          <Listbox.Button className='relative w-[157px] h-full p-[4px] pr-10 text-left cursor-pointer border border-white'>
            <span className='flex items-center h-full gap-1 pl-2 text-black uppercase truncate bg-white'>
              {selectedCurrency === 'KADA' && (
                <Image src='/kada.png' width={30} height={30} alt='kada token' />
              )}
              {selectedCurrency === 'BONK' && (
                <Image src='/bonk.jpeg' width={30} height={30} alt='kada token' />
              )}
              {selectedCurrency === 'SOL' && <Solana isSelected />}

              {selectedCurrency}
            </span>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <SelectorIcon className='w-5 h-5 text-white' aria-hidden='true' />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base shadow-lg bg-[#2c2d30] max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {currencies.map(token => (
                <Listbox.Option
                  key={token.mintAddress}
                  disabled={selectedCurrency === token.value}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-[#ff00b2]' : 'text-white'
                    }`
                  }
                  value={token.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium ' : 'font-normal'}`}
                      >
                        {token.value === 'SOL' && '$'}
                        {token.value}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[black]'>
                          <CheckIcon className='w-5 h-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectCurrency;
