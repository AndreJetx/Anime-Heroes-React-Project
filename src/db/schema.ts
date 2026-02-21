import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export var siteSettings = pgTable("site_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  downloadLink: text("download_link").notNull().default(""),
  downloadVersion: text("download_version").notNull().default(""),
});

export var carouselSlide = pgTable("carousel_slide", {
  id: uuid("id").primaryKey().defaultRandom(),
  sortOrder: integer("sort_order").notNull().default(0),
  imageUrl: text("image_url").notNull(),
});

export var unlockableCharacter = pgTable("unlockable_character", {
  id: uuid("id").primaryKey().defaultRandom(),
  animeName: text("anime_name").notNull(),
  animeImageUrl: text("anime_image_url"),
  characterName: text("character_name").notNull(),
  gameMode: text("game_mode").notNull(),
  usedCharacter: text("used_character").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export var siteUpdate = pgTable("site_update", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type CarouselSlide = typeof carouselSlide.$inferSelect;
export type UnlockableCharacter = typeof unlockableCharacter.$inferSelect;
export type SiteUpdate = typeof siteUpdate.$inferSelect;
export type NewSiteUpdate = typeof siteUpdate.$inferInsert;
