import { pgTable, uuid, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const siteSettings = pgTable("site_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  downloadLink: text("download_link").notNull().default(""),
  downloadVersion: text("download_version").notNull().default(""),
  trailerUrl: text("trailer_url").notNull().default(""),
  tournamentTitle: text("tournament_title").notNull().default(""),
  tournamentStartsAt: timestamp("tournament_starts_at", { withTimezone: true }),
});

export const carouselSlide = pgTable("carousel_slide", {
  id: uuid("id").primaryKey().defaultRandom(),
  sortOrder: integer("sort_order").notNull().default(0),
  imageUrl: text("image_url").notNull(),
});

export const unlockableCharacter = pgTable("unlockable_character", {
  id: uuid("id").primaryKey().defaultRandom(),
  animeName: text("anime_name").notNull(),
  animeImageUrl: text("anime_image_url"),
  characterName: text("character_name").notNull(),
  gameMode: text("game_mode").notNull(),
  usedCharacter: text("used_character").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const siteUpdate = pgTable("site_update", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const landingGameMode = pgTable("landing_game_mode", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  playersLabel: text("players_label").notNull().default(""),
  icon: text("icon").notNull().default("swords"),
  isHighlight: boolean("is_highlight").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type CarouselSlide = typeof carouselSlide.$inferSelect;
export type UnlockableCharacter = typeof unlockableCharacter.$inferSelect;
export type SiteUpdate = typeof siteUpdate.$inferSelect;
export type NewSiteUpdate = typeof siteUpdate.$inferInsert;
export type LandingGameMode = typeof landingGameMode.$inferSelect;
export type NewLandingGameMode = typeof landingGameMode.$inferInsert;
