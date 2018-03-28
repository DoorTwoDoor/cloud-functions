# Cloud Functions

### About

### Getting Started
1. Install [Node.js](https://www.nodejs.org/en/) for your platform.
2. Install [Yarn](https://www.yarnpkg.com/en/) for your platform.
3. [Clone](https://help.github.com/articles/cloning-a-repository/) a copy of the repository into the current directory.
```Bash
git clone https://www.github.com/doortwodoor/cloud-functions
```
4. Navigate to the newly clone reponsitory.
```Bash
cd cloud-functions
```
5. Install all dependencies.
```Bash
yarn install
```
6. Install the Firebase CLI globally.
```Bash
yarn global add firebase-tools
```
7. Sign into Firebase using your Google account.
```Bash
firebase login
```

### Deployment
1. Create the production build.
```Bash
yarn run build
```
2. Deploy the functions.
```Bash
yarn run deploy
```

### License
Cloud Funtions is licensed under the [Apache-2 License.](https://github.com/DoorTwoDoor/cloud-functions/blob/master/LICENSE).
