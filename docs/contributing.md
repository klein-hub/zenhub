# Contributing Guide

## Getting Started

### 1. Development Environment Setup

#### Install Required Software
1. **Visual Studio Code**
   - Download from: https://code.visualstudio.com
   - Install recommended extensions:
     1. Click Extensions icon (Ctrl+Shift+X)
     2. Search and install:
        - ESLint
        - Prettier
        - GitLens
        - Tailwind CSS IntelliSense

2. **Node.js**
   - Download LTS version from: https://nodejs.org
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

3. **Git**
   - Windows: Download from https://git-scm.com
   - Mac: `brew install git`
   - Configure Git:
     ```bash
     git config --global user.name "Your Name"
     git config --global user.email "your.email@example.com"
     ```

### 2. Project Setup

1. **Fork Repository**
   1. Go to GitHub repository
   2. Click 'Fork' button (top-right)
   3. Select your account

2. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/zenhub-workspace.git
   cd zenhub-workspace
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Set Up Environment**
   ```bash
   # Copy example env file
   cp .env.example .env

   # Edit .env with your values
   code .env
   ```

## Development Workflow

### 1. Creating a New Feature

1. **Update Main Branch**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
   
   Or using VS Code:
   1. Click branch name in bottom-left
   2. Click '+ Create new branch'
   3. Type: feature/your-feature-name

3. **Make Changes**
   - Write code
   - Add tests
   - Update documentation

4. **Commit Changes**
   ```bash
   # Stage changes
   git add .

   # Commit
   git commit -m "feat: add new feature"
   ```

   Or using VS Code:
   1. Open Source Control (Ctrl+Shift+G)
   2. Stage changes ('+' button)
   3. Enter commit message
   4. Click '✓' to commit

5. **Push Changes**
   ```bash
   git push origin feature/your-feature-name
   ```

### 2. Code Style

#### TypeScript/JavaScript
```typescript
// Good
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// Bad
const calc = (i: any): any => {
  return i.reduce((s, i) => s + i.p, 0);
};
```

#### React Components
```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {label}
    </button>
  );
};

// Bad
const Button = (props) => (
  <button onClick={props.onClick}>{props.label}</button>
);
```

### 3. Testing

#### Writing Tests
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const onClick = vi.fn();
    render(<Button label="Click me" onClick={onClick} />);
    
    await userEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

#### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- src/components/Button.test.tsx

# Run tests in watch mode
npm test -- --watch
```

### 4. Pull Request Process

1. **Create Pull Request**
   1. Go to GitHub repository
   2. Click 'Pull requests'
   3. Click 'New pull request'
   4. Select your branch
   5. Fill in template:
      ```markdown
      ## Description
      Brief description of changes

      ## Changes Made
      - Added new feature
      - Updated tests
      - Updated documentation

      ## Testing
      Steps to test the changes

      ## Screenshots
      If applicable

      ## Checklist
      - [ ] Tests added
      - [ ] Documentation updated
      - [ ] Code follows style guide
      ```

2. **Code Review**
   1. Request reviewers
   2. Address feedback:
      ```bash
      # Make changes
      git add .
      git commit -m "fix: address review feedback"
      git push origin feature/your-feature-name
      ```

3. **Merge Process**
   - Ensure CI passes
   - Get required approvals
   - Squash and merge

### 5. Documentation

#### Code Comments
```typescript
/**
 * Calculates total price of items
 * @param items - Array of items with prices
 * @returns Total price
 */
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

#### README Updates
- Keep documentation up to date
- Include:
  - Feature description
  - Usage examples
  - API documentation
  - Configuration options

## Troubleshooting

### Common Issues

1. **Dependencies Issues**
   ```bash
   # Clear node_modules
   rm -rf node_modules
   
   # Clear npm cache
   npm cache clean --force
   
   # Reinstall
   npm install
   ```

2. **Git Issues**
   ```bash
   # Discard local changes
   git checkout -- .
   
   # Reset to remote
   git fetch origin
   git reset --hard origin/main
   ```

3. **Build Issues**
   ```bash
   # Clear build cache
   npm run clean
   
   # Rebuild
   npm run build
   ```

## Getting Help

1. Check documentation
2. Search existing issues
3. Ask in team chat
4. Create new issue with:
   - Problem description
   - Steps to reproduce
   - Expected vs actual behavior
   - Error messages
   - Environment details