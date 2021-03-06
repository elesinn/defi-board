import { useSetAtom } from 'jotai';
import Image from 'next/image';

import { useTezos } from 'features/auth';
import { tezosAccountAtom } from 'features/auth/lib/useTezos';

const Index = () => {
  const { connect } = useTezos();
  const setGuest = useSetAtom(tezosAccountAtom);

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <main className="w-full h-full px-4 md:px-24 flex flex-col">
        <div className="pt-16 flex justify-center">
          <Image
            className="w-auto h-8 justify-self-start"
            src="/assets/images/logo.svg"
            alt="Tez.watch"
            width={400}
            height={120}
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-[48px] font-bold mt-14 leading-[52px]">
            Your entrance to the{' '}
            <a
              className="text-main-500 cursor-pointer hover:underline"
              href="https://tezos.com/"
              target="_blank"
              rel="noreferrer"
            >
              Tezos
            </a>
          </h1>
          <p className="text-xl mt-6 mb-8">
            Manage your entire Tezos portfolio from DeFi to NFTs and whatever
            comes next. Invest in the latest opportunities from one convenient
            place.
          </p>
          <div className="flex gap-4 flex-col md:flex-row">
            <button
              className="grid place-items-center px-8 py-4 bg-main-500 text-white font-semibold rounded-2xl hover:shadow-hover"
              onClick={connect}
            >
              Connect Wallet
            </button>
            <button
              className="grid place-items-center px-8 py-4 bg-main-200  font-semibold rounded-2xl hover:shadow-hover"
              onClick={() => setGuest('tz1Qji1NnEPj4Cxa9s2WEoWi9U9KM6a9gdDL')}
            >
              Demo account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
