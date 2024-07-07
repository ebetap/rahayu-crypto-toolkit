const CryptoToolkit = require('../src/index');
const assert = require('assert');

describe('CryptoToolkit', () => {
  // Add your tests here
  it('should create a new wallet', () => {
    const toolkit = new CryptoToolkit({ apiKey: 'test-api-key' });
    const wallet = toolkit.createWallet();
    assert(wallet.publicKey);
    assert(wallet.privateKey);
  });
});
