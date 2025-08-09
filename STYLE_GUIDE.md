# Zach Rempell Personal Website - Style Guide

## 🎨 Design Philosophy
A clean, minimalist personal website with elegant typography and thoughtful use of space. The design emphasizes content readability while maintaining a modern, professional aesthetic.

## 🌓 Color Palette

### Dark Theme (Default)
```css
--background: #111827        /* gray-900 */
--surface: #1f2937          /* gray-800 */
--border: #374151           /* gray-700 */
--text-primary: #ffffff     /* white */
--text-secondary: #d1d5db   /* gray-300 */
--text-muted: #9ca3af       /* gray-400 */
--text-subtle: #6b7280      /* gray-500 */
--accent: #3b82f6           /* blue-500 */
--accent-hover: #2563eb     /* blue-600 */
```

### Light Theme
```css
--background: #ffffff        /* white */
--surface: #f9fafb          /* gray-50 */
--border: #e5e7eb           /* gray-200 */
--text-primary: #111827     /* gray-900 */
--text-secondary: #374151   /* gray-700 */
--text-muted: #6b7280       /* gray-500 */
--text-subtle: #9ca3af      /* gray-400 */
--accent: #3b82f6           /* blue-500 */
--accent-hover: #2563eb     /* blue-600 */
```

## 📝 Typography

### Font Hierarchy
- **Headings**: `font-medium` weight, carefully sized
- **Body Text**: `leading-relaxed` for optimal readability
- **Links**: Underlined with subtle decorations

### Font Sizes
```css
h1: text-2xl (24px)
h2: text-xl (20px)
h3: text-lg (18px)
body: text-base (16px)
small: text-sm (14px)
```

## 🎯 Layout & Spacing

### Container
- **Max Width**: `max-w-2xl` (672px)
- **Padding**: `py-16` vertical, responsive horizontal
- **Centered**: `mx-auto`

### Content Spacing
- **Section Gap**: `space-y-12` (48px)
- **Paragraph Gap**: `space-y-3` or `space-y-4` (12px-16px)
- **Navigation Gap**: `space-x-8` (32px)

### Layout Structure
```
Header: Minimal brand/logo (64px height)
Content: Navigation + Page Content (max-w-2xl, centered)
Footer: Links and attribution
```

## 🧭 Navigation

### Structure
- **Position**: Top of content area (not in header)
- **Items**: About, Projects, Blog, Contact + Theme Toggle
- **Active State**: Bottom border (`border-b border-gray-400`)
- **Spacing**: `space-x-8` between items

### Interactive States
```css
Default: text-gray-400 (dark) / text-gray-600 (light)
Hover: text-white (dark) / text-gray-900 (light)
Active: text-white (dark) / text-gray-900 (light) + border
```

## 🔗 Links & Interactive Elements

### External Links
- **Indicator**: ↗ arrow symbol
- **Styling**: Underlined with `decoration-gray-500`
- **Hover**: Enhanced decoration and color change

### Internal Links
- **Styling**: Underlined, no arrow
- **Hover**: Color transition

### Button States
```css
Default: Base color
Hover: Brighter/darker variant
Active: Further emphasis
Focus: Outline ring for accessibility
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: Default styles
- **Tablet**: `sm:` prefix (640px+)
- **Desktop**: `lg:` prefix (1024px+)

### Container Adjustments
```css
Mobile: px-4
Tablet: px-6
Desktop: px-8
```

## 🌟 Special Elements

### Theme Toggle
- **Type**: Slider with smooth animation
- **Position**: End of navigation
- **Animation**: Color transition + icon change
- **Colors**: Fun gradient or color shift

### External Link Component
```tsx
<ExternalLink href="...">
  Link Text ↗
</ExternalLink>
```

### Page Structure
```tsx
<div className="bg-background text-text-secondary min-h-screen">
  <Container className="py-16 max-w-2xl">
    <PageNav />
    <div className="space-y-12">
      <section>
        <h1>Page Title</h1>
        <div className="space-y-3">
          <!-- Content -->
        </div>
      </section>
    </div>
  </Container>
</div>
```

## 🎨 Theme Implementation

### CSS Variables Approach
- Use CSS custom properties for theme values
- Toggle class on document root
- Smooth transitions between themes

### Component Patterns
```tsx
// Use theme-aware classes
className="bg-background text-text-primary"

// Or use CSS variables
style={{ backgroundColor: 'var(--background)' }}
```

## 📋 Component Library

### Core Components
- `Container`: Main content wrapper
- `PageNav`: Navigation with theme toggle
- `ExternalLink`: Links with arrow indicator
- `ThemeToggle`: Dark/light mode switcher

### Page Templates
- **Standard Page**: Navigation + single column content
- **List Page**: Navigation + itemized content
- **Article Page**: Navigation + prose content

## ♿ Accessibility

### Requirements
- **Contrast**: WCAG AA compliant ratios
- **Focus States**: Visible keyboard navigation
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: All images have descriptions
- **ARIA Labels**: Interactive elements properly labeled

### Implementation
```tsx
// Focus states
className="focus:outline-none focus:ring-2 focus:ring-accent"

// Semantic structure
<nav aria-label="Main navigation">
<main>
<section aria-labelledby="about-heading">
```

## 🔧 Development Guidelines

### File Organization
```
src/
  components/          # Reusable UI components
  app/(site)/         # Page components
  lib/                # Utilities and data
  styles/             # Global styles
```

### Naming Conventions
- **Components**: PascalCase (`PageNav`, `ThemeToggle`)
- **Files**: kebab-case (`page-nav.tsx`, `theme-toggle.tsx`)
- **CSS Classes**: Tailwind utilities preferred

### Code Standards
- **TypeScript**: Strict typing
- **Accessibility**: Built-in from start
- **Performance**: Optimized images and code splitting
- **Consistency**: Follow this style guide

## 🚀 Usage Examples

### Adding a New Page
1. Create page component in `app/(site)/`
2. Follow standard page structure
3. Include `<PageNav />` at top
4. Use consistent spacing and typography
5. Test in both light and dark themes

### Adding New Components
1. Create in `components/` directory
2. Use theme-aware styling
3. Include proper TypeScript types
4. Follow accessibility guidelines
5. Document usage in this guide

---

*This style guide ensures consistency across the entire website and makes it easy to add new pages and features while maintaining the established design language.*
