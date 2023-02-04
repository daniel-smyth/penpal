# Stripe

This directory contains all code related to Stripe payments.

### Directories

- `client`: This folder contains a Stripe tools to use on the client side.
- `server`: This folder contains a Stripe tools to use on the server side.

Directories for Stripe are split into client and server. Each uses a different library, specifically `stripe` for the server `@stripe/stripe-js` for the client.

If the folders are not split and both `client` and `server` files are exported from the same `index.ts`, errors will occur as Next.JS `.env` variables are not consistent across the client and server.

See https://nextjs.org/docs/basic-features/environment-variables

## Resources

- [Stripe documentation](https://stripe.com/docs)
- [Stripe Developer Hub](https://developers.stripe.com)
- [Stripe GitHub](https://github.com/stripe)
