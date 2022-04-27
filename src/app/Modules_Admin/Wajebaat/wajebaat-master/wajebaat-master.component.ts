import { Component, OnInit } from '@angular/core';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { LoaderService } from '../../Services/loader.service';
declare var swal: any;

@Component({
  selector: 'app-wajebaat-master',
  templateUrl: './wajebaat-master.component.html',
  styleUrls: ['./wajebaat-master.component.scss']
})
export class WajebaatMasterComponent implements OnInit {
  onOffModule: any;

  constructor(private _profileService: FacultyProfileService, private _loader: LoaderService,) { }

  ngOnInit(): void {
    this._profileService.getModuleStatus(4).subscribe({
      next: (x) => {

        this.onOffModule = x;

        
      },
      error: (err) => {
        
      },
    });
  }

  changeModuleStatus() {
    
    // var r = confirm("Are you sure you want to Active/Deactive Wajebaat Niyyat Entry Module?");
    // if (r == false) {
    //   return;
    //}
    let a = {};
    this._loader.callLoaderMethod('show');

    this._profileService.changeModuleStatus(a, 4).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.ngOnInit();

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        console.log('Error');
      },
    });
  }

}
