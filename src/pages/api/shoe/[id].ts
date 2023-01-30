import { NextApiRequest, NextApiResponse } from "next";
import { data, IData } from "../shoes";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IData[]>
) {
  const shoeId = req.query.id?.toString();
  const shoe = data?.find((shoe) => shoe.id.toString() === shoeId);
  return res.status(200).json(shoe as unknown as IData[]);
}
