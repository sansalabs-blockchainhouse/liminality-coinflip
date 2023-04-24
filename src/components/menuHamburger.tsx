import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import cs from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { ConnectWallet } from './ConnectWallet';

interface MenuHamburgerProps {
  children: React.ReactNode;
}

const MenuHamburger = ({ children }: MenuHamburgerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className='uppercase p-4 md:hidden font-[32px]'
        onClick={() => setIsOpen(prev => !prev)}
      >
        <AiOutlineMenu size={30} />
      </button>
      {/* <AnimatePresence> */}
      {isOpen && (
        <div
          // initial={{ translateX: -100, opacity: 0 }}
          // animate={{ translateX: 0, opacity: 1 }}
          // exit={{ opacity: 0 }}
          className='teste'
        >
          {children}
          <ConnectWallet />
        </div>
      )}
      {/* </AnimatePresence> */}
    </>
  );
};

export default MenuHamburger;
