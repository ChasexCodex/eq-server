// only used for testing purposes

import {NextApiRequest, NextApiResponse} from 'next';
// @ts-ignore
import CryptoJS from 'crypto-js';
import enc from "../../firebase.json";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const bytes = CryptoJS.AES.decrypt(enc.encrypted, process.env.SECRET_KEY);
  res.status(200).json({ serviceAccount: true});
}
