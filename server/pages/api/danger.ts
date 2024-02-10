import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {method} = req;

  if (method === "POST") {
    const {state} = req.query;
    try {
      await db.ref('state').set(state);
      res.status(204);
    } catch (e) {
      res.status(500).json({error: e})
    }
  }
}