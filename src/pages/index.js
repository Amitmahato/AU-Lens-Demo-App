import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  return (
    <div className="flex justify-between h-screen bg-gray-800 text-white text-xl">
      <div>
        <ConnectWallet accentColor="#7AADE7" colorMode="dark" />
      </div>
    </div>
  );
}
