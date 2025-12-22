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

  static getProperty = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: 'El ID de la propiedad es inválido.' });
      }

      const property = await Property.findById(id);

      if (!property) {
        return res.status(404).json({ success: false, error: 'Error al obtener la propiedad.' });
      }

      return res.status(200).json({ success: true, data: property })

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

      const validatedData = PropertyValidator.safeParse({
        ...req.body,
        price: Number(req.body.price),
        baths: Number(req.body.baths),
        rooms: Number(req.body.rooms),
        image: images,
      });

      if (!validatedData.success) {
        return res.status(400).json({ success: false, error: validatedData.error.flatten().fieldErrors })
      }

      const property = new Property(validatedData.data)

      await property.save();

      return res.status(201).json({ success: true, message: 'Propiedad creada correctamente', data: property });

    } catch (error) {
      const e = error as Error
      console.log(error)
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  static deleteProperty = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "El ID de la propiedad es inválido." });
      }

      const property = await Property.findByIdAndDelete(id);

      if (!property) {
        return res.status(404).json({ success: false, error: "Propiedad no encontrada." });
      }

      if (property.image?.length) {
        for (const imagePath of property.image) {
          try {
            fs.unlinkSync(path.resolve(imagePath));
          } catch (err) {
            console.warn(`No se pudo eliminar la imagen: ${imagePath}`, err);
          }
        }
      }

      return res.status(200).json({
        success: true,
        message: "Propiedad eliminada correctamente",
        data: property,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Error interno del servidor" });
    }
  };

  static updateProperty = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const files = req.files as Express.Multer.File[] | undefined;
      const newImages = files?.map(file => file.path) ?? [];

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "El ID de la propiedad es inválido." });
      }

      const property = await Property.findById(id);

      if (!property) {
        return res.status(404).json({ success: false, error: "Propiedad no encontrada." });
      }

      const validation = PropertyValidatorPartial.safeParse({
        ...req.body,
        price: req.body.price ? Number(req.body.price) : undefined,
        baths: req.body.baths ? Number(req.body.baths) : undefined,
        rooms: req.body.rooms ? Number(req.body.rooms) : undefined,
        image: newImages.length ? newImages : property.image,
      });

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          errors: validation.error.flatten().fieldErrors,
        });
      }

      const updatedProperty = await Property.findByIdAndUpdate(
        id,
        validation.data,
        { new: true }
      );

      if (newImages.length && property.image?.length) {
        for (const oldImg of property.image) {
          try {
            fs.unlinkSync(path.resolve(oldImg));
          } catch (err) {
            console.warn(`No se pudo eliminar la imagen: ${oldImg}`, err);
          }
        }
      }

      return res.status(200).json({
        success: true,
        message: "Propiedad actualizada correctamente",
        data: updatedProperty,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Error interno del servidor" });
    }
  };
}


export { PropertyController }