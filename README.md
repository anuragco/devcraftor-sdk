# @devcraftor/sdk 🚀

[![npm version](https://badge.fury.io/js/%40devcraftor%2Fsdk.svg)](https://badge.fury.io/js/%40devcraftor%2Fsdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/devcraftor/sdk/workflows/Node.js%20CI/badge.svg)](https://github.com/devcraftor/sdk/actions)

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

// Initialize services
const payment = sdk.initPayment({ key: 'your-merchant-token' });
const gaming = sdk.initGaming({ key: 'your-api-key', secret: 'your-secret' });
const ai = sdk.initAi({ key: 'your-ai-key' });
```

### CommonJS

```javascript
const DevCraftorSDK = require('@devcraftor/sdk');

const sdk = new DevCraftorSDK();

// Initialize services
const payment = sdk.initPayment({ key: 'your-merchant-token' });
const gaming = sdk.initGaming({ key: 'your-api-key', secret: 'your-secret' });
const ai = sdk.initAi({ key: 'your-ai-key' });
```

### Browser (UMD via CDN)

```html
<script src="https://unpkg.com/@devcraftor/sdk@latest/dist/devcraftor-sdk.umd.js"></script>
<script>
  const sdk = new DevCraftorSDK();
  
  // Initialize services
  const payment = sdk.initPayment({ key: 'your-merchant-token' });
  const gaming = sdk.initGaming({ key: 'your-api-key', secret: 'your-secret' });
  const ai = sdk.initAi({ key: 'your-ai-key' });
</script>
```

## 💳 Payment API

The Payment module provides secure payment processing capabilities with merchant token authentication.

### Initialization

```javascript
const payment = sdk.initPayment({ 
  key: 'your-merchant-token' // Required: Your DevCraftor merchant token
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
    username: 'johndoe123',
    password: 'securePassword123',
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

## 📚 Complete Usage Examples

### Node.js with ES Modules

```javascript
import DevCraftorSDK from '@devcraftor/sdk';

async function main() {
  const sdk = new DevCraftorSDK();
  
  // Initialize all services
  const payment = sdk.initPayment({ key: 'merchant-token' });
  const gaming = sdk.initGaming({ key: 'api-key', secret: 'api-secret' });
  const ai = sdk.initAi({ key: 'ai-key' });
  
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
  
  const payment = sdk.initPayment({ key: process.env.MERCHANT_TOKEN });
  const gaming = sdk.initGaming({ 
    key: process.env.GAMING_API_KEY, 
    secret: process.env.GAMING_API_SECRET 
  });
  const ai = sdk.initAi({ key: process.env.AI_API_KEY });
  
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
            
            const ai = sdk.initAi({ key: 'your-ai-key' });
            
            try {
                const response = await ai.ask('What is machine learning?');
                document.getElementById('ai-response').textContent = response.answer;
            } catch (error) {
                console.error('AI query failed:', error);
            }
        }
        
        // Initialize when page loads
        window.addEventListener('load', initializeSDK);
    </script>
    
    <div id="ai-response">Loading AI response...</div>
</body>
</html>
```

## ⚙️ SDK Configuration

### Version Information

```javascript
import DevCraftorSDK from '@devcraftor/sdk';

console.log('SDK Version:', DevCraftorSDK.version); // "1.0.0"
```

### Environment Variables

For security, use environment variables to store your API credentials:

```bash
# .env file
DEVCRAFTOR_MERCHANT_TOKEN=your-merchant-token
DEVCRAFTOR_GAMING_API_KEY=your-gaming-api-key
DEVCRAFTOR_GAMING_API_SECRET=your-gaming-api-secret
DEVCRAFTOR_AI_API_KEY=your-ai-api-key
```

## 🔧 Technical Details

- **HTTP Client**: Uses `axios` internally for all API requests
- **Promise-based**: All methods return Promises and support async/await
- **Error Handling**: Comprehensive error responses with detailed messages
- **TypeScript**: Full TypeScript definitions included
- **No External Dependencies**: Minimal footprint with only essential dependencies

## 🛠️ Error Handling Best Practices

```javascript
import DevCraftorSDK from '@devcraftor/sdk';

async function handleSDKOperations() {
  const sdk = new DevCraftorSDK();
  const payment = sdk.initPayment({ key: 'your-key' });
  
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
    // Check for API response errors
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      throw new Error(`Payment failed: ${error.response.data.message}`);
    }
    
    // Check for network errors
    if (error.request) {
      console.error('Network Error:', error.message);
      throw new Error('Network connection failed');
    }
    
    // Other errors
    console.error('SDK Error:', error.message);
    throw error;
  }
}
```

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

## 📝 Changelog

### v1.0.0 (Latest)
- ✅ Initial release
- ✅ Payment API integration
- ✅ Gaming API integration  
- ✅ AI Query API integration
- ✅ Full CommonJS, ES Modules, and UMD support
- ✅ TypeScript definitions
- ✅ Comprehensive error handling

### Upgrade Notes
- **Breaking Changes**: None (initial release)
- **New Features**: All core functionality implemented
- **Bug Fixes**: N/A (initial release)

## 🔮 Roadmap

- [ ] WebSocket support for real-time gaming events
- [ ] Enhanced AI models with custom training support
- [ ] Payment webhooks SDK integration
- [ ] React/Vue.js framework-specific helpers
- [ ] GraphQL API support
- [ ] Advanced caching mechanisms

---

Made with ❤️ by the Anurag Anand