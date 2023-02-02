import { useSDK } from "@thirdweb-dev/react";
import {
  LENS_CONTRACT_ABI,
  LENS_CONTRACT_ADDRESS,
} from "../../const/contracts";
import { useLogin } from "../auth/useLogin";
import { useAppContext } from "../appContext";
import { signTypedDataWithOmittedTypename, splitSignature } from "../helper";
import { createFollowTypedData } from "../graphql";
import { client } from "../api";

export function useFollow() {
  const { defaultProfile, signedIn } = useAppContext();
  const sdk = useSDK();
  const { address } = useAppContext();
  const { requestLogin } = useLogin();

  async function follow({ profileId }) {
    try {
      console.log("Follow Profile: ", profileId);

      // 0. Login
      let profile = defaultProfile;
      if (!signedIn) {
        profile = await requestLogin();
      }

      // 1. Ask Lens to give us the typed data
      const { data } = await client.mutate({
        mutation: createFollowTypedData,
        variables: {
          request: {
            follow: [
              {
                profile: profileId,
              },
            ],
          },
        },
      });

      const { domain, types, value } = data?.createFollowTypedData?.typedData;

      if (!sdk) return;

      // 2. Sign the typed data
      const signature = await signTypedDataWithOmittedTypename(
        sdk,
        domain,
        types,
        value
      );

      const { v, r, s } = splitSignature(signature.signature);

      // 3. Use the signed typed data to send the transaction to the smart contract
      const lensHubContract = await sdk.getContractFromAbi(
        LENS_CONTRACT_ADDRESS,
        LENS_CONTRACT_ABI
      );

      // Destructure the stuff we need out of the typedData.value field
      const { profileIds, datas, deadline } =
        data.createFollowTypedData.typedData.value;

      const result = await lensHubContract.call("followWithSig", {
        follower: address,
        profileIds: profileIds,
        datas: datas,
        sig: {
          v,
          r,
          s,
          deadline: deadline,
        },
      });

      console.log(result);
      return {
        data: {
          transactionHash: result?.receipt?.transactionHash,
        },
      };
    } catch (error) {
      console.log("Follow Error: ", error);
      return { error };
    }
  }

  return { follow };
}
