import { NextFunction, Request, Response } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email?: string;
    };
  }
}
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    response.status(401).json({ error: "Token missing" });
    return;
  }

  const [, token] = authHeader.split(" ");
  try {
    const decoded = verify(token, process.env.JWT_SECRET || "secret") as {
      sub: string;
      email?: string;
    };

    request.user = { id: decoded.sub, email: decoded.email };
    return next();
  } catch {
    response.status(401).json({ success: false, message: "Invalid token" });
    return;
  }
}
