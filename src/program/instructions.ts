import { NodeWallet } from '@metaplex/js';
import { AnchorProvider, Program, BN, Idl } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SystemProgram, PublicKey, Connection, Keypair } from '@solana/web3.js';

import { idl } from './idl';

const programId = new PublicKey('AECpbyv5BG7f7Ez9A3ZfKtGQUwbaeGPJng4tNDpKcwuY');

async function wrappedTransfer(
  connection: Connection,
  from: PublicKey,
  to: PublicKey,
  amount: number,
  neededAmount: number
) {
  const program = new Program(
    idl as Idl,
    programId,
    new AnchorProvider(connection, new NodeWallet(Keypair.generate()), {
      commitment: 'confirmed'
    })
  );

  const instruction = await await program.methods
    .transferChecked(new BN(amount.toFixed(0)), new BN(neededAmount.toFixed(0)))
    .accounts({
      sender: from,
      receiver: to,
      system_program: SystemProgram.programId
    })
    .instruction();

  return instruction;
}

async function wrappedSplTransfer(
  connection: Connection,
  fromAccount: PublicKey,
  toAccount: PublicKey,
  owner: PublicKey,
  amount: number,
  neededAmount: number
) {
  const program = new Program(
    idl as Idl,
    programId,
    new AnchorProvider(connection, new NodeWallet(Keypair.generate()), {
      commitment: 'confirmed'
    })
  );

  const instruction = await await program.methods
    .splTransfer(new BN(amount), new BN(neededAmount))
    .accounts({
      tokenProgram: TOKEN_PROGRAM_ID,
      sender: owner,
      senderAccount: fromAccount,
      receiverAccount: toAccount
    })
    .instruction();

  return instruction;
}

export { wrappedTransfer, wrappedSplTransfer };
