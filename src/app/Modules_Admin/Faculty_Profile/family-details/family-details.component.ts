import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Kg_FaimalyDetails } from 'src/app/AAAA_Models/Kg_FaimalyDetails';
import { WorkShop } from 'src/app/AAAA_Models/Workshop-Model';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { LoaderService } from '../../Services/loader.service';
declare var swal: any;

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.scss']
})
export class FamilyDetailsComponent implements OnInit {
  public faimalyDetails = new Array<Kg_FaimalyDetails>();
  public f = new Kg_FaimalyDetails();
  public name: any;
  public itsId: any;
  public itsId2: any;
  id: any;
  public authenticated: boolean = false;
  public relationDD = [
    { name: 'Father' },
    { name: 'Mother' },
    { name: 'Self' },
    { name: 'Spouse' },
    { name: '1st Child' },
    { name: '2nd Child' },
    { name: '3rd Child' },
    { name: '4th Child' },

  ];
  public default = `<div id='foo'><img src="https://www.mahadalzahra.org/uploads/Its_Photos/50419363.jpeg" alt="setting"  width="85" height="100"
class="img-responsive" /></div>`;
  doc: any;
  constructor(
    private titleService: Title,
    private _loader: LoaderService,
    private _profileService: FacultyProfileService,
    private _router: Router,
    private route: ActivatedRoute

  ) {
    
  }

  ngOnInit(): void {


    const id1 = this.route.snapshot.paramMap.get('id');

    this.id = id1 ?? '0';


    // this.itsId=this._profileService.getITSIDData();
    this.itsId2 = this.id;
    this._profileService.setITSIDData(this.itsId2);
    if(this.itsId == 0)
    {
     this._router.navigate(['/admin/hr-master']);
    }
    else{
      this._loader.callLoaderMethod('show');
      this._profileService.getfacultyProfileData(this.itsId2).subscribe({
        next: x => {
          this._loader.callLoaderMethod('hide');

          this._profileService.setProfileData(x.student);
          
        },
        error: err => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        }
      });
    }

    this.f = new Kg_FaimalyDetails();
    this.name = null;
    this.itsId = null;
    this.authenticated = false;

    this.doc = new DOMParser().parseFromString(this.default, 'text/xml');

    console.log('1 -' + this.doc.firstChild.innerHTML);
    console.log('2 -' + this.doc.firstChild.firstChild.innerHTML);

    this._loader.callLoaderMethod('show');
    this._profileService.getFaimlyDetails(this.itsId2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.faimalyDetails = x;
        this.faimalyDetails.sort(function(a, b){return parseInt(b.age ?? '0')-parseInt(a.age ?? '0')});

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
  }

  fetchName(itsId: number) {
    this._loader.callLoaderMethod('show');
    this._profileService.getFaimlyMemberName(itsId,this.itsId2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.name = x;
        this.authenticated = true;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  Add() {
    this._loader.callLoaderMethod('show');

    this._profileService.AddFaimaly(this.f).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        //this.toastr.success('Saved successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }



  Delete(id:number)
  {
    var go = confirm("Are you sure you want to delete");
    if (!go) return;

    this._profileService.deleteFaimalyMemberData(id).subscribe({

      next: x => {

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
      error: err => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
}
