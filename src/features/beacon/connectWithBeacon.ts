import { NetworkType } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';

export const connectWithBeacon = async (): Promise<{
  wallet: BeaconWallet;
}> => {
  const wallet = new BeaconWallet({
    name: 'Homebase',
    iconUrl: 'https://tezostaquito.io/img/favicon.png',
  });

  await wallet.requestPermissions({
    network: {
      type: NetworkType.MAINNET,
    },
  });

  return {
    wallet,
  };
};
