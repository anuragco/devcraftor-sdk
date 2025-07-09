# Contributing to @devcraftor/sdk 🤝

Thank you for your interest in contributing to the DevCraftor SDK! We welcome contributions from the community and are excited to collaborate with you.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Testing](#testing)
- [Code Style](#code-style)
- [Documentation](#documentation)
- [Release Process](#release-process)
- [Community](#community)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

### Our Pledge

- Be welcoming and inclusive
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher
- **Git**: Latest version
- **Code Editor**: VS Code recommended with ESLint and Prettier extensions

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/sdk.git
   cd sdk
   ```

3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/devcraftor/sdk.git
   ```

## Development Setup

### Installation

```bash
# Install dependencies
npm install

# Install development dependencies
npm install --dev

# Link the package globally for testing
npm link
```

### Environment Configuration

Create a `.env` file in the root directory:

```bash
# Development API endpoints
DEVCRAFTOR_API_BASE_URL=https://api-dev.devcraftor.com
DEVCRAFTOR_PAYMENT_BASE_URL=https://payment-dev.devcraftor.com
DEVCRAFTOR_GAMING_BASE_URL=https://gaming-dev.devcraftor.com
DEVCRAFTOR_AI_BASE_URL=https://ai-dev.devcraftor.com

# Test credentials (obtain from maintainers)
TEST_MERCHANT_TOKEN=test-merchant-token
TEST_PAYMENT_API_KEY=test-payment-api-key
TEST_PAYMENT_SECRET=test-payment-secret
TEST_GAMING_API_KEY=test-gaming-api-key
TEST_GAMING_SECRET=test-gaming-secret
TEST_AI_API_KEY=test-ai-api-key
```

### Build Commands

```bash
# Build the project
npm run build

# Build for development (with source maps)
npm run build:dev

# Build for production
npm run build:prod

# Watch mode for development
npm run watch

# Clean build artifacts
npm run clean
```

## Project Structure

```
@devcraftor/sdk/
├── src/
│   ├── core/
│   │   ├── sdk.js              # Main SDK class
│   │   ├── http-client.js      # HTTP client wrapper
│   │   └── utils.js            # Utility functions
│   ├── services/
│   │   ├── payment/
│   │   │   ├── index.js        # Payment service
│   │   │   ├── types.js        # Payment types
│   │   │   └── validators.js   # Payment validators
│   │   ├── gaming/
│   │   │   ├── index.js        # Gaming service
│   │   │   ├── types.js        # Gaming types
│   │   │   └── validators.js   # Gaming validators
│   │   └── ai/
│   │       ├── index.js        # AI service
│   │       ├── types.js        # AI types
│   │       └── validators.js   # AI validators
│   ├── types/
│   │   ├── index.d.ts          # TypeScript definitions
│   │   └── interfaces.d.ts     # Interface definitions
│   └── index.js                # Main entry point
├── dist/                       # Built files
├── tests/
│   ├── unit/                   # Unit tests
│   ├── integration/            # Integration tests
│   ├── e2e/                    # End-to-end tests
│   └── fixtures/               # Test fixtures
├── docs/                       # Documentation
├── examples/                   # Example implementations
├── scripts/                    # Build and utility scripts
├── .github/                    # GitHub workflows
├── package.json
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

## Contributing Guidelines

### Types of Contributions

We welcome several types of contributions:

1. **Bug Reports**: Found a bug? Please report it!
2. **Feature Requests**: Have an idea for improvement?
3. **Code Contributions**: Bug fixes, new features, optimizations
4. **Documentation**: Improve docs, add examples, fix typos
5. **Testing**: Add test cases, improve test coverage
6. **Reviews**: Help review pull requests

### Contribution Workflow

1. **Check existing issues** to avoid duplicates
2. **Create an issue** for significant changes
3. **Fork and branch** from the main branch
4. **Make your changes** following our guidelines
5. **Test thoroughly** including unit and integration tests
6. **Submit a pull request** with detailed description

### Branching Strategy

- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/feature-name**: New features
- **bugfix/bug-description**: Bug fixes
- **hotfix/critical-fix**: Critical production fixes

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or modifying tests
- **chore**: Maintenance tasks

#### Examples

```bash
feat(payment): add support for recurring payments
fix(gaming): resolve wallet balance calculation issue
docs(readme): update installation instructions
test(ai): add unit tests for query validation
```

## Pull Request Process

### Before Submitting

1. **Update your fork**:
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Run the test suite**:
   ```bash
   npm test
   npm run test:integration
   npm run test:e2e
   ```

3. **Check code quality**:
   ```bash
   npm run lint
   npm run format
   npm run type-check
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

### Pull Request Template

When creating a pull request, use this template:

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code commented where necessary
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes (or clearly documented)

## Related Issues
Fixes #[issue number]
```

### Review Process

1. **Automated checks** must pass (CI/CD pipeline)
2. **Code review** by at least one maintainer
3. **Testing** in development environment
4. **Documentation** review if applicable
5. **Merge** once approved

## Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
## Bug Description
Clear description of the bug.

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen.

## Actual Behavior
What actually happened.

## Environment
- SDK Version: 
- Node.js Version: 
- Operating System: 
- Browser (if applicable): 

## Additional Context
Any additional information.
```

### Feature Requests

Use the feature request template:

```markdown
## Feature Description
Clear description of the desired feature.

## Problem/Use Case
What problem does this solve?

## Proposed Solution
How should this be implemented?

## Alternative Solutions
Other approaches considered.

## Additional Context
Any additional information.
```

## Testing

### Test Types

1. **Unit Tests**: Test individual functions/methods
2. **Integration Tests**: Test service integrations
3. **E2E Tests**: Test complete workflows
4. **Performance Tests**: Test performance characteristics

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Writing Tests

#### Unit Test Example

```javascript
// tests/unit/services/payment.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { PaymentService } from '../../../src/services/payment';

describe('PaymentService', () => {
  let paymentService;

  beforeEach(() => {
    paymentService = new PaymentService({
      token: 'test-token',
      apiKey: 'test-key',
      secret: 'test-secret'
    });
  });

  it('should create payment successfully', async () => {
    const paymentData = {
      orderId: 'ORDER_123',
      txnAmount: 100.00,
      txnNote: 'Test payment',
      cust_Mobile: '9876543210',
      cust_Email: 'test@example.com'
    };

    const result = await paymentService.createPayment(paymentData);
    
    expect(result).toHaveProperty('paymentUrl');
    expect(result).toHaveProperty('txnId');
    expect(result.orderId).toBe('ORDER_123');
  });
});
```

#### Integration Test Example

```javascript
// tests/integration/payment-flow.test.js
import { describe, it, expect } from 'vitest';
import DevCraftorSDK from '../../src/index.js';

describe('Payment Flow Integration', () => {
  it('should complete payment workflow', async () => {
    const sdk = new DevCraftorSDK();
    const payment = sdk.initPayment({
      token: process.env.TEST_MERCHANT_TOKEN,
      apiKey: process.env.TEST_PAYMENT_API_KEY,
      secret: process.env.TEST_PAYMENT_SECRET
    });

    // Create payment
    const paymentResult = await payment.createPayment({
      orderId: 'INT_TEST_' + Date.now(),
      txnAmount: 50.00,
      txnNote: 'Integration test payment',
      cust_Mobile: '9876543210',
      cust_Email: 'test@example.com'
    });

    expect(paymentResult).toBeDefined();
    expect(paymentResult.paymentUrl).toBeDefined();

    // Check payment status
    const status = await payment.checkPaymentStatus(paymentResult.orderId);
    expect(status).toBeDefined();
    expect(status.orderId).toBe(paymentResult.orderId);
  });
});
```

### Test Guidelines

- Write tests for all new features
- Maintain test coverage above 80%
- Use descriptive test names
- Test both success and error scenarios
- Mock external dependencies appropriately
- Follow the AAA pattern (Arrange, Act, Assert)

## Code Style

### ESLint Configuration

We use ESLint with custom rules:

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    '@devcraftor/eslint-config'
  ],
  rules: {
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error'
  }
};
```

### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### Code Quality Commands

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

### Style Guidelines

- Use meaningful variable and function names
- Write clear, concise comments
- Keep functions small and focused
- Follow DRY principles
- Use async/await over promises
- Handle errors appropriately
- Use TypeScript where beneficial

## Documentation

### Types of Documentation

1. **API Documentation**: JSDoc comments in code
2. **Usage Examples**: Real-world usage scenarios
3. **README Updates**: Keep README current
4. **Changelog**: Document all changes

### Documentation Guidelines

- Write clear, concise documentation
- Include code examples
- Keep documentation up-to-date
- Use proper markdown formatting
- Link to relevant resources

### JSDoc Example

```javascript
/**
 * Creates a new payment request
 * @param {Object} paymentData - Payment information
 * @param {string} paymentData.orderId - Unique order identifier
 * @param {number} paymentData.txnAmount - Transaction amount
 * @param {string} paymentData.txnNote - Payment description
 * @param {string} paymentData.cust_Mobile - Customer mobile number
 * @param {string} paymentData.cust_Email - Customer email address
 * @returns {Promise<Object>} Payment result with URL and transaction ID
 * @throws {Error} If payment creation fails
 * @example
 * const result = await payment.createPayment({
 *   orderId: 'ORDER_123',
 *   txnAmount: 100.00,
 *   txnNote: 'Premium subscription',
 *   cust_Mobile: '9876543210',
 *   cust_Email: 'user@example.com'
 * });
 */
async createPayment(paymentData) {
  // Implementation
}
```

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. **Update version** in package.json
2. **Update CHANGELOG.md** with new version
3. **Create release branch**:
   ```bash
   git checkout -b release/v2.1.0
   ```
4. **Run full test suite**
5. **Build and test package**
6. **Create pull request** for release
7. **Merge to main** after approval
8. **Tag release**:
   ```bash
   git tag v2.1.0
   git push origin v2.1.0
   ```
9. **Publish to npm**:
   ```bash
   npm publish
   ```

### Pre-release Testing

```bash
# Create pre-release version
npm version prerelease --preid=beta

# Publish pre-release
npm publish --tag beta

# Test pre-release
npm install @devcraftor/sdk@beta
```

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and discussions
- **Discord**: [https://discord.gg/devcraftor](https://discord.gg/devcraftor)
- **Email**: aws.anu.co@gmail.com

### Getting Help

1. **Check existing issues** and documentation
2. **Search Discord** for similar questions
3. **Create detailed issue** with reproduction steps
4. **Join community discussions**

### Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **CHANGELOG.md** for significant contributions
- **GitHub releases** notes
- **Discord** contributor role

## Questions?

If you have questions about contributing, please:

1. Check this guide first
2. Search existing issues
3. Join our Discord community
4. Create a new issue with the `question` label

Thank you for contributing to the DevCraftor SDK! 🚀

---

**Happy Coding!** 
The DevCraftor Team