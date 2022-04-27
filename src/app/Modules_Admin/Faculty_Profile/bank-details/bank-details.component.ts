import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';
import { wafd_languageproficiency } from 'src/app/AAAA_Models/Wafd_LanguageProficiency';
import { wafd_physicalfitness } from 'src/app/AAAA_Models/Wafd_Physicalfitness';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { LoaderService } from '../../Services/loader.service';
declare var swal: any;

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  public profileData = new FacultyProfile();
  public languageProficiencyDetails = new Array<wafd_languageproficiency>();
  public physicalFitnessDetails = new Array<wafd_physicalfitness>();
  public accountTypeDD = new Array<DropDownData>();
  public file: any;
  public filename: any;
  edit: boolean = false;
  public itsId2:any;
  id: any;
  constructor(
    private titleService: Title,
    private _loader: LoaderService,
    private _profileService: FacultyProfileService,
    private _router: Router,
    private toastr:ToastrService,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {


    this.profileData = new FacultyProfile();
    this.languageProficiencyDetails = new Array<wafd_languageproficiency>();
    this.physicalFitnessDetails = new Array<wafd_physicalfitness>();
    this.accountTypeDD = new Array<DropDownData>();
    this.file = null;
    this.filename = null;
    const id1 = this.route.snapshot.paramMap.get('id');

    this.id = id1 ?? '0';

    this.edit = false;

    // this.itsId=this._profileService.getITSIDData();
    this.itsId2 = this.id;
    this._profileService.setITSIDData(this.itsId2);

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

    this._profileService.getDropdownData(16).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.accountTypeDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
  }

  submitdata() {
    this._loader.callLoaderMethod('show');
    // if (this.file == null) {
    //   alert('Please select the file');
    //   return;
    // }
    var fd = new FormData();
    fd.append('attachment_file', this.file ?? '');

    this._profileService.submitFacultyProfile(this.profileData).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        if (this.file == null) {
          //this.toastr.success('Saved successfully', '');
          this.ngOnInit();
        }
        if (this.file != null) {
          this._loader.callLoaderMethod('show');

          this._profileService
            .submitChequeAttachment(this.profileData.itsId, fd)
            .subscribe({
              next: (x) => {
                //this.toastr.success('Saved successfully', '');
                this.ngOnInit();
              },
              error: (err) => {
                this._loader.callLoaderMethod('hide');
                swal('Error!', err.error.message, 'error');
              },
            });
        }
        // swal('Successfull!', 'You have successfully submitted the data', 'success');

        // window.setTimeout(function () { location.reload() }, 500);
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
      } catch (ex) { }

      this.filename = event.target.value;
      const path = event.target.value.split('.');
      const extension = `${path[path.length - 1]}`;

      if (extension != 'pdf') {
        alert('Please upload pdf file only');
        return;
      }
      this.file = event.target.files[0];
    } else {
      alert('Please upload the file');
      return;
    }
  }
}
