# @devcraftor/sdk 🚀

[![npm version](https://badge.fury.io/js/%40devcraftor%2Fsdk.svg)](https://www.npmjs.com/package/@devcraftor/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://github.com/devcraftor/sdk/workflows/Node.js%20Version/badge.svg)](https://github.com/devcraftor/sdk/actions)

A unified JavaScript/Node.js SDK providing streamlined access to **DevCraftor's Payment APIs**, **Gaming APIs**, and **AI Query APIs**. Built for modern JavaScript environments with full support for CommonJS, ES Modules, and browser UMD builds.

## 📦 Installation

```bash
npm install @devcraftor/sdk
```

## 🌟 Features

- ✅ **Universal Compatibility**: Works with Node.js, browsers, and all major bundlers
- ✅ **Multiple Module Systems**: CommonJS, ES Modules, and UMD support
- ✅ **Three Core Services**: Payment processing, Gaming APIs, and AI queries
- ✅ **TypeScript Ready**: Full TypeScript definitions included
- ✅ **Promise-based**: Modern async/await support
- ✅ **Production Ready**: Built with reliability and scalability in mind

## 🚀 Quick Start

### ES Modules (Recommended)

```javascript
import DevCraftorSDK from '@devcraftor/sdk';

const sdk = new DevCraftorSDK();

// Initialize services with new authentication format
const payment = sdk.initPayment({ 
  token: 'your-merchant-token',
  apiKey: 'your-payment-api-key',
  secret: 'your-payment-secret'
});

const gaming = sdk.initGaming({ 
  key: 'your-gaming-api-key', 
  secret: 'your-gaming-secret' 
});

const ai = sdk.initAi({ 
  key: 'your-ai-key' 
});
```

### CommonJS

```javascript
const DevCraftorSDK = require('@devcraftor/sdk');

const sdk = new DevCraftorSDK();

// Initialize services with new authentication format
const payment = sdk.initPayment({ 
  token: 'your-merchant-token',
  apiKey: 'your-payment-api-key',
  secret: 'your-payment-secret'
});

const gaming = sdk.initGaming({ 
  key: 'your-gaming-api-key', 
  secret: 'your-gaming-secret' 
});

const ai = sdk.initAi({ 
  key: 'your-ai-key' 
});
```

### Browser (UMD via CDN)

```html
<script src="https://unpkg.com/@devcraftor/sdk@latest/dist/devcraftor-sdk.umd.js"></script>
<script>
  const sdk = new DevCraftorSDK();
  
  // Initialize services with new authentication format
  const payment = sdk.initPayment({ 
    token: 'your-merchant-token',
    apiKey: 'your-payment-api-key',
    secret: 'your-payment-secret'
  });
  
  const gaming = sdk.initGaming({ 
    key: 'your-gaming-api-key', 
    secret: 'your-gaming-secret' 
  });
  
  const ai = sdk.initAi({ 
    key: 'your-ai-key' 
  });
</script>
```

## 💳 Payment API

The Payment module provides secure payment processing capabilities with enhanced three-factor authentication.

### Initialization

```javascript
const payment = sdk.initPayment({ 
  token: 'your-merchant-token',    // Required: Your DevCraftor merchant token
  apiKey: 'your-payment-api-key',  // Required: Your DevCraftor payment API key
  secret: 'your-payment-secret'    // Required: Your DevCraftor payment secret
});
```

### Methods

#### `createPayment(options)`

Initiates a new payment request and returns a payment URL and transaction reference.

```javascript
try {
  const paymentResult = await payment.createPayment({
    orderId: 'ORDER_12345',
    txnAmount: 100.00,
    txnNote: 'Purchase of premium subscription',
    cust_Mobile: '9876543210',
    cust_Email: 'customer@example.com'
  });
  
  console.log('Payment URL:', paymentResult.paymentUrl);
  console.log('Transaction ID:', paymentResult.txnId);
  console.log('Order ID:', paymentResult.orderId);
} catch (error) {
  console.error('Payment creation failed:', error.response?.data || error.message);
}
```

**Response Example:**
```json
{
  "status": "success",
  "paymentUrl": "https://payments.devcraftor.com/pay/abc123",
  "txnId": "TXN_789456123",
  "orderId": "ORDER_12345",
  "amount": 100.00
}
```

#### `checkPaymentStatus(orderId)`

Checks the current status of a payment and returns full transaction details.

```javascript
try {
  const status = await payment.checkPaymentStatus('ORDER_12345');
  
  console.log('Payment Status:', status.txnStatus);
  console.log('UTR:', status.utr);
  console.log('Bank Transaction ID:', status.bankTxnId);
  console.log('Payment Mode:', status.paymentMode);
} catch (error) {
  console.error('Status check failed:', error.response?.data || error.message);
}
```

**Response Example:**
```json
{
  "orderId": "ORDER_12345",
  "txnId": "TXN_789456123",
  "txnStatus": "SUCCESS",
  "txnAmount": 100.00,
  "paymentMode": "UPI",
  "bankTxnId": "BANK_456789",
  "utr": "UTR123456789",
  "txnDate": "2025-07-01T10:30:00Z"
}
```

### Webhook Configuration

⚠️ **Important**: Webhook callbacks for payment completion must be configured via the DevCraftor dashboard. The SDK does not handle webhook reception logic internally, allowing you to implement custom server-side event handling as needed.

## 🎮 Gaming API

The Gaming module provides comprehensive gaming platform integration with user management and wallet operations.

### Initialization

```javascript
const gaming = sdk.initGaming({ 
  key: 'your-api-key',        // Required: Your DevCraftor API key
  secret: 'your-api-secret'   // Required: Your DevCraftor API secret
});
```

### Methods

#### `registerUser(userData)`

Registers a new user in the gaming platform.

```javascript
try {
  const user = await gaming.registerUser({
    name: 'John Doe',
    gender: 'male',
    email: 'john.doe@example.com',
    mobile: '9876543210',
    username: 'johndoe123',
    password: 'securePassword123'
  });
  
  console.log('User registered:', user.userId);
  console.log('Username:', user.username);
} catch (error) {
  console.error('User registration failed:', error.response?.data || error.message);
}
```

**Response Example:**
```json
{
  "status": "success",
  "userId": "USR_123456",
  "username": "johndoe123",
  "email": "john.doe@example.com",
  "mobile": "9876543210",
  "registrationDate": "2025-07-01T10:30:00Z"
}
```

#### `getBalance(mobile)`

Retrieves the current wallet balance for a user.

```javascript
try {
  const balance = await gaming.getBalance('9876543210');
  
  console.log('Current Balance:', balance.amount);
  console.log('Currency:', balance.currency);
} catch (error) {
  console.error('Balance retrieval failed:', error.response?.data || error.message);
}
```

**Response Example:**
```json
{
  "mobile": "9876543210",
  "balance": 1500.75,
  "currency": "INR",
  "lastUpdated": "2025-07-01T10:30:00Z"
}
```

#### `deposit(depositData)`

Adds funds to a user's wallet.

```javascript
try {
  const deposit = await gaming.deposit({
    mobile: '9876543210',
    amount: 500.00,
    transaction_id: 'DEP_789123456'
  });
  
  console.log('Deposit Status:', deposit.status);
  console.log('New Balance:', deposit.newBalance);
} catch (error) {
  console.error('Deposit failed:', error.response?.data || error.message);
}
```

**Response Example:**
```json
{
  "status": "success",
  "transactionId": "DEP_789123456",
  "mobile": "9876543210",
  "amount": 500.00,
  "newBalance": 2000.75,
  "timestamp": "2025-07-01T10:30:00Z"
}
```

#### `withdraw(withdrawData)`

Initiates a withdrawal from a user's wallet.

```javascript
try {
  const withdrawal = await gaming.withdraw({
    mobile: '9876543210',
    amount: 200.00,
    transaction_id: 'WTH_456789123'
  });
  
  console.log('Withdrawal Status:', withdrawal.status);
  console.log('Remaining Balance:', withdrawal.remainingBalance);
} catch (error) {
  console.error('Withdrawal failed:', error.response?.data || error.message);
}
```

**Response Example:**
```json
{
  "status": "success",
  "transactionId": "WTH_456789123",
  "mobile": "9876543210",
  "amount": 200.00,
  "remainingBalance": 1800.75,
  "timestamp": "2025-07-01T10:30:00Z"
}
```

#### `generateGameUrl(gameData)`

Generates an authenticated game launch URL with proper headers.

```javascript
try {
  const gameAccess = await gaming.generateGameUrl({
    mobile: "123456789",
    gameType: 'poker'
  });
  
  console.log('Game URL:', gameAccess.gameUrl);
  console.log('Session Token:', gameAccess.sessionToken);
} catch (error) {
  console.error('Game URL generation failed:', error.response?.data || error.message);
}
```

**Response Example:**
```json
{
  "gameUrl": "https://games.devcraftor.com/launch/abc123",
  "sessionToken": "SESSION_456789",
  "gameType": "poker",
  "expiresAt": "2025-07-01T14:30:00Z",
  "headers": {
    "X-Game-Type": "poker",
    "X-Session-Token": "SESSION_456789"
  }
}
```

## 🤖 AI Query API

The AI module provides access to DevCraftor's AI processing endpoints for intelligent text analysis and generation.

### Initialization

```javascript
const ai = sdk.initAi({ 
  key: 'your-ai-api-key' // Required: Your DevCraftor AI API key
});
```

### Methods

#### `ask(prompt)`

Sends a text prompt to the AI processing endpoint and receives a model-generated response.

```javascript
try {
  const response = await ai.ask('What are the best practices for secure payment processing?');
  
  console.log('AI Response:', response.answer);
  console.log('Confidence Score:', response.confidence);
  console.log('Processing Time:', response.processingTime);
} catch (error) {
  console.error('AI query failed:', error.response?.data || error.message);
}
```

**Response Example:**
```json
{
  "answer": "Here are the best practices for secure payment processing: 1. Use PCI DSS compliance...",
  "confidence": 0.95,
  "processingTime": "1.2s",
  "model": "devcraftor-ai-v2",
  "timestamp": "2025-07-01T10:30:00Z"
}
```

#### `solve(prompt)`

Alternative method for complex problem-solving queries.

```javascript
try {
  const solution = await ai.solve('How to implement OAuth 2.0 authentication in Node.js?');
  
  console.log('Solution:', solution.answer);
  console.log('Code Examples:', solution.codeExamples);
} catch (error) {
  console.error('AI solve failed:', error.response?.data || error.message);
}
```

## 🔧 Error Handling

The DevCraftor SDK uses promise-based methods that can throw errors. Proper error handling is crucial for production applications. Here's how to handle different types of errors:

### Basic Error Handling

```javascript
import DevCraftorSDK from '@devcraftor/sdk';

async function handlePaymentCreation() {
  const sdk = new DevCraftorSDK();
  const payment = sdk.initPayment({ 
    token: 'your-merchant-token',
    apiKey: 'your-payment-api-key',
    secret: 'your-payment-secret'
  });
  
  try {
    const result = await payment.createPayment({
      orderId: 'ORDER_123',
      txnAmount: 100,
      txnNote: 'Test payment',
      cust_Mobile: '9876543210',
      cust_Email: 'test@example.com'
    });
    
    console.log('Payment created successfully:', result);
    return result;
  } catch (error) {
    console.error('Payment creation failed:', error.message);
    throw error;
  }
}
```

### Advanced Error Handling

```javascript
async function advancedErrorHandling() {
  const sdk = new DevCraftorSDK();
  const payment = sdk.initPayment({ 
    token: 'your-merchant-token',
    apiKey: 'your-payment-api-key',
    secret: 'your-payment-secret'
  });
  
  try {
    const result = await payment.createPayment({
      orderId: 'ORDER_123',
      txnAmount: 100,
      txnNote: 'Test payment',
      cust_Mobile: '9876543210',
      cust_Email: 'test@example.com'
    });
    
    return result;
  } catch (error) {
    // Handle API response errors (4xx, 5xx)
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
      
      // Handle specific error codes
      switch (error.response.status) {
        case 400:
          throw new Error('Invalid request parameters');
        case 401:
          throw new Error('Authentication failed - check your credentials');
        case 403:
          throw new Error('Access forbidden - insufficient permissions');
        case 404:
          throw new Error('API endpoint not found');
        case 429:
          throw new Error('Rate limit exceeded - please retry later');
        case 500:
          throw new Error('Internal server error - please contact support');
        default:
          throw new Error(`API error: ${error.response.data.message || 'Unknown error'}`);
      }
    }
    
    // Handle network errors
    if (error.request) {
      console.error('Network Error:', error.message);
      throw new Error('Network connection failed - please check your internet connection');
    }
    
    // Handle other errors (SDK configuration, etc.)
    console.error('SDK Error:', error.message);
    throw error;
  }
}
```

### Error Handling with Gaming API

```javascript
async function handleGamingOperations() {
  const sdk = new DevCraftorSDK();
  const gaming = sdk.initGaming({ 
    key: 'your-gaming-api-key', 
    secret: 'your-gaming-secret' 
  });
  
  try {
    // Register user
    const user = await gaming.registerUser({
      name: 'John Doe',
      gender: 'male',
      email: 'john.doe@example.com',
      mobile: '9876543210',
      username: 'johndoe123',
      password: 'securePassword123'
    });
    
    // Get balance
    const balance = await gaming.getBalance('9876543210');
    
    // Perform deposit
    const deposit = await gaming.deposit({
      mobile: '9876543210',
      amount: 500.00,
      transaction_id: 'DEP_' + Date.now()
    });
    
    return { user, balance, deposit };
  } catch (error) {
    if (error.response?.data?.message) {
      console.error('Gaming API Error:', error.response.data.message);
    } else {
      console.error('Gaming Operation Failed:', error.message);
    }
    throw error;
  }
}
```

### Error Handling with AI API

```javascript
async function handleAIQueries() {
  const sdk = new DevCraftorSDK();
  const ai = sdk.initAi({ key: 'your-ai-key' });
  
  try {
    const response = await ai.ask('Explain quantum computing');
    console.log('AI Response:', response.answer);
    return response;
  } catch (error) {
    if (error.response?.status === 429) {
      console.error('AI API rate limit exceeded');
      throw new Error('Too many requests - please wait before trying again');
    } else if (error.response?.status === 400) {
      console.error('Invalid AI query');
      throw new Error('Invalid query format or content');
    } else {
      console.error('AI Query Failed:', error.message);
      throw error;
    }
  }
}
```

## 📚 Complete Usage Examples

### Node.js with ES Modules

```javascript
import DevCraftorSDK from '@devcraftor/sdk';

async function main() {
  const sdk = new DevCraftorSDK();
  
  // Initialize all services with new authentication format
  const payment = sdk.initPayment({ 
    token: 'merchant-token',
    apiKey: 'payment-api-key',
    secret: 'payment-secret'
  });
  
  const gaming = sdk.initGaming({ 
    key: 'gaming-api-key', 
    secret: 'gaming-secret' 
  });
  
  const ai = sdk.initAi({ 
    key: 'ai-key' 
  });
  
  try {
    // Create a payment
    const paymentResult = await payment.createPayment({
      orderId: 'ORDER_001',
      txnAmount: 99.99,
      txnNote: 'Premium subscription',
      cust_Mobile: '9876543210',
      cust_Email: 'user@example.com'
    });
    
    // Register a gaming user
    const user = await gaming.registerUser({
      name: 'Jane Smith',
      gender: 'female',
      email: 'jane@example.com',
      mobile: '9876543210',
      username: 'janesmith',
      password: 'password123'
    });
    
    // Ask AI a question
    const aiResponse = await ai.ask('Explain blockchain technology');
    
    console.log('Payment URL:', paymentResult.paymentUrl);
    console.log('User ID:', user.userId);
    console.log('AI Response:', aiResponse.answer);
    
  } catch (error) {
    console.error('Operation failed:', error.response?.data || error.message);
  }
}

main();
```

### Node.js with CommonJS

```javascript
const DevCraftorSDK = require('@devcraftor/sdk');

async function main() {
  const sdk = new DevCraftorSDK();
  
  // Initialize services with new authentication format
  const payment = sdk.initPayment({ 
    token: process.env.MERCHANT_TOKEN,
    apiKey: process.env.PAYMENT_API_KEY,
    secret: process.env.PAYMENT_SECRET
  });
  
  const gaming = sdk.initGaming({ 
    key: process.env.GAMING_API_KEY, 
    secret: process.env.GAMING_API_SECRET 
  });
  
  const ai = sdk.initAi({ 
    key: process.env.AI_API_KEY 
  });
  
  try {
    // Check payment status
    const status = await payment.checkPaymentStatus('ORDER_001');
    console.log('Payment Status:', status.txnStatus);
    
    // Get user balance
    const balance = await gaming.getBalance('9876543210');
    console.log('Current Balance:', balance.balance);
    
    // Solve a problem with AI
    const solution = await ai.solve('How to optimize database queries?');
    console.log('AI Solution:', solution.answer);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```

### Browser Environment

```html
<!DOCTYPE html>
<html>
<head>
    <title>DevCraftor SDK Example</title>
</head>
<body>
    <script src="https://unpkg.com/@devcraftor/sdk@latest/dist/devcraftor-sdk.umd.js"></script>
    <script>
        async function initializeSDK() {
            const sdk = new DevCraftorSDK();
            
            // Initialize services with new authentication format
            const payment = sdk.initPayment({ 
              token: 'your-merchant-token',
              apiKey: 'your-payment-api-key',
              secret: 'your-payment-secret'
            });
            
            const ai = sdk.initAi({ key: 'your-ai-key' });
            
            try {
                // Create a payment
                const paymentResult = await payment.createPayment({
                  orderId: 'ORDER_001',
                  txnAmount: 50.00,
                  txnNote: 'Browser payment test',
                  cust_Mobile: '9876543210',
                  cust_Email: 'user@example.com'
                });
                
                // Ask AI a question
                const aiResponse = await ai.ask('What is machine learning?');
                
                document.getElementById('payment-url').textContent = paymentResult.paymentUrl;
                document.getElementById('ai-response').textContent = aiResponse.answer;
            } catch (error) {
                console.error('SDK operation failed:', error);
                document.getElementById('error-message').textContent = error.message;
            }
        }
        
        // Initialize when page loads
        window.addEventListener('load', initializeSDK);
    </script>
    
    <div id="payment-url">Loading payment URL...</div>
    <div id="ai-response">Loading AI response...</div>
    <div id="error-message" style="color: red;"></div>
</body>
</html>
```

## ⚙️ SDK Configuration

### Version Information

```javascript
import DevCraftorSDK from '@devcraftor/sdk';

console.log('SDK Version:', DevCraftorSDK.version); // "2.0.0"
```

### Environment Variables

For security, use environment variables to store your API credentials:

```bash
# .env file
DEVCRAFTOR_MERCHANT_TOKEN=your-merchant-token
DEVCRAFTOR_PAYMENT_API_KEY=your-payment-api-key
DEVCRAFTOR_PAYMENT_SECRET=your-payment-secret
DEVCRAFTOR_GAMING_API_KEY=your-gaming-api-key
DEVCRAFTOR_GAMING_API_SECRET=your-gaming-api-secret
DEVCRAFTOR_AI_API_KEY=your-ai-api-key
```

## 📝 Changelog

### v2.0.0 (Latest) - Breaking Changes

#### 🚨 BREAKING CHANGES

- **Payment API Authentication**: The `initPayment` method now requires three separate authentication parameters instead of a single `key`:
  - **OLD**: `sdk.initPayment({ key: 'your-merchant-token' })`
  - **NEW**: `sdk.initPayment({ token: 'your-merchant-token', apiKey: 'your-payment-api-key', secret: 'your-payment-secret' })`

#### Migration Guide

To upgrade from v1.x to v2.0.0:

1. **Update Payment API initialization**:
   ```javascript
   // OLD (v1.x)
   const payment = sdk.initPayment({ key: 'your-merchant-token' });
   
   // NEW (v2.0.0)
   const payment = sdk.initPayment({ 
     token: 'your-merchant-token',
     apiKey: 'your-payment-api-key',
     secret: 'your-payment-secret'
   });
   ```

2. **Update environment variables**:
   ```bash
   # Add these new variables
   DEVCRAFTOR_PAYMENT_API_KEY=your-payment-api-key
   DEVCRAFTOR_PAYMENT_SECRET=your-payment-secret
   ```

3. **Gaming and AI APIs remain unchanged** - no migration needed for these services.

#### New Features
- ✅ Enhanced security with three-factor authentication for Payment API
- ✅ Improved error handling with detailed error messages
- ✅ Better TypeScript support with updated type definitions
- ✅ Comprehensive documentation with error handling examples

#### Bug Fixes
- 🐛 Fixed authentication token refresh mechanism
- 🐛 Improved network timeout handling
- 🐛 Enhanced error response parsing

### v1.0.0 (Previous)
- ✅ Initial release
- ✅ Payment API integration with single key authentication
- ✅ Gaming API integration  
- ✅ AI Query API integration
- ✅ Full CommonJS, ES Modules, and UMD support
- ✅ TypeScript definitions
- ✅ Basic error handling

## 🔧 Technical Details

- **HTTP Client**: Uses `axios` internally for all API requests
- **Promise-based**: All methods return Promises and support async/await
- **Error Handling**: Comprehensive error responses with detailed messages
- **TypeScript**: Full TypeScript definitions included
- **No External Dependencies**: Minimal footprint with only essential dependencies

## 📖 API Documentation

For detailed API documentation, response schemas, and advanced configuration options, visit:
- **Payment API**: [https://docs.devcraftor.com/payment-api](https://docs.devcraftor.com/payment-api)
- **Gaming API**: [https://docs.devcraftor.com/gaming-api](https://docs.devcraftor.com/gaming-api)
- **AI API**: [https://docs.devcraftor.com/ai-api](https://docs.devcraftor.com/ai-api)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/devcraftor/sdk.git
cd sdk
npm install
npm run build
npm test
```

### Running Tests

```bash
npm test              # Run all tests
npm run test:unit     # Run unit tests only
npm run test:e2e      # Run end-to-end tests
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Anurag Anand**
- GitHub: [@anuragco](https://github.com/anuragco)
- Email: aws.anu.co@gmail.com

## 📞 Support

- **Documentation**: [https://docs.devcraftor.com](https://docs.devcraftor.com)
- **Support Email**: aws.anu.co@gmail.com
- **GitHub Issues**: [https://github.com/devcraftor/sdk/issues](https://github.com/devcraftor/sdk/issues)
- **Discord Community**: [https://discord.gg/devcraftor](https://discord.gg/devcraftor)

## 🔮 Roadmap

- [ ] WebSocket support for real-time gaming events
- [ ] Enhanced AI models with custom training support
- [ ] Payment webhooks SDK integration
- [ ] React/Vue.js framework-specific helpers
- [ ] GraphQL API support
- [ ] Advanced caching mechanisms

---

Made with ❤️ by Anurag Anand