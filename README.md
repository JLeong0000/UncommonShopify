# Documentation for The Uncommon Level website

The site was built using Hydrogen, React, Tailwind CSS, Remix and GraphQL.
Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)


## Prerequisites

**Requirements:**

To use this repository, you need the following installed locally:

- npm

Required Node.js version 16.14.0 or higher

- You can clone this repository and get to work.

Remember to install the dependencies
```bash
npm i
```


## File structure 
The main routes used in this project are:
- _index.jsx
- ourStory
- products.$handle.jsx

I've left some unused routes that could potentially be used to expand the website in the future.


## Running the website

**Running for development**

```bash
npm run dev
```

**Running for production**

```bash
npm run build
```

## Deploying the website
- Merging your fork/branch with main will automatically trigger the deployment

**Requirements**

Github
- Request access to be an editor of this repository in order to perform merges

Shopify
- You have to be assigned a staff member by the Shopify admin of the store
- Under the Sales Channels tab, navigate to the Hydrogen app.
- Under Storefront settings/ Environmentas and variables - find the following to update in the .env file:
    - PUBLIC_STOREFRONT_API_TOKEN
    - PRIVATE_STOREFRONT_API_TOKEN
    - PUBLIC_STORE_DOMAIN
- You can also choose to create a new private environment for testing and link your branch


## Additional info
To test out the GraphQL editor:
- Add the extension "/graphiql" to your local host url
- E.g. http://localhost:3000/graphiql
- The queries available on Shopify's GraphQL is provided in that sandbox

