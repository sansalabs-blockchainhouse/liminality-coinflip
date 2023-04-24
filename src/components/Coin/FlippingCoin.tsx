import { motion } from 'framer-motion';

interface FlippingCoinProps {
  isFlipping: boolean;
}

const spin = {
  initial: {
    rotateY: 0
  },
  animate: {
    rotateY: 360
  }
};

const FlippingCoin = ({ isFlipping }: FlippingCoinProps) => {
  return (
    <motion.div className='p-[20px] bg-center rounded-full z-0'>
      <motion.div
        className='text-md coin md:text-[2rem] border-[1px solid #f00]'
        key={String(isFlipping)}
        transition={{
          duration: isFlipping ? 0.5 : 5, // VELOCIDADE DA ANIMACAO
          ease: 'linear',
          repeat: 1000,
          repeatType: 'loop'
        }}
        initial='initial'
        animate='animate'
        variants={spin}
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

export { FlippingCoin };
