export interface IAppTab {
  name: string;
  tabs: ITab[];
}

export interface ITab {
  index: number;
  title: string;
  active: boolean;
  tag: string;
}

export interface IUpdateTab {
  name: string;
  tabIndex: number;
}
