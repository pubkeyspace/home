# KZG2 Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/4eb0aebd-3e14-46e7-b5fc-8441117bef0d/deploy-status)](https://app.netlify.com/sites/kzg2/deploys)

https://kzg2.netlify.com

## Usage

Use locally:
    
    $ make dev

Deploy live:

    $ git push

## To setup a new fork:

1. `npx netlify init`
2. Create a FaunaDB database manually
3. `node data/fauna-setup.js` and follow instructions

## Frameworks:

- http://vanilla-js.com
- https://plainjs.com
- https://vanillajstoolkit.com

This repo was started with:

    npx degit "rixo/sapper-template-hot#webpack" .
