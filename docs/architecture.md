# Architecture Overview

## System Architecture

The Zenhub workspace follows a microservices architecture pattern, designed to be scalable and maintainable.

## Project Structure

### Frontend Applications (`apps/` directory)
```
apps/
├── attendance-portal/          # Web portal for attendance management
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API service calls
│   │   └── utils/            # Utility functions
│   └── package.json
└── attendance-app/            # Mobile app for attendance
    ├── src/
    ├── ios/
    └── android/
```

### Shared Libraries (`libs/` directory)
```
libs/
├── shared/
│   ├── ui-components/        # Common UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Card/
│   ├── hooks/               # Shared React hooks
│   └── utils/               # Common utility functions
└── attendance/
    ├── core/               # Core business logic
    └── data-access/        # Data fetching and state
```

### Backend Services (`services/` directory)
```
services/
└── attendance-api/
    ├── src/
    │   ├── controllers/    # Request handlers
    │   ├── services/       # Business logic
    │   ├── models/         # Data models
    │   └── middleware/     # Custom middleware
    └── tests/
```

## Technology Stack

### Frontend Tools
- **React v18.2.0**: UI library
  - Hooks for state management
  - Function components preferred
  - TypeScript for type safety

- **Vite v4.3.8**: Build tool
  - Fast development server
  - Hot Module Replacement (HMR)
  - Optimized production builds

- **TailwindCSS v3.3.2**: Utility-first CSS
  - Responsive design utilities
  - Component styling
  - Custom theme configuration

- **React Query v4.29.7**: Data fetching
  - Server state management
  - Caching and background updates
  - Optimistic updates

### Backend Tools
- **NestJS**: Node.js framework
  - TypeScript support
  - Dependency injection
  - Modular architecture

- **PostgreSQL**: Primary database
  - Relational data storage
  - Complex queries
  - Data integrity

- **Redis**: Caching layer
  - Session storage
  - Rate limiting
  - Real-time features

### Development Tools
- **Visual Studio Code**: Primary IDE
  - Built-in Git integration
  - TypeScript support
  - Debugging capabilities

- **Docker**: Containerization
  - Consistent environments
  - Easy deployment
  - Service isolation

## Getting Started

1. Install Required Tools:
   ```bash
   # Install Node.js LTS version
   # Windows: Download from https://nodejs.org
   # Mac: Use homebrew
   brew install node

   # Install VS Code
   # Download from https://code.visualstudio.com

   # Install Git
   # Windows: Download from https://git-scm.com
   # Mac:
   brew install git
   ```

2. VS Code Extensions:
   - ESLint
   - Prettier
   - GitLens
   - Tailwind CSS IntelliSense

3. Clone and Setup:
   ```bash
   git clone https://github.com/your-org/zenhub-workspace.git
   cd zenhub-workspace
   npm install
   ```

## Common Development Tasks

### Starting Development Server
```bash
# For attendance portal
npm run dev:attendance

# For attendance API
npm run dev:attendance-api
```

### Running Tests
```bash
# Run all tests
npm test

# Run specific app tests
npm run test:attendance
```

### Building for Production
```bash
# Build all apps
npm run build

# Build specific app
npm run build:attendance
```