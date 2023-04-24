import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

import { useWallet } from '@solana/wallet-adapter-react';
import { Transaction } from '@solana/web3.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { currencies } from '../../constants/currencies';
import { customer } from '../../constants/customer';
import { api } from '../../services/api';
import { flipInstructions } from '../../utils/flipInstructions';
import { quickNode } from '../../utils/web3-connection';

interface FlipMutationProps {
  selectedToken: string;
  selectedCoinSide: number;
  selectedBetAmount: number;
  isFlipping: Dispatch<SetStateAction<boolean>>;
  setFlipResult: Dispatch<SetStateAction<undefined | 'HEADS' | 'TAILS'>>;
}

const { CUSTOMER_NAME } = customer;

const useFlip = () => {
  const queryClient = useQueryClient();
  const { connected, publicKey, signAllTransactions } = useWallet();

  return useMutation(
    async ({
      selectedToken,
      selectedCoinSide,
      selectedBetAmount,
      isFlipping,
      setFlipResult
    }: FlipMutationProps) => {
      if (!connected) {
        return toast.error('Please connect your wallet');
      }

      const mintAddress = currencies.find(token => token.value === selectedToken)?.mintAddress;
      // console.log({ mintAddress });

      if (!publicKey || !signAllTransactions || !mintAddress) {
        throw new Error('Missing info');
      }

      const coinSide = selectedCoinSide === 0 ? 'HEADS' : 'TAILS';
      console.log({ coinSide });

      const winInstructions = await flipInstructions({
        publicKey,
        mint: mintAddress,
        amount: selectedBetAmount,
        win: true
      });

      const loseInstructions = await flipInstructions({
        publicKey,
        mint: mintAddress,
        amount: selectedBetAmount,
        win: false
      });

      if (!winInstructions || !loseInstructions) {
        throw new Error('Missing instructions');
      }

      // console.log('HAS INSTRUCTIONS');

      const winTransaction = new Transaction().add(...winInstructions);
      const loseTransaction = new Transaction().add(...loseInstructions);

      const blockhash = await (await quickNode.getLatestBlockhash('finalized')).blockhash;

      // console.log({ blockhash });

      winTransaction.feePayer = publicKey;
      loseTransaction.feePayer = publicKey;
      winTransaction.recentBlockhash = blockhash;
      loseTransaction.recentBlockhash = blockhash;

      const [winTx, loseTx] = await signAllTransactions([winTransaction, loseTransaction]);

      // console.log({ winTx, loseTx });

      isFlipping(true);
      toast.loading('Flipping...', {
        duration: 3000
      });

      const serializedWin = winTx.serialize({
        verifySignatures: true,
        requireAllSignatures: false
      });

      const serializedLose = loseTx.serialize({
        verifySignatures: true,
        requireAllSignatures: false
      });

      // console.log({ serializedWin, serializedLose });

      return api.post('/flip', {
        wallet: publicKey.toString(),
        amount: selectedBetAmount,
        face: coinSide,
        customer: CUSTOMER_NAME,
        token: mintAddress,
        bufferWin: serializedWin,
        bufferLose: serializedLose,
        blockhash
      });
    },
    {
      onSettled: (_, error, props) => {
        props.isFlipping(false);
        queryClient.invalidateQueries(['history']);
      },
      onSuccess: (res: any, props) => {
        const coinSide = props.selectedCoinSide === 0 ? 'HEADS' : 'TAILS';

        if (res.status == 200) {
          if (res.data.win) {
            props.setFlipResult(coinSide);
            toast.success('Congratulations! You Won');
          } else {
            props.setFlipResult(coinSide === 'HEADS' ? 'TAILS' : 'HEADS');
            toast.error('Not this time, try again ');
          }
        } else {
          toast.error('Request Failed');
        }
      },
      onError: error => {
        console.log(error);
        toast.error('Could not generate instructions, check your token account', {
          duration: 5000
        });
      }
    }
  );
};

export { useFlip };
