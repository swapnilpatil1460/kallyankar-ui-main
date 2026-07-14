import { Contact } from "lucide-react";
import { z } from "zod";

const email = z
  .string({
    required_error: "Username is required",
  })
  .min(5)
  .endsWith("com");
export const LoginSchema = z.object({
  email,
  password: z.string({ required_error: "Password is required" }).trim().min(5),
});

export const CustomerSchema = z.object({
  name: z.string().trim().min(3),
  last_name: z.string().trim().min(3),
  address: z.string().trim().min(3),
  email: z.string().optional(),
  contact: z.string().trim().min(10).max(10),
  gst_number: z.string().trim().optional().default("-"),
});

export const ProductSchema = z.object({
  name: z.string().trim().min(3),
  price: z.string().min(3),
  serial_number: z.string().trim().min(3),
  type: z.string().trim().min(3),
  GST: z.string().trim(),
  vehicle_name: z.string().trim().optional().default("-"),
  vehicle_number: z.string().trim().optional().default("-"),
});

export const StockSchema = z.object({
  battery_name: z.string().trim().min(2),
  product_code: z.string().trim().min(3),
  amphere_size: z.string().trim().min(3),
  available: z.string().trim().optional(),
});

export const UserSchema = z.object({
  name: z.string().trim().min(3),
  last_name: z.string().trim().min(3),
  role: z.string().trim().min(2),
  password: z.string().min(6).max(12),
  email,
});
