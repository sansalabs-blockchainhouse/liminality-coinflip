import { Connection } from '@solana/web3.js';

const connection = new Connection(
  'https://fabled-magical-panorama.solana-mainnet.discover.quiknode.pro/2af224eaab7cf91c93d2aa1a62b0d8cea5b3d33e/',
  'confirmed'
);

const quickNode = new Connection(
  'https://fabled-magical-panorama.solana-mainnet.discover.quiknode.pro/2af224eaab7cf91c93d2aa1a62b0d8cea5b3d33e/',
  'confirmed'
);

export { connection, quickNode };
