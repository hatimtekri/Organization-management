import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';
import { WorkShop } from 'src/app/AAAA_Models/Workshop-Model';
import { AuthService } from 'src/app/Services/auth.service';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { LoaderService } from '../../Services/loader.service';
import { ToastrService } from 'ngx-toastr';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  public profileData = new FacultyProfile();
  public domacileDD = new Array<DropDownData>();
  public mafsuyatDD = new Array<DropDownData>();
  public housestatusDD = new Array<DropDownData>();

  public houseType = new Array<DropDownData>();
  public houseArea = new Array<DropDownData>();
  public countryCode = new Array<DropDownData>();
  public mz_idaraDD = new Array<DropDownData>();
  public housestatuspDD = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' },
  ];

  edit: boolean = false;
  itsId: any;
  id: any;
  constructor(
    private titleService: Title,
    private toastr: ToastrService,
    private _router: Router,
    private route: ActivatedRoute,
    private _profileService: FacultyProfileService,
    private _authService: AuthService,
    private _loader: LoaderService
  ) {
    // this.titleService.setTitle("MZ Personal Info");
  }

  ngOnInit(): void {
    const id1 = this.route.snapshot.paramMap.get('id');

    this.id = id1 ?? '0';

    this.edit = false;

    // this.itsId=this._profileService.getITSIDData();
    this.itsId = this.id;
    this._profileService.setITSIDData(this.itsId);
    this._profileService.setITSIDData(this.itsId);
    if (this.itsId == 0) {
      this._router.navigate(['/admin/hr-master']);
    } else {
      this._loader.callLoaderMethod('show');
      this._profileService.getfacultyProfileData(this.itsId).subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');
          this.profileData = x.student;
          this._profileService.setProfileData(x.student);
          this.titleService.setTitle(this.profileData.fullName??"");
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        },
      });
    }

    // $(function () {
    //   $('[data-toggle="popover"]').popover({ trigger: "hover" })
    // })

    // //this.toastr.success('Hello world!', 'Toastr fun!');
    // // localStorage.setItem('count','1');

    // if (localStorage.getItem('count') == '1') {
    //   localStorage.removeItem('count');
    //   localStorage.setItem('count', '2');
    //   window.location.reload();
    // }

    // this.profileData = this._profileService.getProfileData();

    this._profileService.getDropdownData(48).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mz_idaraDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mafsuyatDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(3).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.housestatusDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(13).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.domacileDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(42).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.houseType = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(43).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.houseArea = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(44).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.countryCode = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
  }

  submitdata() {
    this._loader.callLoaderMethod('show');

    this._profileService.submitFacultyProfile(this.profileData).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        // swal('Successfull!', 'You have successfully submitted the data', 'success');
        console.log('Saved');
        try {
          this.toastr.success('Saved successfully', '');
        } catch (e) {
          console.error(e);
        }

        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  updateFromIts(itsId: any) {
    this._loader.callLoaderMethod('show');

    this._profileService.fetchDataFromIts(new WorkShop(), itsId).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        //swal('Successfull!', 'You have successfully Updated the data', 'success');

        //this.toastr.success('Successfully updated', '');
        this.ngOnInit();
        //window.setTimeout(function () { location.reload() }, 500);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
}
