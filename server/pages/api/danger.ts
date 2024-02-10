import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const state = await req.body

  try {
    await db.ref('state').set(state.state ? 'danger' : 'ok')
    return res.status(204);
  } catch (e) {
    return res.status(500).json({error: e})
  }
}