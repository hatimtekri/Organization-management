import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BMI } from 'src/app/AAAA_Models/BMI-Model';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';
import { FitnessActivity } from 'src/app/AAAA_Models/FitnessActivity-Model';
import { wafd_fieldofinterest } from 'src/app/AAAA_Models/wafd_fieldofinterest-Model';
import { wafd_languageproficiency } from 'src/app/AAAA_Models/Wafd_LanguageProficiency';
import { wafd_physicalfitness } from 'src/app/AAAA_Models/Wafd_Physicalfitness';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { FacultySelfinfoService } from '../../Services/faculty-selfinfo.service';
import { LoaderService } from '../../Services/loader.service';
declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-self-info',
  templateUrl: './self-info.component.html',
  styleUrls: ['./self-info.component.scss']
})
export class SelfInfoComponent implements OnInit {
  players = [
    { id: 1, playerName: 'Cristiano Ronaldo' },
    { id: 2, playerName: 'Lionel Messi' },
    { id: 3, playerName: 'Neymar Jr' },
    { id: 4, playerName: 'Toni Kroos' },
    { id: 5, playerName: 'Luiz Suarez' },
    { id: 6, playerName: 'Karim Benzema' },
    { id: 7, playerName: 'Eden Hazard' },
  ];
  selected = [{ id: 2, playerName: 'Toni Kroos' }];

  public profileData = new FacultyProfile();
  public languageproficiciencyData = new wafd_languageproficiency();
  public physicalfitnessData = new wafd_physicalfitness();
  public fieldofinterestData = new wafd_fieldofinterest();

  public languageproficiciencyDetails = new Array<wafd_languageproficiency>();
  public physicalfitnessDetails = new Array<wafd_physicalfitness>();
  public fieldofinterestDetails = new Array<wafd_fieldofinterest>();

  public languageDD = new Array<DropDownData>();
  public selfRankingDD = new Array<DropDownData>();
  public fieldOfInterestDD = new Array<DropDownData>();
  public sportsDD = new Array<DropDownData>();
  public personalityTypeDD = new Array<DropDownData>();
  public BMIDetails = Array<BMI>();
  public fitnessActivityDetails = Array<FitnessActivity>();

  public file: any;
  public filename: any;
  public edit: boolean = false;
  public itsId2:any;
  id: any;
  constructor(
    private titleService: Title,
    private _loader: LoaderService,
    private _profileService: FacultyProfileService,
    private _wafdSelfinfoService: FacultySelfinfoService,
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
    this.profileData = new FacultyProfile();
    this.languageproficiciencyData = new wafd_languageproficiency();
    this.physicalfitnessData = new wafd_physicalfitness();
    this.fieldofinterestData = new wafd_fieldofinterest();
    this.edit = false;

    $(function () {
      $('[data-toggle="popover"]').popover({ trigger: 'hover' });
    });


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



    this._loader.callLoaderMethod('show');
    this._wafdSelfinfoService.getLanguageProficiencyDetails(this.itsId2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.languageproficiciencyDetails = x;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    this._loader.callLoaderMethod('show');
    this._wafdSelfinfoService.getPhysicalFitnessDetails(this.itsId2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.physicalfitnessDetails = x;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    this._loader.callLoaderMethod('show');
    this._wafdSelfinfoService.getfieldofinterestDetails(this.itsId2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.fieldofinterestDetails = x;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

  }

    this._profileService.getDropdownData(15).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.selfRankingDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
    this._profileService.getDropdownData(39).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.fieldOfInterestDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(8).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.languageDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(9).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.sportsDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(47).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.personalityTypeDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });



    this._loader.callLoaderMethod('show');
    this._wafdSelfinfoService.getFitnessAcitvityDetails(this.itsId2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.fitnessActivityDetails = x;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._wafdSelfinfoService.getBMIDetails(this.itsId2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.BMIDetails = x;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });




  }

  submitLanguageProficiency() {
    this._loader.callLoaderMethod('show');
    this._wafdSelfinfoService
      .submitLanguageProficiency(this.languageproficiciencyData)
      .subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');
          //this.toastr.success('Saved successfully', '');

          // window.setTimeout(function () {
          //   location.reload();
          // }, 500);
          this.ngOnInit();
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        },
      });
  }

  submitPhysicalFitness() {
    this._loader.callLoaderMethod('show');
    this._wafdSelfinfoService
      .submitPhysicalFitness(this.physicalfitnessData)
      .subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');
          // swal(
          //   'Successfull!',
          //   'You have successfully submitted the data',
          //   'success'
          // );
          //this.toastr.success('Saved successfully', '');

          // window.setTimeout(function () {
          //   location.reload();
          // }, 500);
          this.ngOnInit();
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        },
      });
  }

  SubmitFieldOfInterest() {
    var go = confirm('Are you sure you want to submit.');
    if (!go) return;

    this._loader.callLoaderMethod('show');
    this._wafdSelfinfoService
      .submitFieldofinterest(this.fieldofinterestData)
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
  submitdata() {
    this._loader.callLoaderMethod('show');

    this._profileService.submitFacultyProfile(this.profileData).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        // swal('Successfull!', 'You have successfully submitted the data', 'success');

        //this.toastr.success('Saved successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  submitdata_forpersonality() {


    var fd = new FormData();
    fd.append('attachment_file', this.file ?? '');

    if (this.file == null) {
      alert('Please upload a file');
      return;
    }
    this._loader.callLoaderMethod('show');
    this._profileService.submitFacultyProfile(this.profileData).subscribe({
      next: (x) => {
        this._profileService
          .submitPersonalityAttachment(this.profileData.itsId, fd)
          .subscribe({
            next: (x) => {
              //this.toastr.success('Saved successfully', '');
             // this.ngOnInit();
             window.setTimeout(function () { location.reload() }, 500);


            },
            error: (err) => {
              this._loader.callLoaderMethod('hide');
              swal('Error!', err.error.message, 'error');
            },
          });
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  deleteLanguageProficiency(id: number) {
    var go = confirm('Are you sure you want to delete.');
    if (!go) return;

    this._loader.callLoaderMethod('show');

    this._wafdSelfinfoService.deleteLanguageProficiency(id).subscribe({
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

  deletePhysicalFitness(id: number) {
    var go = confirm('Are you sure you want to delete.');
    if (!go) return;

    this._loader.callLoaderMethod('show');

    this._wafdSelfinfoService.deletePhysicalFitness(id).subscribe({
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

  deleteFieldOfInterest(id: number) {
    var go = confirm('Are you sure you want to delete.');
    if (!go) return;

    this._loader.callLoaderMethod('show');

    this._wafdSelfinfoService.deleteFieldofinterest(id).subscribe({
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
  deleteFitnessActivity(id: number) {
    var go = confirm('Are you sure you want to delete.');
    if (!go) return;

    this._loader.callLoaderMethod('show');

    this._wafdSelfinfoService.deleteFitnessActivity(id).subscribe({
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
        this.toastr.error('Deleted successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      try {
        var size = event.target.files[0].size / (1024 * 1024);
        if (size > 20) {
          alert('Please upload a file of max size 20 MB');
          return;
        }
      } catch (ex) {}
      this.filename = event.target.value;
      const path = event.target.value.split('.');
      const extension = `${path[path.length - 1]}`;

      // if (extension != 'pdf') {
      //   alert('Please upload pdf file only');
      //   return;
      // }
      this.file = event.target.files[0];
    } else {
      alert('Please upload the file');
      return;
    }
  }


}
