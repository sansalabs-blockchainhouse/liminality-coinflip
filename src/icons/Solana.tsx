interface SolanaIconProps {
  isSelected: boolean;
}

const Solana = ({ isSelected }: SolanaIconProps) => (
  <svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M0.5 2.57589L2.39021 0.208344H12.4761L10.5859 2.57589H0.5ZM2.41408 7.56873L0.509547 9.95059H10.5955L12.5 7.56873H2.41408ZM0.523866 3.88853L2.41408 6.25608H12.5L10.6098 3.88853H0.523866Z'
      fill={isSelected ? 'black' : 'white'}
      fillOpacity={isSelected ? '1' : '0.5'}
    />
  </svg>
);

export { Solana };
