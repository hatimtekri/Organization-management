import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoursesWorkshop } from 'src/app/AAAA_Models/CoursesWorkshop-Model';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';
import { Qualification } from 'src/app/AAAA_Models/Qualification-Model';
import { WorkShop } from 'src/app/AAAA_Models/Workshop-Model';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { LoaderService } from '../../Services/loader.service';
declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.scss']
})
export class AcademicComponent implements OnInit {

  edit: boolean = false;

  players = [
    { id: 1, playerName: 'Cristiano Ronaldo' },
    { id: 2, playerName: 'Lionel Messi' },
    { id: 3, playerName: 'Neymar Jr' },
    { id: 4, playerName: 'Toni Kroos' },
    { id: 5, playerName: 'Luiz Suarez' },
    { id: 6, playerName: 'Karim Benzema' },
    { id: 7, playerName: 'Eden Hazard' },
  ];
  selected = [
    { id: 2, playerName: 'Toni Kroos' }
  ];

  public profileData = new FacultyProfile();
  public qualificationData = new Qualification();
  public workshopData = new WorkShop();
  public coursesData = new CoursesWorkshop();
  public qualificationList = new Array<Qualification>();
  public workshopList = new Array<WorkShop>();
  public countryDD = new Array<DropDownData>();
  public mediumDD = new Array<DropDownData>();
  public stageDD = new Array<DropDownData>();
  public degreeDD = new Array<any>();
  public degreeDD1 = new Array<any>();
  public catDD = new Array<DropDownData>();
  public subcatDD = new Array<any>();
  public subcatDD1 = new Array<any>();

  public statusDD = new Array<DropDownData>();
  public housestatuspDD = new Array<DropDownData>();
  public farighDarajahDD = new Array<DropDownData>();
  public farigYearDD = new Array<DropDownData>();
  public alJameaDegreeDD = new Array<DropDownData>();


  public categoryDD = new Array<DropDownData>();
  public pursuingDD = new Array<DropDownData>();
  public modeDD = new Array<DropDownData>();
  public typeDD = new Array<DropDownData>();
  public yearsDD = new Array<DropDownData>();
  public file = null;
  public itsId2 :any;
  public file2 = null;
  public year = 0;
  public filename : any;
  public filename2 : any;
  id: any;
  constructor(private toastr:ToastrService,
    private route: ActivatedRoute,private _router: Router,private titleService: Title, private _loader: LoaderService, private _profileService: FacultyProfileService) {
    
  }

  ngOnInit(): void {

    $(function () {
      $('[data-toggle="popover"]').popover({ trigger: "hover" })
    })
    // $('.popover-dismiss').popover({
    //   trigger: 'focus'
    // })

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

    this._loader.callLoaderMethod('show');
    this._profileService.getQualificationDropdownData().subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.stageDD = x.stage;
        this.degreeDD1 = x.s_d;

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._loader.callLoaderMethod('show');
    this._profileService.getcoursesDropdownData().subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.catDD = x.cat;
        this.subcatDD1 = x.c_cs;

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._loader.callLoaderMethod('show');
    this._profileService.getQualificationData(this.itsId2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.qualificationList = x.data;
        this.year = x.year;
        this._loader.callLoaderMethod('show');
        this._profileService.getDropdownData(5).subscribe({
          next: (x) => {
            this._loader.callLoaderMethod('hide');
            this.yearsDD = x.data;
            this.yearsDD = this.yearsDD.filter((val) => parseInt(val.name ?? '0') > this.year);

            this.yearsDD.sort(function(a, b){return parseInt(b.name ?? '0')-parseInt(a.name ?? '0')});

          },
          error: (err) => {
            this._loader.callLoaderMethod('hide');
          },
        });


      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._loader.callLoaderMethod('show');
    this._profileService.getWorkshopData(this.itsId2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.workshopList = x.data;

        this._loader.callLoaderMethod('show');



      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });


    this._loader.callLoaderMethod('show');
    this._profileService.getDropdownData(20).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.farighDarajahDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._loader.callLoaderMethod('show');
    this._profileService.getDropdownData(2).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.farigYearDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._loader.callLoaderMethod('show');
    this._profileService.getDropdownData(7).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.alJameaDegreeDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._loader.callLoaderMethod('show');
    this._profileService.getDropdownData(4).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.categoryDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });


    this._loader.callLoaderMethod('show');
    this._profileService.getDropdownData(34).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.countryDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._loader.callLoaderMethod('show');
    this._profileService.getDropdownData(35).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.mediumDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });




    this._loader.callLoaderMethod('show');
    this._profileService.getDropdownData(36).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.statusDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._loader.callLoaderMethod('show');
    this._profileService.getDropdownData(37).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.pursuingDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    this._loader.callLoaderMethod('show');
    this._profileService.getDropdownData(38).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.modeDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

    // this._loader.callLoaderMethod('show');
    // this._profileService.getDropdownData(5).subscribe({
    //   next: (x) => {
    //     this._loader.callLoaderMethod('hide');
    //     this.yearsDD = x.data;
    //   },
    //   error: (err) => {
    //     this._loader.callLoaderMethod('hide');
    //   },
    // });

    this._loader.callLoaderMethod('show');
    this._profileService.getDropdownData(6).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.typeDD = x.data;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

  }

  addQuali() {
    if (this.qualificationData.country === null || this.qualificationData.country === "" || this.qualificationData.country === undefined) {
      alert("please select the country");
      return;
    }

    if (this.qualificationData.mediumOfEducation === null || this.qualificationData.mediumOfEducation === "" || this.qualificationData.mediumOfEducation === undefined) {
      alert("please select the mediun of education");
      return;
    }
    if (this.qualificationData.stage === null || this.qualificationData.stage === "" || this.qualificationData.stage === undefined) {
      alert("please select the stage");
      return;
    }
    if (this.qualificationData.degree === null || this.qualificationData.degree === "" || this.qualificationData.degree === undefined) {
      alert("please select the degree");
      return;
    }
    if (this.qualificationData.institutionName === null || this.qualificationData.institutionName === "" || this.qualificationData.institutionName === undefined) {
      alert("please select the institution name");
      return;
    }
    if (this.qualificationData.status === null || this.qualificationData.status === "" || this.qualificationData.status === undefined) {
      alert("please select the status");
      return;
    }
    if (this.qualificationData.year === null || this.qualificationData.year === "" || this.qualificationData.year === undefined) {
      alert("please select the year");
      return;
    }
    if (this.qualificationData.status != 'Completed' && (this.qualificationData.stage != 'Secondary' && this.qualificationData.stage != 'Higher Secondary')) {
      if (this.qualificationData.pursuingYear === null || this.qualificationData.pursuingYear === "" || this.qualificationData.pursuingYear === undefined) {
        alert("please select the pursuing year");
        return;
      }

    }

    if (this.qualificationData.status == 'Completed') {
      if (this.file == null) {
        if (this.qualificationData.attachment == "" || this.qualificationData.attachment == null) {
          alert('Please select the file');
          return;
        }

      }



    }
    var fd = new FormData();
    fd.append('attachment_file', this.file ?? "");


    var go = confirm("Are you sure you want to submit");
    if (!go) return;


    this._loader.callLoaderMethod('show');
    this._profileService.submitQualificationData(this.qualificationData).subscribe({

      next: x => {
        this._loader.callLoaderMethod('hide');


        if (this.qualificationData.status == 'Completed') {
          this._loader.callLoaderMethod('show');
          this._profileService.submitQualificationDataAttachment(x, fd).subscribe(
            {
              next: x => {
                this._loader.callLoaderMethod('hide');

                // swal(
                //   'Successfull!',
                //   'You have successfully submitted the data',
                //   'success'
                // );

                // window.setTimeout(function () {
                //   location.reload();
                // }, 500);

                this._loader.callLoaderMethod('hide');
                //this.toastr.success('Saved successfully', '');
                this.ngOnInit();

              },
              error: err => {
                this._loader.callLoaderMethod('hide');
                swal('Error!', err.error.message, 'error');
              }
            }
          );

        }



      },
      error: err => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  addWork() {
    if (this.workshopData.year === null || this.workshopData.year === "" || this.workshopData.year === undefined) {
      alert("please select the year");
      return;
    }

    if (this.workshopData.type === null || this.workshopData.type === "" || this.workshopData.type === undefined) {
      alert("please select the type");
      return;
    }
    if (this.workshopData.mode === null || this.workshopData.mode === "" || this.workshopData.mode === undefined) {
      alert("please select the mode");
      return;
    }
    if (this.workshopData.category === null || this.workshopData.category === "" || this.workshopData.category === undefined) {
      alert("please select the category");
      return;
    }
    if (this.workshopData.subCategory === null || this.workshopData.subCategory === "" || this.workshopData.subCategory === undefined) {
      alert("please select the sub category");
      return;
    }
    if (this.workshopData.courseName === null || this.workshopData.courseName === "" || this.workshopData.courseName === undefined) {
      alert("please select the course name");
      return;
    }
    if (this.workshopData.keypoints === null || this.workshopData.keypoints === "" || this.workshopData.keypoints === undefined) {
      alert("please select the keypoints");
      return;
    }
    if (this.workshopData.cetificateCredentials === null || this.workshopData.cetificateCredentials === "" || this.workshopData.cetificateCredentials === undefined) {
      alert("please select the certificate credentials");
      return;
    }

    if (this.file2 === null) {
      alert("please select the file");
      return;
    }

    var fd = new FormData();
    fd.append('attachment_file', this.file2 ?? "");


    var go = confirm("Are you sure you want to submit");
    if (!go) return;


    this._loader.callLoaderMethod('show');
    this._profileService.submitWorkShopData(this.workshopData).subscribe({

      next: x => {


        this._profileService.submitWorkshopDataAttachment(x, fd).subscribe(
          {
            next: x => {
              this._loader.callLoaderMethod('hide');

              // swal(
              //   'Successfull!',
              //   'You have successfully submitted the data',
              //   'success'
              // );

              // window.setTimeout(function () {
              //   location.reload();
              // }, 500);

              this._loader.callLoaderMethod('hide');
              //this.toastr.success('Saved successfully', '');
              this.ngOnInit();

            },
            error: err => {
              this._loader.callLoaderMethod('hide');
              swal('Error!', err.error.message, 'error');
            }
          }
        );

      },
      error: err => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }

  setDegree() {
    this.qualificationData.degree = undefined;
    this.degreeDD = this.degreeDD1.filter((val) => val.stage === this.qualificationData.stage);
  }
  setSubcat() {
    this.workshopData.subCategory = undefined;
    this.subcatDD = this.subcatDD1.filter((val) => val.category === this.workshopData.category);
  }

  delete(id: number) {
    var go = confirm("Are you sure you want to delete");
    if (!go) return;

    this._profileService.deleteQualificationData(id).subscribe({

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

        //this.toastr.error('Deleted successfully', '');
        this.ngOnInit();

      },
      error: err => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
  delete2(id: number) {
    var go = confirm("Are you sure you want to delete");
    if (!go) return;

    this._profileService.deleteWorkshopData(id).subscribe({

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

        //this.toastr.error('Deleted successfully', '');
        this.ngOnInit();


      },
      error: err => {
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

      if (extension != "pdf") {
        alert('Please upload pdf file only');
        return;
      }

      this.file = event.target.files[0];
    }
    else {
      alert('Please upload the file');
      return;
    }

  }

  onFileSelected2(event: any) {
    if (event.target.files.length > 0) {
      try {
        var size = event.target.files[0].size / (1024 * 1024);
        if (size > 20) {
          alert('Please upload a file of max size 20 MB');
          return;
        }
      } catch (ex) { }

      this.filename2 = event.target.value;
      const path = event.target.value.split('.');
      const extension = `${path[path.length - 1]}`;

      if (extension != "pdf") {
        alert('Please upload pdf file only');
        return;
      }

      this.file2 = event.target.files[0];
    }
    else {
      alert('Please upload the file');
      return;
    }

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
          this.toastr.success('Saved successfully', '');

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
