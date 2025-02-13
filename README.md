# Sticklight TypeScript SDK

The official TypeScript SDK for [Sticklight](https://sticklight.io).

## Installation

```bash
npm install sticklight
# or
yarn add sticklight
# or
pnpm add sticklight
```

## Quick Start

```typescript
import * as sl from 'sticklight';

// Initialize the SDK with your API key
sl.init("your-api-key");

// Publish an event
sl.capture("user_started_chat", {
    user_id: "user_123",
    message: "I need help with this and that feature",
    // ... Any other data you want to track
});
```

## Authentication

You'll need a Sticklight API key to use this SDK. You can either:

1. Call `sl.init` once with your API key:
   ```typescript
   sl.init("your-api-key");
   ```

2. Pass it directly to the `sl.capture` function:
   ```typescript
   sl.capture("user_started_chat", { $sticklightApiKey: "your-api-key", ... });
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
git clone https://github.com/sticklight/sticklight-ts.git
cd sticklight-ts

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run tests
npm test
# or
yarn test
# or
pnpm test

# Build the package
npm run build
# or
yarn build
# or
pnpm build
```

## License

Apache 2.0

## Support

- Documentation: [docs.sticklight.io](https://docs.sticklight.io)
- Issues: [GitHub Issues](https://github.com/sticklight/sticklight-ts/issues)
- Email: hello@sticklight.io
- [Book a demo](https://calendly.com/matan-sticklight/30min)

[Sticklight Platform]: https://platform.sticklight.io