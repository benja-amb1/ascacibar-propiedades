interface PropertyInterface {
  title: string;
  description: string;
  category: "Casa" | "Departamento";
  listingType: "Venta" | "Alquiler";
  price: number;
  baths: number;
  rooms: number;
  address: string;
  area: string;
  image?: string[];
}

export { PropertyInterface }