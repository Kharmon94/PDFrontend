# Preferred Deals Frontend - React Application

Modern React + TypeScript frontend for the Preferred Deals business directory platform.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Application runs on `http://localhost:3000`

---

## 🔧 Configuration

### Environment Variables
Create `.env` file (development only):
```bash
REACT_APP_API_URL=http://localhost:3001/api/v1
```

**Production**: Set `REACT_APP_API_URL` in Railway dashboard to your backend URL + `/api/v1`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components (shadcn/ui)
│   ├── figma/                 # Figma exports
│   ├── home-page.tsx          # Landing page
│   ├── directory-page.tsx     # Business listings
│   ├── listing-detail.tsx     # Business details
│   ├── user-auth.tsx          # Login/Signup
│   ├── business-dashboard.tsx # Partner dashboard
│   ├── saved-deals.tsx        # User favorites
│   ├── admin-dashboard.tsx    # Admin panel
│   ├── navigation.tsx         # Header navigation
│   └── footer.tsx             # Footer
│
├── services/
│   └── api.ts                 # API service layer
│
├── types/
│   └── index.ts               # TypeScript definitions
│
├── styles/
│   └── globals.css            # Global styles
│
├── App.tsx                    # Main app component
├── main.tsx                   # Entry point
└── index.css                  # Tailwind imports

public/
└── index.html                 # HTML template

Dockerfile                     # Production container
nginx.conf                     # Production web server
vite.config.ts                 # Build configuration
tsconfig.json                  # TypeScript config
```

---

## 🎨 Tech Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Forms & Validation
- **React Hook Form** - Form handling
- **Zod** - Schema validation (if added)

### State & Data
- **React Hooks** - Local state
- **API Service** - Centralized API calls

### Charts & Visualization
- **Recharts** - Analytics charts

### Notifications
- **Sonner** - Toast notifications

---

## 🔌 API Integration

### API Service (`src/services/api.ts`)
Centralized service for all backend API calls with:
- JWT token management
- Automatic auth headers
- Error handling
- Type-safe responses

```typescript
import { apiService } from './services/api';

// Authentication
await apiService.login(email, password);
await apiService.signup(userData);
const user = await apiService.getCurrentUser();

// Businesses
const businesses = await apiService.getBusinesses({ category: 'Restaurant' });
const business = await apiService.getBusiness(id);

// Saved Deals
await apiService.toggleSavedDeal(businessId);
const saved = await apiService.getSavedDeals();
```

---

## 🎯 Features & Components

### Public Pages
- **HomePage** - Featured businesses, search, categories
- **DirectoryPage** - Full business directory with filters
- **ListingDetail** - Business details with contact tracking
- **UserAuth** - Login/signup forms

### Authenticated Features
- **SavedDeals** - User's saved businesses
- **UserDashboard** - User account overview

### Partner Features
- **BusinessDashboard** - Manage business, view analytics
- **BecomePartner** - Partner signup flow
- **ManageYourListing** - Business profile editor

### Admin Features
- **AdminDashboard** - Platform management (needs API connection)

---

## 🎨 Component Library (shadcn/ui)

Pre-configured accessible components in `src/components/ui/`:
- Button, Input, Textarea
- Card, Badge, Separator
- Dialog, Sheet, Dropdown
- Tabs, Accordion, Carousel
- Alert, Toast (Sonner)
- Form components
- And more...

### Using Components
```tsx
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';

<Button variant="default" size="lg">
  Click Me
</Button>

<Card>
  <CardContent>Content here</CardContent>
</Card>
```

---

## 📝 TypeScript Types

All API types defined in `src/types/index.ts`:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  user_type: 'user' | 'partner' | 'distribution' | 'admin';
}

interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  address: string;
  // ... more fields
}
```

---

## 🛠️ Development

### Available Scripts

```bash
# Start dev server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check
```

### Adding Dependencies

```bash
# Add package
npm install package-name

# Add dev dependency
npm install -D package-name

# Update all packages
npm update
```

---

## 🎨 Styling

### Tailwind CSS
Utility-first CSS framework. Common patterns:

```tsx
// Layout
className="flex items-center justify-between gap-4"

// Spacing
className="p-4 mx-auto mb-8"

// Typography
className="text-lg font-semibold text-gray-900"

// Responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### Custom Theme
Configured in `tailwind.config.js`:
- Primary color
- Font family
- Breakpoints
- Custom utilities

### Global Styles
`src/styles/globals.css` - Global CSS variables and base styles

---

## 🔐 Authentication Flow

1. User submits login/signup form
2. `apiService.login()` calls backend
3. Backend returns JWT token
4. Token stored in localStorage
5. API service includes token in all requests
6. `App.tsx` initializes session on load

### Protected Routes
Components check `isUserLoggedIn` prop and redirect to login if needed.

---

## 🚀 Production Build

### Docker Build
```bash
# Build image
docker build -t preferred-deals-frontend .

# Run container
docker run -p 80:80 \
  -e REACT_APP_API_URL=https://api.example.com/api/v1 \
  preferred-deals-frontend
```

### Build Process
1. **Builder stage**: `npm run build` creates optimized bundle
2. **Production stage**: Nginx serves static files
3. **Runtime config**: `envsubst` injects `REACT_APP_API_URL`

### Nginx Configuration
- Serves static files from `/usr/share/nginx/html`
- SPA routing (fallback to index.html)
- Health check at `/health`
- Port configured via `$PORT` environment variable

---

## 📦 Build Output

```bash
npm run build
```

Creates `build/` directory:
```
build/
├── index.html          # Main HTML
├── assets/
│   ├── index-[hash].js    # Application bundle
│   ├── index-[hash].css   # Styles
│   └── [images]           # Optimized images
└── health              # Health check file
```

---

## 🐛 Debugging

### Development Tools
- React DevTools extension
- Redux DevTools (if using Redux)
- Vite dev server with HMR
- TypeScript compiler errors in terminal

### Common Issues

**"API_BASE_URL: http://localhost:3001/api/v1" in production**
- `REACT_APP_API_URL` not set correctly
- Redeploy after setting environment variable

**"Failed to fetch" errors**
- Check backend is running
- Verify CORS is configured in Rails
- Check `REACT_APP_API_URL` format

**TypeScript errors**
- Run `npm run type-check`
- Update types in `src/types/index.ts`

---

## 📊 Performance

### Optimization
- Code splitting via dynamic imports
- Lazy loading for routes
- Image optimization
- Tree shaking (Vite)
- Minification in production

### Bundle Analysis
```bash
npm run build -- --mode analyze
```

---

## 🧪 Testing (Future)

```bash
# Run tests
npm test

# Coverage report
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## 🎨 Design System

### Colors
- Primary: Brand color
- Secondary: Accent color
- Muted: Subtle backgrounds
- Destructive: Errors/warnings

### Typography
- Headings: `<h1>` to `<h6>`
- Body: Default paragraph text
- Small: `.text-sm`
- Muted: `.text-muted-foreground`

### Spacing
- 0.25rem increments: `p-1` to `p-96`
- Gap utilities: `gap-2`, `gap-4`, etc.
- Margin/Padding: `m-`, `p-` prefixes

---

## 📱 Responsive Design

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First
```tsx
// Mobile default, desktop override
className="text-sm md:text-base lg:text-lg"
```

---

## 🔄 State Management

### Local State (React Hooks)
```tsx
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState<Business[]>([]);

useEffect(() => {
  fetchData();
}, [dependency]);
```

### Form State (React Hook Form)
```tsx
const { register, handleSubmit, formState: { errors } } = useForm();
```

---

## 📚 Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Radix UI](https://www.radix-ui.com/)

---

## 🆘 Support

### Logs
- Browser DevTools Console
- Network tab for API calls
- React DevTools for component tree

### Railway Logs
```bash
railway logs
```

---

**Version**: 1.0.0  
**React**: 18.3.1  
**Node**: 18+
