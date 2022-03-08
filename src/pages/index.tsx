import Image from 'next/image';

import { useTezos } from 'features/auth';

const Index = () => {
  const { connect } = useTezos();

  return (
    <div className="w-screen md:h-screen overflow-x-hidden">
      <main className="w-full h-full px-24 flex flex-col">
        <div className="pt-16 flex justify-center">
          <Image
            className="w-auto h-8 justify-self-start"
            src="/assets/images/logo.svg"
            alt="Tez.watch"
            width={400}
            height={120}
          />
        </div>
        <div className="">
          <h1 className="text-[48px] font-bold mt-14">
            Your entrance to the{' '}
            <a className="text-main-500 cursor-pointer hover:underline">
              Tezos
            </a>{' '}
            blockchain
          </h1>
          <p className="text-2xl mt-6 mb-8">
            Manage your entire web3 portfolio from DeFi to NFTs and whatever
            comes next. Invest in the latest opportunities from one convenient
            place.
          </p>
          <button
            className="grid place-items-center px-8 py-4 bg-main-500 text-white font-semibold rounded-2xl hover:shadow-hover"
            onClick={connect}
          >
            Connect Wallet
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;
