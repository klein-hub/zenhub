# Development Guidelines

## Setting Up Your Development Environment

### 1. Required Software
- **Visual Studio Code**
  - Download from: https://code.visualstudio.com
  - Why: Free, powerful IDE with great TypeScript support

- **Node.js (LTS version)**
  - Download from: https://nodejs.org
  - Why: Required to run JavaScript/TypeScript projects

- **Git**
  - Windows: Download from https://git-scm.com
  - Mac: `brew install git`
  - Why: Version control system for code management

### 2. VS Code Extensions
1. Open VS Code
2. Click the Extensions icon in the left sidebar (or press Ctrl+Shift+X)
3. Install these essential extensions:
   - ESLint: JavaScript linting
   - Prettier: Code formatting
   - GitLens: Enhanced Git capabilities
   - Tailwind CSS IntelliSense: CSS tooling
   - Error Lens: Inline error display

## Code Organization

### File Naming
```
components/
├── Button.tsx           # Single component
├── Input/              # Complex component
│   ├── index.tsx       # Main component
│   ├── styles.css      # Styles
│   └── types.ts        # TypeScript types
└── UserCard/
    └── index.tsx
```

### Component Structure
```typescript
// Good Component Structure
import React from 'react';
import { Props } from './types';
import { useCustomHook } from '@/hooks';

export const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  // 1. Hooks
  const { data } = useCustomHook();

  // 2. Derived State
  const computed = useMemo(() => {
    // Complex calculations
  }, [data]);

  // 3. Event Handlers
  const handleClick = () => {
    // Handle event
  };

  // 4. Render
  return (
    <div>
      {/* JSX content */}
    </div>
  );
};
```

## Git Workflow

### Initial Setup
1. Open VS Code
2. Click 'Source Control' in the left sidebar (or press Ctrl+Shift+G)
3. Click 'Clone Repository'
4. Enter repository URL and choose local folder

### Daily Development Flow

#### 1. Starting New Work
```bash
# Get latest changes
git pull origin main

# Create new branch
git checkout -b feature/your-feature-name
```

Or using VS Code:
1. Click the branch name in bottom-left
2. Click '+ Create new branch'
3. Enter branch name (e.g., 'feature/add-login')

#### 2. Making Changes
1. Write your code
2. Save files (Ctrl+S)
3. In VS Code's Source Control panel:
   - Review changes (files will be listed)
   - Hover over files to see options
   - Click '+' to stage specific files
   - Or stage all with 'Stage All Changes'

#### 3. Committing Code
In VS Code:
1. Enter commit message in the text box
2. Click '✓' (Commit) button
3. Use message format:
   ```
   feat: add login component
   
   - Add login form
   - Implement validation
   - Connect to API
   ```

#### 4. Pushing Changes
1. Click '...' in Source Control panel
2. Select 'Push'
Or use terminal:
```bash
git push origin feature/your-feature-name
```

#### 5. Creating Pull Request
1. Go to GitHub repository
2. Click 'Pull Requests'
3. Click 'New Pull Request'
4. Select your branch
5. Fill in:
   - Title: Brief description
   - Description: Detailed changes
   - Reviewers: Add team members
6. Click 'Create Pull Request'

### VS Code Git Features
- **Source Control Panel** (Ctrl+Shift+G):
  - Shows changed files
  - Stage/unstage changes
  - Commit changes
  - Push/pull changes

- **Timeline View**:
  - Right-click file
  - Select 'Open Timeline'
  - View file history

- **GitLens Features**:
  - Hover over line to see last change
  - Click 'GitLens' icon for more options
  - View file and line history
  - Compare branches

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- src/components/Button.test.tsx

# Run tests in watch mode
npm test -- --watch
```

### Writing Tests
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    
    await userEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

## Code Review Process

### Submitting Code for Review
1. Push your changes
2. Create Pull Request
3. Add reviewers
4. Link relevant issues

### Reviewing Code
1. Open Pull Request
2. Click 'Files changed'
3. Review each file:
   - Add comments by clicking '+' on specific lines
   - Suggest changes using the suggestion feature
   - Approve or request changes

### Addressing Review Comments
1. Open VS Code
2. Make requested changes
3. Commit and push updates
4. Respond to comments in GitHub
5. Request re-review if needed