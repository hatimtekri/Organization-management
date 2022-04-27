import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { Wafd_Khidmat_Mawaze } from 'src/app/AAAA_Models/Wafd_Khidmat_Mawaze-Model';
import { Wafd_Mawaaze } from 'src/app/AAAA_Models/Wafd_Mawaaze-Model';
import { FacultyMawazeService } from '../../Services/faculty-mawaze.service';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { LoaderService } from '../../Services/loader.service';
import { MawazeService } from '../../Services/mawaze.service';
declare var swal: any;
declare var $: any;


@Component({
  selector: 'app-mawaze',
  templateUrl: './mawaze.component.html',
  styleUrls: ['./mawaze.component.scss']
})
export class MawazeComponent implements OnInit {
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

 
  public itsId2:any;
  public mauze = new Wafd_Khidmat_Mawaze();
  public hYearsDD = new Array<DropDownData>();
  public kNatureDD = new Array<DropDownData>();
  public mawazeDD = new Array<DropDownData>();
  public mawaze1DD = new Array<DropDownData>();
  public mawaze2DD = new Array<DropDownData>();
  public mawaze3DD = new Array<DropDownData>();
  public mawaze4DD = new Array<DropDownData>();
  public mawaze5DD = new Array<DropDownData>();

  public mawazeRamazanDD = new Array<DropDownData>();
  public mawazeAsharaDD = new Array<DropDownData>();
  public mawazeAshara1DD = new Array<DropDownData>();
  public mawazes = Array<Wafd_Mawaaze>();
  public mawazes3 = Array<Wafd_Mawaaze>();
  id: any;
  constructor(
    private titleService: Title,
    private _loader: LoaderService,
    private _profileService: FacultyProfileService,
    private _mawazeService: MawazeService,
    private _router: Router,
    private toastr:ToastrService,
    private route: ActivatedRoute

  ) {
    
  }

  ngOnInit(): void {

    this.mauze = new Wafd_Khidmat_Mawaze();
    this.hYearsDD = new Array<DropDownData>();
    this.kNatureDD = new Array<DropDownData>();
    this.mawazeDD = new Array<DropDownData>();

    this.mawazes = Array<Wafd_Mawaaze>();
    this.mawazes3 = Array<Wafd_Mawaaze>();

    const id1 = this.route.snapshot.paramMap.get('id');

    this.id = id1 ?? '0';



    // this.itsId=this._profileService.getITSIDData();
    this.itsId2 = this.id;
    this._profileService.setITSIDData(this.itsId2);

    this._profileService.getDropdownData(2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.hYearsDD = x.data;
        this.hYearsDD.sort(function (a, b) { return parseInt(b.name ?? '0') - parseInt(a.name ?? '0') });

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
    this._profileService.getDropdownData(12).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.kNatureDD = x.data;
        this.kNatureDD = this.kNatureDD.sort(this.compare);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
    this._profileService.getDropdownData(13).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mawazeDD = this.mawazeDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(54).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mawazeAshara1DD = x.data;
        this.mawazeAshara1DD = this.mawazeAshara1DD.sort(this.compare);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(52).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mawazeRamazanDD = x.data;
        this.mawazeRamazanDD = this.mawazeRamazanDD.sort(this.compare);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
    this._profileService.getDropdownData(53).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mawazeAsharaDD = x.data;
        this.mawazeAsharaDD = this.mawazeAsharaDD.sort(this.compare);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });


    this._profileService.getDropdownData(55).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mawaze1DD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
    this._profileService.getDropdownData(58).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mawaze2DD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
    this._profileService.getDropdownData(57).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mawaze3DD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });
    this._profileService.getDropdownData(59).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mawaze4DD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._profileService.getDropdownData(56).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mawaze5DD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
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

          this._profileService.setProfileData(x.student);
        },
        error: err => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        }
      });

    this._mawazeService.getMawazwDetails(this.itsId2).subscribe({
      next: (x) => {
         this.mawazes = x.mawaze;
        this.mawazes3 = x.mawaze3;
      },
      error: (err) => {
        swal('Error!', err.error.message, 'error');
      },
    });

    }

  }

  addmauze() {
    if (this.mauze.hijriYear === null || this.mauze.hijriYear === undefined) {
      alert('please enter year !');
      return;
    }


    if (
      this.mauze.khidmatMainType === null ||
      this.mauze.khidmatMainType === undefined
    ) {
      alert('please enter Event !');
      return;
    }

    if (this.mauze.khidmatMainType == "Ashara Mubaraka (With Aqa Maula TUS)" || this.mauze.khidmatMainType == "Ashara Mubaraka (Mauze)" || this.mauze.khidmatMainType == "Ramadan al-Moazzam (Mauze)") {
      if (
        this.mauze.khidmatSubType === null ||
        this.mauze.khidmatSubType === undefined
      ) {
        alert('please enter khidmat nature !');
        return;
      }

    }




    if (this.mauze.mozeName === null || this.mauze.mozeName === undefined) {
      alert('please enter mauze !');
      return;
    }
    var go = confirm('Are you sure you want to add.');
    if (!go) return;
    this._loader.callLoaderMethod('show');
    this._mawazeService.submitMauze(this.mauze).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        // swal(
        //   'Successfull!',
        //   'You have successfully submitted the Mauze',
        //   'success'
        // );
        // window.setTimeout(function () {
        //   location.reload();
        // }, 500);
        this.toastr.success('Saved successfully', '');


        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  deletemauze(id: number) {
    var go = confirm('Are you sure you want to delete.');
    if (!go) return;
    this._loader.callLoaderMethod('show');

    this._mawazeService.deleteMauze(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        // swal(
        //   'Successfull!',
        //   'You have successfully submitted the Mauze',
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

  compare(a: DropDownData, b: DropDownData) {
    var nameA = a.name ?? "".toLowerCase(), nameB = b.name ?? "".toLowerCase()
    if (nameA < nameB) //sort string ascending
      return -1
    if (nameA > nameB)
      return 1
    return 0 //default return value (no sorting)
  }

  oneventchange() {
    this.mauze.mozeName = undefined;
    this.mauze.khidmatSubType = undefined;
  }

  onknaturechange() {
    this.mauze.mozeName = undefined;
  }

}
