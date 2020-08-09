import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "searchFilter" })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @param {string} categoryId
   * @returns {any[]}
   */
  transform(items: any[], searchText: string): any[] {
    console.log(searchText);
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLocaleLowerCase();

    return items.filter((it) => {
      return (
        it["name"].toLocaleLowerCase().includes(searchText) ||
        it["slug"].toLocaleLowerCase().includes(searchText)
      );
    });
  }
}
