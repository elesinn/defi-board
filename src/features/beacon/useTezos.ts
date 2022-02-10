import { useCallback } from 'react';

import { BeaconWallet } from '@taquito/beacon-wallet';
import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito';
import { Tzip16Module } from '@taquito/tzip16';
import { atom, useAtom } from 'jotai';

import { connectWithBeacon } from './connectWithBeacon';

type WalletConnectReturn = {
  tezos: TezosToolkit;
  connect: () => Promise<TezosToolkit>;
  disconnect: () => void;
  account: string;
};

export type Network = 'mainnet';

export const tezosAccount = atom<string | undefined>(undefined);
export const tezosWallet = atom<BeaconWallet | undefined>(undefined);

const tezosTk = new TezosToolkit('https://mainnet.smartpy.io');
tezosTk.setPackerProvider(new MichelCodecPacker());
tezosTk.addExtension(new Tzip16Module());

export const tezos = atom<TezosToolkit>(tezosTk);

export const useTezos = (): WalletConnectReturn => {
  const [accountTezos, setAccount] = useAtom(tezosAccount);
  const [walletTezos, setWallet] = useAtom(tezosWallet);
  const [tkTezos, setTezos] = useAtom(tezos);

  const connect = useCallback(async () => {
    const { wallet } = await connectWithBeacon();

    tkTezos.setProvider({ wallet });
    const account = await tkTezos.wallet.pkh();

    setAccount(account);
    setTezos(tkTezos);
    setWallet(wallet);

    return tkTezos;
  }, [setAccount, setTezos, setWallet, tkTezos]);

  return {
    tezos: tkTezos,
    connect,
    disconnect: useCallback(async () => {
      if (!walletTezos) {
        throw new Error('No Wallet Connected');
      }

      await walletTezos.disconnect();
      setAccount();
      setWallet();
    }, [setAccount, setWallet, walletTezos]),
    account: accountTezos || '',
  };
};
