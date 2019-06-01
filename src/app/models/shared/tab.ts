export class AppTab {
    constructor(
        public name: string,
        public tabs: Tab[]
    ) {}
}


export class Tab {
    constructor(
        public index: number,
        public title: string,
        public active: boolean,
        public tag: any
    ) {}

}
