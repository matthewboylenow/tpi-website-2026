# Taylor Products NextJS Website Rebuild Specification

## Project Overview

**Client:** Taylor Products Inc. (TPI)  
**Current Site:** https://taylorproducts.net (WordPress + Oxygen Builder)  
**New Stack:** NextJS 15 with App Router, Vercel deployment, Neon PostgreSQL, Vercel Blob Storage  
**Purpose:** Complete website rebuild with full admin backend for content management

Taylor Products is a family-owned foodservice equipment distributor covering NJ, Eastern & Central PA, NYC, Long Island, and Delaware. They distribute Taylor Company soft serve machines, Icetro equipment, two-sided grills, Emery Thompson batch freezers, FlavorBurst systems, and more.

---

## Brand Guidelines

### Color Palette

```css
:root {
  /* Primary Colors */
  --taylor-blue: #0066b2;           /* Primary brand blue */
  --taylor-navy: #1B4B7C;           /* Dark navy for headers */
  --taylor-blue-light: #4A90C2;     /* Lighter blue for accents */
  
  /* Secondary Colors */
  --taylor-orange: #FF7B00;         /* Orange accent color */
  
  /* Neutrals */
  --white: #FFFFFF;
  --light-gray: #F5F5F5;
  --medium-gray: #CCCCCC;
  --dark-gray: #2C2C2C;
  --black: #000000;
}
```

### Typography

- **Headlines:** Bold, clean sans-serif (suggest: Montserrat, Open Sans, or system fonts)
- **Body:** Regular weight sans-serif for readability
- **Current site uses:** Standard web fonts via WordPress/Oxygen

### Logo

- Primary logo: White text on colored background
- Located at: `/wp-content/uploads/2022/04/Artboard-2@2x-300x83.png`
- Should be stored in Vercel Blob and referenced dynamically

---

## Site Architecture

### Public Pages

```
/                           # Homepage
/about                      # About Taylor Products
/blog                       # Blog listing (paginated)
/blog/[slug]               # Individual blog posts
/work-with-us              # Careers page
/meet-your-salesperson     # Sales team directory
/new                       # What's New section
/search                    # Site-wide search results

# Products (11 categories)
/soft-serve-frozen-yogurt  # Soft Serve & Frozen Yogurt machines
/icetro-soft-serve         # Icetro brand machines
/two-sided-grills          # Taylor grills
/milkshakes                # Milkshake freezers
/ice-cream-gelato-batch    # Emery Thompson & batch machines
/flavorburst-programs      # FlavorBurst add-ons
/frozen-cocktails          # Cocktail/adult beverage freezers
/frozen-custard            # Custard machines
/premium-slush             # Slush machines
/frozen-soda-cool-chiller  # Cool Chiller/FCB machines
/smoothies-frozen-cappuccino # Smoothie & cappuccino machines

# Individual Machine Pages (NEW - for SEO)
/machines/[slug]           # e.g., /machines/c708-soft-serve-freezer
                           # Individual detail page for each machine

# Customer Service
/red-cape-service          # Service information
/genuine-parts             # Parts ordering info (links to parts.taylorproducts.net)

# External Links (keep as links, not pages)
# - Knowledge Base: https://support.taylorproducts.net
# - Parts Store: https://parts.taylorproducts.net
# - Finder App: https://finder.taylorproducts.net/wizard
# - Payment Portal: https://taylorproducts.securepayments.cardpointe.com/pay
```

### Admin Routes (Protected)

```
/admin                     # Admin dashboard
/admin/machines            # Machine CRUD
/admin/machines/new        # Add new machine
/admin/machines/[id]       # Edit machine
/admin/categories          # Category management
/admin/salespeople         # Salesperson CRUD
/admin/salespeople/new     # Add salesperson
/admin/salespeople/[id]    # Edit salesperson
/admin/territories         # Territory/county management
/admin/blog                # Blog post management
/admin/blog/new            # Create blog post
/admin/blog/[id]           # Edit blog post
/admin/navigation          # Navigation menu editor
/admin/settings            # Site settings (logo, contact info, etc.)
/admin/testimonials        # Customer testimonial management
/admin/demo-units          # Demo/showroom units management
```

---

## Database Schema (Neon PostgreSQL)

### Tables

```sql
-- Categories for machines
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  hero_image_url TEXT,
  profit_calculator_enabled BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Subcategories within product pages
CREATE TABLE subcategories (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Machines/Equipment
CREATE TABLE machines (
  id SERIAL PRIMARY KEY,
  model_number VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  image_url TEXT,
  spec_sheet_url TEXT,
  category_id INT REFERENCES categories(id),
  subcategory_id INT REFERENCES subcategories(id),
  
  -- Machine attributes
  flavor_count VARCHAR(50),        -- "Single Flavor", "Twin Twist", "Two Flavor", etc.
  machine_type VARCHAR(100),       -- "28HT", "Pump", "Heat Treatment", etc.
  is_ada_compliant BOOLEAN DEFAULT false,
  
  -- Extended content for individual machine pages (SEO)
  long_description TEXT,           -- Full marketing copy for detail page
  features TEXT[],                 -- Array of feature bullet points
  ideal_for TEXT[],                -- Array: "Ice Cream Shops", "Restaurants", etc.
  specifications JSONB,            -- Structured specs: dimensions, power, capacity
  
  -- Status
  is_featured BOOLEAN DEFAULT false,
  is_in_stock BOOLEAN DEFAULT true,
  is_demo_unit BOOLEAN DEFAULT false,
  demo_discount_percent INT,
  
  -- SEO (for individual machine pages)
  meta_title VARCHAR(255),
  meta_description TEXT,
  focus_keyword VARCHAR(100),      -- Primary SEO keyword
  
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Related machines (for "You might also consider" section)
CREATE TABLE related_machines (
  machine_id INT REFERENCES machines(id) ON DELETE CASCADE,
  related_machine_id INT REFERENCES machines(id) ON DELETE CASCADE,
  display_order INT DEFAULT 0,
  PRIMARY KEY (machine_id, related_machine_id)
);

-- Machine tags for filtering
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE machine_tags (
  machine_id INT REFERENCES machines(id) ON DELETE CASCADE,
  tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (machine_id, tag_id)
);

-- Salespeople
CREATE TABLE salespeople (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  headshot_url TEXT,
  bio TEXT,
  booking_link TEXT,              -- HubSpot meetings link
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Territory counties
CREATE TABLE counties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,     -- "PA", "NJ", "NY", "DE"
  salesperson_id INT REFERENCES salespeople(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Blog posts
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author VARCHAR(100),
  is_published BOOLEAN DEFAULT false,
  is_whats_new BOOLEAN DEFAULT false,  -- Shows on "What's New" page
  published_at TIMESTAMP,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Blog categories (not displayed on frontend, for organization/filtering)
CREATE TABLE blog_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Blog tags (not displayed on frontend, for organization/SEO)
CREATE TABLE blog_tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE blog_post_categories (
  post_id INT REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id INT REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

CREATE TABLE blog_post_tags (
  post_id INT REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id INT REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Customer testimonials
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  business_name VARCHAR(255),
  quote TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Navigation menus
CREATE TABLE navigation_items (
  id SERIAL PRIMARY KEY,
  menu_location VARCHAR(50) NOT NULL,  -- "main", "footer", "products"
  label VARCHAR(100) NOT NULL,
  url VARCHAR(500) NOT NULL,
  parent_id INT REFERENCES navigation_items(id),
  display_order INT DEFAULT 0,
  is_external BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Site settings (key-value store)
CREATE TABLE site_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contact form submissions (optional - or use HubSpot)
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  county VARCHAR(100),
  message TEXT,
  salesperson_id INT REFERENCES salespeople(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Machine Data Structure

### Current Machine Information by Category

#### Soft Serve & Frozen Yogurt (23 models)

**28HT Heat Treatment Models:**
- C606 - Shake & Soft Serve Freezer, 28HT
- C709 - Single Flavor, 28HT
- C708 - Single Flavor, 28HT
- C717 - Twin Twist, 28HT
- C716 - Twin Twist, 28HT

**Single Flavor Models:**
- C707 - Single Flavor, Pump
- C706 - Single Flavor, Pump
- 8752 - Single Flavor, Pump
- 702 - Single Flavor
- C152 - Single Flavor, Taylormate

**Multi Flavor Models:**
- C723 - Twin Twist
- C723ADA - Twin Twist, ADA
- C161 - Compact Twin Twist
- 8756 - Twin Twist, Pump
- C722 - Twin Twist, Pump
- C722ADA - Twin Twist, Pump, ADA
- C791 - Twin Twist
- C794 - Twin Twist
- C713 - Twin Twist
- C712 - Twin Twist, Pump
- 772 - Two Flavor

**Combination Freezers:**
- C606 - Shake & Soft Serve, 28HT
- 632 - Single Shake, Single Soft Serve
- C612 - Shake & Single Soft Serve

#### Icetro Soft Serve (8 models)
- ISI-161TH/TI - Mini Soft Serve, Heat Treatment Option
- ISI-163ST - Twin Twist
- ISI-163TT - Twin Twist
- SSI-203SN - Two Flavor One Twist
- ISI-271 - Self-Service (new)
- ISI-300TA - Single Flavor
- ISI-301TH - Gravity Fed, Countertop, Heat Treatment (Coming Nov 2025)
- ISI-303SNA - Two Flavor, One Twist

#### Two Sided Grills (14 models)

**Crown Series (New):**
- L858 - Electric Two Sided Grill (In Stock)
- L852 - Electric Two Sided Grill (In Stock)
- L850 - Single Platen (In Stock)

**Electric Grills:**
- L828 - Electric Two-Side Grill
- L822 - Electric Two-Side Grill
- L820 - Electric Two-Side Grill
- L812 - Electric Two-Side Grill
- L810 - Electric Two-Side Grill

**Gas Grills:**
- L821 - Gas Lower / Electric Upper
- L819 - Gas Lower / Electric Upper
- L813 - Gas Lower / Electric Upper
- L811 - Gas Lower / Electric Upper

**RAM Frozen Food Dispenser:**
- R160 - Frozen Food Dispenser
- R200 - Frozen Food Dispenser
- R280 - Frozen Food Dispenser

#### Milkshakes (16 models)

**28HT Shake Freezers:**
- C606 - Shake & Soft Serve, 28HT
- PH61 - Four Flavors, Pump
- C708SHK - Single Flavor, Heat Treatment

**Single Flavor:**
- 428, 430, 441, 490, 358, 490 Extra Thick

**Multi Flavor:**
- 432 (Two Flavors), PH61 (Four), 60 (Four), 62 (Four), 359 (Two)

**Combination:**
- C606, PH61, C612

#### Ice Cream & Gelato Batch / Emery Thompson (11 models)
- 104 - Taylor Batch Freezer
- CB100, CB200, CB350 - Emery Thompson
- 12/24 QT, 44 QT - Emery Thompson
- FR260 - Batch Freezer
- GX2, GX4, GX6, GX8 - Batch Ice Cream Freezers

#### FlavorBurst Programs (3 configurations)
- FlavorBurst w/ C708
- FlavorBlend w/ C708
- FlavorBurst Shake w/ 428

#### Frozen Cocktails (9 models)
- C300FAB - Two Flavor (Zamboozy custom)
- 428, 430 - Single Flavor
- 432, 342 - Two Flavor
- RD30, 340, 390 - Single Flavor
- 370 - Frozen Beverage

#### Frozen Custard (6 models)
- GX2, GX4, GX6, GX8 - Batch
- C002, C043 - Custard Freezers

#### Premium Slush (7 models)
- 428, 430, 432, RD30, 340, 390, 342

#### Smoothies & Frozen Cappuccino (10 models)
- Single: 428, 430, 340, 390, 441, 490, 490 Extra Thick
- Multi: 432, 342, 370

#### Cool Chiller / Frozen Carbonated Beverage (4 models)
- C300, C302, C303, C314

---

## Salespeople Data

### Current Team

```json
[
  {
    "name": "Aaron Longenecker",
    "phone": "610-295-4819",
    "email": "a.longenecker@taylorproducts.net",
    "booking_link": "https://app.hubspot.com/meetings/a-longenecker",
    "territories": ["Central Pennsylvania", "Western Pennsylvania", "Delaware"],
    "years_with_company": 14
  },
  {
    "name": "Jason Rossi",
    "phone": "732-690-8823",
    "email": "j.rossi@taylorproducts.net",
    "booking_link": "https://app.hubspot.com/meetings/j-rossi1/30",
    "territories": ["Northeast New Jersey", "Long Island", "New York City", "Westchester County", "Rockland County"],
    "years_with_company": 10
  },
  {
    "name": "Thomas Mauser",
    "phone": "610-761-5522",
    "email": "t.mauser@taylorproducts.net",
    "booking_link": "https://app.hubspot.com/meetings/t-mauser",
    "territories": ["Northeastern Pennsylvania", "Southern New Jersey"]
  },
  {
    "name": "Jonathan Mauser",
    "phone": "732-995-2605",
    "email": "j.mauser@taylorproducts.net",
    "booking_link": null,
    "territories": ["Northwest New Jersey", "Central New Jersey", "Richmond County NY"]
  }
]
```

### Service Territory Counties

Full list from contact form dropdown - covers counties in:
- Pennsylvania (PA): Adams, Bedford, Berks, Blair, Bradford, Bucks, Cambria, Cameron, Carbon, Centre, Chester, Clearfield, Clinton, Columbia, Dauphin, Delaware, Elk, Franklin, Fulton, Huntingdon, Indiana, Jefferson, Juniata, Lackawanna, Lancaster, Lehigh, Luzerne, Lycoming, Mifflin, Monroe, Montgomery, Montour, Northampton, Northumberland, Perry, Philadelphia, Pike, Potter, Schuylkill, Snyder, Somerset, Susquehanna, Tioga, Union, Wayne, Wyoming, York
- New Jersey (NJ): Atlantic, Bergen, Burlington, Camden, Cape May, Cumberland, Essex, Gloucester, Hudson, Hunterdon, Mercer, Middlesex, Monmouth, Morris, Ocean, Passaic, Salem, Somerset, Sussex, Union, Warren
- New York (NY): Bronx, Kings, Nassau, New York, Queens, Richmond, Rockland, Suffolk, Westchester
- Delaware (DE): New Castle

---

## Page Components

### Global Components

#### Header
- Logo (links to home)
- "Pay An Invoice / Deposit" button (external link to CardPointe)
- Main navigation with dropdown for "Our Products" and "Customer Service"
- "Meet Your Salesperson" CTA button

#### Footer
- Contact information
- Showroom locations (2 locations visible on site)
- Social media links: Facebook, Instagram, LinkedIn, X (Twitter)
- Phone/email contact

#### Contact Form (appears on all pages)
- Fields: Name, Phone, Email, Business County (dropdown), Message
- County selection auto-routes to appropriate salesperson
- Integration with HubSpot for lead capture

### Homepage Components

1. **Hero Carousel/Slider** with multiple slides:
   - "What's New at Taylor Products" 
   - "Find the Perfect Machine" (links to Finder app)
   - "Showroom Demo Sale" with featured machines
   - "Introducing Emery-Thompson"
   - "Parts E-Commerce" promotion

2. **Value Proposition Section**
   - "What makes Taylor Products different?"
   - Family-owned, service commitment, profit solutions

3. **Products Grid**
   - Visual grid of all product categories
   - Each card links to category page

4. **Testimonials Carousel**
   - Customer quotes with names/businesses

5. **Contact Section**
   - Contact info and form

### Product Category Page Template

1. **Hero Section**
   - Category name
   - Hero image
   - Description text

2. **Profit Calculator** (optional per category)
   - Interactive calculator widget
   - Shows potential profits

3. **Machine Listings by Subcategory**
   - Subcategory headers (e.g., "28HT Soft Serve", "Single Flavor", "Multi Flavor")
   - Machine cards in grid layout

4. **Machine Card Component**
   - Machine image
   - Model number/name
   - Short description (flavor count, features)
   - "View Specs" button (links to PDF)
   - "Get Quote" button (links to salesperson page)
   - Optional badges: "In Stock", "28HT", "New", etc.
   - Links to individual machine detail page

### Individual Machine Detail Page (NEW - SEO Focused)

1. **Hero Section**
   - Large machine image
   - Model number + name as H1
   - Category breadcrumb navigation
   - "Get Quote" and "View Specs" CTAs

2. **Overview Section**
   - Long description (SEO-optimized copy)
   - Key features list
   - "Ideal For" badges (Ice Cream Shops, Restaurants, etc.)

3. **Specifications Table**
   - Dimensions, weight
   - Power requirements
   - Capacity/output
   - Cooling type (air/water)

4. **Related Machines**
   - "You might also consider" section
   - 3-4 related machine cards

5. **Contact/Quote Form**
   - HubSpot form with machine pre-selected
   - Territory-based routing

6. **Schema Markup**
   - Product structured data for Google
   - FAQ schema if applicable

### Site-Wide Search

1. **Search Implementation**
   - Search bar in header (expandable on mobile)
   - Dedicated /search results page
   - Real-time suggestions dropdown

2. **Search Prioritization**
   - Machines (by model number, name, features) - highest weight
   - Blog posts (by title, content)
   - Categories
   - Weighted relevance scoring

3. **Search Features**
   - Filter by type (Machines, Blog, All)
   - Highlight matching terms
   - "No results" suggestions

### Meet Your Salesperson Page

1. **Team Header**
   - "Good things start here" tagline

2. **Salesperson Cards**
   - Headshot image
   - Name
   - Phone number
   - Email
   - "Book A Meeting" button
   - Territory list

3. **Territory Map**
   - Image showing sales territories
   - Color-coded regions

### Blog Page

1. **Post Listing**
   - Featured image
   - Title
   - Excerpt
   - Link to full post

2. **Pagination**
   - Page numbers

---

## Admin Dashboard Features

### Machine Management
- CRUD operations for all machines
- Image upload to Vercel Blob
- PDF spec sheet upload
- Category/subcategory assignment
- Tag management
- Featured/demo unit flags
- Bulk import/export (CSV)

### Salesperson Management
- Add/edit salespeople
- Headshot upload
- Bio editor (rich text)
- Territory assignment (multi-select counties)
- Booking link management

### Category Management
- Add/edit/reorder categories
- Subcategory management
- Hero image upload
- Enable/disable profit calculator

### Navigation Editor
- Drag-and-drop menu ordering
- Add/remove menu items
- External link support
- Nested menu items

### Blog Management
- Rich text editor for posts
- Featured image upload
- Draft/publish workflow
- "What's New" flag for homepage section

### Settings
- Logo upload
- Contact information
- Social media links
- Showroom addresses

---

## Technical Implementation

### NextJS App Router Structure

```
/app
  /layout.tsx              # Root layout with header/footer
  /page.tsx                # Homepage
  /about/page.tsx
  /blog/page.tsx
  /blog/[slug]/page.tsx
  /meet-your-salesperson/page.tsx
  /work-with-us/page.tsx
  /new/page.tsx
  /red-cape-service/page.tsx
  /genuine-parts/page.tsx
  
  # Product category pages (dynamic)
  /[category]/page.tsx     # Or individual files for each
  
  # Admin section
  /admin
    /layout.tsx            # Admin layout with sidebar
    /page.tsx              # Dashboard
    /machines/...
    /salespeople/...
    /categories/...
    /blog/...
    /navigation/...
    /settings/...
    
  /api
    /machines/route.ts
    /salespeople/route.ts
    /categories/route.ts
    /blog/route.ts
    /upload/route.ts       # Vercel Blob uploads
    /contact/route.ts      # Form submissions
    
/components
  /ui                      # Shadcn/UI components
  /Header.tsx
  /Footer.tsx
  /MachineCard.tsx
  /SalespersonCard.tsx
  /ContactForm.tsx
  /TestimonialCarousel.tsx
  /ProductGrid.tsx
  /ProfitCalculator.tsx
  
/lib
  /db.ts                   # Neon connection
  /auth.ts                 # Admin authentication
  /blob.ts                 # Vercel Blob utilities
```

### Key Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "@vercel/blob": "latest",
    "@vercel/postgres": "latest",
    "@neondatabase/serverless": "latest",
    "drizzle-orm": "latest",
    "next-auth": "latest",
    "react-hook-form": "latest",
    "zod": "latest",
    "@radix-ui/react-*": "latest",
    "tailwindcss": "latest",
    "lucide-react": "latest"
  }
}
```

### Environment Variables

```env
# Database
DATABASE_URL=postgres://...@neon.tech/taylorproducts

# Vercel Blob
BLOB_READ_WRITE_TOKEN=...

# Authentication
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://taylorproducts.net

# Optional integrations
HUBSPOT_API_KEY=...
```

---

## Migration Notes

### Content to Migrate
1. All machine data (model numbers, descriptions, images, spec PDFs)
2. All blog posts with images
3. Salesperson information and headshots
4. Testimonials
5. Site imagery (logos, hero images, product photos)

### External Integrations to Maintain
- HubSpot (CRM, forms, meetings)
- CardPointe (payment portal)
- Parts e-commerce site (parts.taylorproducts.net)
- Support/Knowledge Base (support.taylorproducts.net)
- Finder app (finder.taylorproducts.net) - existing NextJS app

### SEO Considerations
- Maintain all existing URL slugs
- Set up 301 redirects for any URL changes
- Preserve meta descriptions
- Implement structured data for products (Product schema)
- Generate sitemap.xml dynamically
- robots.txt configuration
- Individual machine pages for long-tail keyword targeting
- SEO-optimized copy refresh (subtle improvements, maintain voice)

### Analytics - Fathom

Privacy-focused analytics via Fathom:

```javascript
// Add to app/layout.tsx
<script 
  src="https://cdn.usefathom.com/script.js" 
  data-site="YOUR_FATHOM_SITE_ID" 
  defer 
/>
```

Track:
- Page views
- Goal completions (form submissions, quote requests)
- Outbound link clicks (spec sheet downloads, parts site)

### Image Optimization Strategy

1. **NextJS Image Component**
   - Automatic WebP/AVIF conversion
   - Responsive srcset generation
   - Lazy loading by default
   - Blur placeholder from Vercel Blob

2. **Image Sizing**
   - Machine thumbnails: 300x300 (grid view)
   - Machine detail: 800x800 (detail page)
   - Hero images: 1920x600 (full width)
   - Salesperson headshots: 400x400
   - Blog featured: 1200x630 (OG image compatible)

3. **Vercel Blob Configuration**
   - Enable automatic optimization
   - Set cache headers for performance

---

## Image & Asset Migration Process

### Architecture Decision: Vercel Blob Storage

All machine images, spec PDFs, hero images, and salesperson headshots will be stored in Vercel Blob storage and referenced via URLs in the database. This keeps the git repository lean and provides CDN-optimized delivery.

| Asset Type | Storage Location | Reason |
|------------|------------------|--------|
| Logo, icons, UI elements | `/public/` in repo | Rarely change, version controlled |
| Machine images | Vercel Blob | Many files, managed via admin |
| Spec sheet PDFs | Vercel Blob | Large files, frequently updated |
| Salesperson headshots | Vercel Blob | Managed via admin |
| Blog images | Vercel Blob | User-uploaded content |
| Hero/category images | Vercel Blob | Large files, occasionally updated |

### Complete Asset Inventory

The following assets need to be migrated from the WordPress site. Claude Code should create `/scripts/migrate-assets.ts` with this data:

#### Machine Images (70+ images)

```typescript
// Soft Serve & Frozen Yogurt
const SOFT_SERVE_IMAGES = [
  { old: '/2022/04/model_c606-300x300.jpg', model: 'C606' },
  { old: '/2022/04/model_c709-300x300.jpg', model: 'C709' },
  { old: '/2022/04/model_c708-300x300.jpg', model: 'C708' },
  { old: '/2022/04/model_c717-300x300.jpg', model: 'C717' },
  { old: '/2022/04/model_c716-300x300.jpg', model: 'C716' },
  { old: '/2022/04/model_c707-300x300.jpg', model: 'C707' },
  { old: '/2022/04/model_c706-300x300.jpg', model: 'C706' },
  { old: '/2022/04/model_8752-300x300.jpg', model: '8752' },
  { old: '/2022/04/model_702-300x300.jpg', model: '702' },
  { old: '/2022/04/C152-233x300.jpg', model: 'C152' },
  { old: '/2022/05/C723-Dual-Instagram-258x300.jpg', model: 'C723' },
  { old: '/2022/04/model_c723ada-300x300.jpg', model: 'C723ADA' },
  { old: '/2022/04/model_c161_sm-300x300.jpg', model: 'C161' },
  { old: '/2022/04/model_8756-300x300.jpg', model: '8756' },
  { old: '/2022/04/model_c722-300x300.jpg', model: 'C722' },
  { old: '/2022/04/model_c722ada-300x300.jpg', model: 'C722ADA' },
  { old: '/2022/04/C_C791-125x300.png', model: 'C791' },
  { old: '/2022/04/C_C794-125x300.png', model: 'C794' },
  { old: '/2022/04/model_c713-300x300.jpg', model: 'C713' },
  { old: '/2022/04/model_c712-300x300.jpg', model: 'C712' },
  { old: '/2022/04/model_772-300x300.jpg', model: '772' },
  { old: '/2022/04/model_632-300x300.jpg', model: '632' },
  { old: '/2022/08/C612-300x300.png', model: 'C612' },
];

// Icetro
const ICETRO_IMAGES = [
  { old: '/2024/05/Icetro_ISI-161_SoftServe_PhotoMain_Right_1-300x300.jpg', model: 'ISI-161TH' },
  { old: '/2024/05/Icetro_163ST_SoftServe_PhotoMain_Front_1-128x300.png', model: 'ISI-163ST' },
  { old: '/2024/05/ISI-163TT-300x300.jpg', model: 'ISI-163TT' },
  { old: '/2024/05/Icetro_SSI-203_SoftServe_PhotoMain_Right_1-300x300.jpg', model: 'SSI-203SN' },
  { old: '/2025/08/Icetro_ISI-271THS-300x300.jpg', model: 'ISI-271' },
  { old: '/2024/05/Icetro_ISI-300TA_SoftServe_PhotoMain_Right_1-300x300.jpg', model: 'ISI-300TA' },
  { old: '/2025/09/ISI-301TH.jpg', model: 'ISI-301TH' },
  { old: '/2024/05/Icetro_SSI-303_SoftServe_PhotoMain_Right_1-300x300.jpg', model: 'ISI-303SNA' },
];

// Two Sided Grills
const GRILL_IMAGES = [
  { old: '/2023/08/Taylor-L858-CommercialClamshellGrill-PhotoMain-1-e1691083759580-244x300.png', model: 'L858' },
  { old: '/2023/08/L852B-185x300.png', model: 'L852' },
  { old: '/2024/10/L850-98x300.png', model: 'L850' },
  { old: '/2022/04/model_l828-300x300.jpg', model: 'L828' },
  { old: '/2022/04/model_l822-300x300.jpg', model: 'L822' },
  { old: '/2022/04/model_l820-300x300.jpg', model: 'L820' },
  { old: '/2022/04/model_l812-300x300.jpg', model: 'L812' },
  { old: '/2022/04/model_l810-300x300.jpg', model: 'L810' },
  { old: '/2022/04/model_l821-300x300.jpg', model: 'L821' },
  { old: '/2022/04/model_l819-300x300.jpg', model: 'L819' },
  { old: '/2022/04/model_l813-300x300.jpg', model: 'L813' },
  { old: '/2022/04/model_l811-300x300.jpg', model: 'L811' },
  { old: '/2025/04/R160-185x300.png', model: 'R160' },
  { old: '/2025/04/R200-185x300.png', model: 'R200' },
  { old: '/2025/04/R280-185x300.png', model: 'R280' },
];

// Milkshakes & Frozen Beverages
const SHAKE_IMAGES = [
  { old: '/2022/04/model_ph61-300x300.jpg', model: 'PH61' },
  { old: '/2022/04/model_428-300x300.jpg', model: '428' },
  { old: '/2022/04/model_430-300x300.jpg', model: '430' },
  { old: '/2022/04/model_441-300x300.jpg', model: '441' },
  { old: '/2022/04/model_490-300x300.jpg', model: '490' },
  { old: '/2022/04/model_358-300x300.jpg', model: '358' },
  { old: '/2022/04/model_432-300x300.jpg', model: '432' },
  { old: '/2022/04/model_60-300x300.jpg', model: '60' },
  { old: '/2022/04/model_62-300x300.jpg', model: '62' },
  { old: '/2022/04/model_359-300x300.jpg', model: '359' },
  { old: '/2022/04/model_rd30-300x300.jpg', model: 'RD30' },
  { old: '/2022/04/model_340-300x300.jpg', model: '340' },
  { old: '/2022/04/model_390-300x300.jpg', model: '390' },
  { old: '/2022/04/model_342-300x300.jpg', model: '342' },
  { old: '/2022/04/model_370-300x300.jpg', model: '370' },
];

// Batch / Emery Thompson
const BATCH_IMAGES = [
  { old: '/2022/04/model_104-300x300.jpg', model: '104' },
  { old: '/2025/03/CB-100-300x300.png', model: 'CB100' },
  { old: '/2025/03/CB-200-300x300.png', model: 'CB200' },
  { old: '/2025/03/CB-350-300x300.png', model: 'CB350' },
  { old: '/2025/03/12_24-QT-300x300.png', model: '12-24QT' },
  { old: '/2025/03/44-QT-300x300.png', model: '44QT' },
  { old: '/2022/04/FR260-201x300.jpg', model: 'FR260' },
  { old: '/2022/04/GX2-new-version-scaled-1-257x300.jpg', model: 'GX2' },
  { old: '/2022/04/GX4-SERIE-04-scaled-1-300x225.jpg', model: 'GX4' },
  { old: '/2022/04/GX6-scaled-1-300x277.jpg', model: 'GX6' },
  { old: '/2022/04/GX8-scaled-1-300x225.jpg', model: 'GX8' },
];

// FlavorBurst
const FLAVORBURST_IMAGES = [
  { old: '/2022/04/ctp80ss_c708_3-copy-293x300.jpg', model: 'FlavorBurst-C708' },
  { old: '/2022/04/ctp80bld_c708_2-copy-293x300.jpg', model: 'FlavorBlend-C708' },
  { old: '/2022/04/ctp80bev_428_sh2-copy-300x286.jpg', model: 'FlavorBurst-428' },
];

// Cocktails & Custard
const COCKTAIL_CUSTARD_IMAGES = [
  { old: '/2022/04/Zamboozy__C300FAB_FrontA-scaled-1-200x300.jpg', model: 'C300FAB' },
  { old: '/2022/04/model_c002-300x300.jpg', model: 'C002' },
  { old: '/2022/04/model_c043-300x300.jpg', model: 'C043' },
];

// Cool Chiller / FCB
const FCB_IMAGES = [
  { old: '/2022/04/model_c300_2018-300x300.png', model: 'C300' },
  { old: '/2022/04/model_c302_2018-300x300.png', model: 'C302' },
  { old: '/2022/04/model_c303_2018-300x300.png', model: 'C303' },
  { old: '/2022/04/model_c314_2018-300x300.png', model: 'C314' },
];
```

#### Spec Sheet PDFs (70+ PDFs)

```typescript
const SPEC_SHEETS = [
  // Soft Serve
  { old: '/2022/06/C606.pdf', model: 'C606' },
  { old: '/2022/06/C709.pdf', model: 'C709' },
  { old: '/2022/06/C708.pdf', model: 'C708' },
  { old: '/2022/06/C717.pdf', model: 'C717' },
  { old: '/2022/06/C716.pdf', model: 'C716' },
  { old: '/2022/06/C707.pdf', model: 'C707' },
  { old: '/2022/06/C706.pdf', model: 'C706' },
  { old: '/2022/06/8752.pdf', model: '8752' },
  { old: '/2022/04/s0702.pdf', model: '702' },
  { old: '/2022/06/C152.pdf', model: 'C152' },
  { old: '/2022/06/C723.pdf', model: 'C723' },
  { old: '/2022/06/C723ADA.pdf', model: 'C723ADA' },
  { old: '/2022/06/sC161.pdf', model: 'C161' },
  { old: '/2022/06/8756.pdf', model: '8756' },
  { old: '/2022/06/C722.pdf', model: 'C722' },
  { old: '/2022/04/sc722ada.pdf', model: 'C722ADA' },
  { old: '/2022/06/C791.pdf', model: 'C791' },
  { old: '/2022/06/C794.pdf', model: 'C794' },
  { old: '/2022/06/C713.pdf', model: 'C713' },
  { old: '/2022/06/C712.pdf', model: 'C712' },
  { old: '/2022/04/s0772.pdf', model: '772' },
  { old: '/2022/06/632.pdf', model: '632' },
  { old: '/2022/08/C612-Draft.pdf', model: 'C612' },
  
  // Icetro
  { old: '/2024/05/Icetro_ISI161THTI_SoftServe_SpecSheet_1.pdf', model: 'ISI-161TH' },
  { old: '/2024/05/Icetro_ISI163TTST_SoftServe_SpecSheet_1-1.pdf', model: 'ISI-163ST' },
  { old: '/2024/05/Icetro_ISI203SNN_SoftServe_SpecSheet_1_REV.pdf', model: 'SSI-203SN' },
  { old: '/2025/08/Icetro_ISI271THSSHS_SoftServe_SpecSheet_4.pdf', model: 'ISI-271' },
  { old: '/2024/05/Icetro_ISI300TA_SoftServe_SpecSheet_1.pdf', model: 'ISI-300TA' },
  { old: '/2024/05/Icetro_ISI303SNASNW_SoftServe_SpecSheet_1-1.pdf', model: 'ISI-303SNA' },
  
  // Grills
  { old: '/2023/08/Taylor_L858_CommercialClamshellGrill_SpecSheet1.pdf', model: 'L858' },
  { old: '/2023/08/L852_Crown.pdf', model: 'L852' },
  { old: '/2024/10/L850-Spec-Sheet-1.pdf', model: 'L850' },
  { old: '/2022/04/sl828.pdf', model: 'L828' },
  { old: '/2022/04/sl822.pdf', model: 'L822' },
  { old: '/2022/04/sl820.pdf', model: 'L820' },
  { old: '/2022/04/sl812.pdf', model: 'L812' },
  { old: '/2022/04/sl810.pdf', model: 'L810' },
  { old: '/2022/04/sl821.pdf', model: 'L821' },
  { old: '/2022/04/sl819.pdf', model: 'L819' },
  { old: '/2022/04/sl813.pdf', model: 'L813' },
  { old: '/2022/04/sl811.pdf', model: 'L811' },
  { old: '/2025/04/R160.pdf', model: 'R160' },
  { old: '/2025/04/R200.pdf', model: 'R200' },
  { old: '/2025/04/R280.pdf', model: 'R280' },
  
  // Shakes & Beverages
  { old: '/2022/04/sph61.pdf', model: 'PH61' },
  { old: '/2022/04/sC708SHK.pdf', model: 'C708SHK' },
  { old: '/2022/06/428.pdf', model: '428' },
  { old: '/2022/06/430.pdf', model: '430' },
  { old: '/2022/06/441.pdf', model: '441' },
  { old: '/2022/06/490.pdf', model: '490' },
  { old: '/2024/07/Spec-sheet-Changes-490-JIB.pdf', model: '490-Extra-Thick' },
  { old: '/2022/06/358.pdf', model: '358' },
  { old: '/2022/04/s0432.pdf', model: '432' },
  { old: '/2022/04/s0060.pdf', model: '60' },
  { old: '/2022/04/s0062.pdf', model: '62' },
  { old: '/2022/06/359.pdf', model: '359' },
  
  // Batch / Emery Thompson
  { old: '/2022/06/104.pdf', model: '104' },
  { old: '/2025/03/CB-100-SPECIFICATIONS.pdf', model: 'CB100' },
  { old: '/2025/03/CB-200-SPECIFICATIONS.pdf', model: 'CB200' },
  { old: '/2025/03/CB-350-SPECIFICATIONS-1.pdf', model: 'CB350' },
  { old: '/2025/03/12-24QT-SPECIFICATIONS.pdf', model: '12-24QT' },
  { old: '/2025/03/44QT-SPECIFICATIONS.pdf', model: '44QT' },
  { old: '/2022/06/FR-260-Batch-Freezer.pdf', model: 'FR260' },
  { old: '/2022/04/GX2-Gelato-Cart-New-Generation.pdf', model: 'GX2' },
  { old: '/2022/04/GX4.pdf', model: 'GX4' },
  { old: '/2022/04/GX6.pdf', model: 'GX6' },
  { old: '/2022/04/GX8-Gelato-Cart.pdf', model: 'GX8' },
  
  // FlavorBurst
  { old: '/2022/04/pop_6051ctp_bleed.pdf', model: 'FlavorBurst-C708' },
  { old: '/2022/04/pop_6052ctp_bleed.pdf', model: 'FlavorBlend-C708' },
  { old: '/2022/12/POP_7076CTP_bleed.pdf', model: 'FlavorBurst-428' },
  
  // Cocktails
  { old: '/2022/04/C300FAB.pdf', model: 'C300FAB' },
  { old: '/2022/04/srd30.pdf', model: 'RD30' },
  { old: '/2022/06/340.pdf', model: '340' },
  { old: '/2022/06/390.pdf', model: '390' },
  { old: '/2022/06/342.pdf', model: '342' },
  { old: '/2022/04/370.pdf', model: '370' },
  
  // Custard
  { old: '/2022/06/C002.pdf', model: 'C002' },
  { old: '/2022/06/C043.pdf', model: 'C043' },
  
  // Cool Chiller
  { old: '/2022/04/sC300.pdf', model: 'C300' },
  { old: '/2022/04/sC302.pdf', model: 'C302' },
  { old: '/2022/04/sC303.pdf', model: 'C303' },
  { old: '/2022/04/sC314.pdf', model: 'C314' },
];
```

#### Site Assets (Logos, Heroes, Category Cards)

```typescript
const SITE_ASSETS = [
  // Logo
  { old: '/2022/04/Artboard-2@2x-300x83.png', name: 'logo', category: 'brand' },
  
  // Hero Images
  { old: '/2022/05/Soft-Serve-Frozen-Yogurt-Hero-Image.png', name: 'hero-soft-serve', category: 'heroes' },
  { old: '/2022/04/hot-foods.jpg', name: 'hero-grills', category: 'heroes' },
  { old: '/2022/04/frozen-cocktails.jpg', name: 'hero-cocktails', category: 'heroes' },
  { old: '/2022/04/milkshakes.jpg', name: 'hero-milkshakes', category: 'heroes' },
  { old: '/2025/03/Batch-Gelato-Hero.png', name: 'hero-batch', category: 'heroes' },
  { old: '/2022/04/flavor-burst-c708.png', name: 'hero-flavorburst', category: 'heroes' },
  { old: '/2022/04/4-1.jpg', name: 'hero-custard', category: 'heroes' },
  { old: '/2022/04/premium-slush.jpg', name: 'hero-slush', category: 'heroes' },
  { old: '/2022/04/smoothies-frozen-capuccino.jpg', name: 'hero-smoothies', category: 'heroes' },
  { old: '/2022/04/cool-chiller.jpg', name: 'hero-coolchiller', category: 'heroes' },
  { old: '/2024/05/Icetro-Hero-1024x1024.png', name: 'hero-icetro', category: 'heroes' },
  
  // Homepage & General
  { old: '/2022/04/our-equipment-programs-1024x682.jpg', name: 'homepage-equipment', category: 'general' },
  { old: '/2022/04/hero-service-image.jpg', name: 'hero-service', category: 'heroes' },
  { old: '/2022/04/genuine-parts.png', name: 'genuine-parts', category: 'general' },
  { old: '/2024/02/TPI-Sales-Territories-022024.png', name: 'territory-map', category: 'general' },
  { old: '/2025/03/Emery-Thompson-Logo-full.png', name: 'emery-thompson-logo', category: 'brand' },
  { old: '/2025/10/New-PNG-300x217.png', name: 'whats-new-badge', category: 'general' },
  { old: '/2025/08/default-showcase-300x300.png', name: 'finder-default', category: 'general' },
  
  // Category Cards (Homepage Grid)
  { old: '/2022/04/2-1.png', name: 'card-soft-serve', category: 'cards' },
  { old: '/2022/04/7-1.png', name: 'card-flavorburst', category: 'cards' },
  { old: '/2022/04/4-1.png', name: 'card-batch', category: 'cards' },
  { old: '/2022/10/Frozen-Custard-Graphic.png', name: 'card-custard', category: 'cards' },
  { old: '/2022/04/Slush.png', name: 'card-slush', category: 'cards' },
  { old: '/2022/04/IMG_20200528_142624.png', name: 'card-coolchiller', category: 'cards' },
  { old: '/2022/04/1-1.png', name: 'card-cocktails', category: 'cards' },
  { old: '/2022/04/3-1.png', name: 'card-smoothies', category: 'cards' },
  { old: '/2022/04/6-1.png', name: 'card-milkshakes', category: 'cards' },
  { old: '/2022/04/8-1.png', name: 'card-grills', category: 'cards' },
];

// Salesperson Headshots
const SALESPERSON_IMAGES = [
  { old: '/2022/04/IMG_5237-1-scaled-1-300x300.jpg', name: 'aaron-longenecker' },
  { old: '/2022/04/IMG_20200811_132717_Bokeh-300x300.jpg', name: 'jason-rossi' },
  { old: '/2022/04/IMG_5274-300x300.jpg', name: 'thomas-mauser' },
  { old: '/2024/01/Jon-Headshot-300x300.jpg', name: 'jonathan-mauser' },
];
```

### Migration Script Implementation

Create `/scripts/migrate-assets.ts`:

```typescript
import { put } from '@vercel/blob';
import * as https from 'https';
import * as fs from 'fs';

const WP_BASE = 'https://taylorproducts.net/wp-content/uploads';

interface AssetMapping {
  [oldUrl: string]: string;
}

async function downloadFile(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location!).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${url} (${response.statusCode})`));
        return;
      }
      const chunks: Buffer[] = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

async function migrateAsset(
  oldPath: string, 
  newPath: string
): Promise<{ oldUrl: string; newUrl: string } | null> {
  const oldUrl = `${WP_BASE}${oldPath}`;
  
  try {
    console.log(`  ⬇️  Downloading: ${oldPath}`);
    const buffer = await downloadFile(oldUrl);
    
    console.log(`  ⬆️  Uploading: ${newPath}`);
    const blob = await put(newPath, buffer, { 
      access: 'public',
      addRandomSuffix: false 
    });
    
    console.log(`  ✅ Complete: ${blob.url}`);
    return { oldUrl, newUrl: blob.url };
    
  } catch (error) {
    console.error(`  ❌ Failed: ${oldPath} - ${error}`);
    return null;
  }
}

async function main() {
  const mapping: AssetMapping = {};
  const errors: string[] = [];
  
  console.log('🚀 Starting Taylor Products asset migration...\n');
  
  // Import all asset arrays (defined above)
  // Process each category...
  
  // Save mapping for database seeding
  fs.writeFileSync(
    './scripts/migration-url-mapping.json',
    JSON.stringify(mapping, null, 2)
  );
  
  console.log(`\n✅ Migration complete!`);
  console.log(`   Successful: ${Object.keys(mapping).length}`);
  console.log(`   Failed: ${errors.length}`);
  
  if (errors.length > 0) {
    fs.writeFileSync('./scripts/migration-errors.json', JSON.stringify(errors, null, 2));
  }
}

main().catch(console.error);
```

### Database Seeding with Migrated URLs

After migration, use the URL mapping to seed the database:

```typescript
// /scripts/seed-machines.ts
import { db } from '@/lib/db';
import { machines, categories, subcategories } from '@/lib/schema';
import urlMapping from './migration-url-mapping.json';

function getNewUrl(oldPath: string): string | null {
  const oldUrl = `https://taylorproducts.net/wp-content/uploads${oldPath}`;
  return urlMapping[oldUrl] || null;
}

// Machine data will reference the old paths, script converts to new URLs
const MACHINE_DATA = [
  {
    model_number: 'C708',
    name: 'Model C708',
    slug: 'c708-soft-serve-freezer',
    category_slug: 'soft-serve-frozen-yogurt',
    subcategory_slug: '28ht-freezers',
    short_description: 'Single Flavor, 28HT',
    description: 'The Taylor C708 single-flavor soft serve machine combines 28HT heat treatment technology with a compact footprint—perfect for restaurants, cafes, and c-stores looking to add profitable frozen desserts with minimal maintenance.',
    flavor_count: 'Single Flavor',
    machine_type: '28HT',
    image_path: '/2022/04/model_c708-300x300.jpg',
    spec_path: '/2022/06/C708.pdf',
    ideal_for: ['Restaurants', 'Cafes', 'Convenience Stores', 'Food Trucks'],
    features: [
      '28-day heat treatment cycle',
      'Single flavor operation', 
      'FlavorBurst compatible',
      'Industry-leading recovery time'
    ],
  },
  // ... all other machines
];

async function seedMachines() {
  for (const machine of MACHINE_DATA) {
    await db.insert(machines).values({
      ...machine,
      image_url: getNewUrl(machine.image_path),
      spec_sheet_url: getNewUrl(machine.spec_path),
    }).onConflictDoUpdate({
      target: machines.slug,
      set: {
        image_url: getNewUrl(machine.image_path),
        spec_sheet_url: getNewUrl(machine.spec_path),
        updated_at: new Date(),
      }
    });
  }
}
```

### Package.json Scripts

```json
{
  "scripts": {
    "migrate:assets": "npx tsx scripts/migrate-assets.ts",
    "seed:categories": "npx tsx scripts/seed-categories.ts",
    "seed:machines": "npx tsx scripts/seed-machines.ts", 
    "seed:salespeople": "npx tsx scripts/seed-salespeople.ts",
    "seed:all": "npm run seed:categories && npm run seed:machines && npm run seed:salespeople",
    "setup": "npm run migrate:assets && npm run seed:all"
  }
}
```

### Important Notes for Claude Code

1. **Environment Variable Required**: `BLOB_READ_WRITE_TOKEN` must be set
2. **Run migration locally first** to test before deploying
3. **Migration is idempotent** - can run multiple times safely
4. **URL mapping file** should be committed for reference
5. **Some images have multiple sizes** - migrate best quality
6. **PDFs are critical** - spec sheets are key customer downloads
7. **Check for 404s** - some old URLs may have changed

---

## Design System: "Elevated Industrial"

The Taylor Products website should feel like walking into a premium showroom - clean, impressive, and confidence-inspiring. The design balances industrial strength with approachable warmth, reflecting both the robust equipment and the family-owned service.

### Design Principles

1. **Confident, Not Aggressive** - Bold statements without shouting
2. **Premium, Not Pretentious** - High-end feel accessible to all business sizes
3. **Technical, Not Cold** - Precision with human warmth
4. **Distinctive, Not Distracting** - Memorable without gimmicks

---

### Typography System

#### Font Pairing: Outfit + Source Serif 4

```css
/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,500&display=swap');

:root {
  --font-heading: 'Outfit', system-ui, sans-serif;
  --font-body: 'Source Serif 4', Georgia, serif;
  --font-ui: 'Outfit', system-ui, sans-serif;  /* buttons, labels, nav */
}
```

#### Type Scale (fluid, responsive)

```css
:root {
  /* Fluid type scale using clamp() */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);      /* 12-14px */
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);         /* 14-16px */
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);        /* 16-18px */
  --text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.25rem);         /* 18-20px */
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);        /* 20-24px */
  --text-2xl: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);           /* 24-32px */
  --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);     /* 30-40px */
  --text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);       /* 36-56px */
  --text-5xl: clamp(3rem, 2rem + 5vw, 5rem);                 /* 48-80px */
}
```

#### Typography Usage

| Element | Font | Weight | Size | Tracking |
|---------|------|--------|------|----------|
| Hero Headlines | Outfit | 700-800 | text-5xl | -0.02em |
| Section Headlines | Outfit | 700 | text-3xl/4xl | -0.01em |
| Card Titles | Outfit | 600 | text-xl | 0 |
| Navigation | Outfit | 500 | text-sm | 0.01em |
| Buttons | Outfit | 600 | text-sm | 0.02em (uppercase) |
| Body Copy | Source Serif 4 | 400 | text-base | 0 |
| Body Bold | Source Serif 4 | 600 | text-base | 0 |
| Captions/Labels | Outfit | 500 | text-xs | 0.02em |
| Model Numbers | Outfit | 700 | text-lg | 0.05em |

---

### Color System

#### Primary Palette

```css
:root {
  /* Taylor Blue - Primary */
  --blue-50: #E6F0F7;
  --blue-100: #CCE1EF;
  --blue-200: #99C3DF;
  --blue-300: #66A5CF;
  --blue-400: #3387BF;
  --blue-500: #0066B2;  /* Primary brand blue */
  --blue-600: #00528E;
  --blue-700: #003D6B;
  --blue-800: #002947;
  --blue-900: #001424;
  
  /* Navy - Deep accents */
  --navy-500: #1B4B7C;
  --navy-600: #163D65;
  --navy-700: #112F4E;
  --navy-800: #0C2137;
  --navy-900: #071320;
  
  /* Orange - Action/CTA */
  --orange-50: #FFF4EB;
  --orange-100: #FFE4CC;
  --orange-200: #FFC999;
  --orange-300: #FFAE66;
  --orange-400: #FF9333;
  --orange-500: #FF7B00;  /* Primary orange */
  --orange-600: #CC6200;
  --orange-700: #994A00;
  --orange-800: #663100;
  --orange-900: #331900;
  
  /* Neutrals - Warm gray tint */
  --gray-50: #F8F9FA;
  --gray-100: #F1F3F5;
  --gray-200: #E9ECEF;
  --gray-300: #DEE2E6;
  --gray-400: #CED4DA;
  --gray-500: #ADB5BD;
  --gray-600: #868E96;
  --gray-700: #495057;
  --gray-800: #343A40;
  --gray-900: #212529;
  
  /* Semantic */
  --success: #2E7D32;
  --warning: #F57C00;
  --error: #C62828;
  --info: var(--blue-500);
}
```

#### Color Usage Guidelines

| Use Case | Color | Notes |
|----------|-------|-------|
| Primary buttons | orange-500 → orange-600 (hover) | High contrast, drives action |
| Secondary buttons | blue-500 → blue-600 (hover) | Important but secondary actions |
| Ghost buttons | blue-500 border/text | Tertiary actions |
| Text primary | gray-900 | Main body text |
| Text secondary | gray-600 | Supporting text |
| Text on dark | white / gray-100 | Headers, dark sections |
| Backgrounds | white, gray-50, gray-100 | Page backgrounds |
| Cards | white | With subtle shadow |
| Dark sections | navy-800, navy-900 | Footer, feature sections |
| Links | blue-500 → blue-700 (hover) | Underline on hover |
| Borders | gray-200, gray-300 | Subtle definition |

---

### Spacing & Layout System

```css
:root {
  /* Spacing scale (8px base) */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.5rem;    /* 24px */
  --space-6: 2rem;      /* 32px */
  --space-8: 3rem;      /* 48px */
  --space-10: 4rem;     /* 64px */
  --space-12: 5rem;     /* 80px */
  --space-16: 8rem;     /* 128px */
  
  /* Container widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1440px;
  
  /* Section padding */
  --section-padding-y: clamp(4rem, 8vw, 8rem);
  --section-padding-x: clamp(1rem, 5vw, 2rem);
}
```

---

### Component Design Patterns

#### Cards - "Floating Machine Cards"

Not your typical flat Tailwind cards. These have depth and presence:

```css
.machine-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  
  /* Layered shadow for depth */
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 12px 24px rgba(0, 0, 0, 0.06);
  
  /* Subtle border for definition */
  border: 1px solid var(--gray-100);
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.machine-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 12px 24px rgba(0, 0, 0, 0.08),
    0 24px 48px rgba(0, 0, 0, 0.1);
  border-color: var(--blue-200);
}

/* Image container with subtle gradient overlay */
.machine-card__image {
  position: relative;
  aspect-ratio: 1;
  background: linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%);
}

.machine-card__image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 60%,
    rgba(0, 0, 0, 0.02) 100%
  );
}

/* Model number badge */
.machine-card__model {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: var(--text-lg);
  letter-spacing: 0.05em;
  color: var(--navy-800);
}

/* Feature tags */
.machine-card__tag {
  display: inline-flex;
  padding: var(--space-1) var(--space-3);
  background: var(--blue-50);
  color: var(--blue-700);
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 600;
  border-radius: 100px;
  letter-spacing: 0.02em;
}

.machine-card__tag--highlight {
  background: var(--orange-100);
  color: var(--orange-700);
}
```

#### Buttons - "Confident Actions"

Buttons that feel substantial and clickable:

```css
/* Base button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: var(--text-sm);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  
  padding: var(--space-3) var(--space-6);
  border-radius: 8px;
  
  transition: all 0.2s ease;
  cursor: pointer;
  
  /* Subtle inner shadow for depth */
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Primary - Orange CTA */
.btn-primary {
  background: linear-gradient(
    to bottom,
    var(--orange-500) 0%,
    var(--orange-600) 100%
  );
  color: white;
  border: none;
  
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 2px 4px rgba(255, 123, 0, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(
    to bottom,
    var(--orange-400) 0%,
    var(--orange-500) 100%
  );
  transform: translateY(-1px);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 4px 8px rgba(255, 123, 0, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Secondary - Blue */
.btn-secondary {
  background: linear-gradient(
    to bottom,
    var(--blue-500) 0%,
    var(--blue-600) 100%
  );
  color: white;
  border: none;
  
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 2px 4px rgba(0, 102, 178, 0.3);
}

/* Ghost button */
.btn-ghost {
  background: transparent;
  color: var(--blue-600);
  border: 2px solid var(--blue-500);
}

.btn-ghost:hover {
  background: var(--blue-50);
  border-color: var(--blue-600);
}

/* Large variant */
.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
  border-radius: 10px;
}
```

#### Hero Sections - "Commanding Presence"

```css
.hero {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  
  /* Gradient overlay on image */
  background: 
    linear-gradient(
      135deg,
      var(--navy-900) 0%,
      rgba(27, 75, 124, 0.9) 50%,
      rgba(0, 102, 178, 0.8) 100%
    );
}

.hero__headline {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: var(--text-5xl);
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: white;
  
  /* Subtle text shadow for depth */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Animated accent line */
.hero__accent {
  width: 80px;
  height: 4px;
  background: var(--orange-500);
  margin: var(--space-5) 0;
  border-radius: 2px;
  
  animation: accentGrow 0.8s ease-out forwards;
}

@keyframes accentGrow {
  from { width: 0; }
  to { width: 80px; }
}
```

#### Section Dividers - "Subtle Separation"

Instead of harsh lines, use gradient fades and whitespace:

```css
.section-divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    var(--gray-200) 20%,
    var(--gray-200) 80%,
    transparent 100%
  );
  margin: var(--space-8) 0;
}

/* Or use a subtle pattern */
.section-pattern {
  height: 60px;
  background: 
    radial-gradient(
      circle at 50% 50%,
      var(--gray-200) 1px,
      transparent 1px
    );
  background-size: 24px 24px;
  opacity: 0.5;
}
```

#### Navigation - "Floating Header"

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  
  padding: var(--space-4) var(--space-6);
  
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  transition: all 0.3s ease;
}

.header--scrolled {
  padding: var(--space-3) var(--space-6);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.05);
}

.nav-link {
  font-family: var(--font-ui);
  font-weight: 500;
  font-size: var(--text-sm);
  color: var(--gray-700);
  
  padding: var(--space-2) var(--space-3);
  border-radius: 6px;
  
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--blue-600);
  background: var(--blue-50);
}

/* Dropdown with smooth reveal */
.nav-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  
  min-width: 240px;
  padding: var(--space-3);
  
  background: white;
  border-radius: 12px;
  border: 1px solid var(--gray-100);
  
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 12px 24px rgba(0, 0, 0, 0.08);
  
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  
  transition: all 0.2s ease;
}

.nav-item:hover .nav-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
```

---

### Unique UI Elements

#### "Ice Crystal" Badge (for 28HT models)

A distinctive badge that reflects the frozen dessert theme:

```css
.badge-28ht {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  
  padding: var(--space-2) var(--space-4);
  
  background: linear-gradient(
    135deg,
    #E3F2FD 0%,
    #BBDEFB 50%,
    #E3F2FD 100%
  );
  
  border: 1px solid rgba(33, 150, 243, 0.3);
  border-radius: 6px;
  
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: var(--text-xs);
  letter-spacing: 0.05em;
  color: #1565C0;
  
  /* Subtle shimmer effect */
  background-size: 200% 200%;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

#### "Profit Indicator" (for calculator results)

```css
.profit-display {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: var(--text-4xl);
  
  /* Gradient text */
  background: linear-gradient(
    135deg,
    var(--orange-500) 0%,
    var(--orange-600) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Subtle glow */
  filter: drop-shadow(0 2px 4px rgba(255, 123, 0, 0.2));
}
```

#### Territory Map Interactive Hover

```css
.territory-region {
  transition: all 0.3s ease;
  cursor: pointer;
}

.territory-region:hover {
  fill: var(--blue-400);
  filter: drop-shadow(0 4px 8px rgba(0, 102, 178, 0.3));
  transform: scale(1.02);
}

.territory-region--active {
  fill: var(--orange-500);
}
```

---

### Animation & Micro-interactions

```css
/* Smooth page transitions */
.page-transition-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Staggered card reveal */
.card-reveal {
  opacity: 0;
  transform: translateY(30px);
}

.card-reveal.visible {
  animation: cardReveal 0.6s ease forwards;
}

@keyframes cardReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger delay classes */
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }

/* Loading skeleton */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-100) 0%,
    var(--gray-50) 50%,
    var(--gray-100) 100%
  );
  background-size: 200% 100%;
  animation: skeleton 1.5s ease-in-out infinite;
  border-radius: 8px;
}

@keyframes skeleton {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Button ripple effect */
.btn-ripple {
  position: relative;
  overflow: hidden;
}

.btn-ripple::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
}

.btn-ripple:active::after {
  width: 300px;
  height: 300px;
}
```

---

### Dark Mode Sections

For footer and featured sections:

```css
.section-dark {
  background: linear-gradient(
    180deg,
    var(--navy-800) 0%,
    var(--navy-900) 100%
  );
  color: white;
}

.section-dark h2,
.section-dark h3 {
  color: white;
}

.section-dark p {
  color: var(--gray-300);
}

.section-dark .btn-primary {
  /* Orange pops on dark */
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 4px 12px rgba(255, 123, 0, 0.4);
}
```

---

### Responsive Breakpoints

```css
/* Mobile-first breakpoints */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }

/* Container behavior */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--section-padding-x);
}

@media (min-width: 1280px) {
  .container {
    max-width: var(--container-xl);
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: var(--container-2xl);
  }
}
```

---

### Tailwind Config Extension

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Source Serif 4', 'Georgia', 'serif'],
        ui: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        taylor: {
          blue: {
            50: '#E6F0F7',
            100: '#CCE1EF',
            200: '#99C3DF',
            300: '#66A5CF',
            400: '#3387BF',
            500: '#0066B2',
            600: '#00528E',
            700: '#003D6B',
            800: '#002947',
            900: '#001424',
          },
          navy: {
            500: '#1B4B7C',
            600: '#163D65',
            700: '#112F4E',
            800: '#0C2137',
            900: '#071320',
          },
          orange: {
            50: '#FFF4EB',
            100: '#FFE4CC',
            200: '#FFC999',
            300: '#FFAE66',
            400: '#FF9333',
            500: '#FF7B00',
            600: '#CC6200',
            700: '#994A00',
            800: '#663100',
            900: '#331900',
          },
        },
      },
      boxShadow: {
        'card': '0 1px 2px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 8px rgba(0,0,0,0.06), 0 12px 24px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.1)',
        'button': 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'badge': '100px',
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'card-reveal': 'cardReveal 0.6s ease forwards',
      },
    },
  },
}
```

---

### Copy Refresh Guidelines

**Tone:** Professional but approachable, confident but not salesy

**Current Copy Issues:**
- Some repetitive phrases
- Generic benefit statements
- Missing SEO keyword opportunities

**Improvement Approach:**

1. **Headlines** - More benefit-focused, include model numbers for SEO
   - Before: "Soft Serve & Frozen Yogurt"
   - After: "Taylor Soft Serve & Frozen Yogurt Machines | Industry-Leading Technology"

2. **Descriptions** - Add specificity and differentiation
   - Before: "Partner with Taylor Products with a Soft Serve & Frozen Yogurt freezer."
   - After: "Taylor soft serve machines deliver the industry's fastest recovery time, simplest cleaning process, and lowest lifetime maintenance costs. Choose from 20+ models to match your exact volume and menu needs."

3. **Feature Callouts** - Quantify where possible
   - Before: "Fewest parts for cleanup"
   - After: "40% fewer parts than competitors—clean in under 15 minutes"

4. **CTAs** - More specific and action-oriented
   - Before: "Get Quote"
   - After: "Get Your Custom Quote" or "Request Pricing"

5. **Machine Descriptions** - SEO-rich, benefit-focused
   - Include: model number, type, capacity, ideal use cases
   - Example: "The Taylor C708 single-flavor soft serve machine combines 28HT heat treatment technology with compact footprint—perfect for restaurants, cafes, and c-stores looking to add profitable frozen desserts with minimal maintenance."

### Key Visual Elements
- Clean, professional B2B aesthetic
- Strong use of Taylor blue (#0066b2)
- White backgrounds with blue accents
- Product images prominently featured
- Clear CTAs in orange (#FF7B00)
- "Fun without being tacky" per client preference
- Emphasis on technology leadership and reliability

### Mobile Responsiveness
- Mobile-first approach
- Hamburger menu on mobile
- Single-column layouts on small screens
- Touch-friendly buttons and forms

### Animations
- Subtle hover effects on cards
- Smooth page transitions
- Loading states for forms

---

## Success Criteria

1. Full admin backend operational for content management
2. All current pages and content migrated
3. Improved page load performance over WordPress
4. Seamless salesperson/territory management
5. Easy blog and machine content updates
6. Maintained SEO rankings during transition
7. Mobile-optimized experience
8. Integration with existing HubSpot workflows

---

## Decisions Made

| Item | Decision |
|------|----------|
| Admin Authentication | NextAuth with email/password |
| Profit Calculators | Exclude for now; will integrate existing calculator later |
| Form Handling | Keep HubSpot forms embedded |
| Search | Yes - prioritize machines and blog |
| Blog Features | Categories + tags (backend only, not displayed on frontend) |
| Individual Machine Pages | Yes - important for SEO |
| Analytics | Fathom Analytics |
| Image Optimization | NextJS Image + Vercel Blob optimization |
| Copy Refresh | Subtle SEO improvements, maintain voice |
| Design Refresh | "Elevated Industrial" - premium, distinctive, not generic |
| Fonts | Outfit (headlines/UI) + Source Serif 4 (body) |

---

## Additional Technical Considerations

### Error & Loading States

1. **Custom 404 Page**
   - Branded design with Taylor blue
   - Search box to help users find what they need
   - Links to popular categories
   - "Contact Us" CTA

2. **Custom 500 Error Page**
   - Friendly message
   - Contact information for urgent equipment needs

3. **Loading States**
   - Skeleton screens (not spinners) for content loading
   - Progressive image loading with blur placeholders
   - Optimistic UI for form submissions

### Accessibility (WCAG 2.1 AA)

1. **Color Contrast**
   - All text meets 4.5:1 contrast ratio minimum
   - Interactive elements meet 3:1 ratio
   - Don't rely on color alone for information

2. **Keyboard Navigation**
   - All interactive elements focusable
   - Visible focus indicators
   - Logical tab order
   - Skip-to-content link

3. **Screen Readers**
   - Proper heading hierarchy (h1 → h2 → h3)
   - Alt text for all images
   - ARIA labels for icons and buttons
   - Form labels and error messages

4. **Motion**
   - Respect `prefers-reduced-motion`
   - No auto-playing videos without controls

### Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.5s |

### SEO Implementation

1. **Technical SEO**
   - Dynamic sitemap.xml generation
   - robots.txt configuration
   - Canonical URLs
   - 301 redirects for old WordPress URLs

2. **Structured Data (JSON-LD)**
   - Organization schema (homepage)
   - LocalBusiness schema (with showroom locations)
   - Product schema (individual machine pages)
   - BreadcrumbList schema
   - Article schema (blog posts)
   - FAQ schema (where applicable)

3. **Open Graph & Twitter Cards**
   - Dynamic OG images per page
   - Machine-specific OG images
   - Blog post featured images as OG

4. **Breadcrumbs**
   - Home > Category > Machine
   - Home > Blog > Post Title
   - Schema markup included

### Email Notifications (Optional)

Consider setting up transactional emails for:
- Quote request confirmation (to customer)
- New lead notification (to salesperson)
- Form submission receipts

Can use Resend, SendGrid, or rely on HubSpot workflows.

### Social Sharing

1. **Share Buttons** (optional, on blog posts)
   - LinkedIn (primary for B2B)
   - Facebook
   - Twitter/X
   - Email

2. **OG Image Generation**
   - Auto-generate OG images for machines showing:
     - Machine photo
     - Model number
     - Taylor Products branding

### Print Styles

Ensure these pages print well:
- Machine spec pages (customers may print for reference)
- Quote request confirmations
- Blog articles

```css
@media print {
  .header, .footer, .nav, .sidebar { display: none; }
  .machine-specs { page-break-inside: avoid; }
  a[href]::after { content: " (" attr(href) ")"; }
}
```

### Cookie Consent

Fathom Analytics is privacy-focused and doesn't require cookie consent in most jurisdictions. However, if HubSpot tracking is added:
- Simple, non-intrusive banner
- Link to privacy policy
- Remember user preference

### Security Headers

```javascript
// next.config.js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
];
```

### Monitoring & Error Tracking

Consider adding:
- Vercel Analytics (built-in)
- Sentry for error tracking (free tier available)
- Uptime monitoring (UptimeRobot, Checkly)

---

## Remaining Questions

1. **HubSpot Form IDs** - Need the specific form embed codes/IDs for contact forms
   - Work With Us form currently using: portalId `2780498`, formId `52142cec-0cd6-48ca-abef-bf47cbee9671`
2. **Fathom Site ID** - Need the site ID once Fathom account is set up
3. **Admin Users** - Who needs admin access? Just you, or Tom as well?
4. **Domain/DNS** - Will this launch on taylorproducts.net directly or a subdomain first?
5. **Calculator Integration** - Timeline for integrating the new profit calculator from /tpi-new-calculator/?

---

## Implementation Status

### Completed
- [x] NextJS 15 project with App Router
- [x] Neon PostgreSQL with Drizzle ORM
- [x] NextAuth authentication for admin
- [x] All 11 category pages
- [x] Individual machine detail pages
- [x] Blog system (listing, detail, What's New)
- [x] Search functionality with API
- [x] Service pages (Red Cape Service, Genuine Parts)
- [x] Legal pages (Privacy, Terms)
- [x] Work With Us page with HubSpot form
- [x] Asset migration (197 assets to Vercel Blob)
- [x] Admin CRUD: Machines (list, create, edit, delete)
- [x] Admin CRUD: Blog posts (list, create, edit, delete)
- [x] Admin CRUD: Salespeople (list, create, edit, delete)
- [x] Admin: Contact submissions viewer
- [x] Database seeding scripts

### Pending
- [ ] Vercel production deployment
- [ ] Domain configuration
- [ ] Fathom Analytics integration
- [ ] Categories admin management
- [ ] Navigation menu editor
- [ ] Site settings admin page
- [ ] Image upload in admin forms (currently URL-based)