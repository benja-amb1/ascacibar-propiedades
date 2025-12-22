import { User } from "../model/user.model";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserValidator } from "../validator/user.validator";

class UserController {
  static addUser = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { name, surname, email, role, password } = req.body;

      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return res.status(404).json({ success: false, error: "El email ya existe. Por favor intente con otro email." });
      }

      const hashed = await bcrypt.hash(password, 10);

      const validator = UserValidator.safeParse({ name, surname, email, role, password: hashed });

      if (!validator.success) {
        return res.status(400).json({ success: false, error: validator.error.flatten().fieldErrors });
      }

      return res.status(201).json({ success: true, message: 'El registro ha sido exitoso.', data: validator.data })

    } catch (error) {
      const e = error as Error
      console.log(error)
      return res.status(500).json({ success: false, error: e.message });
    }



  }
}