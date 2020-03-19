export interface ICategory {
  _id: string;
  name: string;
}

export interface OrderedCategory {
  _id: string;
  name: string;
  selected?: boolean;
}
