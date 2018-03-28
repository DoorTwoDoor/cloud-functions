# Cloud Functions

### About
This repository contains a collection of Cloud Functions for Firebase that automatically runs backend code in response to events triggered by Firebase features and HTTPS requests.

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
8. Start the watcher to automatically compile code when a source file changes.
```Bash
yarn run watch
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

### Logs Viewing
View logs with the Firebase CLI tool.
```Bash
yarn run logs
```

### License
Cloud Funtions is licensed under the [Apache-2 License](https://www.github.com/DoorTwoDoor/cloud-functions/blob/master/LICENSE).
