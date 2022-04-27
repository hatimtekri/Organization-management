import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';
import { Kg_IdentityCard } from 'src/app/AAAA_Models/Kg_IdentityCard';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { LoaderService } from '../../Services/loader.service';
declare var swal: any;

@Component({
  selector: 'app-passport-details',
  templateUrl: './passport-details.component.html',
  styleUrls: ['./passport-details.component.scss']
})
export class PassportDetailsComponent implements OnInit {
  players = [
    { id: 1, playerName: 'Cristiano Ronaldo' },
    { id: 2, playerName: 'Lionel Messi' },
    { id: 3, playerName: 'Neymar Jr' },
    { id: 4, playerName: 'Toni Kroos' },
    { id: 5, playerName: 'Luiz Suarez' },
    { id: 6, playerName: 'Karim Benzema' },
    { id: 7, playerName: 'Eden Hazard' },
  ];
  public profileData = new FacultyProfile();
  public card = new Kg_IdentityCard();
  public file: any;
  public filename: any;
  public file1: any;
  public filename1: any;
  public countryDD = new Array<DropDownData>();
  public cardTypeDD = new Array<DropDownData>();
  public itsId2:any;
  id: any;

  public cards = new Array<any>();
  edit: boolean = false;
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
    this.card = new Kg_IdentityCard();
    this.file= null;
    this.filename = null;
    this.file1 = null;
    this.filename1 = null;
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

    this._profileService.getIdentityCardDetails(this.itsId2).subscribe({
      next: (x) => {
        this.cards = x;
      },
      error: (err) => {},
    });


    this._loader.callLoaderMethod('show');
    this._profileService.getDropdownData(45).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.countryDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
    this._loader.callLoaderMethod('show');
    this._profileService.getDropdownData(46).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.cardTypeDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

  }

  submitdata() {
    this._loader.callLoaderMethod('show');
    var fd = new FormData();
    fd.append('attachment_file1', this.file1 ?? '');
    this._profileService.submitFacultyProfile(this.profileData).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        if (this.file1 == null) {
          //this.toastr.success('Saved successfully', '');
          this.ngOnInit();
        }
        if (this.file1 != null) {
          this._loader.callLoaderMethod('show');

          this._profileService.submitPassportCopyAttachment(x, fd).subscribe({
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
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  submitcard() {
    this._loader.callLoaderMethod('show');

    if (this.card.country === null || this.card.country === "" || this.card.country === undefined) {
      alert("please select the country");
      return;
    }
    if (this.card.cardType === null || this.card.cardType === "" || this.card.cardType === undefined) {
      alert("please select the card type");
      return;
    }
    if (this.card.cardNumber === null || this.card.cardNumber === "" || this.card.cardNumber === undefined) {
      alert("please select the card number");
      return;
    }
    if (this.card.nameOnCard === null || this.card.nameOnCard === "" || this.card.nameOnCard === undefined) {
      alert("please select the name on card");
      return;
    }
    if (this.file === null || this.file === "" || this.file === undefined) {
      alert("please select the file");
      return;
    }

    var fd = new FormData();
    fd.append('attachment_file', this.file ?? '');

    this._profileService.submitCard(this.card).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        if (this.file == null) {
          //this.toastr.success('Saved successfully', '');
          this.ngOnInit();
        }
        if (this.file != null) {
          this._loader.callLoaderMethod('show');

          this._profileService.submitCardAttachment(x, fd).subscribe({
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
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  Deletecard(id: number) {
    var go = confirm('Are you sure you want to delete');
    if (!go) return;

    this._profileService.deleteCardData(id).subscribe({
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
        this.ngOnInit();
        //this.toastr.error('Successfully deleted', '');
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

  onFileSelected1(event: any) {
    if (event.target.files.length > 0) {
      try {
        var size = event.target.files[0].size / (1024 * 1024);
        if (size > 20) {
          alert('Please upload a file of max size 20 MB');
          return;
        }
      } catch (ex) {}
      this.filename1 = event.target.value;
      const path = event.target.value.split('.');
      const extension = `${path[path.length - 1]}`;

      if (extension != 'pdf') {
        alert('Please upload pdf file only');
        return;
      }
      this.file1 = event.target.files[0];
    } else {
      alert('Please upload the file');
      return;
    }
  }

  cardTypeChanged()
  {
    this.card.country=undefined;
    if(this.card.cardType == "Aadhaar Card" || this.card.cardType == "Pan Card" )
    {
      this.card.country="India";
    }
    else if(this.card.cardType == "Green Card")
    {
      this.card.country="USA";
    }
  }
}
