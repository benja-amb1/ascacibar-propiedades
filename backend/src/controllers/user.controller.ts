import { User } from "../model/user.model";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserValidator, UserValidatorPartial } from "../validator/user.validator";
import mongoose from "mongoose";

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

  static updateUser = async (req: Request, res: Response): Promise<Response | void> => {

    try {
      const { id } = req.params;
      const { name, surname, email, role, password } = req.body;


      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: 'El ID proporcionado es inválido.' })
      }

      if (req.user?._id !== id) {
        return res.status(401).json({ success: false, error: 'No tienes permiso para realizar esta acción.' })
      }

      const emailExists = await User.findOne({ email, _id: { $ne: id } });

      if (emailExists) {
        return res.status(400).json({ success: false, error: 'El email proporcionado ya existe. Por favor intente con uno nuevo.' })
      }

      const hashed = await bcrypt.hash(password, 10);

      const validator = UserValidatorPartial.safeParse({ name, surname, email, role, password: hashed })

      if (!validator.success) {
        return res.status(400).json({ success: false, error: validator.error.flatten().fieldErrors });
      }

      const updatedUser = await User.findByIdAndUpdate(id, validator.data, { new: true });

      if (!updatedUser) {
        return res.status(400).json({ success: false, error: 'Error al editar el usuario.' })
      }

      return res.status(200).json({ success: true, message: 'Usuario editado correctamente.', data: updatedUser })
    } catch (error) {
      const e = error as Error
      console.log(error)
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  static deleteUser = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: 'El ID proporcionado es inválido.' })
      }

      if (req.user?._id !== id) {
        return res.status(401).json({ success: false, error: 'No tienes permiso para realizar esta acción.' })
      }

      const userDeleted = await User.findByIdAndDelete(id);

      if (!userDeleted) {
        return res.status(400).json({ success: false, error: 'Error al eliminar el usuario.' });
      }

      return res.status(200).json({ success: true, message: 'Usuario eliminado correctamente.' })

    } catch (error) {
      const e = error as Error
      console.log(error)
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  static login = async (req: Request, res: Response): Promise<Response | void> => {

  }

  static logout = async (req: Request, res: Response): Promise<Response | void> => {

  }

  static getSession = async (req: Request, res: Response): Promise<Response | void> => {

  }

}

export { UserController }