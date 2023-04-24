import { useQuery } from '@tanstack/react-query';

import { customer } from '../constants/customer';
import { api } from '../services/api';

const { CUSTOMER_NAME } = customer;

type Flip = {
  amount: number;
  createdAt: string;
  customer: string;
  face: string;
  signature: string;
  token: string;
  updatedAt: string;
  wallet: string;
  win: boolean;
  __v: number;
  _id: string;
};

interface LatestFlips {
  flips: Flip[];
}

const useHistory = () => {
  return useQuery(['history'], async () => {
    const { data } = await api.get<LatestFlips>(`/latestFlips/${CUSTOMER_NAME}`);
    // console.log(data);
    return data.flips;
  });
};

export { useHistory };
