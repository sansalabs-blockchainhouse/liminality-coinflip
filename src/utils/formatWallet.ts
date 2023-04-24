function formatWallet(wallet: string) {
  if (wallet) return wallet.slice(0, 4) + '...' + wallet.slice(-4);
  return '';
}

export { formatWallet };
