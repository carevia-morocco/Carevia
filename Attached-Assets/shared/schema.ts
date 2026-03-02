import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const caregivers = pgTable("caregivers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  rating: text("rating").notNull(),
  experience: text("experience").notNull(),
  bio: text("bio").notNull(),
  skills: text("skills").array().notNull(),
  image: text("image").notNull(),
  hourlyRate: integer("hourly_rate").notNull(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientPhone: text("client_phone").notNull(),
  clientEmail: text("client_email").notNull(),
  date: text("date").notNull(),
  time: text("time").array().notNull(), // array of selected times
  caregiverId: integer("caregiver_id").notNull(),
  paymentMethod: text("payment_method").notNull(), // 'cash' | 'credit_card'
  status: text("status").notNull().default("pending"),
});

export const insertCaregiverSchema = createInsertSchema(caregivers).omit({ id: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, status: true });

export type Caregiver = typeof caregivers.$inferSelect;
export type InsertCaregiver = z.infer<typeof insertCaregiverSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
