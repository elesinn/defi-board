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
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id: rawId } = req.body;

  const account = await prisma.accounts.findFirst({
    where: { Address: rawId },
  });

  const id = account?.Id;
  const result: { Balance: number; Level: number }[] =
    await prisma.$queryRawUnsafe(`SELECT lvl as "Level", (SUM("Change") OVER (ORDER BY lvl asc))::bigint as "Balance"    
    FROM (                    SELECT "Level" as lvl, SUM("Change")::bigint as "Change"        
    FROM (SELECT "Level" as "Level", (-"BakerFee") as "Change" FROM "DelegationOps" WHERE "SenderId" = ${id}
    UNION ALL SELECT "Level" as "Level", "Balance" as "Change" FROM "OriginationOps" WHERE "ContractId" = ${id} 
    UNION ALL SELECT "Level" as "Level", 
    (-"Balance" -(CASE WHEN "Nonce" 
    is NULL THEN ("BakerFee" + COALESCE("StorageFee", 0) + COALESCE("AllocationFee", 0)) ELSE 0 END)) as "Change" 
    FROM "OriginationOps" WHERE "SenderId" = ${id} AND "Status" = 1 UNION ALL 
    SELECT "Level" as "Level", (-COALESCE("StorageFee", 0) - COALESCE("AllocationFee", 0)) as "Change" 
    FROM "OriginationOps" WHERE "InitiatorId" = ${id} AND "Status" = 1 UNION ALL 
    SELECT "Level" as "Level", (-"BakerFee") as "Change" FROM "OriginationOps" WHERE "SenderId" =${id} 
    AND "Status" != 1 UNION ALL SELECT "Level" as "Level", "Amount" as "Change" 
    FROM "TransactionOps" WHERE "TargetId" = ${id} AND "Status" = 1 UNION ALL SELECT "Level" as "Level", 
    (-"Amount" - (CASE WHEN "Nonce" is NULL THEN ("BakerFee" + COALESCE("StorageFee", 0) + COALESCE("AllocationFee", 0)) 
    ELSE 0 END)) as "Change" FROM "TransactionOps" WHERE "SenderId" = ${id} AND "Status" = 1 UNION ALL SELECT "Level" as "Level", 
    (-COALESCE("StorageFee", 0) - COALESCE("AllocationFee", 0)) as "Change" FROM "TransactionOps" 
    WHERE "InitiatorId" = ${id} AND "Status" = 1 UNION ALL SELECT "Level" 
    as "Level", (-"BakerFee") as "Change" FROM "TransactionOps" WHERE "SenderId" = ${id}
    AND "Status" != 1 UNION ALL SELECT "Level" as "Level", (-"BakerFee") as "Change" FROM "RevealOps" 
    WHERE "SenderId" = ${id} UNION ALL SELECT "Level" as "Level", ("Reward" + "Fees") as "Change" 
    FROM "Blocks" WHERE "BakerId" = ${id} UNION ALL SELECT "Level" as "Level", "Reward" as "Change" 
    FROM "EndorsementOps" WHERE "DelegateId" = ${id}
    UNION ALL SELECT "Level" as "Level", 125000::bigint as "Change" FROM "NonceRevelationOps" WHERE 
    "BakerId" = ${id} UNION ALL SELECT "Level" as "Level", (-"LostReward" - "LostFees") as "Change" 
    FROM "RevelationPenaltyOps" WHERE "BakerId" = ${id} ) as u                    
    GROUP BY lvl                    ORDER BY lvl                ) as gr               
    WHERE lvl <= 2113736                                
    OFFSET 0              LIMIT 10`);

  const resa = result.map((r) => ({
    balance: r.Balance,
    level: r.Level,
  }));

  // const result = await prisma.accounts.findFirst({ where: { Id: id } });
  return res.json(resa);
  // @ts-ignore
  // return res.status(200).json(userData.data);
}
