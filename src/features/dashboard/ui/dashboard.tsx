import { useAtom } from 'jotai';
import { ImSpinner2 } from 'react-icons/im';

import { useAccount, useOperationsInfo } from 'api/account/account';
import { useCrunchyInvestments } from 'api/investments/crunchy';
import { usePlentyInvestmentsInXTZ } from 'api/investments/plenty';
import { addressSearchAtom } from 'features/site-layout';
import { formatTezosBalance } from 'shared/utils/balance';
import { TZ } from 'shared/utils/tezos-sign';

export const Dashboard = () => {
  const [address] = useAtom(addressSearchAtom);
  const { data: account } = useAccount(address);
  const { data: withXTZ } = usePlentyInvestmentsInXTZ(address);
  const operationsInfo = useOperationsInfo(address);
  const totaPlentylInvestments =
    withXTZ?.reduce<number>((acc, item) => acc + (item?.XTZBalance || 0), 0) ||
    0;

  const { farms } = useCrunchyInvestments(address);

  const totalCrunchyInvestments = farms?.reduce((acc, farm) => {
    acc +=
      Number(farm.stakedAmount) / Math.pow(10, Number(farm.poolToken.decimals));
    return acc;
  }, 0);

  if (!account) {
    return null;
  }
  const accountBalance = Math.round(account?.balance / 10000) / 100;

  const totalBalance =
    totalCrunchyInvestments + totaPlentylInvestments + accountBalance;

  const totalInvestments = totalCrunchyInvestments + totaPlentylInvestments;
  // const stats = [
  //   // {
  //   //   name: 'Balance',
  //   //   stat: (Math.round(account?.balance / 10000) / 100).toString() + TZ,
  //   // },
  //   {
  //     name: 'Total Investments',
  //     stat: withXTZ?.reduce<number>(
  //       (acc, item) => acc + (item?.XTZBalance || 0),
  //       0,
  //     ),
  //   },
  //   {
  //     name: 'Active Tokens',
  //     stat: account?.activeTokensCount,
  //   },
  // ];

  return (
    <div>
      <div className="flex flex-wrap rounded-lg shadow bg-main-200 ">
        <div className="flex flex-col rounded-lg bg-main-500 px-4 py-5 overflow-hidden">
          <dt className="text-sm font-medium text-white ">Net Worth</dt>
          <dd className="mt-1 text-3xl font-semibold text-green-400 truncate">
            {totalBalance ? (
              `${totalBalance?.toFixed(3)}${TZ}`
            ) : (
              <ImSpinner2 className="animate-spin" />
            )}
          </dd>
        </div>
        <div className="flex flex-col rounded-lg px-4 py-5 overflow-hidden ">
          <dt className="text-sm font-medium text-gray-600">DeFi worth</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
            {withXTZ ? (
              `${totalInvestments?.toFixed(3)}${TZ}`
            ) : (
              <ImSpinner2 className="animate-spin" />
            )}
          </dd>
        </div>
        <div className="flex flex-col rounded-lg px-4 py-5 overflow-hidden ">
          <dt className="text-sm font-medium text-gray-600">Wallet worth</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
            {formatTezosBalance(account?.balance)}
          </dd>
        </div>
        <div className="flex flex-col rounded-lg px-4 py-5 overflow-hidden ">
          <dt className="text-sm font-medium text-gray-600">Gas used</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
            {operationsInfo?.gasUsed ? (
              formatTezosBalance(operationsInfo.gasUsed)
            ) : (
              <ImSpinner2 className="animate-spin" />
            )}
          </dd>
        </div>
        <div className="flex flex-col rounded-lg px-4 py-5 overflow-hidden ">
          <dt className="text-sm font-medium text-gray-600">Total fee</dt>
          <dd className="mt-1 text-3xl font-semibold text-red-500 truncate">
            {operationsInfo?.allocationFee &&
            operationsInfo?.bakerFee &&
            operationsInfo?.storageFee ? (
              formatTezosBalance(
                operationsInfo.allocationFee +
                  operationsInfo.bakerFee +
                  operationsInfo.storageFee,
              )
            ) : (
              <ImSpinner2 className="animate-spin" />
            )}
          </dd>
        </div>
      </div>
    </div>
  );
};
