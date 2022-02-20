// POST /api/post
// Required fields in body: title

import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../lib/prisma';
//@ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};
// Optional fields in body: content
export default async function handle(_: NextApiRequest, res: NextApiResponse) {
  const timeStamps = await prisma.blocks.findMany({
    orderBy: { Level: 'asc' },
  });

  // const result = await prisma.accounts.findFirst({ where: { Id: id } });
  return res.json(timeStamps);
  // @ts-ignore
  // return res.status(200).json(userData.data);
}
