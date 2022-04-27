import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';
import { wafd_mahadpast_mawaze } from 'src/app/AAAA_Models/Wafd_MahadPast_Mawaze-Model';
import { wafd_otheridara_mawaze } from 'src/app/AAAA_Models/Wafd_OtherIdara_Mawaze-Model';
import { FacultyMawazeService } from '../../Services/faculty-mawaze.service';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { LoaderService } from '../../Services/loader.service';
declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-khidmat-details',
  templateUrl: './khidmat-details.component.html',
  styleUrls: ['./khidmat-details.component.scss']
})
export class KhidmatDetailsComponent implements OnInit {

  edit: boolean = false;
  public hijriYearDD = new Array<DropDownData>();
  public khidmatnatureDD = new Array<DropDownData>();
  public mawazeDD = new Array<DropDownData>();
  public mawaze2DD = new Array<DropDownData>();
  public moze2DD = new Array<any>();
  public programDD = new Array<DropDownData>();
  public profileData = new FacultyProfile();
  public otherIdaraMData = new wafd_otheridara_mawaze();
  public otherIdaraMawazeList = new Array<wafd_otheridara_mawaze>();
  public mahadPastMData = new wafd_mahadpast_mawaze();
  public workTypeDD = new Array<DropDownData>();
  public mahadPastMawazeList = new Array<wafd_mahadpast_mawaze>();
  public mainDepartmentDD = new Array<DropDownData>();
  public itsId2:any;
  itsId3:any;
  id: any;
  constructor(
    private titleService: Title,
    private _loader: LoaderService,
    private _profileService: FacultyProfileService,
    private _wafdMawazeService: FacultyMawazeService,
    private _router: Router,
    private toastr:ToastrService,
    private route: ActivatedRoute
  ) {
    
  }
  ngOnInit(): void {

    const id1 = this.route.snapshot.paramMap.get('id');

    this.id = id1 ?? '0';

    this.edit = false;

    // this.itsId=this._profileService.getITSIDData();
    this.itsId2 = this.id;
    this._profileService.setITSIDData(this.itsId2);
    this.itsId3=this._profileService.getITSIDData3();

    $(function () {
      $('[data-toggle="popover"]').popover({ trigger: "hover" })
    })

    if(this.itsId2 == 0)
    {
     this._router.navigate(['/admin/hr-master']);
    }
    else
    {

      this._loader.callLoaderMethod('show');
      this._profileService.getfacultyProfileData(this.itsId2).subscribe({
        next: x => {
          this._loader.callLoaderMethod('hide');
          this.profileData = x.student;
          this._profileService.setProfileData(x.student);
          this.titleService.setTitle(this.profileData.fullName??"");
        },
        error: err => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        }
      });

    }


    this._profileService.getMozeDD(this.itsId3).subscribe({
      next: x => {
        this._loader.callLoaderMethod('hide');
        this.moze2DD = x;
      },
      error: err => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      }
    });


    this._wafdMawazeService.getOtherIdaraMawazeDetails(this.itsId2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.otherIdaraMawazeList = x;

        this.otherIdaraMawazeList.sort(function(a, b){return (b.fromYear??0)-(a.fromYear??0)});
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
    this._wafdMawazeService.getMahadPastMawazeDetails(this.itsId2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mahadPastMawazeList = x;
        this.mahadPastMawazeList.sort(function(a, b){return (b.fromYear??0)-(a.fromYear??0)});
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    //DropDown Data
    this._profileService.getDropdownData(2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.hijriYearDD = x.data;

        this.hijriYearDD.sort(function(a, b){return parseInt(b.name ?? '0')-parseInt(a.name ?? '0')});

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getWorkTypeDropdown(this.itsId2).subscribe({
      next: (x) => {
        this.workTypeDD = x;
      },
      error: (err) => { },
    });

    
    this._profileService.getDropdownData(17).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.khidmatnatureDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(18).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.programDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(19).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mawaze2DD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(13).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mawazeDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getMozeDD(this.itsId3).subscribe({
      next: x => {
        
        this.mainDepartmentDD = x;
      },
      error: err => {
        
        swal('Error!', err.error.message, 'error');
      }
    });

  }

  AddOtherIdaraM(){
    if (
      this.otherIdaraMData.fromYear === null ||
      this.otherIdaraMData.fromYear === undefined
    ) {
      alert('please enter from year !');
      return;
    }
    if (
      this.otherIdaraMData.toYear === null ||
      this.otherIdaraMData.toYear === undefined
    ) {
      alert('please enter to year !');
      return;
    }
    if (
      this.otherIdaraMData.khidmatNature === null ||
      this.otherIdaraMData.khidmatNature === undefined
    ) {
      alert('please enter khidmat nature !');
      return;
    }
    if (
      this.otherIdaraMData.mauze === null ||
      this.otherIdaraMData.mauze === undefined
    ) {
      alert('please enter mawaze !');
      return;
    }

    var go = confirm('Are you sure you want to submit.');
    if (!go) return;

    this._loader.callLoaderMethod('show');

    this._wafdMawazeService
      .submitOtherIdaraMawaze(this.otherIdaraMData)
      .subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');
          // swal(
          //   'Successfull!',
          //   'You have successfully submitted the data',
          //   'success'
          // );

          // window.setTimeout(function () {
          //   location.reload();
          // }, 500);
          //this.toastr.success('Saved successfully', '');

          this.ngOnInit();
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        },
      });
  }

  DeleteOtherIdaraM(id: number) {
    var go = confirm('Are you sure you want to delete.');
    if (!go) return;

    this._loader.callLoaderMethod('show');

    this._wafdMawazeService.deleteOtherIdaraMawaze(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        // swal(
        //   'Successfull!',
        //   'You have successfully Deleted the data',
        //   'success'
        // );

        // window.setTimeout(function () {
        //   location.reload();
        // }, 500);
        //this.toastr.error('Deleted successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  AddMahadPastM() {
    if (
      this.mahadPastMData.fromYear === null ||
      this.mahadPastMData.fromYear === undefined
    ) {
      alert('please enter from year !');
      return;
    }
    if (
      this.mahadPastMData.toYear === null ||
      this.mahadPastMData.toYear === undefined
    ) {
      alert('please enter to year !');
      return;
    }
    if (
      this.mahadPastMData.programList === null ||
      this.mahadPastMData.programList === undefined
    ) {
      alert('please enter program !');
      return;
    }
    if (
      this.mahadPastMData.mauze === null ||
      this.mahadPastMData.mauze === undefined
    ) {
      alert('please enter mawaze !');
      return;
    }

    var go = confirm('Are you sure you want to submit.');
    if (!go) return;

    this._loader.callLoaderMethod('show');

    this._wafdMawazeService
      .submitMahadPastMawaze(this.mahadPastMData)
      .subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');
          // swal(
          //   'Successfull!',
          //   'You have successfully submitted the data',
          //   'success'
          // );

          // window.setTimeout(function () {
          //   location.reload();
          // }, 500);
          //this.toastr.success('Saved successfully', '');

          this.ngOnInit();
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          console.log(err);
          swal('Error!', err.error.message, 'error');
        },
      });
  }

  DeleteMahadPastM(id: number) {
    var go = confirm('Are you sure you want to delete.');
    if (!go) return;

    this._loader.callLoaderMethod('show');

    this._wafdMawazeService.deleteMahadPastMawaze(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        // swal(
        //   'Successfull!',
        //   'You have successfully Deleted the data',
        //   'success'
        // );

        // window.setTimeout(function () {
        //   location.reload();
        // }, 500);
        //this.toastr.error('Deleted successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  submitdata()
  {
    this._loader.callLoaderMethod('show');


    this._profileService.submitFacultyProfile(this.profileData).subscribe(
      {
        next: x => {
          this._loader.callLoaderMethod('hide');
          // swal('Successfull!', 'You have successfully submitted the data', 'success');

          // this.toastr.success('Saved successfully', '');


         this.ngOnInit();
        },
        error: err => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');

        }

      }
    );
  }

}
