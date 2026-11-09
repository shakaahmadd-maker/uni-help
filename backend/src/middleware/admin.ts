import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";

/**
 * Middleware ensuring the authenticated user has ADMIN or SUPER_ADMIN role.
 * Rejects normal non-admin users with 403 Forbidden.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Authentication required" },
    });
  }

  const role = req.user.role;
  const isAdmin =
    role === Role.ADMIN ||
    role === Role.SUPER_ADMIN ||
    (role as string) === "ADMIN" ||
    (role as string) === "SUPER_ADMIN";

  if (!isAdmin) {
    return res.status(403).json({
      success: false,
      error: {
        code: "FORBIDDEN",
        message: "Access denied: Administrator privileges required",
      },
    });
  }

  next();
}
