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
};

const RPC_NODE = 'https://mainnet.smartpy.io';

const tezosTk = new TezosToolkit(RPC_NODE);

export const tezosAccountAtom = atom<string | undefined>(undefined);
export const tezosWalletAtom = atom<BeaconWallet | undefined>(undefined);
export const tezosTkAtom = atom<TezosToolkit>(tezosTk);

export const useTezos = (): WalletConnectReturn => {
  const [account, setAccount] = useAtom(tezosAccountAtom);
  const [wallet, setWallet] = useAtom(tezosWalletAtom);
  const [tkTezos, setTkTezos] = useAtom(tezosTkAtom);

  const initWallet = useCallback(() => {
    const tezosWallet = new BeaconWallet({
      name: 'Defi-Dashboard',
      preferredNetwork: NetworkType.MAINNET,
    });
    tkTezos.setWalletProvider(tezosWallet);
    setTkTezos(tkTezos);
    setWallet(tezosWallet);
    return tezosWallet;
  }, [setTkTezos, setWallet, tkTezos]);

  useEffect(() => {
    if (account) {
      return; //no need to check account
    }
    const tezosWallet = initWallet();
    (async () => {
      const activeAccount = await tezosWallet.client.getActiveAccount();
      if (activeAccount) {
        setAccount(activeAccount.address);
      }
    })();
  }, [account, initWallet, setAccount]);

  const connect = useCallback(async () => {
    if (account) {
      return tkTezos; // already connected
    } else {
      if (!wallet) {
        throw new Error('No Wallet Connected');
      }

      await wallet.requestPermissions({
        network: { type: NetworkType.MAINNET },
      });
      const address = await wallet.getPKH();
      setAccount(address);
    }
    return tkTezos;
  }, [account, setAccount, tkTezos, wallet]);

  return {
    tezos: tkTezos,
    connect,
    disconnect: useCallback(async () => {
      if (!wallet) {
        throw new Error('No Wallet Connected');
      }

      await wallet.clearActiveAccount();
      setAccount();
      setWallet();
    }, [setAccount, setWallet, wallet]),
    account: account || '',
  };
};
