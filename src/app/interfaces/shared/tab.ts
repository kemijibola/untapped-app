export interface IAppTab {
  id: string;
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
