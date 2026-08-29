# MY Bharat Design System

Reusable React components built with TypeScript, CSS Modules, and design tokens.

## Installation

```bash
npm install @mybharat/design-system react react-dom
```

React and ReactDOM are peer dependencies and must be provided by the consuming application.

## Usage

```tsx
import { Button, Header, Text } from "@mybharat/design-system";
import "@mybharat/design-system/styles.css";

export function Example() {
  return (
    <>
      <Header />
      <Text>Welcome to MY Bharat</Text>
      <Button label="Continue" />
    </>
  );
}
```

The same imports work in React and Next.js applications. Components with browser interactions should be rendered from a client component in Next.js.

## Component categories

- Atoms: buttons, text, links, icons, images, inputs, selects, and table cells
- Primitives: containers, stacks, grids, sections, and switchers
- Molecules: navigation, branding, cards, forms, menus, modals, tabs, and lists
- Organisms: headers, footers, tables, filters, sidebars, sliders, and heroes

## Styling

Import `@mybharat/design-system/styles.css` once in the application entry point. It includes the design tokens and bundled component styles; consumers do not need to import internal CSS files.

## Next.js

Import the design system stylesheet in your application's global stylesheet or root layout:

```tsx
import "@mybharat/design-system/styles.css";
