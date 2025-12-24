import { Request, Response, NextFunction } from "express";
import { UserInterfacePayload } from "../interfaces/userpayload.interface";
import jwt from 'jsonwebtoken'

const AuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, error: "No hay token proporcionado." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserInterfacePayload;

    req.user = decoded

    next();

  } catch (error) {
    console.log(error)
    return res.status(401).json({ success: false, error: 'Token inválido o expirado.' });
  }
}

export { AuthMiddleware }