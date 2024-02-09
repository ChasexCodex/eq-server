// only used for testing purposes

import {NextApiRequest, NextApiResponse} from 'next';
import {db} from "@/firebase";
import {points} from "@/util";
// @ts-ignore

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  db.ref('indv').set(points)
}
