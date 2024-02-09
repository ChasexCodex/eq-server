import {NextApiRequest, NextApiResponse} from 'next';
import {db} from "@/firebase";


// a next.js handler for state request
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {method} = req;

  if (method === 'POST') {
    const {
      id,
      state,
      lng,
      lat
    } = req.query;

    // call firebase and update
    const ref = db.ref(`states/${id}`);
    await ref.set({
      state,
      lng,
      lat
    });

    res.status(204);
  }
}
