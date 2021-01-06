# Crusoe Cryptocurrency Dashboard

[![Netlify Status](https://api.netlify.com/api/v1/badges/c68cfa67-d498-40c1-9ab3-38e7f21c355e/deploy-status)](https://app.netlify.com/sites/crusoe-crypto/deploys)

[Live demo](https://crusoe-crypto.netlify.app/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Thoughts on improvements
- Date, time formatting: For the scope of the project, I'm formatting date time with JavaScript built-in methods. For a larger project, I'd consider using [MomentJS](https://momentjs.com/) to handle it.
- Real-time data fetching: For this project, I'm polling the data from the API at regular interval. For a production project, I'd consider using a WebSockets approach.
- UI/UX: Add tooltips for the Header row to keep the UI concise and easy to navigate. Add transition animations.