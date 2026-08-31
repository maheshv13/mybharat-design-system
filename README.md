# MY Bharat Design System

A reusable React component library built with TypeScript, CSS Modules, and design tokens.

The design system follows an Atomic Design architecture and provides reusable components for building consistent MY Bharat user interfaces.

---

## Installation

Install the package using npm:

```bash
npm install @mybharatyouth/design-system
```

React and ReactDOM are peer dependencies and must be provided by the consuming application.

---

## Usage

Import the components you need and the design system stylesheet:

```tsx
import { Button, Header, Text } from "@mybharatyouth/design-system";

import "@mybharatyouth/design-system/styles.css";

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

The same package can be used with React and Next.js applications.

Components that use browser APIs or interactive behavior should be rendered from a client component when used in Next.js.

---

## Storybook

The interactive Storybook documentation is being published through GitHub Pages.

The public Storybook URL will be added here after the first successful deployment.


---

## Component Categories

### Atoms

Basic reusable UI building blocks:

- Button
- Text
- Link
- Icon
- Image
- Input
- Checkbox
- Radio
- Select
- MultiSelect
- TableCell
- Tile
- NavLinkItem

### Primitives

Layout and structural building blocks:

- Container
- Stack
- Grid
- Section
- Cluster
- Center
- Switcher
- SidebarLayout

### Molecules

Combinations of atoms that provide reusable UI patterns:

- Accordion
- Banner
- Branding
- Card
- FontSizeControls
- LinkList
- ListItem
- MobileMenu
- Modal
- NavigationLinks
- Pagination
- RowAction
- SlideItem
- SocialLinks
- SupportSection
- TableHeaderRow
- TableRow
- Tabs
- TileGroup

### Organisms

Larger reusable sections composed of multiple components:

- Header
- Footer
- FilterBar
- List
- Sidebar
- Slider
- SplitHero
- Table
- UserDropdown

---

## Styling

### Step 1: Import the Design System Stylesheet

Import the design system stylesheet once in your application entry point:

```tsx
import "@mybharatyouth/design-system/styles.css";
```

The stylesheet includes:

- Design tokens
- Typography tokens
- Reset styles
- Base styles
- Bundled component styles

Consumers do not need to import internal component CSS files.

---

## Font Configuration

The design system uses **Noto Sans** as the default font.

The font is configured through the following CSS custom property:

```css
--font-family-base
```

The design system supports both standard React applications and Next.js applications.

### Standard React Application

For a standard React application, import the design system stylesheet:

```tsx
import "@mybharatyouth/design-system/styles.css";
```

The bundled stylesheet provides the default Noto Sans configuration.

No additional font configuration is required.

---

### Next.js Application

For Next.js applications, it is recommended to use `next/font/google`.

This allows Next.js to optimize and self-host the font.

### Step 1: Import Noto Sans

In your `app/layout.tsx` file:

```tsx
import { Noto_Sans } from "next/font/google";

import "@mybharatyouth/design-system/styles.css";
```

---

### Step 2: Configure the Font

Create the Noto Sans font configuration:

```tsx
const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
});
```

The `variable` option allows the font to be exposed as a CSS custom property that can be used by external stylesheets.

---

### Step 3: Apply the Font Variable to the Root Element

Apply the generated font variable to the `<html>` element:

```tsx
<html
  lang="en"
  className={`${notoSans.variable} h-full antialiased`}
>
```

---

### Complete Next.js Example

Your `app/layout.tsx` can look like this:

```tsx
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

import "@mybharatyouth/design-system/styles.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "MY Bharat Application",
  description: "Built using MY Bharat Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
```

The design system will use the configured Noto Sans font through the CSS variable.

Next.js supports exposing fonts as CSS variables and applying them through external stylesheets.

---

## Next.js

The design system can be used in Next.js applications.

### Step 1: Install the Package

```bash
npm install @mybharatyouth/design-system
```

### Step 2: Import the Stylesheet

Import the stylesheet in your root layout:

```tsx
import "@mybharatyouth/design-system/styles.css";
```

### Step 3: Configure the Font

Use `next/font/google` to configure Noto Sans:

```tsx
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
});
```

### Step 4: Apply the Font Variable

Apply the font variable to the root `<html>` element:

```tsx
<html
  lang="en"
  className={`${notoSans.variable} h-full antialiased`}
>
```

Interactive components that use browser APIs or React hooks should be rendered from a Client Component when required by Next.js.

---

## TypeScript

The package includes TypeScript declaration files for the exported components.

```tsx
import type { ButtonProps } from "@mybharatyouth/design-system";
```

---

## Design System Architecture

The project follows the Atomic Design methodology:

```text
Atoms
  ↓
Molecules
  ↓
Organisms
  ↓
Primitives / Layout
  ↓
Application UI
```

The components are designed to be composable and reusable across MY Bharat applications.

---

## Design Tokens

The design system uses CSS custom properties for shared design tokens such as:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Sizes
- Breakpoints

These tokens are included automatically through the bundled design system stylesheet.

---

## React Compatibility

The package declares React and ReactDOM as peer dependencies.

Supported versions:

- React 18
- React 19

Applications consuming the package should provide compatible versions of `react` and `react-dom`.

---

## Repository

Source code and development documentation are available on GitHub:

https://github.com/maheshv13/mybharat-design-system

---

## License

MIT