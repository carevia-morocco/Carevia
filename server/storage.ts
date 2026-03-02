import { db } from "./db";
import {
  caregivers,
  services,
  bookings,
  type Caregiver,
  type InsertCaregiver,
  type Service,
  type InsertService,
  type Booking,
  type InsertBooking
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getCaregivers(): Promise<Caregiver[]>;
  getCaregiver(id: number): Promise<Caregiver | undefined>;
  getServices(): Promise<Service[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class DatabaseStorage implements IStorage {
  async getCaregivers(): Promise<Caregiver[]> {
    return await db.select().from(caregivers);
  }

  async getCaregiver(id: number): Promise<Caregiver | undefined> {
    const [caregiver] = await db.select().from(caregivers).where(eq(caregivers.id, id));
    return caregiver;
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }
}

export const storage = new DatabaseStorage();
