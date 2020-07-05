import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "userFilter" })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @param {string} categoryId
   * @returns {any[]}
   */
  transform(items: any[], searchText: string, category: string): any[] {
    console.log("search text", searchText);
    console.log("search category", category);
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it) => {
      var found =
        it["displayName"].toLocaleLowerCase().includes(searchText) ||
        it["aliasName"].toLocaleLowerCase().includes(searchText) ||
        it["categoryTypes"].includes(category);
      console.log(found);
      // return (
      //   it["displayName"].toLocaleLowerCase().includes(searchText) ||
      //   it["aliasName"].toLocaleLowerCase().includes(searchText)
      // );
      // it.categoryTypes["category"].includes(category)
    });
  }
}
