import { Request, Response, NextFunction } from "express";
import { User } from "../model/user.model";


const CheckRoleMiddleware = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, error: 'No autenticado' });
      }

      const user = await User.findById(req.user.id).select('role');

      if (!user) {
        return res.status(401).json({ success: false, error: 'Usuario no encontrado' });
      }

      if (user.role !== role) {
        return res.status(403).json({ success: false, error: 'Acceso denegado' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  };
};


export { CheckRoleMiddleware }