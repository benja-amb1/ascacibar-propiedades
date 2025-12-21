import { PropertiesFilter } from "../interfaces/filterproperties.interface";
import { Property } from "../model/property.model";
import { Request, Response } from "express";
import { PropertyValidator } from "../validator/property.validator";

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

      return res.status(201).json({ success: true, message: 'Propiedad creada correctamente', data: validatedData });

    } catch (error) {
      const e = error as Error
      console.log(error)
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}

export { PropertyController }