# Sticklight TypeScript SDK

The official TypeScript SDK for [Sticklight](https://sticklight.io).

## Installation

```bash
npm install @sticklight/sdk
# or
yarn add @sticklight/sdk
```

## Quick Start

```typescript
import * as sl from 'sticklight';

// Authenticate with your API key
sl.init("your-api-key");

// Publish an event
sl.capture("user_started_chat", {
    user_id: "user_123",
    message: "I need help with your new feature",
    // ... Any other data you want to track
});
```

To create an API key, go to the [Sticklight Platform].

## Requirements

- Node.js 18 or higher

## About Sticklight

Sticklight provides precise and actionable analytics for AI-powered products, giving product managers and developers deep insights into how users interact with their AI features. Our platform helps you:

- Understand user patterns and behaviors in LLM interactions
- Identify where users struggle and detect critical issues in real-time
- Make data-driven decisions for your AI product roadmap

Think of it as product analytics, but specifically designed for the unique challenges of AI applications. Whether you're running a support chatbot, internal agentic architecture, or any other LLM-oriented product, Sticklight instills deep confidence and clarity in your product decisions.

## Development

```bash
# Clone the repository
git clone https://github.com/sticklight-io/sticklight-ts.git
cd sticklight-ts

# Install dependencies
npm install
# or
yarn install

# Run tests
npm test
# or
yarn test

# Build the package
npm run build
# or
yarn build
```

## License

Apache 2.0

## Support

- Documentation: [docs.sticklight.io](https://docs.sticklight.io)
- Issues: [GitHub Issues](https://github.com/sticklight-io/sticklight-ts/issues)
- Email: support@sticklight.io
- [Book a demo](https://calendly.com/matan-sticklight/30min)

[Sticklight Platform]: https://platform.sticklight.io