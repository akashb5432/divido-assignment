import { NextApiRequest, NextApiResponse } from 'next';

import { LenderGetResponse, LenderPostResponse } from 'lib/types';

export const bankOfAzerothData: any = {
  name: 'Bank of Azeroth',
  fields: [
    { name: 'first_name', type: 'text', required: true },
    { name: 'last_name', type: 'text', required: true },
    { name: 'email', type: 'text', required: true },
    { name: 'gender', type: 'text', required: true },
    { name: 'monthly_income', type: 'text', required: true },
  ]
};

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<LenderGetResponse | LenderPostResponse>,
): void => {
  if (req.method === 'POST') {
    const decision = Math.random() > 0.7 ? 'accepted' : 'declined';
    res.status(200).json({ decision });
  } else {
    res.status(200).json(bankOfAzerothData);
  }
};

export default handler;
