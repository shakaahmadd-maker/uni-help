import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Request validation failed",
          details: result.error.errors.map((e: any) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
      });
    }
    req.body = result.data;
    next();
  };
}

export const submissionCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Valid email required").max(128),
  phone: z.string().max(30).optional().default(""),
  city: z.string().max(100).optional().default(""),
  service: z.string().max(120).optional().default("General Academic Query"),
  message: z.string().max(3000).optional().default(""),
  status: z.enum(["NEW", "CONTACTED", "RESOLVED", "DELETED"]).optional().default("NEW"),
});

export const submissionUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().max(128).optional(),
  phone: z.string().max(30).optional(),
  city: z.string().max(100).optional(),
  service: z.string().max(120).optional(),
  message: z.string().max(3000).optional(),
  status: z.enum(["NEW", "CONTACTED", "RESOLVED", "DELETED"]).optional(),
  notes: z.string().max(5000).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerAdminSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().max(100).optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "ADMISSIONS_COACH", "VISA_SPECIALIST", "OPERATIONS_LEAD", "COUNSELOR"]).optional().default("ADMIN"),
});

export const storySchema = z.object({
  name: z.string().min(2).max(100),
  maskedName: z.string().max(50).optional(),
  city: z.string().min(2).max(100),
  stream: z.string().min(2).max(150),
  review: z.string().min(10).max(3000),
  rating: z.number().int().min(1).max(5).default(5),
  clientPic: z.string().max(2000).optional().default(""),
  visaStamp: z.string().max(2000).optional().default(""),
  stampId: z.string().max(100).optional().default(""),
  visaGrantDate: z.string().max(100).optional().default(""),
  isPublished: z.boolean().optional().default(true),
  displayOrder: z.number().int().optional().default(0),
});
