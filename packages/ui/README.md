# @workspace/ui

A comprehensive UI component library built with Shadcn/ui, Tailwind CSS, and TypeScript. This package provides both core Shadcn components and custom presentation components for your application.

## 📦 Installation

This package is part of the workspace monorepo. It's automatically available in your apps via:

```bash
npm install @workspace/ui
```

## 🚀 Components

### Core Shadcn Components (`/components`)
Pre-built components from Shadcn/ui:
- `Button` - Versatile button component with variants
- More Shadcn components available...

### Custom UI Components (`/ui-components`)
Custom presentation components built on Shadcn patterns:
- `UserCard` - Display user information with avatar and contact details
- `StatusBadge` - Show status information with icons and color coding

## 📚 Storybook Development

### Initial Setup

1. **Install Storybook dependencies** (already included in package.json):
```bash
cd packages/ui
npm install
```

2. **Run Storybook**:
```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

3. **Build Storybook for production**:
```bash
npm run build-storybook
```

### Storybook Configuration

The Storybook setup includes:

- **TypeScript configuration** - Full TypeScript support with `.storybook/main.ts` and `.storybook/preview.ts`
- **Tailwind CSS integration** - Full design system support
- **Auto-generated documentation** - Based on JSDoc comments and TypeScript interfaces
- **Interactive controls** - Test component props in real-time
- **Dark/light theme support** - Matches your design system

### Files Structure
```
packages/ui/
├── .storybook/
│   ├── main.ts          # TypeScript Storybook configuration
│   └── preview.ts       # TypeScript global settings and decorators
├── src/
│   ├── components/      # Shadcn/ui components
│   ├── ui-components/   # Custom presentation components
│   │   ├── user-card.tsx
│   │   ├── user-card.stories.tsx
│   │   ├── status-badge.tsx
│   │   ├── status-badge.stories.tsx
│   │   └── index.ts
│   ├── lib/             # Utilities
│   └── styles/          # CSS and design tokens
└── package.json
```

## 🎨 Creating New Components

### 1. Component Development Guidelines

When creating new UI components in `/ui-components`:

- **Follow Shadcn patterns** - Use `cva` for variants, `cn` for class merging
- **Presentation only** - No business logic, API calls, or state management
- **TypeScript first** - Proper interfaces and type safety
- **Accessible** - Follow ARIA guidelines and keyboard navigation
- **Documented** - JSDoc comments for all props

### 2. Component Template

```typescript
import React from 'react';
import { cn } from '../lib/utils.js';
import { cva, type VariantProps } from 'class-variance-authority';

const componentVariants = cva(
  'base-classes', // Base styles
  {
    variants: {
      variant: {
        default: 'default-styles',
        secondary: 'secondary-styles',
      },
      size: {
        sm: 'small-styles',
        lg: 'large-styles',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  /** Component description */
  children: React.ReactNode;
}

export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Component.displayName = 'Component';
```

### 3. Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './component.js';

const meta: Meta<typeof Component> = {
  title: 'UI Components/Component',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Component description for documentation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary'],
    },
    // Add more controls...
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default content',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary variant',
  },
};
```

## 🔧 Usage in Apps

### Importing Components

```typescript
// Shadcn components
import { Button, Card } from '@workspace/ui/components/button';

// Custom UI components
import { UserCard, StatusBadge } from '@workspace/ui/ui-components';

// Individual imports
import { UserCard } from '@workspace/ui/ui-components/user-card';
import { StatusBadge } from '@workspace/ui/ui-components/status-badge';
```

### Example Usage

```typescript
import { UserCard, StatusBadge } from '@workspace/ui/ui-components';

function UserProfile() {
  return (
    <div className="space-y-4">
      <UserCard
        name="John Doe"
        role="Senior Developer"
        email="john@example.com"
        phone="+1 (555) 123-4567"
        variant="featured"
      />
      
      <div className="flex gap-2">
        <StatusBadge variant="success">Active</StatusBadge>
        <StatusBadge variant="info">Verified</StatusBadge>
      </div>
    </div>
  );
}
```

## 🎯 Design System Integration

This package integrates with your Tailwind CSS design system:

- **CSS Variables** - Uses design tokens from `globals.css`
- **Dark Mode** - Automatic dark theme support
- **Responsive** - Mobile-first responsive design
- **Consistent** - Follows Shadcn design patterns

## 📝 Component Guidelines

### Do's ✅
- Use Shadcn patterns and design tokens
- Keep components presentation-only
- Include comprehensive TypeScript types
- Write Storybook stories for all components
- Follow accessibility best practices
- Use semantic HTML elements

### Don'ts ❌
- Include business logic or API calls
- Use external state management
- Hardcode colors or spacing (use design tokens)
- Skip TypeScript interfaces
- Forget to export from index files

## 🧪 Testing

Components should be tested using:
- **Storybook** - Visual testing and interaction
- **Vitest** - Unit tests for component logic
- **Playwright** - E2E testing in consuming apps

## 🔄 Development Workflow

1. **Create component** in `/ui-components`
2. **Add TypeScript interfaces** with JSDoc
3. **Create Storybook story** with all variants
4. **Export from index.ts**
5. **Test in Storybook**
6. **Update package exports** if needed
7. **Document usage** in README

## 📚 Resources

- [Shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Storybook Documentation](https://storybook.js.org/docs)
- [CVA (Class Variance Authority)](https://cva.style/docs)

## 🤝 Contributing

When contributing new components:
1. Follow the established patterns
2. Include comprehensive stories
3. Test accessibility
4. Update documentation
5. Ensure TypeScript compliance

---

Built with ❤️ using Shadcn/ui, Tailwind CSS, and TypeScript. 