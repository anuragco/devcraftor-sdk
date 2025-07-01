# Security Policy

## 🔒 Security at DevCraftor

We take security seriously at DevCraftor. This document outlines our security practices, how to report vulnerabilities, and best practices for using the `@devcraftor/sdk` securely.

## 🛡️ Supported Versions

We actively maintain and provide security updates for the following versions of `@devcraftor/sdk`:

| Version | Supported          | End of Life |
| ------- | ------------------ | ----------- |
| 1.0.x   | ✅ Yes             | TBD         |
| < 1.0   | ❌ No              | 2025-01-01  |

**Important**: Always use the latest stable version to ensure you have the most recent security patches.

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability in the DevCraftor SDK, please report it responsibly:

### Preferred Method: Security Email
- **Email**: security@devcraftor.com
- **Response Time**: Within 24 hours (business days)
- **PGP Key**: Available at [https://devcraftor.com/.well-known/pgp-key.txt](https://devcraftor.com/.well-known/pgp-key.txt)

### What to Include in Your Report

Please provide as much information as possible:

```
Subject: [SECURITY] Brief description of the vulnerability

1. **Vulnerability Type**: (e.g., Authentication bypass, XSS, etc.)
2. **Affected Component**: (Payment API, Gaming API, AI API, or SDK Core)
3. **Severity Level**: (Critical, High, Medium, Low)
4. **Steps to Reproduce**: Detailed reproduction steps
5. **Impact Assessment**: Potential security implications
6. **Proof of Concept**: Code snippet or screenshot (if applicable)
7. **Suggested Fix**: Your recommendation (if any)
8. **Contact Information**: How we can reach you for follow-up
```

### What NOT to Do

❌ **Do NOT**:
- Open public GitHub issues for security vulnerabilities
- Discuss vulnerabilities on social media or forums
- Attempt to exploit vulnerabilities on production systems
- Share vulnerability details publicly before coordinated disclosure

## 📋 Vulnerability Response Process

1. **Acknowledgment** (Within 24 hours)
   - We confirm receipt of your report
   - Assign a tracking number (SEC-YYYY-NNNN)

2. **Initial Assessment** (Within 48 hours)
   - Validate the vulnerability
   - Assess severity and impact
   - Determine affected versions

3. **Investigation & Fix** (Timeline varies by severity)
   - Critical: 1-3 days
   - High: 3-7 days
   - Medium: 7-14 days
   - Low: 14-30 days

4. **Coordinated Disclosure**
   - Patch development and testing
   - Security advisory preparation
   - Public disclosure coordination (typically 90 days)

5. **Recognition**
   - Security researchers are credited in our Hall of Fame
   - Responsible disclosure acknowledgment

## 🔐 Security Best Practices

### API Key Management

#### ✅ DO:
```javascript
// Use environment variables
const sdk = new DevCraftorSDK();
const payment = sdk.initPayment({ 
  key: process.env.DEVCRAFTOR_MERCHANT_TOKEN 
});

// Rotate keys regularly
// Monitor key usage
// Use different keys for different environments
```

#### ❌ DON'T:
```javascript
// Never hardcode keys in source code
const payment = sdk.initPayment({ 
  key: 'merchant_live_1234567890abcdef' // ❌ NEVER DO THIS
});

// Don't commit keys to version control
// Don't share keys in chat/email
// Don't log keys in application logs
```

### Environment Separation

```bash
# Development
DEVCRAFTOR_MERCHANT_TOKEN=merchant_test_xxxxx
DEVCRAFTOR_GAMING_API_KEY=gaming_test_xxxxx
DEVCRAFTOR_AI_API_KEY=ai_test_xxxxx

# Production
DEVCRAFTOR_MERCHANT_TOKEN=merchant_live_xxxxx
DEVCRAFTOR_GAMING_API_KEY=gaming_live_xxxxx  
DEVCRAFTOR_AI_API_KEY=ai_live_xxxxx
```

### Secure Error Handling

```javascript
try {
  const result = await payment.createPayment(paymentData);
  return result;
} catch (error) {
  // ✅ Log errors securely (don't expose sensitive data)
  logger.error('Payment creation failed', {
    orderId: paymentData.orderId,
    error: error.message, // Don't log full error object
    timestamp: new Date().toISOString()
  });
  
  // ❌ Don't expose internal error details to users
  throw new Error('Payment processing failed. Please try again.');
}
```

### Input Validation & Sanitization

```javascript
// ✅ Validate all inputs before API calls
function validatePaymentData(data) {
  const errors = [];
  
  if (!data.orderId || !/^[A-Z0-9_-]+$/i.test(data.orderId)) {
    errors.push('Invalid order ID format');
  }
  
  if (!data.txnAmount || data.txnAmount <= 0 || data.txnAmount > 100000) {
    errors.push('Invalid transaction amount');
  }
  
  if (!data.cust_Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.cust_Email)) {
    errors.push('Invalid email format');
  }
  
  if (!data.cust_Mobile || !/^\d{10}$/.test(data.cust_Mobile)) {
    errors.push('Invalid mobile number format');
  }
  
  if (errors.length > 0) {
    throw new ValidationError(errors.join(', '));
  }
  
  return true;
}

// Use validation before API calls
try {
  validatePaymentData(paymentData);
  const result = await payment.createPayment(paymentData);
} catch (error) {
  // Handle validation errors appropriately
}
```

### Network Security

```javascript
// ✅ Use HTTPS in production
const sdk = new DevCraftorSDK({
  baseURL: 'https://api.devcraftor.com', // Always use HTTPS
  timeout: 30000, // Set reasonable timeouts
  maxRetries: 3   // Limit retry attempts
});

// ✅ Implement request/response logging for audit trails
sdk.interceptors.request.use(request => {
  logger.info('API Request', {
    method: request.method,
    url: request.url,
    timestamp: new Date().toISOString()
    // Don't log request body (may contain sensitive data)
  });
  return request;
});
```

## 🔒 SDK Security Features

### Built-in Security Measures

1. **TLS/SSL Encryption**: All API communications use HTTPS
2. **Request Signing**: Critical requests are cryptographically signed
3. **Rate Limiting**: Built-in rate limiting to prevent abuse
4. **Input Sanitization**: Automatic sanitization of user inputs
5. **Timeout Protection**: Configurable timeouts to prevent hanging requests
6. **Error Sanitization**: Sensitive data removed from error messages

### Authentication & Authorization

```javascript
// Payment API - Merchant Token Authentication
const payment = sdk.initPayment({ 
  key: 'merchant_token' // Validates against merchant account
});

// Gaming API - API Key + Secret Authentication  
const gaming = sdk.initGaming({ 
  key: 'api_key',
  secret: 'api_secret' // HMAC-SHA256 request signing
});

// AI API - API Key Authentication
const ai = sdk.initAi({ 
  key: 'ai_api_key' // Bearer token authentication
});
```

## 📊 Security Monitoring

### Audit Logging

```javascript
// Enable comprehensive logging
const sdk = new DevCraftorSDK({
  logging: {
    level: 'info',
    auditTrail: true,
    sensitiveDataMasking: true
  }
});

// Log all API interactions
sdk.on('request', (details) => {
  auditLogger.info('API Request', {
    service: details.service,
    method: details.method,
    endpoint: details.endpoint,
    timestamp: details.timestamp,
    requestId: details.requestId
  });
});
```

### Anomaly Detection

Monitor for suspicious patterns:
- Unusual API call volumes
- Failed authentication attempts
- Repeated error responses
- Geographic anomalies
- Time-based access patterns

## 🚫 Common Security Pitfalls

### 1. API Key Exposure
```javascript
// ❌ Bad: Exposed in client-side code
<script>
  const sdk = new DevCraftorSDK();
  const payment = sdk.initPayment({ key: 'merchant_live_123' });
</script>

// ✅ Good: Server-side only
// Backend API endpoint handles SDK initialization
```

### 2. Insufficient Input Validation
```javascript
// ❌ Bad: Direct user input to API
const result = await payment.createPayment(req.body);

// ✅ Good: Validated and sanitized input
const validatedData = validateAndSanitize(req.body);
const result = await payment.createPayment(validatedData);
```

### 3. Error Information Leakage
```javascript
// ❌ Bad: Exposing internal errors
res.status(500).json({ error: error.stack });

// ✅ Good: Generic error messages
res.status(500).json({ error: 'Payment processing failed' });
```

### 4. Logging Sensitive Data
```javascript
// ❌ Bad: Logging sensitive information
console.log('Payment request:', JSON.stringify(paymentData));

// ✅ Good: Masked sensitive data
console.log('Payment request:', maskSensitiveData(paymentData));
```

## 🔄 Security Updates

### Staying Informed

- **Security Advisories**: [https://github.com/devcraftor/sdk/security/advisories](https://github.com/devcraftor/sdk/security/advisories)
- **Release Notes**: Check for security-related changes in release notes
- **Security Newsletter**: Subscribe at [security-updates@devcraftor.com](mailto:security-updates@devcraftor.com)

### Update Process

```bash
# Check for security updates
npm audit

# Update to latest secure version
npm update @devcraftor/sdk

# Verify no vulnerable dependencies
npm audit --fix
```

## 📜 Compliance & Standards

### Industry Standards
- **PCI DSS**: Payment card industry compliance
- **OWASP**: Following OWASP security guidelines
- **ISO 27001**: Information security management
- **SOC 2**: Security and availability controls

### Data Protection
- **GDPR**: European data protection compliance
- **CCPA**: California Consumer Privacy Act compliance
- **Data Minimization**: Collect only necessary data
- **Encryption**: Data encrypted at rest and in transit

## 🎯 Security Checklist

Before deploying applications using `@devcraftor/sdk`:

- [ ] All API keys stored in environment variables
- [ ] Using latest SDK version
- [ ] Input validation implemented
- [ ] Error handling doesn't expose sensitive data
- [ ] HTTPS used for all communications
- [ ] Audit logging enabled
- [ ] Security monitoring in place
- [ ] Regular security updates scheduled
- [ ] Key rotation strategy implemented
- [ ] Incident response plan documented

## 📞 Emergency Contact

For critical security incidents requiring immediate attention:

- **Emergency Email**: security-emergency@devcraftor.com
- **Phone**: +91-XXX-XXX-XXXX (24/7 security hotline)
- **Signal**: Available upon request for sensitive communications

## 🏆 Security Hall of Fame

We recognize security researchers who responsibly disclose vulnerabilities:

*No vulnerabilities reported yet - be the first!*

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [NPM Security Guidelines](https://docs.npmjs.com/security)
- [API Security Checklist](https://github.com/shieldfy/API-Security-Checklist)

---

**Last Updated**: July 1, 2025  
**Next Review**: October 1, 2025

For questions about this security policy, contact: security@devcraftor.com