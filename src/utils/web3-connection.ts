import { Connection } from '@solana/web3.js';

const connection = new Connection(
  'https://polished-fittest-gadget.solana-mainnet.quiknode.pro/c4070385d8f16e3616b2c70b7e1e63811153bcce/',
  'confirmed'
);

const quickNode = new Connection(
  'https://polished-fittest-gadget.solana-mainnet.quiknode.pro/c4070385d8f16e3616b2c70b7e1e63811153bcce/',
  'confirmed'
);

export { connection, quickNode };
