import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    //console.log('Items ' + JSON.stringify(items));
   // console.log('Search ' + searchText);

    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter((it) => {
      //var c = 0;
      for (let k of Object.keys(it)) {
      //  console.log('key ' + k);
      //  console.log('value ' + it[k]);

        if (
          (it[k] == null ? '' : it[k])
            .toString()
            .toLowerCase()
            .includes(searchText)
        ) {
          return (it[k] == null ? '' : it[k])
            .toString()
            .toLowerCase()
            .includes(searchText);
        } else {
          continue;
        }
      }
    });
  }
}
