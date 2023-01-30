import { useSDK, useStorageUpload } from "@thirdweb-dev/react";
import { v4 as uuidv4 } from "uuid";
import {
  LENS_CONTRACT_ABI,
  LENS_CONTRACT_ADDRESS,
} from "../../const/contracts";
import { useLogin } from "../auth/useLogin";
import { useAppContext } from "../appContext";
import { signTypedDataWithOmittedTypename, splitSignature } from "../helper";
import { createPostTypedDataForPost } from "./posts";

export function useCreatePost() {
  const { defaultProfile, signedIn } = useAppContext();
  const { mutateAsync: uploadToIpfs } = useStorageUpload();
  const sdk = useSDK();
  const { requestLogin } = useLogin();

  async function createPost({ image, title, description, content }) {
    try {
      console.log("createPost", image, title, description, content);

      // 0. Login
      let profile = defaultProfile;
      if (!signedIn) {
        profile = await requestLogin();
      }

      // 0. Upload the image to IPFS
      const imageIpfsUrl = (await uploadToIpfs({ data: [image] }))[0];

      console.log("imageIpfsUrl", imageIpfsUrl);

      // 0B) Upload the actual content to IPFS
      // This is going to be a Object which contains the image field as well
      const postMetadata = {
        version: "2.0.0",
        mainContentFocus: "TEXT_ONLY",
        metadata_id: uuidv4(),
        description: description,
        locale: "en-US",
        content: content,
        external_url: null,
        image: imageIpfsUrl,
        imageMimeType: null,
        name: title,
        attributes: [],
        tags: [],
        appId: process.env.NEXT_PUBLIC_APP_ID,
      };

      const postMetadataIpfsUrl = (
        await uploadToIpfs({ data: [postMetadata] })
      )[0];

      console.log("postMetadataIpfsUrl", postMetadataIpfsUrl);

      // 1. Ask Lens to give us the typed data
      const { data } = await createPostTypedDataForPost(
        postMetadataIpfsUrl,
        profile.id
      );

      const { domain, types, value } = data?.createPostTypedData?.typedData;

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
      const {
        collectModule,
        collectModuleInitData,
        contentURI,
        deadline,
        profileId,
        referenceModule,
        referenceModuleInitData,
      } = data.createPostTypedData.typedData.value;

      const result = await lensHubContract.call("postWithSig", {
        profileId: profileId,
        contentURI: contentURI,
        collectModule,
        collectModuleInitData,
        referenceModule,
        referenceModuleInitData,
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
          profileId: profile.id,
          handle: profile.handle,
        },
      };
    } catch (error) {
      return { error };
    }
  }

  return { createPost };
}
