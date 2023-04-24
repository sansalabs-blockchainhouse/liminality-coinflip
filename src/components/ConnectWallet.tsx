import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const ConnectWallet = () => {
  return (
    <WalletModalProvider>
      <WalletMultiButton startIcon={undefined} />
    </WalletModalProvider>
  );
};

export { ConnectWallet };
