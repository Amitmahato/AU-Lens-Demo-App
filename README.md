# 💭 What does the application include?

1. Connect User's Wallet
   1. Sign With Lens Profile
   2. Create a Profile - on the testnet, if connected address doesn't already have one
2. Create Post (attach `AppID`) - compulsorily create a new post if there are no any post by that user
3. Display list of posts (filter posts based on `AppID`)
4. Allow the user to Like/Unlike any posts
5. Display a list of Recommend profiles (based on the posts that appear on the home page)
6. Follow other users (UnFollow not included 😀)
7. Display individual user profile detail page with their stats and posts

# 🤖 Installation and Getting the App running on your machine

1. Clone the repository with

   ```
   git clone https://github.com/Amitmahato/AU-Lens-Demo-App.git
   ```

   Prefer SSH

   ```
   git clone git@github.com:Amitmahato/AU-Lens-Demo-App.git
   ```

2. Install dependencies with `npm install` [Recommended, as we used npm while building] or `yarn install` [Dependencies version might not match with the ones used by us while building]
3. Copy or Rename the `.env.local.example` to `.env.local`
4. Start the application with `npm run dev` or `yarn dev`

> ⚠️ Expect the application to be buggy, as it was built only for demo purpose. If you find some bug simply refresh the page to get it working properly again, when using it for the first time. Optionally, clear the local storage when coming back after some days as the authentication tokens are stored there and not every cases are handled properly 😅.

# 📁 What does the `.env` include?

- The `AppId` that we use to filter posts that were created from our application, feel free to change it and give it some `AppId` of your choice to make your app feel like yours
- The lens public API endpoint which can be of the testnet or the mainnet.
  > ⚠️ Remember when using the mainnet you must have a lens profile other wise the app will redirect you to Create Profile page, the API for which isn't available publicly, ultimately making the app fail
- The URL to polygonscan on mumbai network for letting the user navigate to polygonscan to view their transaction while creating a lens profile. You can change this one as well with the mainnet but it won't be really useful.
