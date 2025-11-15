# ShortForge Logo Components

A comprehensive collection of logo components for the ShortForge brand, designed for flexibility and consistent usage across the application.

## Components Overview

### 1. ShortForgeLogo
**Full logo with text** - The primary branding component.

```tsx
import { ShortForgeLogo } from '@/components/logos';

<ShortForgeLogo 
  showText={true}  // Show/hide "ShortForge" text
  size="md"        // xs | sm | md | lg | xl
  className=""     // Additional container classes
  textClassName="" // Additional text classes
  onClick={() => {}} // Optional click handler
/>
```

**Size Reference:**
- `xs`: 24px icon, base text
- `sm`: 32px icon, lg text
- `md`: 40px icon, xl text (default)
- `lg`: 48px icon, 2xl text
- `xl`: 64px icon, 3xl text

**Usage Examples:**
- Header/Navigation: `<ShortForgeLogo size="md" showText={true} />`
- Footer: `<ShortForgeLogo size="lg" showText={true} />`
- Mobile Menu: `<ShortForgeLogo size="sm" showText={false} />`

---

### 2. ShortForgeIcon
**Icon-only version** - For compact spaces or decorative use.

```tsx
import { ShortForgeIcon } from '@/components/logos';

<ShortForgeIcon 
  size={40}        // Size in pixels
  className=""     // Additional styling classes
  rounded={true}   // Apply rounded corners
  glow={true}      // Enable glow effect on hover
  onClick={() => {}} // Optional click handler
/>
```

**Usage Examples:**
- Favicon replacement: `<ShortForgeIcon size={32} rounded={false} />`
- Page headers: `<ShortForgeIcon size={70} glow={true} />`
- Navigation items: `<ShortForgeIcon size={24} glow={false} />`

---

### 3. ShortForgeLoadingSpinner
**Animated loading indicator** - A logo-based loading state.

```tsx
import { ShortForgeLoadingSpinner } from '@/components/logos';

<ShortForgeLoadingSpinner 
  size={64}         // Logo size in pixels
  showText={true}   // Show loading text
  text="Loading..." // Custom loading message
  className=""      // Additional container classes
/>
```

**Animation Features:**
- Rotation: 360° spin every 2 seconds
- Scale pulse: 1.0 to 1.1 and back
- Glow pulse: Animated ember glow effect

**Usage Examples:**
- Page loading: `<ShortForgeLoadingSpinner size={80} text="Loading page..." />`
- Data fetching: `<ShortForgeLoadingSpinner size={48} text="Fetching data..." />`
- Processing: `<ShortForgeLoadingSpinner size={64} showText={false} />`

---

### 4. ShortForgePattern
**Background pattern decoration** - Creates a subtle logo pattern for backgrounds.

```tsx
import { ShortForgePattern } from '@/components/logos';

<ShortForgePattern 
  count={12}       // Number of logo instances
  opacity={0.05}   // Opacity level (0-1)
  size={80}        // Size of each logo instance
  className=""     // Additional container classes
/>
```

**Features:**
- Random positioning across container
- Random rotation (0-360°)
- Random scaling (0.5x-1.5x)
- Non-interactive (pointer-events: none)

**Usage Examples:**
- Hero sections: `<ShortForgePattern count={15} opacity={0.03} size={100} />`
- Background subtle: `<ShortForgePattern count={8} opacity={0.02} size={80} />`
- Dense pattern: `<ShortForgePattern count={25} opacity={0.04} size={60} />`

---

### 5. ShortForgeAnimatedHero
**Large animated hero logo** - For impactful hero sections.

```tsx
import { ShortForgeAnimatedHero } from '@/components/logos';

<ShortForgeAnimatedHero 
  size={120}       // Logo size in pixels
  className=""     // Additional container classes
/>
```

**Animation Features:**
- Entrance animation (fade + scale + slide)
- Continuous floating motion
- Pulsing glow effect
- Animated particles around logo
- Subtle rotation

**Usage Examples:**
- Homepage hero: `<ShortForgeAnimatedHero size={140} />`
- Landing pages: `<ShortForgeAnimatedHero size={100} />`

---

## Design Guidelines

### Color Scheme
The logo automatically adapts to the ember color palette:
- Primary: Ember gradients (from-ember-700 to-ember-800)
- Glow: Ember-600/20 to ember-600/50
- Text: White (#ffffff)

### Spacing
- Always provide adequate whitespace around the logo
- Minimum clear space: 1/2 the logo height on all sides
- For text logos, ensure the text is legible

### Accessibility
- All logo components include proper `alt` text
- Images use Next.js Image component for optimization
- Priority loading enabled for above-the-fold logos

### Responsive Design
- Logos scale appropriately on different screen sizes
- Use size props responsively: `size={{ base: 'sm', md: 'md', lg: 'lg' }}`
- Consider hiding text on mobile with `showText={false}` for compact layouts

---

## Implementation Examples

### Header Navigation
```tsx
<nav>
  <Link href="/">
    <ShortForgeLogo size="md" showText={true} />
  </Link>
</nav>
```

### Footer
```tsx
<footer>
  <ShortForgeLogo size="lg" showText={true} />
  <p>Building the future of intelligent systems.</p>
</footer>
```

### Hero Section
```tsx
<section className="hero">
  <ShortForgePattern count={15} opacity={0.03} size={100} />
  <ShortForgeAnimatedHero size={140} />
  <h1>Forge the Future with AI & Automation</h1>
</section>
```

### Loading State
```tsx
{isLoading && (
  <div className="loading-container">
    <ShortForgeLoadingSpinner 
      size={64} 
      text="Processing your request..." 
    />
  </div>
)}
```

### Page Headers
```tsx
<div className="page-header">
  <ShortForgeIcon size={70} glow={true} />
  <h1>About ShortForge</h1>
</div>
```

---

## Best Practices

1. **Consistency**: Use the same size/variant consistently across similar contexts
2. **Performance**: The logo components use Next.js Image optimization automatically
3. **Animations**: Avoid using multiple animated logos on the same page
4. **Patterns**: Keep pattern opacity low (0.02-0.05) to maintain readability
5. **Loading**: Reserve `ShortForgeLoadingSpinner` for actual loading states
6. **Accessibility**: Always provide context for screen readers

---

## File Structure
```
frontend/src/components/logos/
├── index.ts                      # Barrel exports
├── ShortForgeLogo.tsx            # Full logo with text
├── ShortForgeIcon.tsx            # Icon only
├── ShortForgeLoadingSpinner.tsx  # Animated loading
├── ShortForgePattern.tsx         # Background pattern
├── ShortForgeAnimatedHero.tsx    # Hero animation
└── README.md                     # This file
```

---

## Future Enhancements
- Dark/light mode variants
- Monochrome versions
- Social media optimized sizes
- Animated icon variants
- Interactive hover effects

