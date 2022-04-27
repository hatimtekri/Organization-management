import { Pipe, PipeTransform } from '@angular/core';
import { filterAndSortArray } from 'multiple-array-filter';

@Pipe({
  name: 'multiSearchIncome'
})
export class MultiSearchIncomePipe implements PipeTransform {

  public itemsnew = new Array<any>();
  public itemsnew1 = new Array<any>();
  public filters = new Array<any>();

  transform(items: any[], searchObject: any, filterMetadata: any): any[] {
    if (!items) return [];
    if (!searchObject) return items;
    this.itemsnew = items;

    for (let k of Object.keys(searchObject)) {
      if (searchObject[k] != undefined) {
        if (searchObject[k].length != 0) {
          let a = [];
          for (let i = 0; i < searchObject[k].length; i++) {
            if (searchObject[k][i] != undefined) {
              a.push(searchObject[k][i]);
            }
          }
          if (a.length != 0) {
            this.filters = new Array<any>();

            this.filters.push({ field: k, search: a });

            this.itemsnew = filterAndSortArray(
              this.itemsnew,
              this.filters,
              'id'
            );
          }
        }
      }
    }

    filterMetadata.count = this.itemsnew.length;
    filterMetadata.data=this.itemsnew;
    console.log('count1 -' + this.itemsnew.length);
    console.log('count2 -' + filterMetadata.count);

    const data = {
      count: filterMetadata.count,
      items: this.itemsnew,
    };



    return this.itemsnew;
  }

}
