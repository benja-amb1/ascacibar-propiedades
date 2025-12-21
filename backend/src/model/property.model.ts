import { Schema, Model, model } from 'mongoose';
import { PropertyInterface } from '../interfaces/property.interface';

const PropertySchema = new Schema<PropertyInterface>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ["Casa", "Departamento"], required: true },
  listingType: { type: String, enum: ["Venta", "Alquiler"], required: true },
  price: { type: Number, required: true },
  baths: { type: Number, required: true },
  rooms: { type: Number, required: true },
  address: { type: String, required: true },
  area: { type: String, required: true },
  image: { type: [String] }
}, { timestamps: true, versionKey: false })

const Property: Model<PropertyInterface> = model('Property', PropertySchema)

export { Property }