import { motion } from 'framer-motion';

interface StoppedCoinProps {
  flipResult: 'HEADS' | 'TAILS' | undefined;
}

const StoppedCoin = ({ flipResult }: StoppedCoinProps) => {
  return (
    <motion.div className='p-[20px] bg-center rounded-full'>
      <motion.div
        className='text-md coin md:text-[2rem]'
        initial={flipResult === 'HEADS' ? { rotateY: 0 } : { rotateY: 180 }}
      >
        <div className='coin-front'>
          <div className='depth-front'>
            <img src='/HEAD.png' alt='HEADS' />
          </div>
        </div>

        <div className='coin-middle'></div>

        <div className='coin-back'>
          <div className='depth-back'>
            <img src='/TAIL.png' alt='TAILS' />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export { StoppedCoin };
