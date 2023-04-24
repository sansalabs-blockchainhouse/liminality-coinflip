import toast from 'react-hot-toast';

import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionInstruction
} from '@solana/web3.js';

import { customer } from '../constants/customer';
import { wrappedSplTransfer, wrappedTransfer } from '../program/instructions';
import { findAssociatedTokenAddress } from '../utils/findAssociatedTokenAddress';
import { quickNode } from './web3-connection';

interface FlipInstructionsProps {
  publicKey: PublicKey;
  amount: number;
  mint: string;
  win: boolean;
}

const { DEFAULT_FEE, FEE_RECEIVER } = customer;

async function flipInstructions({
  publicKey,
  amount,
  mint,
  win
}: FlipInstructionsProps): Promise<TransactionInstruction[] | null> {
  if (!publicKey) {
    toast.error('Please connect your wallet');
    return null;
  }

  const bank = new PublicKey('');
  const feeReceiver = new PublicKey(FEE_RECEIVER); // WALLET DO CLIENTE

  console.log(Math.floor(amount * DEFAULT_FEE * LAMPORTS_PER_SOL)); // TROCAR 0.025 para DEFAULT_FEE e setar feeDecimals no banco

  const instructions = [];

  if (mint == 'sol') {
    instructions.push(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: feeReceiver,
        lamports: Math.floor(amount * DEFAULT_FEE * LAMPORTS_PER_SOL)
      })
    );

    win
      ? instructions.push(
          await wrappedTransfer(
            quickNode,
            bank,
            publicKey,
            Math.floor(amount * (1 - DEFAULT_FEE) * LAMPORTS_PER_SOL),
            Math.floor((amount + 0.001) * LAMPORTS_PER_SOL)
          )
        )
      : instructions.push(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: bank,
            lamports: Math.floor(amount * (1 - DEFAULT_FEE) * LAMPORTS_PER_SOL) // TROCAR 0.975 para 1 - DEFAULT_FEE
          })
        );
  } else {
    const mintPk = new PublicKey(mint);
    const publicKeyAccount = await findAssociatedTokenAddress(publicKey, mintPk);
    const bankAccount = await findAssociatedTokenAddress(bank, mintPk);
    const feeReceiverAccount = await findAssociatedTokenAddress(feeReceiver, mintPk);

    const mintToken = new Token(quickNode, mintPk, TOKEN_PROGRAM_ID, Keypair.generate());

    const decimals = (await mintToken.getMintInfo()).decimals;

    instructions.push(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        publicKeyAccount,
        feeReceiverAccount,
        publicKey,
        [],
        amount * DEFAULT_FEE * Math.pow(10, decimals) // TROCAR 0.025 para DEFAULT_FEE e setar feeDecimals no banco
      )
    );

    win
      ? instructions.push(
          await wrappedSplTransfer(
            quickNode,
            bankAccount,
            publicKeyAccount,
            bank,
            amount * (1 - DEFAULT_FEE) * Math.pow(10, decimals), // TROCAR 0.975 para 1 - DEFAULT_FEE
            amount * Math.pow(10, decimals)
          )
        )
      : instructions.push(
          await wrappedSplTransfer(
            quickNode,
            publicKeyAccount,
            bankAccount,
            publicKey,
            amount * (1 - DEFAULT_FEE) * Math.pow(10, decimals), // TROCAR 0.975 para 1 - DEFAULT_FEE
            amount * Math.pow(10, decimals)
          )
        );
  }
  return instructions;
}

export { flipInstructions };
