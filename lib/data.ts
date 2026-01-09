import { db } from "./db";
import { eq, asc, desc, and, inArray, isNull } from "drizzle-orm";
import {
  categories,
  subcategories,
  machines,
  testimonials,
  salespeople,
  blogPosts,
  contactSubmissions,
  siteSettings,
  counties,
  navigationItems,
  type Category,
  type Subcategory,
  type Machine,
  type Testimonial,
  type Salesperson,
  type BlogPost,
  type County,
  type NavigationItem,
} from "./schema";

// ================================
// Categories
// ================================

export async function getCategories(): Promise<Category[]> {
  return db.query.categories.findMany({
    orderBy: [asc(categories.displayOrder)],
  });
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return db.query.categories.findFirst({
    where: eq(categories.slug, slug),
  });
}

// ================================
// Subcategories
// ================================

export async function getSubcategoriesByCategoryId(categoryId: number): Promise<Subcategory[]> {
  return db.query.subcategories.findMany({
    where: eq(subcategories.categoryId, categoryId),
    orderBy: [asc(subcategories.displayOrder)],
  });
}

// ================================
// Machines
// ================================

export async function getMachinesBySubcategoryId(subcategoryId: number): Promise<Machine[]> {
  return db.query.machines.findMany({
    where: eq(machines.subcategoryId, subcategoryId),
    orderBy: [asc(machines.displayOrder)],
  });
}

export async function getMachinesByCategoryId(categoryId: number): Promise<Machine[]> {
  return db.query.machines.findMany({
    where: eq(machines.categoryId, categoryId),
    orderBy: [asc(machines.displayOrder)],
  });
}

export async function getMachineBySlug(slug: string): Promise<Machine | undefined> {
  return db.query.machines.findFirst({
    where: eq(machines.slug, slug),
  });
}

export async function getFeaturedMachines(limit = 6): Promise<Machine[]> {
  return db.query.machines.findMany({
    where: eq(machines.isFeatured, true),
    limit,
    orderBy: [asc(machines.displayOrder)],
  });
}

// ================================
// Category with full data
// ================================

export type SubcategoryWithMachines = Subcategory & {
  machines: Machine[];
};

export type CategoryWithSubcategories = Category & {
  subcategories: SubcategoryWithMachines[];
};

export async function getCategoryWithMachines(
  slug: string
): Promise<CategoryWithSubcategories | null> {
  const category = await getCategoryBySlug(slug);
  if (!category) return null;

  const subs = await getSubcategoriesByCategoryId(category.id);
  const subcategoriesWithMachines: SubcategoryWithMachines[] = await Promise.all(
    subs.map(async (sub) => ({
      ...sub,
      machines: await getMachinesBySubcategoryId(sub.id),
    }))
  );

  return {
    ...category,
    subcategories: subcategoriesWithMachines,
  };
}

// ================================
// Testimonials
// ================================

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return db.query.testimonials.findMany({
    where: eq(testimonials.isFeatured, true),
    orderBy: [asc(testimonials.displayOrder)],
  });
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return db.query.testimonials.findMany({
    orderBy: [asc(testimonials.displayOrder)],
  });
}

// ================================
// Salespeople
// ================================

export async function getActiveSalespeople(): Promise<Salesperson[]> {
  return db.query.salespeople.findMany({
    where: eq(salespeople.isActive, true),
    orderBy: [asc(salespeople.displayOrder)],
  });
}

export async function getSalespersonBySlug(slug: string): Promise<Salesperson | undefined> {
  return db.query.salespeople.findFirst({
    where: eq(salespeople.slug, slug),
  });
}

// ================================
// Machine with Category (for detail pages)
// ================================

export type MachineWithCategory = Machine & {
  category: Category | null;
};

export async function getMachineWithCategory(
  slug: string
): Promise<MachineWithCategory | null> {
  const machine = await db.query.machines.findFirst({
    where: eq(machines.slug, slug),
    with: {
      category: true,
    },
  });

  if (!machine) return null;

  return machine as MachineWithCategory;
}

export async function getAllMachineSlugs(): Promise<string[]> {
  const allMachines = await db.query.machines.findMany({
    columns: { slug: true },
  });
  return allMachines.map((m) => m.slug);
}

export async function getRelatedMachines(
  categoryId: number,
  excludeSlug: string,
  limit = 3
): Promise<Machine[]> {
  const related = await db.query.machines.findMany({
    where: eq(machines.categoryId, categoryId),
    limit: limit + 1, // Get one extra in case we need to exclude current
    orderBy: [asc(machines.displayOrder)],
  });

  return related.filter((m) => m.slug !== excludeSlug).slice(0, limit);
}

// ================================
// Admin Stats
// ================================

export async function getAdminStats() {
  const [machineCount, categoryCount, salespersonCount, contactCount] = await Promise.all([
    db.query.machines.findMany({ columns: { id: true } }),
    db.query.categories.findMany({ columns: { id: true } }),
    db.query.salespeople.findMany({ columns: { id: true } }),
    db.query.contactSubmissions.findMany({ columns: { id: true } }),
  ]);

  return {
    machines: machineCount.length,
    categories: categoryCount.length,
    salespeople: salespersonCount.length,
    contacts: contactCount.length,
  };
}

// ================================
// All Machines (for admin)
// ================================

export type MachineWithCategoryName = Machine & {
  categoryName: string | null;
  subcategoryName: string | null;
};

export async function getAllMachinesForAdmin(): Promise<MachineWithCategoryName[]> {
  const allMachines = await db.query.machines.findMany({
    with: {
      category: { columns: { name: true } },
      subcategory: { columns: { name: true } },
    },
    orderBy: [asc(machines.modelNumber)],
  });

  return allMachines.map((m) => ({
    ...m,
    categoryName: m.category?.name || null,
    subcategoryName: m.subcategory?.name || null,
  }));
}

// ================================
// Contact Submissions (for admin)
// ================================

export async function getRecentContactSubmissions(limit = 10) {
  return db.query.contactSubmissions.findMany({
    limit,
    orderBy: (submissions, { desc }) => [desc(submissions.createdAt)],
  });
}

// ================================
// Blog Posts
// ================================

export async function getPublishedBlogPosts(limit?: number): Promise<BlogPost[]> {
  return db.query.blogPosts.findMany({
    where: and(
      eq(blogPosts.isPublished, true),
      eq(blogPosts.isWhatsNew, false)
    ),
    orderBy: [desc(blogPosts.publishedAt)],
    ...(limit && { limit }),
  });
}

export async function getWhatsNewPosts(limit?: number): Promise<BlogPost[]> {
  return db.query.blogPosts.findMany({
    where: and(
      eq(blogPosts.isPublished, true),
      eq(blogPosts.isWhatsNew, true)
    ),
    orderBy: [desc(blogPosts.publishedAt)],
    ...(limit && { limit }),
  });
}

export async function getAllPublishedPosts(limit?: number): Promise<BlogPost[]> {
  return db.query.blogPosts.findMany({
    where: eq(blogPosts.isPublished, true),
    orderBy: [desc(blogPosts.publishedAt)],
    ...(limit && { limit }),
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return db.query.blogPosts.findFirst({
    where: and(
      eq(blogPosts.slug, slug),
      eq(blogPosts.isPublished, true)
    ),
  });
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await db.query.blogPosts.findMany({
    where: eq(blogPosts.isPublished, true),
    columns: { slug: true },
  });
  return posts.map((p) => p.slug);
}

// ================================
// Admin: Contact Submissions
// ================================

export async function getAllContactSubmissions() {
  return db.query.contactSubmissions.findMany({
    orderBy: (submissions, { desc }) => [desc(submissions.createdAt)],
  });
}

export async function getContactSubmissionById(id: number) {
  return db.query.contactSubmissions.findFirst({
    where: eq(contactSubmissions.id, id),
  });
}

export async function deleteContactSubmission(id: number) {
  return db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
}

// ================================
// Admin: Blog Posts
// ================================

export async function getAllBlogPostsAdmin(): Promise<BlogPost[]> {
  return db.query.blogPosts.findMany({
    orderBy: [desc(blogPosts.createdAt)],
  });
}

export async function getBlogPostById(id: number): Promise<BlogPost | undefined> {
  return db.query.blogPosts.findFirst({
    where: eq(blogPosts.id, id),
  });
}

export async function createBlogPost(data: {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImageUrl?: string;
  author?: string;
  isPublished?: boolean;
  isWhatsNew?: boolean;
  publishedAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
}) {
  const result = await db.insert(blogPosts).values(data).returning();
  return result[0];
}

export async function updateBlogPost(
  id: number,
  data: Partial<{
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featuredImageUrl: string | null;
    author: string | null;
    isPublished: boolean;
    isWhatsNew: boolean;
    publishedAt: Date | null;
    metaTitle: string | null;
    metaDescription: string | null;
  }>
) {
  const result = await db
    .update(blogPosts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(blogPosts.id, id))
    .returning();
  return result[0];
}

export async function deleteBlogPost(id: number) {
  return db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// ================================
// Admin: Machines
// ================================

export async function getMachineById(id: number): Promise<Machine | undefined> {
  return db.query.machines.findFirst({
    where: eq(machines.id, id),
  });
}

export async function createMachine(data: {
  modelNumber: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  imageUrl?: string;
  specSheetUrl?: string;
  categoryId?: number;
  subcategoryId?: number;
  flavorCount?: string;
  machineType?: string;
  isAdaCompliant?: boolean;
  longDescription?: string;
  features?: string[];
  idealFor?: string[];
  isFeatured?: boolean;
  isInStock?: boolean;
  isDemoUnit?: boolean;
  demoDiscountPercent?: number;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  displayOrder?: number;
}) {
  const result = await db.insert(machines).values(data).returning();
  return result[0];
}

export async function updateMachine(
  id: number,
  data: Partial<{
    modelNumber: string;
    name: string;
    slug: string;
    description: string | null;
    shortDescription: string | null;
    imageUrl: string | null;
    specSheetUrl: string | null;
    categoryId: number | null;
    subcategoryId: number | null;
    flavorCount: string | null;
    machineType: string | null;
    isAdaCompliant: boolean;
    longDescription: string | null;
    features: string[] | null;
    idealFor: string[] | null;
    isFeatured: boolean;
    isInStock: boolean;
    isDemoUnit: boolean;
    demoDiscountPercent: number | null;
    metaTitle: string | null;
    metaDescription: string | null;
    focusKeyword: string | null;
    displayOrder: number;
  }>
) {
  const result = await db
    .update(machines)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(machines.id, id))
    .returning();
  return result[0];
}

export async function deleteMachine(id: number) {
  return db.delete(machines).where(eq(machines.id, id));
}

// ================================
// Admin: Salespeople
// ================================

export async function getAllSalespeople(): Promise<Salesperson[]> {
  return db.query.salespeople.findMany({
    orderBy: [asc(salespeople.displayOrder)],
  });
}

export async function getSalespersonById(id: number): Promise<Salesperson | undefined> {
  return db.query.salespeople.findFirst({
    where: eq(salespeople.id, id),
  });
}

export async function createSalesperson(data: {
  firstName: string;
  lastName: string;
  slug: string;
  email: string;
  phone?: string;
  headshotUrl?: string;
  bio?: string;
  bookingLink?: string;
  displayOrder?: number;
  isActive?: boolean;
}) {
  const result = await db.insert(salespeople).values(data).returning();
  return result[0];
}

export async function updateSalesperson(
  id: number,
  data: Partial<{
    firstName: string;
    lastName: string;
    slug: string;
    email: string;
    phone: string | null;
    headshotUrl: string | null;
    bio: string | null;
    bookingLink: string | null;
    displayOrder: number;
    isActive: boolean;
  }>
) {
  const result = await db
    .update(salespeople)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(salespeople.id, id))
    .returning();
  return result[0];
}

export async function deleteSalesperson(id: number) {
  return db.delete(salespeople).where(eq(salespeople.id, id));
}

// ================================
// Admin: Subcategories
// ================================

export async function getAllSubcategories() {
  return db.query.subcategories.findMany({
    with: {
      category: true,
    },
    orderBy: [asc(subcategories.displayOrder)],
  });
}

// ================================
// Admin: Categories
// ================================

export async function getCategoryById(id: number): Promise<Category | undefined> {
  return db.query.categories.findFirst({
    where: eq(categories.id, id),
  });
}

export type CategoryWithSubcategoriesAdmin = Category & {
  subcategories: Subcategory[];
  machineCount: number;
};

export async function getCategoriesWithSubcategories(): Promise<CategoryWithSubcategoriesAdmin[]> {
  const cats = await db.query.categories.findMany({
    with: {
      subcategories: {
        orderBy: [asc(subcategories.displayOrder)],
      },
    },
    orderBy: [asc(categories.displayOrder)],
  });

  // Get machine counts for each category
  const allMachines = await db.query.machines.findMany({
    columns: { categoryId: true },
  });

  return cats.map((cat) => ({
    ...cat,
    machineCount: allMachines.filter((m) => m.categoryId === cat.id).length,
  }));
}

export async function createCategory(data: {
  name: string;
  slug: string;
  description?: string;
  heroImageUrl?: string;
  profitCalculatorEnabled?: boolean;
  displayOrder?: number;
}) {
  const result = await db.insert(categories).values(data).returning();
  return result[0];
}

export async function updateCategory(
  id: number,
  data: Partial<{
    name: string;
    slug: string;
    description: string | null;
    heroImageUrl: string | null;
    profitCalculatorEnabled: boolean;
    displayOrder: number;
  }>
) {
  const result = await db
    .update(categories)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(categories.id, id))
    .returning();
  return result[0];
}

export async function deleteCategory(id: number) {
  // Note: This will cascade delete subcategories due to FK constraint
  return db.delete(categories).where(eq(categories.id, id));
}

// ================================
// Admin: Subcategory CRUD
// ================================

export async function getSubcategoryById(id: number): Promise<Subcategory | undefined> {
  return db.query.subcategories.findFirst({
    where: eq(subcategories.id, id),
  });
}

export async function createSubcategory(data: {
  categoryId: number;
  name: string;
  displayOrder?: number;
}) {
  const result = await db.insert(subcategories).values(data).returning();
  return result[0];
}

export async function updateSubcategory(
  id: number,
  data: Partial<{
    categoryId: number;
    name: string;
    displayOrder: number;
  }>
) {
  const result = await db
    .update(subcategories)
    .set(data)
    .where(eq(subcategories.id, id))
    .returning();
  return result[0];
}

export async function deleteSubcategory(id: number) {
  return db.delete(subcategories).where(eq(subcategories.id, id));
}

// ================================
// Site Settings
// ================================

export async function getAllSiteSettings(): Promise<Record<string, string>> {
  const settings = await db.query.siteSettings.findMany();
  return settings.reduce(
    (acc, s) => {
      if (s.value) acc[s.key] = s.value;
      return acc;
    },
    {} as Record<string, string>
  );
}

export async function getSiteSetting(key: string): Promise<string | null> {
  const setting = await db.query.siteSettings.findFirst({
    where: eq(siteSettings.key, key),
  });
  return setting?.value || null;
}

export async function setSiteSetting(key: string, value: string) {
  const existing = await db.query.siteSettings.findFirst({
    where: eq(siteSettings.key, key),
  });

  if (existing) {
    return db
      .update(siteSettings)
      .set({ value, updatedAt: new Date() })
      .where(eq(siteSettings.key, key))
      .returning();
  } else {
    return db.insert(siteSettings).values({ key, value }).returning();
  }
}

export async function setSiteSettings(settings: Record<string, string>) {
  const results = [];
  for (const [key, value] of Object.entries(settings)) {
    const result = await setSiteSetting(key, value);
    results.push(result);
  }
  return results;
}

// ================================
// Counties
// ================================

export async function getAllCounties(): Promise<County[]> {
  return db.query.counties.findMany({
    orderBy: [asc(counties.state), asc(counties.name)],
  });
}

export type CountyWithSalesperson = County & {
  salesperson: Salesperson | null;
};

export async function getCountiesWithSalespeople(): Promise<CountyWithSalesperson[]> {
  const result = await db.query.counties.findMany({
    with: {
      salesperson: true,
    },
    orderBy: [asc(counties.state), asc(counties.name)],
  });
  return result as CountyWithSalesperson[];
}

export async function getCountiesBySalesperson(salespersonId: number): Promise<County[]> {
  return db.query.counties.findMany({
    where: eq(counties.salespersonId, salespersonId),
    orderBy: [asc(counties.state), asc(counties.name)],
  });
}

export async function getUnassignedCounties(): Promise<County[]> {
  return db.query.counties.findMany({
    where: isNull(counties.salespersonId),
    orderBy: [asc(counties.state), asc(counties.name)],
  });
}

export async function getCountyById(id: number): Promise<County | undefined> {
  return db.query.counties.findFirst({
    where: eq(counties.id, id),
  });
}

export async function createCounty(data: {
  name: string;
  state: string;
  salespersonId?: number | null;
}) {
  const result = await db.insert(counties).values(data).returning();
  return result[0];
}

export async function updateCounty(
  id: number,
  data: Partial<{
    name: string;
    state: string;
    salespersonId: number | null;
  }>
) {
  const result = await db
    .update(counties)
    .set(data)
    .where(eq(counties.id, id))
    .returning();
  return result[0];
}

export async function deleteCounty(id: number) {
  return db.delete(counties).where(eq(counties.id, id));
}

export async function bulkAssignCounties(countyIds: number[], salespersonId: number | null) {
  const result = await db
    .update(counties)
    .set({ salespersonId })
    .where(inArray(counties.id, countyIds))
    .returning();
  return result;
}

export async function getTerritoriesBySalespersonSlug(slug: string): Promise<string[]> {
  const salesperson = await getSalespersonBySlug(slug);
  if (!salesperson) return [];

  const assignedCounties = await getCountiesBySalesperson(salesperson.id);
  return assignedCounties.map((c) => `${c.name}, ${c.state}`);
}

// ================================
// Navigation Items
// ================================

export async function getNavigationByLocation(location: string): Promise<NavigationItem[]> {
  return db.query.navigationItems.findMany({
    where: eq(navigationItems.menuLocation, location),
    orderBy: [asc(navigationItems.displayOrder)],
  });
}

export async function getAllNavigationItems(): Promise<NavigationItem[]> {
  return db.query.navigationItems.findMany({
    orderBy: [asc(navigationItems.menuLocation), asc(navigationItems.displayOrder)],
  });
}

export async function getNavigationItemById(id: number): Promise<NavigationItem | undefined> {
  return db.query.navigationItems.findFirst({
    where: eq(navigationItems.id, id),
  });
}

export async function createNavigationItem(data: {
  menuLocation: string;
  label: string;
  url: string;
  parentId?: number | null;
  displayOrder?: number;
  isExternal?: boolean;
}) {
  const result = await db.insert(navigationItems).values(data).returning();
  return result[0];
}

export async function updateNavigationItem(
  id: number,
  data: Partial<{
    menuLocation: string;
    label: string;
    url: string;
    parentId: number | null;
    displayOrder: number;
    isExternal: boolean;
  }>
) {
  const result = await db
    .update(navigationItems)
    .set(data)
    .where(eq(navigationItems.id, id))
    .returning();
  return result[0];
}

export async function deleteNavigationItem(id: number) {
  return db.delete(navigationItems).where(eq(navigationItems.id, id));
}

export async function reorderNavigationItems(items: { id: number; displayOrder: number }[]) {
  const results = [];
  for (const item of items) {
    const result = await db
      .update(navigationItems)
      .set({ displayOrder: item.displayOrder })
      .where(eq(navigationItems.id, item.id))
      .returning();
    results.push(result[0]);
  }
  return results;
}
