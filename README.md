# Rahayu Crypto Toolkit

RahayuCryptoToolkit is a comprehensive JavaScript library designed to simplify cryptocurrency operations such as portfolio tracking, wallet management, payment processing, decentralized exchange transactions, and blockchain exploration.

## Features

- **Portfolio Tracking**: Track the value of multiple cryptocurrency wallets.
- **Real-Time Prices**: Fetch real-time prices of various cryptocurrencies.
- **Wallet Management**: Create and manage cryptocurrency wallets.
- **Payment Processing**: Process crypto payments.
- **Decentralized Exchange**: Swap tokens and manage liquidity.
- **Lending and Borrowing**: Lend and borrow cryptocurrencies.
- **Blockchain Exploration**: Fetch transaction details and address balances.

## Installation

To install CryptoToolkit, use npm:

```sh
npm install rahayu-crypto-toolkit
```

## Usage

```js
const CryptoToolkit = require('rahayu-crypto-toolkit');

const config = {
  apiKey: 'your-api-key',
  apiBase: {
    prices: 'https://api.cryptocurrencyprices.com',
    paymentGateway: 'https://api.paymentgateway.com',
    blockchainExplorer: 'https://api.blockchainexplorer.com',
  },
};

const toolkit = new CryptoToolkit(config);

// Example usage
(async () => {
  const wallet = toolkit.createWallet();
  console.log('New Wallet:', wallet);

  const portfolioValue = await toolkit.getPortfolioValue(['address1', 'address2']);
  console.log('Portfolio Value:', portfolioValue);

  const prices = await toolkit.getRealTimePrices(['BTC', 'ETH']);
  console.log('Real-Time Prices:', prices);
})();
```

## Documentation

### Constructor

#### `new CryptoToolkit(config)`

Creates a new instance of the CryptoToolkit class.

- `config`: Configuration object with the following properties:
  - `apiKey` (string): The API key for authentication.
  - `apiBase` (object): (Optional) Custom API base URLs for different services:
    - `prices` (string): URL for cryptocurrency prices API.
    - `paymentGateway` (string): URL for payment gateway API.
    - `blockchainExplorer` (string): URL for blockchain explorer API.

### Methods

#### Portfolio Tracker Methods

##### `async getPortfolioValue(walletAddresses)`

Fetches the total value of the specified wallet addresses.

- `walletAddresses` (array): An array of wallet addresses (strings).

Returns the total portfolio value (number).

##### `async getRealTimePrices(cryptos)`

Fetches real-time prices of the specified cryptocurrencies.

- `cryptos` (array): An array of cryptocurrency symbols (strings).

Returns an object with cryptocurrency symbols as keys and their prices as values.

#### Crypto Wallet Methods

##### `createWallet()`

Creates a new cryptocurrency wallet.

Returns an object with `publicKey` and `privateKey`.

##### `async sendCrypto(fromAddress, toAddress, amount)`

Sends cryptocurrency from one address to another.

- `fromAddress` (string): The sender's wallet address.
- `toAddress` (string): The recipient's wallet address.
- `amount` (number): The amount to send.

Returns the transaction details.

#### Payment Gateway Methods

##### `async processPayment(fromAddress, toAddress, amount)`

Processes a payment from one address to another.

- `fromAddress` (string): The sender's wallet address.
- `toAddress` (string): The recipient's wallet address.
- `amount` (number): The amount to send.

Returns the payment processing details.

##### `async convertToFiat(crypto, amount)`

Converts the specified amount of cryptocurrency to fiat.

- `crypto` (string): The cryptocurrency symbol.
- `amount` (number): The amount to convert.

Returns the conversion details.

#### Decentralized Exchange Methods

##### `async swap(fromToken, toToken, amount)`

Swaps one token for another.

- `fromToken` (string): The token to swap from.
- `toToken` (string): The token to swap to.
- `amount` (number): The amount to swap.

Returns the swap details.

##### `async addLiquidity(token, amount)`

Adds liquidity to a decentralized exchange.

- `token` (string): The token to add.
- `amount` (number): The amount to add.

Returns the liquidity addition details.

##### `async removeLiquidity(token, amount)`

Removes liquidity from a decentralized exchange.

- `token` (string): The token to remove.
- `amount` (number): The amount to remove.

Returns the liquidity removal details.

#### Lending and Borrowing Methods

##### `async lend(crypto, amount)`

Lends the specified amount of cryptocurrency.

- `crypto` (string): The cryptocurrency symbol.
- `amount` (number): The amount to lend.

Returns the lending details.

##### `async borrow(crypto, amount, collateral)`

Borrows the specified amount of cryptocurrency.

- `crypto` (string): The cryptocurrency symbol.
- `amount` (number): The amount to borrow.
- `collateral` (number): The collateral amount.

Returns the borrowing details.

##### `async getRates()`

Fetches the current lending and borrowing rates.

Returns an object with the rates.

#### Blockchain Explorer Methods

##### `async getTransactionDetails(txHash)`

Fetches the details of a transaction.

- `txHash` (string): The transaction hash.

Returns the transaction details.

##### `async getAddressBalance(address)`

Fetches the balance of the specified address.

- `address` (string): The wallet address.

Returns the balance.

### Utilities

##### `generateKeyPair()`

Generates a new public-private key pair.

Returns an object with `publicKey` and `privateKey`.

##### `signTransaction(fromAddress, toAddress, amount)`

Signs a transaction.

- `fromAddress` (string): The sender's wallet address.
- `toAddress` (string): The recipient's wallet address.
- `amount` (number): The amount to send.

Returns an object with `transaction` and `signature`.

##### `async sendTransaction(transaction)`

Sends a signed transaction.

- `transaction` (object): The signed transaction object.

Returns the transaction details.

##### `async fetchAddressBalance(address)`

Fetches the balance of the specified address.

- `address` (string): The wallet address.

Returns the balance.

##### `validateAddresses(...addresses)`

Validates the specified addresses.

- `addresses` (array): The addresses to validate.

Throws an error if any address is invalid.

##### `validateAmount(amount)`

Validates the specified amount.

- `amount` (number): The amount to validate.

Throws an error if the amount is invalid.

##### `logError(action, error)`

Logs an error to the console.

- `action` (string): The action being performed when the error occurred.
- `error` (object): The error object.

## License

This project is licensed under the MIT License.
