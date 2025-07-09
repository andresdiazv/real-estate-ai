# RealtorAI Component Library

This document outlines the reusable components and CSS classes available for rapid development.

## 🎨 Global CSS Classes

### Layout Classes
- `.page-container` - Full-height page with gray background
- `.content-wrapper` - Standard content container with padding
- `.card` - Standard card with white background and shadow
- `.card-hover` - Hover effects for cards

### Button Classes
- `.btn-primary` - Primary blue button
- `.btn-secondary` - Secondary gray button
- `.btn-outline` - Outlined button
- `.btn-danger` - Red danger button
- `.btn-success` - Green success button
- `.btn-sm` - Small button
- `.btn-lg` - Large button

### Form Classes
- `.input-field` - Standard input styling
- `.input-field-error` - Error state input
- `.select-field` - Styled select dropdown
- `.textarea-field` - Textarea styling

### Status Badges
- `.status-active` - Green active status
- `.status-pending` - Yellow pending status
- `.status-completed` - Blue completed status
- `.status-cancelled` - Red cancelled status
- `.status-hot` - Red hot lead status
- `.status-warm` - Yellow warm lead status
- `.status-cold` - Blue cold lead status

### Priority Indicators
- `.priority-high` - Red left border
- `.priority-medium` - Yellow left border
- `.priority-low` - Green left border

### Score Indicators
- `.score-excellent` - Green text (90+)
- `.score-good` - Yellow text (70-89)
- `.score-poor` - Red text (<70)

### Grid Layouts
- `.grid-stats` - 4-column stats grid
- `.grid-dashboard` - 3-column dashboard layout
- `.grid-properties` - Property cards grid

### Icon Containers
- `.icon-primary` - Blue icon background
- `.icon-success` - Green icon background
- `.icon-warning` - Yellow icon background
- `.icon-danger` - Red icon background
- `.icon-info` - Blue info background

### Avatar Classes
- `.avatar` - Base avatar styling
- `.avatar-primary` - Primary colored avatar
- `.avatar-secondary` - Secondary colored avatar

### Text Utilities
- `.text-muted` - Gray text
- `.text-success` - Green text
- `.text-warning` - Yellow text
- `.text-danger` - Red text
- `.text-info` - Blue text

### Spacing Utilities
- `.section-spacing` - Standard section margin
- `.card-spacing` - Card margin
- `.item-spacing` - Item spacing

### Animation Utilities
- `.fade-in` - Fade in animation
- `.slide-in` - Slide in animation

### Responsive Utilities
- `.mobile-only` - Show only on mobile
- `.desktop-only` - Show only on desktop

### Loading & Empty States
- `.loading-skeleton` - Loading animation
- `.empty-state` - Empty state container
- `.empty-state-icon` - Empty state icon
- `.empty-state-title` - Empty state title
- `.empty-state-description` - Empty state description

## 🧩 Reusable Components

### PageLayout
Standard page layout with navigation and content wrapper.

```tsx
import PageLayout from '@/components/PageLayout'

<PageLayout 
  title="Dashboard"
  subtitle="AI-powered realtor workflow"
  actions={<button className="btn-primary">Add New</button>}
>
  {/* Page content */}
</PageLayout>
```

### StatsGrid
Display statistics in a consistent grid layout.

```tsx
import StatsGrid from '@/components/StatsGrid'
import { Users, Home, Calendar, DollarSign } from 'lucide-react'

const stats = [
  {
    label: 'Active Leads',
    value: 24,
    icon: Users,
    color: 'primary'
  },
  {
    label: 'Properties',
    value: 156,
    icon: Home,
    color: 'success'
  }
]

<StatsGrid stats={stats} />
```

### AIInsights
Display AI recommendations and insights.

```tsx
import AIInsights from '@/components/AIInsights'
import { TrendingUp } from 'lucide-react'

const insights = [
  {
    type: 'opportunity',
    title: 'High-Value Lead Detected',
    description: 'Sarah Johnson shows strong buying signals.',
    action: 'Contact Now',
    priority: 'high',
    icon: TrendingUp
  }
]

<AIInsights insights={insights} />
```

## 🚀 Quick Development Patterns

### 1. Standard Dashboard Page
```tsx
import PageLayout from '@/components/PageLayout'
import StatsGrid from '@/components/StatsGrid'
import AIInsights from '@/components/AIInsights'

export default function DashboardPage() {
  return (
    <PageLayout title="Dashboard" subtitle="AI-powered workflow">
      <StatsGrid stats={stats} className="section-spacing" />
      
      <div className="grid-dashboard">
        <div className="lg:col-span-2">
          {/* Main content */}
        </div>
        <div className="lg:col-span-1">
          <AIInsights insights={insights} />
        </div>
      </div>
    </PageLayout>
  )
}
```

### 2. Standard List Page
```tsx
import PageLayout from '@/components/PageLayout'

export default function ListPage() {
  return (
    <PageLayout 
      title="Leads"
      actions={<button className="btn-primary">Add Lead</button>}
    >
      <div className="card">
        {/* Search and filters */}
        <div className="item-spacing">
          {/* List items */}
        </div>
      </div>
    </PageLayout>
  )
}
```

### 3. Standard Detail Page
```tsx
import PageLayout from '@/components/PageLayout'

export default function DetailPage() {
  return (
    <PageLayout 
      title="Property Details"
      actions={
        <div className="flex space-x-2">
          <button className="btn-secondary">Edit</button>
          <button className="btn-primary">Save</button>
        </div>
      }
    >
      <div className="grid-dashboard">
        <div className="lg:col-span-2">
          {/* Main content */}
        </div>
        <div className="lg:col-span-1">
          {/* Sidebar */}
        </div>
      </div>
    </PageLayout>
  )
}
```

## 📝 Best Practices

1. **Use CSS Classes First**: Always use the global CSS classes before creating custom styles
2. **Component Composition**: Combine reusable components rather than creating new ones
3. **Consistent Spacing**: Use `.section-spacing` and `.card-spacing` for consistent margins
4. **Status Colors**: Use semantic status classes for consistent color coding
5. **Responsive Design**: Use `.mobile-only` and `.desktop-only` for responsive behavior
6. **Loading States**: Use `.loading-skeleton` for loading placeholders
7. **Empty States**: Use empty state classes for consistent empty state styling

## 🎯 Efficiency Tips

1. **Copy-Paste Templates**: Use the quick development patterns above as starting points
2. **CSS Classes Over Inline**: Prefer global CSS classes over inline styles
3. **Component Reuse**: Leverage existing components before creating new ones
4. **Consistent Naming**: Follow the established naming conventions
5. **Semantic Colors**: Use semantic color classes for consistent theming

This component library will significantly speed up development by providing consistent, reusable patterns across all pages. 