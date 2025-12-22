import { PropertiesFilter } from "../interfaces/filterproperties.interface";
import { Property } from "../model/property.model";
import { Request, Response } from "express";
import { PropertyValidator, PropertyValidatorPartial } from "../validator/property.validator";
import mongoose from "mongoose";
import fs from 'node:fs';
import path from "node:path";

class PropertyController {
  static getProperties = async (req: Request, res: Response): Promise<Response | void> => {

    try {
      const { title, category, listingType, minPrice, maxPrice, baths, rooms } = req.query;

      const filter: PropertiesFilter = {};

      if (title) filter.title = new RegExp(String(title), 'i')
      if (category) filter.category = new RegExp(String(category), 'i')
      if (listingType) filter.listingType = new RegExp(String(listingType), 'i')
      if (baths) filter.baths = Number(baths);
      if (rooms) filter.rooms = Number(rooms);
      if (minPrice || maxPrice) {
        filter.price = {};

        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }

      const properties = await Property.find(filter);

      return res.status(200).json({ success: true, data: properties })
    } catch (error) {
      const e = error as Error
      console.log(error)
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  static addProperty = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const files = req.files as Express.Multer.File[] | undefined;

      const images = files?.map(file => file.path);

      const validatedData = PropertyValidator.parse({
        ...req.body,
        price: Number(req.body.price),
        baths: Number(req.body.baths),
        rooms: Number(req.body.rooms),
        image: images,
      });

      const property = new Property(validatedData)

      await property.save();

      return res.status(201).json({ success: true, message: 'Propiedad creada correctamente', data: property });

    } catch (error) {
      const e = error as Error
      console.log(error)
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  static deleteProperty = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ success: false, error: 'El ID de la propiedad es inválido.' });
      }

      const property = await Property.findByIdAndDelete(id);

      if (!property) {
        return res.json({ success: false, error: 'Error al eliminar la propiedad.' });
      }

      if (property.image && property.image.length > 0) {
        for (const imagePath of property.image) {
          try {
            fs.unlinkSync(path.resolve(imagePath))
          } catch (error) {
            console.log(`Error al eliminar las imagenes ${imagePath}`, error);
          }
        }
      }

      return res.json({ success: true, message: 'Propiedad eliminada correctamente.', data: property });
    } catch (error) {
      const e = error as Error
      console.log(error)
      return res.status(500).json({ success: false, error: e.message });
    }

  }

  static updateProperty = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const images = req.files as Express.Multer.File[] || [];

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ success: false, error: 'El ID de la propiedad es inválido.' });
      }



      const property = await Property.findById(id);

      if (!property) {
        return res.json({ success: false, error: 'Error al editar la propiedad.' });
      }

      if (property.image && property.image.length > 0) {

        for (const oldImg of property.image) {
          try {
            fs.unlinkSync(path.join(oldImg))
          } catch (error) {
            console.log(`Error al editar las imagenes ${oldImg}`, error);
          }
        }
      }

      const imagesPath = images.map(img => img.path);

      const validator = PropertyValidatorPartial.parse({
        ...req.body,
        price: Number(req.body.price),
        baths: Number(req.body.baths),
        rooms: Number(req.body.rooms),
        image: imagesPath
      })

      const updatedProperty = await Property.findByIdAndUpdate(id, validator, { new: true });

      if (!updatedProperty) {
        return res.json({ success: false, error: 'Error el editar la propiedad.' })
      }

      return res.status(200).json({ success: true, message: 'Propiedad editatada correctamente.', data: updatedProperty })

    } catch (error) {
      const e = error as Error
      console.log(error)
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}

export { PropertyController }