import React from 'react';

const ButtonRaffle = () => {
  return (
    <div className='flex justify-center items-center'>
      <button className='uppercase border border-white px-6 ease-in duration-100 py-2 hover:bg-white hover:text-black'>
        <a href='https://raffle.aventar.io/calendar' target='_blank' rel='noreferrer noopener'>
          RaffleHouse
        </a>
      </button>
    </div>
  );
};

export { ButtonRaffle };
