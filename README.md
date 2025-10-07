# VibeCode

> An AI-powered coding assistant that transforms natural language prompts into React components within a sleek, split-screen workbench.

VibeCode is an AI-powered chat application designed to function as a UI/code copilot. It transforms natural language prompts into self-contained, minimal React components. The user interacts with a chat interface, and upon the first submission, the UI elegantly transitions into a split-screen 'Workbench' layout. The left panel contains the ongoing conversation, while the right panel features a tabbed view to display the generated code with syntax highlighting. The application is built on a dark theme with vibrant orange accents, creating a modern, developer-focused aesthetic.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ELO-Idou/generated-app-20251007-010326)

## ✨ Key Features

- **AI-Powered Code Generation**: Describe UI components in plain English and get functional React code in return.
- **Interactive Workbench**: A dynamic split-screen layout that separates the chat conversation from the generated code and preview.
- **Sleek Dark UI**: A developer-focused dark theme with vibrant orange accents for excellent readability and a modern feel.
- **Real-time Updates**: Continue the conversation to refine or change the code, and watch the workbench update instantly.
- **Syntax Highlighting**: Generated code is beautifully formatted and highlighted for easy reading.
- **Built on Cloudflare**: Leverages the power and scalability of Cloudflare Workers and Durable Objects for a fast, persistent experience.

## 🚀 Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui, Framer Motion, Zustand
- **Backend**: Hono on Cloudflare Workers
- **State Management**: Cloudflare Agents (Durable Objects) for persistent conversations
- **AI Integration**: Cloudflare AI Gateway
- **Styling**: Tailwind CSS with a custom dark/orange theme
- **Icons**: Lucide React

## 🛠️ Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20.x or later recommended)
- [Bun](https://bun.sh/) package manager

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/vibecode.git
    cd vibecode
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

### Environment Variables

The application requires Cloudflare AI Gateway credentials to function.

1.  Create a `.dev.vars` file in the root of the project:
    ```bash
    cp .dev.vars.example .dev.vars
    ```

2.  Add your Cloudflare AI Gateway URL and API Key to the `.dev.vars` file:
    ```
    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
    CF_AI_API_KEY="YOUR_CLOUDFLARE_API_KEY"
    ```

> **Note**: The AI capabilities will not work in the hosted demo version due to security constraints around API keys. To use the full AI functionality, you must deploy the application yourself.

## 🖥️ Running Locally

To start the development server, which includes the Vite frontend and the local Wrangler server for the backend worker, run:

```bash
bun dev
```

This will start the application, typically on `http://localhost:3000`. The frontend will automatically reload as you make changes to the source files.

## 🚀 Deployment

This project is designed for easy deployment to Cloudflare.

1.  **Login to Wrangler:**
    If you haven't already, authenticate with your Cloudflare account:
    ```bash
    bunx wrangler login
    ```

2.  **Set Production Secrets:**
    You must set your API key as a secret in your Cloudflare project. This keeps it secure and out of your source code.
    ```bash
    bunx wrangler secret put CF_AI_API_KEY
    ```
    You will also need to set `CF_AI_BASE_URL` as a secret or directly in your `wrangler.jsonc` file.

3.  **Deploy the application:**
    ```bash
    bun run deploy
    ```
    This command will build the frontend application and deploy it along with the backend worker to your Cloudflare account.

Or deploy directly with the button below:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ELO-Idou/generated-app-20251007-010326)

## 📂 Project Structure

-   `src/`: Contains all the frontend React application code.
    -   `components/`: Shared React components, including shadcn/ui components.
    -   `hooks/`: Custom React hooks for state and logic.
    -   `pages/`: Top-level page components for different routes.
    -   `lib/`: Utility functions and client-side libraries.
-   `worker/`: Contains all the backend Cloudflare Worker and Agent (Durable Object) code.
    -   `agent.ts`: The core `ChatAgent` class for managing conversation state.
    -   `chat.ts`: Handles AI model interaction and tool logic.
    -   `userRoutes.ts`: Defines the API routes for the application.
    -   `tools.ts`: Defines and implements available tools for the AI model.

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.