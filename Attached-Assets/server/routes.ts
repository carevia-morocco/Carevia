import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { caregivers, services } from "@shared/schema";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    await db.insert(services).values([
      {
        title: "24/7 Home Care",
        description: "Round-the-clock dedicated assistance and monitoring for your loved ones in the comfort of their home.",
        icon: "Home",
      },
      {
        title: "Medical Assistance",
        description: "Professional nursing care, medication management, and specialized health monitoring.",
        icon: "Stethoscope",
      },
      {
        title: "Companionship",
        description: "Engaging social interaction, daily activities, and emotional support to enhance quality of life.",
        icon: "HeartHandshake",
      },
      {
        title: "Mobility Support",
        description: "Assistance with walking, transfers, and physical therapy exercises.",
        icon: "Activity",
      }
    ]);
  }

  const existingCaregivers = await storage.getCaregivers();
  if (existingCaregivers.length === 0) {
    await db.insert(caregivers).values([
      {
        name: "Sarah Johnson",
        rating: "4.9",
        experience: "8 years",
        bio: "Registered nurse with extensive experience in elderly care and post-operative recovery. Passionate about providing dignified care.",
        skills: ["Nursing", "Medication Management", "Physical Therapy"],
        image: "https://images.unsplash.com/photo-1580409921563-3864c9ba6a14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        hourlyRate: 35
      },
      {
        name: "Michael Chen",
        rating: "4.8",
        experience: "5 years",
        bio: "Specialized in dementia and Alzheimer's care. Certified caregiver with a focus on creating engaging daily routines.",
        skills: ["Dementia Care", "Companionship", "Mobility Assistance"],
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        hourlyRate: 30
      },
      {
        name: "Elena Rodriguez",
        rating: "5.0",
        experience: "12 years",
        bio: "Senior care specialist with background in physical therapy. Excellent at developing custom mobility plans.",
        skills: ["Physical Therapy", "Post-op Care", "Nutrition"],
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        hourlyRate: 40
      }
    ]);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed the database
  seedDatabase().catch(console.error);
  
  app.get(api.caregivers.list.path, async (req, res) => {
    const data = await storage.getCaregivers();
    res.json(data);
  });

  app.get(api.caregivers.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const data = await storage.getCaregiver(id);
    if (!data) {
      return res.status(404).json({ message: "Caregiver not found" });
    }
    res.json(data);
  });

  app.get(api.services.list.path, async (req, res) => {
    const data = await storage.getServices();
    res.json(data);
  });

  app.post(api.bookings.create.path, async (req, res) => {
    try {
      const input = api.bookings.create.input.parse(req.body);
      const data = await storage.createBooking(input);
      res.status(201).json(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
