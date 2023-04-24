export const idl = {
  version: '0.1.0',
  name: 'test_program',
  instructions: [
    {
      name: 'transfer',
      accounts: [
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false
        },
        {
          name: 'sender',
          isMut: true,
          isSigner: true
        },
        {
          name: 'receiver',
          isMut: true,
          isSigner: false
        }
      ],
      args: [
        {
          name: 'amount',
          type: 'u64'
        }
      ]
    },
    {
      name: 'transferChecked',
      accounts: [
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false
        },
        {
          name: 'sender',
          isMut: true,
          isSigner: true
        },
        {
          name: 'receiver',
          isMut: true,
          isSigner: false
        }
      ],
      args: [
        {
          name: 'amount',
          type: 'u64'
        },
        {
          name: 'neededAmount',
          type: 'u64'
        }
      ]
    },
    {
      name: 'splTransfer',
      accounts: [
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false
        },
        {
          name: 'sender',
          isMut: true,
          isSigner: true
        },
        {
          name: 'senderAccount',
          isMut: true,
          isSigner: false
        },
        {
          name: 'receiverAccount',
          isMut: true,
          isSigner: false
        }
      ],
      args: [
        {
          name: 'transferAmount',
          type: 'u64'
        },
        {
          name: 'neededAmount',
          type: 'u64'
        }
      ]
    }
  ],
  errors: [
    {
      code: 6000,
      name: 'Unauthorized',
      msg: 'Receiver not authorized.'
    }
  ],
  metadata: {
    address: 'AECpbyv5BG7f7Ez9A3ZfKtGQUwbaeGPJng4tNDpKcwuY'
  }
};
