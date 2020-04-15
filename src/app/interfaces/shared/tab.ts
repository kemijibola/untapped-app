export interface IAppTab {
  id: string;
  divClass: string;
  navClass: string;
  tabs: ITab[];
}

export interface ITab {
  index: number;
  title: string;
  active: boolean;
  tag: string;
}

export interface IUpdateTab {
  appTabId: string;
  tab: IAppTab;
}
