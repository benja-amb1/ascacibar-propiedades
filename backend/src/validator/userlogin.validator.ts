import { z } from 'zod';

const UserLoginSchema = z.object({
  email: z.email(),
  password: z.string()
});

const UserLoginValidator = UserLoginSchema

export { UserLoginValidator }