import { ICategory } from "./category";

export interface CategoryType {
  _id: string;
  name: string;
  category: ICategory;
  createdAt: Date;
  updatedAt: Date;
}
