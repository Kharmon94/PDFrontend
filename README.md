# Preferred Deals Frontend - React Application

**Complete frontend guide** - Everything you need to develop, deploy, and maintain the React application.

---

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Install dependencies
cd preferred_deals_frontend
npm install

# 2. Set API URL (create .env file)
echo "REACT_APP_API_URL=http://localhost:3001/api/v1" > .env

# 3. Start development server
npm run dev
```

✅ **Frontend running**: `http://localhost:3000`  
✅ **Hot reload**: Enabled (changes update instantly)

### First Visit
1. Open `http://localhost:3000`
2. Click "Login"
3. Use: `admin@preferreddeals.com` / `Admin123!`
4. See the admin dashboard!

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                         # shadcn/ui components (50+ files)
│   │   ├── button.tsx              # Button variants
│   │   ├── card.tsx                # Card components
│   │   ├── dialog.tsx              # Modal dialogs
│   │   ├── input.tsx               # Form inputs
│   │   └── ...                     # More UI primitives
│   │
│   ├── home-page.tsx               # Landing page with hero
│   ├── directory-page.tsx          # Business listings with filters
│   ├── listing-detail.tsx          # Business details page
│   ├── user-auth.tsx               # Login/signup forms
│   ├── user-dashboard.tsx          # User account overview
│   ├── saved-deals.tsx             # User's saved businesses
│   │
│   ├── business-dashboard.tsx      # Partner: manage business
│   ├── business-login.tsx          # Partner: signup flow
│   ├── partner-dashboard.tsx       # Partner: analytics & listings
│   │
│   ├── admin-dashboard.tsx         # Admin: platform management
│   │
│   ├── distribution-partner-dashboard.tsx  # Distribution: white-label
│   ├── partner-dashboard-login.tsx         # Distribution: login
│   │
│   ├── navigation.tsx              # Top navigation bar
│   ├── footer.tsx                  # Footer with links
│   ├── settings.tsx                # User settings page
│   └── ...                         # More components
│
├── services/
│   └── api.ts                      # API service layer (all backend calls)
│
├── types/
│   └── index.ts                    # TypeScript type definitions
│
├── styles/
│   └── globals.css                 # Global styles & CSS variables
│
├── App.tsx                         # Main app (routing & state)
├── main.tsx                        # Entry point
└── index.css                       # Tailwind imports

public/
└── index.html                      # HTML template (API_URL injected)

Dockerfile                          # Production container build
nginx.conf                          # Production web server config
vite.config.ts                      # Vite build configuration
tsconfig.json                       # TypeScript settings
tailwind.config.js                  # Tailwind customization
```

---

## 🔌 API Integration

### API Service (`src/services/api.ts`)

**Centralized service** for all backend communication:

```typescript
import { apiService } from './services/api';

// 🔐 Authentication
await apiService.login(email, password);
await apiService.signup(userData);
const { user } = await apiService.getCurrentUser();
apiService.logout();

// 🏢 Businesses
const businesses = await apiService.getBusinesses({ 
  search: 'pizza',
  category: 'Restaurant',
  featured: true 
});
const business = await apiService.getBusiness(id);
const suggestions = await apiService.getBusinessAutocomplete('piz');

// 💾 Saved Deals
await apiService.toggleSavedDeal(businessId);
const saved = await apiService.getSavedDeals();

// 👑 Admin
const stats = await apiService.getAdminStats();
const users = await apiService.getAdminUsers({ page: 1, search: 'john' });
await apiService.suspendUser(userId);
await apiService.approveBusiness(businessId);

// 🏢 Partner
const myBusinesses = await apiService.getMyBusinesses();
await apiService.createBusiness(businessData);
const analytics = await apiService.getBusinessAnalytics(businessId);

// 👤 User Profile
await apiService.updateUserProfile({ name, email });
await apiService.updatePassword(currentPassword, newPassword);
await apiService.deleteAccount(password);
```

### Features
- ✅ Automatic JWT token management
- ✅ Authorization headers on all requests
- ✅ Type-safe responses (TypeScript)
- ✅ Error handling
- ✅ Centralized API URL configuration

---

## 🎨 Tech Stack

### Core
- **React 18.3** - UI library with hooks
- **TypeScript 5** - Type safety
- **Vite 5** - Lightning-fast build tool

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library (1000+ icons)

### State & Forms
- **React Hooks** - Built-in state management
- **React Hook Form** - Form validation (if using)

### Data Visualization
- **Recharts** - Charts for analytics dashboards

### Notifications
- **Sonner** - Beautiful toast notifications

### Production
- **Nginx** - Static file serving
- **Docker** - Containerization

---

## 🎯 Pages & Features

### Public Pages (No Login Required)

**HomePage** (`home-page.tsx`)
- Hero section with search
- Featured businesses
- Category browse
- Call-to-action sections

**DirectoryPage** (`directory-page.tsx`)
- Full business directory
- Live search with autocomplete
- Filter by category, location, deals
- Pagination
- Featured businesses highlighted

**ListingDetail** (`listing-detail.tsx`)
- Business details (hours, amenities, gallery)
- Click tracking (phone, email, website)
- Save to favorites (requires login)
- Reviews and ratings

**UserAuth** (`user-auth.tsx`)
- Login/signup tabs
- Email + password authentication
- Role selection (user/partner/distribution)

### User Features (Login Required)

**UserDashboard** (`user-dashboard.tsx`)
- Account overview
- Quick access to saved deals
- Settings link

**SavedDeals** (`saved-deals.tsx`)
- User's saved businesses
- Remove from favorites
- View business details

**Settings** (`settings.tsx`)
- Update profile (name, email)
- Change password
- Delete account (with confirmation)

### Partner Features

**BusinessDashboard** (`business-dashboard.tsx`)
- Manage business profile
- Edit hours, amenities, deals
- View analytics (views, clicks)

**PartnerDashboard** (`partner-dashboard.tsx`)
- Overview of all businesses
- Create new business
- Analytics charts
- Performance metrics

**BusinessLogin** (`business-login.tsx`)
- Multi-step partner signup
- Business details collection
- Listing type selection (free/paid)

### Admin Features

**AdminDashboard** (`admin-dashboard.tsx`)
- Platform statistics
- User management (suspend, delete)
- Business management (approve, feature, delete)
- Pending approvals queue
- Search and pagination

### Distribution Features

**DistributionPartnerDashboard** (`distribution-partner-dashboard.tsx`)
- Network businesses overview
- White-label configuration
- Branding settings (logo, colors)
- Analytics for distribution network

---

## 🎨 Component Library (shadcn/ui)

### Pre-Built Components

**Layout**:
- `Card`, `CardHeader`, `CardContent`, `CardFooter`
- `Separator`, `Sidebar`, `Sheet`

**Forms**:
- `Input`, `Textarea`, `Label`
- `Button`, `Checkbox`, `Switch`
- `Select`, `Radio`, `Slider`

**Overlays**:
- `Dialog`, `AlertDialog`
- `Dropdown`, `Popover`
- `Tooltip`, `HoverCard`

**Navigation**:
- `Tabs`, `Accordion`
- `Breadcrumb`, `Pagination`

**Feedback**:
- `Alert`, `Toast` (Sonner)
- `Progress`, `Skeleton`
- `Badge`

**Data Display**:
- `Table`, `Avatar`
- `Carousel`, `Collapsible`

### Usage Example
```tsx
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { toast } from 'sonner';

function MyComponent() {
  const handleSubmit = () => {
    toast.success('Success!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button onClick={handleSubmit}>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

---

## 📝 TypeScript Types

All API types in `src/types/index.ts`:

```typescript
// User
interface User {
  id: number;
  name: string;
  email: string;
  user_type: 'user' | 'partner' | 'distribution' | 'admin';
  suspended?: boolean;
}

// Business
interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  rating: number;
  review_count: number;
  image: string;
  featured: boolean;
  has_deals: boolean;
  deal?: string;
  hours?: Record<string, string>;
  amenities?: string[];
  gallery?: string[];
  user: {
    id: number;
    name: string;
  };
}

// Saved Deal
interface SavedDeal {
  id: number;
  user_id: number;
  business_id: number;
  business: Business;
  created_at: string;
}

// Auth Response
interface AuthResponse {
  token: string;
  user: User;
}

// API Error
interface ApiError {
  error: string;
}
```

---

## 🎨 Styling with Tailwind CSS

### Common Patterns

**Layout**:
```tsx
// Flexbox
<div className="flex items-center justify-between gap-4">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

**Typography**:
```tsx
<h1 className="text-3xl font-bold text-gray-900">
<p className="text-sm text-muted-foreground">
<span className="text-lg font-semibold">
```

**Spacing**:
```tsx
<div className="p-6 m-4 mb-8">  // padding, margin
<div className="space-y-4">     // vertical spacing between children
<div className="gap-2">         // gap in flex/grid
```

**Responsive**:
```tsx
// Mobile-first approach
<div className="text-sm md:text-base lg:text-lg">
<div className="hidden lg:block">  // show on desktop only
<div className="block lg:hidden">  // show on mobile only
```

**Colors**:
```tsx
<Button className="bg-primary text-primary-foreground">
<Card className="border-border bg-card text-card-foreground">
<div className="bg-muted text-muted-foreground">
```

### Custom Theme

Configure in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: { ... },
      secondary: { ... },
      // ... more colors
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
}
```

---

## 🔐 Authentication Flow

### Login Process

1. User submits credentials in `UserAuth` component
2. `apiService.login(email, password)` calls `/api/v1/auth/login`
3. Backend returns JWT token + user data
4. Token stored in `localStorage`
5. `apiService` includes token in all future requests
6. User redirected to appropriate dashboard

### Session Management

```typescript
// On app load (App.tsx)
useEffect(() => {
  const initializeUser = async () => {
    try {
      const { user } = await apiService.getCurrentUser();
      setCurrentUser(user);
      setIsUserLoggedIn(true);
    } catch (error) {
      // No active session
    }
  };
  initializeUser();
}, []);
```

### Protected Routes

Components check authentication state:
```typescript
if (!isUserLoggedIn) {
  handleLoginRequired(); // Redirect to login
  return null;
}
```

### Logout

```typescript
const handleLogout = () => {
  apiService.logout(); // Clears localStorage
  setIsUserLoggedIn(false);
  setCurrentUser(null);
  setCurrentPage('directory');
};
```

---

## 🚀 Deployment (Railway)

### Step 1: Frontend Service

1. **Same Railway Project** as backend → "Add Service"
2. **Import from GitHub** → `preferred_deals_frontend`
3. **Set Environment Variables**:
   ```
   REACT_APP_API_URL → https://[your-backend].railway.app/api/v1
   NODE_ENV → production
   ```
4. **Deploy** (automatic from GitHub)

### Step 2: Custom Domain (Optional)

1. Railway Dashboard → Frontend Service → Settings → Domains
2. Add domain: `www.preferred.deals`
3. Configure DNS (at registrar):
   ```
   Type: CNAME
   Name: www
   Value: [railway-provided].railway.app
   ```
4. Wait 5-60 minutes for DNS + SSL

### Step 3: Verify

```bash
# Check frontend loads
curl -I https://www.preferred.deals
# Should return: 200 OK

# Check API URL injection
# Open https://www.preferred.deals
# Browser console should show:
# API_BASE_URL: https://[backend].railway.app/api/v1
```

### Environment Variables

**REACT_APP_API_URL** (Required):
- Must end with `/api/v1`
- Example: `https://rails-production-1ab6.railway.app/api/v1`
- Injected at runtime via Docker entrypoint

**NODE_ENV**:
- Set to `production`
- Enables optimizations

**PORT** (Optional):
- Default: `80`
- Railway may override

---

## 🛠️ Development Commands

```bash
# Start dev server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code (ESLint)
npm run lint

# Type check (no emit)
npx tsc --noEmit

# Update all dependencies
npm update

# Add new package
npm install package-name

# Remove package
npm uninstall package-name
```

---

## 📦 Production Build

### Build Process

```bash
npm run build
```

**Creates `build/` directory**:
```
build/
├── index.html          # Main HTML (with API_URL placeholder)
├── assets/
│   ├── index-[hash].js    # Application bundle (minified)
│   ├── index-[hash].css   # Styles bundle
│   └── [images]           # Optimized images
└── health              # Health check endpoint
```

### Docker Build

**Multi-stage Dockerfile**:
1. **Builder stage**: `npm run build` (optimized production bundle)
2. **Production stage**: Nginx serves static files
3. **Runtime**: `envsubst` injects `REACT_APP_API_URL`

```bash
# Build image
docker build -t preferred-deals-frontend .

# Run container
docker run -p 80:80 \
  -e REACT_APP_API_URL=https://api.example.com/api/v1 \
  preferred-deals-frontend
```

### Nginx Configuration

**Features**:
- Serves static files from `/usr/share/nginx/html`
- SPA routing (all routes → `index.html`)
- Health check at `/health`
- Port configured via `$PORT` env variable
- Gzip compression enabled
- Security headers

---

## 🔍 Full-Text Search

### Implementation

**Live Autocomplete** (`SearchAutocomplete` component):
- Debounced input (300ms delay)
- Calls `/api/v1/businesses/autocomplete?query=...`
- Shows business name, category, location
- Keyboard navigation (arrow keys, enter)
- Click to select

**Full Search** (`DirectoryPage`):
- Calls `/api/v1/businesses?search=...`
- PostgreSQL full-text search (backend)
- Searches name, description, category, address, deals
- Ranked by relevance
- Cached for 5 minutes (Redis)

### Usage

```tsx
import { SearchAutocomplete } from './components/search-autocomplete';

<SearchAutocomplete
  value={searchTerm}
  onValueChange={setSearchTerm}
  onSelect={(suggestion) => {
    setSearchTerm(suggestion.name);
    handleSearch();
  }}
  placeholder="Search businesses..."
/>
```

---

## 🐛 Debugging

### Development Tools

**Browser DevTools**:
- Console: View API requests and errors
- Network: Inspect API calls and responses
- React DevTools: Component tree and state
- Sources: Breakpoint debugging

**Vite Dev Server**:
- Hot Module Replacement (HMR)
- Fast refresh (preserves state)
- TypeScript error overlay
- Terminal shows build errors

### Common Issues

**API not connecting**:
```typescript
// Check console for API_BASE_URL
console.log('API_BASE_URL:', window.REACT_APP_API_URL);

// Should show backend URL + /api/v1
// If wrong, check REACT_APP_API_URL in Railway
```

**"Failed to fetch" errors**:
1. Backend not running → Check Railway logs
2. Wrong API URL → Verify `REACT_APP_API_URL`
3. CORS issue → Check backend `cors.rb`

**TypeScript errors**:
```bash
# Check types
npx tsc --noEmit

# Update types in src/types/index.ts
```

**Build failures**:
```bash
# Clear cache
rm -rf node_modules build
npm install
npm run build
```

---

## 📊 Performance

### Optimizations

✅ **Code splitting** - Dynamic imports for routes  
✅ **Tree shaking** - Remove unused code  
✅ **Minification** - Compress JS and CSS  
✅ **Image optimization** - WebP format, lazy loading  
✅ **Bundle size** - Analyzed and minimized  
✅ **Caching** - Aggressive cache headers (Nginx)  

### Bundle Analysis

```bash
# Install analyzer
npm install --save-dev rollup-plugin-visualizer

# Build with analysis
npm run build -- --mode analyze

# Opens stats.html in browser
```

### Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| API_BASE_URL shows `localhost` in prod | Set `REACT_APP_API_URL` in Railway, redeploy |
| "Failed to fetch" | Check backend running, verify CORS, check API URL format |
| Login doesn't work | Open Network tab, check `/auth/login` response |
| TypeScript errors | Run `npx tsc --noEmit`, fix type mismatches |
| Build fails | Delete `node_modules` and `build`, run `npm install` |
| Slow search | Backend Redis cache not connected |
| Images not loading | Check image URLs, verify CORS for external images |

### Railway Logs

```bash
# View logs
railway logs

# Follow logs
railway logs --follow
```

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)

---

**Version**: 1.0.0  
**React**: 18.3.1  
**TypeScript**: 5.5.3  
**Node**: 18+  
**Status**: 🚀 Production Ready
