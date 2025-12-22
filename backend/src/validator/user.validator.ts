import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres.").max(30, "El nombre debe tener maximo 30 caracteres."),
  surname: z.string().min(4, "El apellido debe tener al menos 4 caracteres.").max(30, "El apellido debe tener maximo 30 caracteres."),
  role: z.enum(["admin", "user"]).default('user'),
  email: z.email().toLowerCase(),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres.")
})

const UserValidator = UserSchema;
const UserValidatorPartial = UserSchema.partial();

export { UserValidator, UserValidatorPartial }