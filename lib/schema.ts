import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  primaryKey,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ================================
// Categories
// ================================
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  heroImageUrl: text("hero_image_url"),
  profitCalculatorEnabled: boolean("profit_calculator_enabled").default(false),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  subcategories: many(subcategories),
  machines: many(machines),
}));

// ================================
// Subcategories
// ================================
export const subcategories = pgTable("subcategories", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => categories.id, {
    onDelete: "cascade",
  }),
  name: varchar("name", { length: 255 }).notNull(),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subcategoriesRelations = relations(
  subcategories,
  ({ one, many }) => ({
    category: one(categories, {
      fields: [subcategories.categoryId],
      references: [categories.id],
    }),
    machines: many(machines),
  })
);

// ================================
// Machines
// ================================
export const machines = pgTable("machines", {
  id: serial("id").primaryKey(),
  modelNumber: varchar("model_number", { length: 100 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  shortDescription: varchar("short_description", { length: 500 }),
  imageUrl: text("image_url"),
  specSheetUrl: text("spec_sheet_url"),
  categoryId: integer("category_id").references(() => categories.id),
  subcategoryId: integer("subcategory_id").references(() => subcategories.id),

  // Machine attributes
  flavorCount: varchar("flavor_count", { length: 50 }),
  machineType: varchar("machine_type", { length: 100 }),
  isAdaCompliant: boolean("is_ada_compliant").default(false),

  // Extended content for individual machine pages (SEO)
  longDescription: text("long_description"),
  features: text("features").array(),
  idealFor: text("ideal_for").array(),
  specifications: jsonb("specifications"),

  // Status
  isFeatured: boolean("is_featured").default(false),
  isInStock: boolean("is_in_stock").default(true),
  isDemoUnit: boolean("is_demo_unit").default(false),
  demoDiscountPercent: integer("demo_discount_percent"),

  // SEO
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  focusKeyword: varchar("focus_keyword", { length: 100 }),

  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const machinesRelations = relations(machines, ({ one, many }) => ({
  category: one(categories, {
    fields: [machines.categoryId],
    references: [categories.id],
  }),
  subcategory: one(subcategories, {
    fields: [machines.subcategoryId],
    references: [subcategories.id],
  }),
  relatedMachines: many(relatedMachines, { relationName: "machine" }),
  relatedTo: many(relatedMachines, { relationName: "relatedMachine" }),
  machineTags: many(machineTags),
}));

// ================================
// Related Machines
// ================================
export const relatedMachines = pgTable(
  "related_machines",
  {
    machineId: integer("machine_id")
      .notNull()
      .references(() => machines.id, { onDelete: "cascade" }),
    relatedMachineId: integer("related_machine_id")
      .notNull()
      .references(() => machines.id, { onDelete: "cascade" }),
    displayOrder: integer("display_order").default(0),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.machineId, table.relatedMachineId] }),
  })
);

export const relatedMachinesRelations = relations(relatedMachines, ({ one }) => ({
  machine: one(machines, {
    fields: [relatedMachines.machineId],
    references: [machines.id],
    relationName: "machine",
  }),
  relatedMachine: one(machines, {
    fields: [relatedMachines.relatedMachineId],
    references: [machines.id],
    relationName: "relatedMachine",
  }),
}));

// ================================
// Tags
// ================================
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  machineTags: many(machineTags),
}));

// ================================
// Machine Tags (Junction Table)
// ================================
export const machineTags = pgTable(
  "machine_tags",
  {
    machineId: integer("machine_id")
      .notNull()
      .references(() => machines.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.machineId, table.tagId] }),
  })
);

export const machineTagsRelations = relations(machineTags, ({ one }) => ({
  machine: one(machines, {
    fields: [machineTags.machineId],
    references: [machines.id],
  }),
  tag: one(tags, {
    fields: [machineTags.tagId],
    references: [tags.id],
  }),
}));

// ================================
// Salespeople
// ================================
export const salespeople = pgTable("salespeople", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  headshotUrl: text("headshot_url"),
  bio: text("bio"),
  bookingLink: text("booking_link"),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const salespeopleRelations = relations(salespeople, ({ many }) => ({
  counties: many(counties),
  contactSubmissions: many(contactSubmissions),
}));

// ================================
// Counties
// ================================
export const counties = pgTable("counties", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }).notNull(),
  salespersonId: integer("salesperson_id").references(() => salespeople.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const countiesRelations = relations(counties, ({ one }) => ({
  salesperson: one(salespeople, {
    fields: [counties.salespersonId],
    references: [salespeople.id],
  }),
}));

// ================================
// Blog Posts
// ================================
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  featuredImageUrl: text("featured_image_url"),
  author: varchar("author", { length: 100 }),
  isPublished: boolean("is_published").default(false),
  isWhatsNew: boolean("is_whats_new").default(false),
  publishedAt: timestamp("published_at"),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const blogPostsRelations = relations(blogPosts, ({ many }) => ({
  blogPostCategories: many(blogPostCategories),
  blogPostTags: many(blogPostTags),
}));

// ================================
// Blog Categories
// ================================
export const blogCategories = pgTable("blog_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogCategoriesRelations = relations(blogCategories, ({ many }) => ({
  blogPostCategories: many(blogPostCategories),
}));

// ================================
// Blog Tags
// ================================
export const blogTags = pgTable("blog_tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogTagsRelations = relations(blogTags, ({ many }) => ({
  blogPostTags: many(blogPostTags),
}));

// ================================
// Blog Post Categories (Junction Table)
// ================================
export const blogPostCategories = pgTable(
  "blog_post_categories",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => blogPosts.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => blogCategories.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.postId, table.categoryId] }),
  })
);

export const blogPostCategoriesRelations = relations(
  blogPostCategories,
  ({ one }) => ({
    post: one(blogPosts, {
      fields: [blogPostCategories.postId],
      references: [blogPosts.id],
    }),
    category: one(blogCategories, {
      fields: [blogPostCategories.categoryId],
      references: [blogCategories.id],
    }),
  })
);

// ================================
// Blog Post Tags (Junction Table)
// ================================
export const blogPostTags = pgTable(
  "blog_post_tags",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => blogPosts.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => blogTags.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.postId, table.tagId] }),
  })
);

export const blogPostTagsRelations = relations(blogPostTags, ({ one }) => ({
  post: one(blogPosts, {
    fields: [blogPostTags.postId],
    references: [blogPosts.id],
  }),
  tag: one(blogTags, {
    fields: [blogPostTags.tagId],
    references: [blogTags.id],
  }),
}));

// ================================
// Testimonials
// ================================
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  businessName: varchar("business_name", { length: 255 }),
  quote: text("quote").notNull(),
  isFeatured: boolean("is_featured").default(false),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// ================================
// Navigation Items
// ================================
export const navigationItems = pgTable("navigation_items", {
  id: serial("id").primaryKey(),
  menuLocation: varchar("menu_location", { length: 50 }).notNull(),
  label: varchar("label", { length: 100 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  parentId: integer("parent_id"),
  displayOrder: integer("display_order").default(0),
  isExternal: boolean("is_external").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const navigationItemsRelations = relations(
  navigationItems,
  ({ one, many }) => ({
    parent: one(navigationItems, {
      fields: [navigationItems.parentId],
      references: [navigationItems.id],
      relationName: "children",
    }),
    children: many(navigationItems, { relationName: "children" }),
  })
);

// ================================
// Site Settings
// ================================
export const siteSettings = pgTable("site_settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ================================
// Contact Submissions
// ================================
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  county: varchar("county", { length: 100 }),
  message: text("message"),
  salespersonId: integer("salesperson_id").references(() => salespeople.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactSubmissionsRelations = relations(
  contactSubmissions,
  ({ one }) => ({
    salesperson: one(salespeople, {
      fields: [contactSubmissions.salespersonId],
      references: [salespeople.id],
    }),
  })
);

// ================================
// Admin Users
// ================================
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  role: varchar("role", { length: 50 }).default("admin"),
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ================================
// Type Exports
// ================================
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Subcategory = typeof subcategories.$inferSelect;
export type NewSubcategory = typeof subcategories.$inferInsert;

export type Machine = typeof machines.$inferSelect;
export type NewMachine = typeof machines.$inferInsert;

export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;

export type Salesperson = typeof salespeople.$inferSelect;
export type NewSalesperson = typeof salespeople.$inferInsert;

export type County = typeof counties.$inferSelect;
export type NewCounty = typeof counties.$inferInsert;

export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;

export type BlogCategory = typeof blogCategories.$inferSelect;
export type NewBlogCategory = typeof blogCategories.$inferInsert;

export type BlogTag = typeof blogTags.$inferSelect;
export type NewBlogTag = typeof blogTags.$inferInsert;

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

export type NavigationItem = typeof navigationItems.$inferSelect;
export type NewNavigationItem = typeof navigationItems.$inferInsert;

export type SiteSetting = typeof siteSettings.$inferSelect;
export type NewSiteSetting = typeof siteSettings.$inferInsert;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;

export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
