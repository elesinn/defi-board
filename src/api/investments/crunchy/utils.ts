import BigNumber from 'bignumber.js';

export const estimatePendingRewards = (
  userRecord: any,
  farmStorage: any,
  currentRewardMultiplier: any,
) => {
  const pendingRewards = new BigNumber(0);
  const rpsMultiplier = new BigNumber(1000000000000000);
  const bonusAccuracy = new BigNumber(1000);
  const userRecordAmount = new BigNumber(userRecord.amount);
  const userRecordDebt = new BigNumber(userRecord.rewardDebt);
  const rewardPaid = new BigNumber(farmStorage.rewardPaid);
  const rewardSupply = new BigNumber(farmStorage.rewardSupply);
  let accRewardPerShare = new BigNumber(farmStorage.accRewardPerShare);
  let tokenRewards = new BigNumber(0);

  if (!currentRewardMultiplier.isZero()) {
    const rewardPerSec = new BigNumber(farmStorage.rewardPerSec);
    const poolBalance = new BigNumber(farmStorage.poolBalance);
    tokenRewards = currentRewardMultiplier
      .times(rewardPerSec)
      .times(rpsMultiplier)
      .idiv(bonusAccuracy)
      .idiv(poolBalance);
  }

  accRewardPerShare = accRewardPerShare.plus(tokenRewards);
  let accRewards = userRecordAmount
    .times(accRewardPerShare)
    .idiv(rpsMultiplier);

  if (rewardPaid.lt(rewardSupply) && accRewards.gt(userRecordDebt)) {
    let maxRewards = rewardSupply.minus(rewardPaid).abs();
    let owedRewards = accRewards.minus(userRecordDebt).abs();

    if (maxRewards.lt(owedRewards)) {
      return maxRewards;
    } else {
      return owedRewards;
    }
  }

  return pendingRewards;
};

export const calcMultiplier = (farm: any) => {
  let m = 0;
  if (farm.id < 16) {
    m = 1;
  }
  for (const bonus of farm.bonuses) {
    if (new Date(bonus.endTime) > new Date()) {
      m += parseInt(bonus.multiplier);
    }
  }
  return m || 1;
};
