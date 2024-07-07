const axios = require('axios');
const crypto = require('crypto');

class CryptoToolkit {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.apiBase = {
      prices: config.apiBase?.prices || 'https://api.cryptocurrencyprices.com',
      paymentGateway: config.apiBase?.paymentGateway || 'https://api.paymentgateway.com',
      blockchainExplorer: config.apiBase?.blockchainExplorer || 'https://api.blockchainexplorer.com',
    };
    this.wallets = [];
    this.axiosInstance = axios.create({
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
  }

  // Portfolio Tracker Methods
  async getPortfolioValue(walletAddresses) {
    try {
      const responses = await Promise.all(walletAddresses.map(address =>
        this.fetchAddressBalance(address)
      ));
      const values = responses.map(response => response.data.balance);
      return values.reduce((acc, val) => acc + val, 0);
    } catch (error) {
      this.logError('fetching portfolio value', error);
      throw new Error('Failed to fetch portfolio value');
    }
  }

  async getRealTimePrices(cryptos) {
    try {
      const response = await this.axiosInstance.get(`${this.apiBase.prices}/prices`, {
        params: { cryptos: cryptos.join(',') }
      });
      return response.data;
    } catch (error) {
      this.logError('fetching real-time prices', error);
      throw new Error('Failed to fetch real-time prices');
    }
  }

  // Crypto Wallet Methods
  createWallet() {
    const wallet = this.generateKeyPair();
    this.wallets.push(wallet);
    return wallet;
  }

  async sendCrypto(fromAddress, toAddress, amount) {
    try {
      const transaction = this.signTransaction(fromAddress, toAddress, amount);
      return await this.sendTransaction(transaction);
    } catch (error) {
      this.logError('sending crypto', error);
      throw new Error('Failed to send crypto');
    }
  }

  // Payment Gateway Methods
  async processPayment(fromAddress, toAddress, amount) {
    this.validateAddresses(fromAddress, toAddress);
    this.validateAmount(amount);

    try {
      const response = await this.axiosInstance.post(`${this.apiBase.paymentGateway}/process`, {
        fromAddress, toAddress, amount
      });
      return response.data;
    } catch (error) {
      this.logError('processing payment', error);
      throw new Error('Failed to process payment');
    }
  }

  async convertToFiat(crypto, amount) {
    this.validateAmount(amount);

    try {
      const response = await this.axiosInstance.get(`${this.apiBase.prices}/convert`, {
        params: { crypto, amount }
      });
      return response.data;
    } catch (error) {
      this.logError('converting to fiat', error);
      throw new Error('Failed to convert to fiat');
    }
  }

  // Decentralized Exchange Methods
  async swap(fromToken, toToken, amount) {
    this.validateAmount(amount);

    try {
      const response = await this.axiosInstance.post(`${this.apiBase.blockchainExplorer}/swap`, {
        fromToken, toToken, amount
      });
      return response.data;
    } catch (error) {
      this.logError('swapping tokens', error);
      throw new Error('Failed to swap tokens');
    }
  }

  async addLiquidity(token, amount) {
    this.validateAmount(amount);

    try {
      const response = await this.axiosInstance.post(`${this.apiBase.blockchainExplorer}/liquidity/add`, {
        token, amount
      });
      return response.data;
    } catch (error) {
      this.logError('adding liquidity', error);
      throw new Error('Failed to add liquidity');
    }
  }

  async removeLiquidity(token, amount) {
    this.validateAmount(amount);

    try {
      const response = await this.axiosInstance.post(`${this.apiBase.blockchainExplorer}/liquidity/remove`, {
        token, amount
      });
      return response.data;
    } catch (error) {
      this.logError('removing liquidity', error);
      throw new Error('Failed to remove liquidity');
    }
  }

  // Lending and Borrowing Methods
  async lend(crypto, amount) {
    this.validateAmount(amount);

    try {
      const response = await this.axiosInstance.post(`${this.apiBase.blockchainExplorer}/lend`, {
        crypto, amount
      });
      return response.data;
    } catch (error) {
      this.logError('lending crypto', error);
      throw new Error('Failed to lend crypto');
    }
  }

  async borrow(crypto, amount, collateral) {
    this.validateAmount(amount);

    try {
      const response = await this.axiosInstance.post(`${this.apiBase.blockchainExplorer}/borrow`, {
        crypto, amount, collateral
      });
      return response.data;
    } catch (error) {
      this.logError('borrowing crypto', error);
      throw new Error('Failed to borrow crypto');
    }
  }

  async getRates() {
    try {
      const response = await this.axiosInstance.get(`${this.apiBase.blockchainExplorer}/rates`);
      return response.data;
    } catch (error) {
      this.logError('fetching interest rates', error);
      throw new Error('Failed to fetch interest rates');
    }
  }

  // Blockchain Explorer Methods
  async getTransactionDetails(txHash) {
    try {
      const response = await this.axiosInstance.get(`${this.apiBase.blockchainExplorer}/transaction/${txHash}`);
      return response.data;
    } catch (error) {
      this.logError('fetching transaction details', error);
      throw new Error('Failed to fetch transaction details');
    }
  }

  async getAddressBalance(address) {
    return await this.fetchAddressBalance(address);
  }

  // Utilities
  generateKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });
    return { publicKey, privateKey };
  }

  signTransaction(fromAddress, toAddress, amount) {
    const transaction = JSON.stringify({ from: fromAddress, to: toAddress, amount });
    const sign = crypto.createSign('SHA256');
    sign.update(transaction);
    sign.end();
    const privateKey = this.wallets.find(wallet => wallet.publicKey === fromAddress).privateKey;
    const signature = sign.sign(privateKey, 'hex');
    return { transaction, signature };
  }

  async sendTransaction(transaction) {
    try {
      const response = await this.axiosInstance.post(`${this.apiBase.blockchainExplorer}/transaction/send`, transaction);
      return response.data;
    } catch (error) {
      this.logError('sending transaction', error);
      throw new Error('Failed to send transaction');
    }
  }

  async fetchAddressBalance(address) {
    try {
      const response = await this.axiosInstance.get(`${this.apiBase.blockchainExplorer}/address/${address}/balance`);
      return response.data;
    } catch (error) {
      this.logError('fetching address balance', error);
      throw new Error('Failed to fetch address balance');
    }
  }

  validateAddresses(...addresses) {
    addresses.forEach(address => {
      if (!address || typeof address !== 'string') {
        throw new Error('Invalid address');
      }
    });
  }

  validateAmount(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Invalid amount');
    }
  }

  logError(action, error) {
    console.error(`Error ${action}:`, error.message);
  }
}

module.exports = CryptoToolkit;
