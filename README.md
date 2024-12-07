# Zenhub Workspace

A comprehensive enterprise workspace containing multiple applications and services for business operations management.

## Project Structure

This monorepo is organized into the following main directories:

- `apps/`: Contains all frontend applications (web portals and mobile apps)
- `libs/`: Shared libraries and components
- `services/`: Backend microservices
- `tools/`: Workspace-level utilities and scripts

## Available Applications

- Attendance Portal & Mobile App
- Customer Portal
- Employee Portal
- Field Operations Portal
- Helpdesk Portal
- Inventory Portal
- Payroll Portal
- POS Portal & Mobile App

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start a specific application:
   ```bash
   npm run dev:attendance  # For attendance portal
   ```

## Development Guidelines

- Follow the established folder structure for new features
- Utilize shared components from the `libs/` directory
- Maintain consistent code style using provided ESLint and Prettier configs
- Write tests for all new features

## Documentation

Detailed documentation for each component can be found in the `docs/` directory:

- [Architecture Overview](docs/architecture.md)
- [Development Guidelines](docs/development.md)
- [API Documentation](docs/api.md)
- [Deployment Guide](docs/deployment.md)

## Contributing

Please read our [Contributing Guide](docs/contributing.md) before submitting any changes.