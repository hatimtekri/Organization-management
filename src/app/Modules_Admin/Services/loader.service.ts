import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  public LoaderCallSource=new Subject<any>();

  getLoaderObservables()
  {
    return this.LoaderCallSource.asObservable();
  }

  callLoaderMethod(type:string) {
    this.LoaderCallSource.next(type);
  }
}
