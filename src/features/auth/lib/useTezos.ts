import { useCallback, useEffect } from 'react';

import { NetworkType } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import { atom, useAtom } from 'jotai';

type WalletConnectReturn = {
  tezos: TezosToolkit;
  connect: () => Promise<TezosToolkit>;
  disconnect: () => void;
  account: string;
  loading: boolean;
};

export const RPC_NODE = 'https://mainnet.smartpy.io';

export const tezosTk = new TezosToolkit(RPC_NODE);

export const tezosAccountAtom = atom<string>('');
export const tezosAccountLoading = atom(true);
export const tezosWalletAtom = atom<BeaconWallet | undefined>(undefined);

export const useTezos = (): WalletConnectReturn => {
  const [account, setAccount] = useAtom(tezosAccountAtom);
  const [loading, setLoading] = useAtom(tezosAccountLoading);
  const [wallet, setWallet] = useAtom(tezosWalletAtom);

  const initWallet = useCallback(() => {
    const tezosWallet = new BeaconWallet({
      name: 'Defi-Dashboard',
      preferredNetwork: NetworkType.MAINNET,
    });
    tezosTk.setWalletProvider(tezosWallet);
    setWallet(tezosWallet);
    return tezosWallet;
  }, [setWallet]);

  useEffect(() => {
    if (account) {
      return; //no need to check account
    }
    setLoading(true);
    const tezosWallet = initWallet();
    (async () => {
      const activeAccount = await tezosWallet.client.getActiveAccount();
      if (activeAccount) {
        setAccount(activeAccount.address);
      }
      setLoading(false);
    })();
  }, [account, initWallet, setAccount, setLoading]);

  const connect = useCallback(async () => {
    if (account) {
      return tezosTk; // already connected
    } else {
      if (!wallet) {
        throw new Error('No Wallet Connected');
      }
      setLoading(true);

      await wallet.requestPermissions({
        network: { type: NetworkType.MAINNET },
      });
      const address = await wallet.getPKH();
      setAccount(address);
      setLoading(false);
    }
    return tezosTk;
  }, [account, setAccount, setLoading, wallet]);

  return {
    tezos: tezosTk,
    connect,
    disconnect: useCallback(async () => {
      if (!wallet) {
        throw new Error('No Wallet Connected');
      }

      await wallet.clearActiveAccount();
      setAccount('');
      setWallet();
    }, [setAccount, setWallet, wallet]),
    account: account || '',
    loading,
  };
};
