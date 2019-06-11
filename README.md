# promesometro

## User pool creation with AWS Amplify
First you need to install amplify-cli and configure it.
You can install it with:
```
npm install -g amplify-cli
```
Configure it with:
```
amplify configure
```
After amplify-cli configuration you can create the user pool in your AWS account
with:
```
amplify push
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### To test REST API in dev
```
npm run json
```

### To deploy frontend to an S3 bucket
```
Configure the bucket in vue.config.js
aws configure
npm run deploy
```

If the file vue.config.js is not present then run
```
npm install vue-cli-plugin-s3-deploy
aws configure
vue invoke s3-deploy
npm run deploy
```

Make sure that the baseUrl is in vue.config.js

```
module.exports = {
publicPath: 'promesometro0.3/‘
}
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
