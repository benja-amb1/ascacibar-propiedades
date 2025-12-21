import { z } from 'zod';

const PropertySchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  description: z.string().min(1, 'La descripción es obligatoria'),

  category: z.enum(['Casa', 'Departamento']),
  listingType: z.enum(['Venta', 'Alquiler']),

  price: z.number().positive('El precio debe ser mayor a 0'),
  baths: z.number().int().nonnegative(),
  rooms: z.number().int().nonnegative(),

  address: z.string().min(1),
  area: z.string().min(1),

  image: z.array(z.string()).optional(),
});

const PropertyValidator = PropertySchema;
const PropertyValidatorPartial = PropertySchema.partial();

export { PropertyValidator, PropertyValidatorPartial };
