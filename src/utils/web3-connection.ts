import { Connection } from '@solana/web3.js';

const connection = new Connection(
  'https://purple-blissful-replica.solana-mainnet.quiknode.pro/3a3921409b235a94eb644a444c43c82d0514f80a/',
  'confirmed'
);

const quickNode = new Connection(
  'https://purple-blissful-replica.solana-mainnet.quiknode.pro/3a3921409b235a94eb644a444c43c82d0514f80a/',
  'confirmed'
);

export { connection, quickNode };
