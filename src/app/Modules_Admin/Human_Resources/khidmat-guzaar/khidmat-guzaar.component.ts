import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { LoaderService } from '../../Services/loader.service';
import { MedicalService } from '../../Services/medical.service';
import { filterAndSortArray } from 'multiple-array-filter';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';
import { ReportFilter } from 'src/app/AAAA_Models/ReportFilter-Model';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { PrintProfileSuppressDetails } from 'src/app/AAAA_Models/PrintProfile_Suppress_Details';
declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-khidmat-guzaar',
  templateUrl: './khidmat-guzaar.component.html',
  styleUrls: ['./khidmat-guzaar.component.scss'],
})
export class KhidmatGuzaarComponent implements OnInit {
  public khidmatGuzaars = new Array<FacultyProfile>();
  public mozeDD = new Array<DropDownData>();
  public farigDarajDD = new Array<DropDownData>();
  public aljameaDegreeDD = new Array<DropDownData>();
  public categoryDD = new Array<DropDownData>();
  public qismTahfeezDD = new Array<DropDownData>();
  public nationalityDD = new Array<DropDownData>();
  public ageDD = new Array<DropDownData>();
  public dawattileDD = new Array<DropDownData>();
  public hifzSanadYearDD = new Array<DropDownData>();
  public khidmatYearDD = new Array<DropDownData>();
  public khidmatinmahadDD = new Array<DropDownData>();
  public tayeeninmahadDD = new Array<DropDownData>();
  public itsIdDD = new Array<DropDownData>();
  public batchIdDD = new Array<DropDownData>();

  public suppress = new PrintProfileSuppressDetails();

  public housestatusPersonalDD = new Array<DropDownData>();
  public houseTypeDD = new Array<DropDownData>();
  public houseTypePersonalDD = new Array<DropDownData>();
  public houseStatusDD = new Array<DropDownData>();
  public nameDD = new Array<DropDownData>();

  public ExportCategory = new Array<any>();

  public ExportCategory2 = new Array<any>();
  public colums = Array<WorkshreetColums>();
  listselectAll: any;
  suppressSelectall: any;
  printItsId: any;
  itsIdCsv: any;


  public trainingDarajaDD = new Array<DropDownData>();

  count: any;
  sectionId: any;

  public khidmatGuzaars1 = new Array<FacultyProfile>();
  public filters = new Array<any>();

  constructor(
    private _router: Router,
    private _medicalService: MedicalService,
    private titleService: Title,
    private _loader: LoaderService,
    private _profileService: FacultyProfileService,
    private _authService: AuthService,
    private toastr: ToastrService
  ) {
    this.titleService.setTitle("MZ KG Management");
  }
  public searchObject = new FacultyProfile();
  public searchString = '';
  page: any;
  Editpage: any;
  SalaryPage: any;
  public filterMetadata = { count: 0, data: new Array<any>() };
  ngOnInit(): void {
    this._loader.callLoaderMethod('show');

    this.suppress.aboutyourself = false;
    this.suppress.academic = false;
    this.suppress.basic = false;
    this.suppress.contact = false;
    this.suppress.cw = false;
    this.suppress.family = false;
    this.suppress.foi = false;
    this.suppress.house = false;
    this.suppress.khidmat = false;
    this.suppress.khidmatm = false;
    this.suppress.lp = false;
    this.suppress.otheridara = false;
    this.suppress.pastmm = false;
    this.suppress.personality = false;
    this.suppress.qualification = false;
    this.suppress.salary = false;

    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(66);

        if (this.page == true) {
          this.get();




        }
        else {
          this._loader.callLoaderMethod('hide');
        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });

    this._authService.getAdminSubRights(66).subscribe({
      next: (x) => {
        this.Editpage = x.includes(36);

        if (this.Editpage == true) {

        }
        else {
          this._loader.callLoaderMethod('hide');
        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });

    this._authService.getAdminSubRights(66).subscribe({
      next: (x) => {
        this.SalaryPage = x.includes(37);

        if (this.SalaryPage == true) {

        }
        else {
          this._loader.callLoaderMethod('hide');
        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 1!', err.error.message, 'error');
      },
    });



  }
  trackElement(index: number, element: any) {
    return element ? element.id : null;
  }
  // setDD() {
  //   for (let i = 0; i < this.khidmatGuzaars1.length; i++) {
  //     this.mozeDD.push({ name: this.khidmatGuzaars1[i]['moze'] ,id:1,headerId:1});
  //   }
  //   console.log(JSON.stringify(this.mozeDD));
  // }

  view(id: number, name: string) {
    // this._profileService.setITSIDData(id);
    // this._profileService.setNameData(name);

    //this._router.navigate(['/admin/profile/personal-info']);

    this._profileService.getfacultyProfileData(id).subscribe({
      next: (x) => {
        this._profileService.setProfileData(x.student);

        //this._router.navigate(['/admin/profile/personal-info', id]);
        const url = this._router.serializeUrl(
          this._router.createUrlTree([`${environment.facultyUrl}${id}`])
        );

        window.open(url, '_blank');
      },
      error: (err) => {
        console.log(err);
        // this.status=this._errorStatus.setError(err.error.message,'danger')
      },
    });
  }
  printProfile() {
    let report = new ReportFilter();
    console.log(this.printItsId);
    report.id = 24;
    report.itsId = this.printItsId;
    report.supress = this.suppress;
    this._loader.callLoaderMethod('show');
    this._medicalService.printReport(report).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        window.open(x);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
  setPrintIts(itsId: number) {
    this.printItsId = itsId;
  }

  setPrintBulkITS() {
    const count = this.khidmatGuzaars.filter((x) => x.select == true).length;

    if (count == 0) {
      alert('Kindly select KGs');
      return;
    }
    this.printItsId = undefined;
    let list = this.khidmatGuzaars.filter((x) => x.select == true);
    this._loader.callLoaderMethod('show');
    for (let i = 0; i < list.length; i++) {
      list[i].itsId;

      if (this.printItsId == undefined) {
        this.printItsId = list[i].itsId;
      }
      else {
        this.printItsId = this.printItsId + ',' + list[i].itsId;
      }

    }
    this._loader.callLoaderMethod('hide');


  }

  countchange() {
    console.log('count new: -' + this.count);
  }
  changestatus(itsId: number) {
    this._profileService.ChangeStatus(itsId).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Status changed successfully', '');
        this.ngOnInit();
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
  get() {
    this._loader.callLoaderMethod('show');
    this._profileService.getKhidmatGuzaars().subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.khidmatGuzaars = x.huffazModel;
        this.mozeDD = x.mozeDD;
        this.farigDarajDD = x.farigDarajDD;
        this.nationalityDD = x.nationalityDD;
        this.qismTahfeezDD = x.qismTahfeezDD;
        this.categoryDD = x.categoryDD;
        this.aljameaDegreeDD = x.aljameaDegreeDD;
        this.tayeeninmahadDD = x.tayeeninmahadDD;
        this.khidmatinmahadDD = x.khidmatinmahadDD;
        this.khidmatYearDD = x.khidmatYearDD;
        this.hifzSanadYearDD = x.hifzSanadYearDD;
        this.dawattileDD = x.dawattileDD;
        this.ageDD = x.ageDD;
        this.itsIdDD = x.itsIdDD;
        this.batchIdDD = x.batchIdDD;
        this.nameDD = x.nameDD;
        this.housestatusPersonalDD = x.housestatusPersonalDD;
        this.houseTypeDD = x.houseTypeDD;
        this.houseTypePersonalDD = x.houseTypePersonalDD;
        this.houseStatusDD = x.houseStatusDD;
        this.ExportCategory = x.etexcel2;
        this.ExportCategory2 = x.exportCategory2;

        this.trainingDarajaDD = x.trainingDarajaDD;
        this.searchObject.search_Active = true;
        this.searchObject.search_mahadwafd = true;
        this.searchObject.search_mahadkg = true;
        let c = 1;
        // this.setDD();
        for (let i = 0; i < this.khidmatGuzaars.length; i++) {
          this.khidmatGuzaars[i].id = c;
          c = c + 1;

          if (this.khidmatGuzaars[i].mz_idara == "WafdAlHuffaz") {
            this.khidmatGuzaars[i].mz_idara_color = "bg-non-tayeen";
          }
          else if (this.khidmatGuzaars[i].mz_idara == "MAHADALZAHRA KHDGZ") {
            this.khidmatGuzaars[i].mz_idara_color = "bg-tayeen";
          }
          else if (this.khidmatGuzaars[i].mz_idara == "Recruited Muhaffiz") {
            this.khidmatGuzaars[i].mz_idara_color = "bg-recruited";
          }
          else if (this.khidmatGuzaars[i].mz_idara == "Recruited Teacher") {
            this.khidmatGuzaars[i].mz_idara_color = "bg-teacher";
          }
          else if (this.khidmatGuzaars[i].mz_idara == "Other Idara KG") {
            this.khidmatGuzaars[i].mz_idara_color = "bg-other-idara";
          }

          if (this.khidmatGuzaars[i].activeStatus) {
            this.khidmatGuzaars[i].activeStatusString = "1";
          }

        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error - 2!', err.error.message, 'error');
      },
    });
  }
  setItsIds() {
    console.log(this.itsIdCsv);
    this._loader.callLoaderMethod('show');
    this.searchObject.search_itsIdDD = undefined;

    var array = this.itsIdCsv.split('\n');
    // console.log(JSON.stringify(array))
    // if (array.length == 0) {
    //   var array = this.itsIdCsv.split(',');
    //   this.searchObject.search_itsIdDD = array;
    //   this._loader.callLoaderMethod('hide');

    // }
    // else {
      this.itsIdCsv = array.join(",");
      //this.searchObject.search_itsIdDD = array;

      this._loader.callLoaderMethod('hide');

   // }





  }
  searchItsIds()
  {
       var array = this.itsIdCsv.split(',');
       this.searchObject.search_itsIdDD = array;
  }
  updateFromIts() {
    this._loader.callLoaderMethod('show');
    this._profileService.BulkUpdateFromITS(new FacultyProfile()).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Updated successfully', '');
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Updated successfully', '');
        //swal('Error!', err.error.message, 'error');
      },
    });
  }
  updateacedemicDetails() {
    this._loader.callLoaderMethod('show');
    this._profileService.BulkUpdateAcedemic(new FacultyProfile()).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        this.toastr.success('Updated successfully', '');
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
  selectall(cat: any) {
    this.ExportCategory.filter((x) => x.categoryName == cat);
    for (let i = 0; i < this.ExportCategory.length; i++) {
      if (this.ExportCategory[i].categoryName == cat) {
        for (let j = 0; j < this.ExportCategory[i].toRemove.length; j++) {
          this.ExportCategory[i].toRemove[j].status =
            !this.ExportCategory[i].status;
        }
      }
    }
  }
  Export() {
    const count = this.khidmatGuzaars.filter((x) => x.select == true).length;

    if (count == 0) {
      alert('Kindly select KGs');
      return;
    }

    this._loader.callLoaderMethod('show');
    for (let i = 0; i < this.ExportCategory.length; i++) {
      this.ExportCategory[i].model = this.khidmatGuzaars;
    }

    this._profileService.GetDataToExport(this.ExportCategory).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        this.exportExcel_Customize(x.export, "Mahad_Export_Customized");
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        console.log('Error');
      },
    });
  }
  ExportSection() {
    const count = this.khidmatGuzaars.filter((x) => x.select == true).length;

    if (count == 0) {
      alert('Kindly select KGs');
      return;
    }

    this._loader.callLoaderMethod('show');
    for (let i = 0; i < this.ExportCategory.length; i++) {
      this.ExportCategory[i].model = this.khidmatGuzaars;
      this.ExportCategory[i].categoryId = this.sectionId;
    }

    this._profileService
      .GetWafdExportSectionData(this.ExportCategory)
      .subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');

          this.exportExcel_New(x.export, this.ExportCategory[0].categoryId);
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          console.log('Error');
        },
      });
  }
  exportExcel(data: Array<any>, id: any) {
    this.colums = new Array<WorkshreetColums>();
    let workbook = new Workbook();
    let FileName = 'test';

    this._profileService.getExportFileNameData(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        FileName = x;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    let worksheet = workbook.addWorksheet(FileName);

    for (const element of Object.keys(data[0])) {
      if (element == 'photo2') {
        this.colums.push({ header: 'Photo', key: 'photonew', style: {} });
      } else {
        if (element != 'photo') {
          const f = this.ExportCategory2.find(
            (x) => x.fieldActualName == element
          );

          console.log(JSON.stringify(f));

          let f2 = element;

          if (f != undefined) {
            f2 = f.fieldDisplayName;
          }

          this.colums.push({ header: f2, key: element, style: {} });
        }
      }
    }
    worksheet.columns = this.colums;
    let c = 1;
    data.forEach((e) => {

      if (e.photo2 != null) {
        const imageId2 = workbook.addImage({
          base64: e.photo2,
          extension: 'jpeg',
        });

        worksheet.addImage(imageId2, {
          tl: { col: 1, row: c },
          ext: { width: 50, height: 50 },
        });
      }

      worksheet.addRow(e, 'n');
      if (e.photo2 != null) {
        worksheet.getRow(c + 1).height = 38;
      }
      else {
        worksheet.getRow(c + 1).height = 15;
      }

      worksheet.getRow(c + 1).alignment = { vertical: 'middle', horizontal: 'left' };
      let cc = 1;
      for (const element of this.colums) {
        worksheet.getRow(1).getCell(cc).border = {
          top: { style: 'thin', color: { argb: '#000000' } },
          left: { style: 'thin', color: { argb: '#000000' } },
          bottom: { style: 'thin', color: { argb: '#000000' } },
          right: { style: 'thin', color: { argb: '#000000' } },
        };

        worksheet.getRow(c + 1).getCell(cc).border = {
          top: { style: 'thin', color: { argb: '#000000' } },
          left: { style: 'thin', color: { argb: '#000000' } },
          bottom: { style: 'thin', color: { argb: '#000000' } },
          right: { style: 'thin', color: { argb: '#000000' } },
        };
        cc = cc + 1;
      }

      worksheet.getRow(1).height = 20;
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };

      // worksheet.getCell('B'+(c+1)).alignment = { vertical: 'middle', horizontal: 'center' };
      c = c + 1;
    });

    // worksheet.getCell(Object.keys(this.data[0]).length+1).alignment = { wrapText: true };

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, FileName + "( " + Date.now() + " )" + '.xlsx');
    });
  }
  exportExcel_Customize(data: Array<any>, name: any) {
    this.colums = new Array<WorkshreetColums>();
    let workbook = new Workbook();




    let worksheet = workbook.addWorksheet(name);

    for (const element of Object.keys(data[0])) {
      if (element == 'photo2') {
        this.colums.push({ header: 'Photo', key: 'photonew', style: {} });
      } else {
        if (element != 'photo') {
          const f = this.ExportCategory2.find(
            (x) => x.fieldActualName == element
          );

          console.log(JSON.stringify(f));

          let f2 = element;

          if (f != undefined) {
            f2 = f.fieldDisplayName;
          }

          this.colums.push({ header: f2, key: element, style: {} });
        }
      }
    }
    worksheet.columns = this.colums;
    let c = 1;
    data.forEach((e) => {
      if (e.photo2 != null) {
        const imageId2 = workbook.addImage({
          base64: e.photo2,
          extension: 'jpeg',
        });

        worksheet.addImage(imageId2, {
          tl: { col: 1, row: c },
          ext: { width: 50, height: 50 },
        });
      }

      worksheet.addRow(e, 'n');
      if (e.photo2 != null) {
        worksheet.getRow(c + 1).height = 38;
      }
      else {
        worksheet.getRow(c + 1).height = 15;
      }
      worksheet.getRow(c + 1).alignment = { vertical: 'middle', horizontal: 'left' };
      let cc = 1;
      for (const element of this.colums) {
        worksheet.getRow(1).getCell(cc).border = {
          top: { style: 'thin', color: { argb: '#000000' } },
          left: { style: 'thin', color: { argb: '#000000' } },
          bottom: { style: 'thin', color: { argb: '#000000' } },
          right: { style: 'thin', color: { argb: '#000000' } },
        };

        worksheet.getRow(c + 1).getCell(cc).border = {
          top: { style: 'thin', color: { argb: '#000000' } },
          left: { style: 'thin', color: { argb: '#000000' } },
          bottom: { style: 'thin', color: { argb: '#000000' } },
          right: { style: 'thin', color: { argb: '#000000' } },
        };
        cc = cc + 1;
      }

      worksheet.getRow(1).height = 20;
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };

      // worksheet.getCell('B'+(c+1)).alignment = { vertical: 'middle', horizontal: 'center' };
      c = c + 1;
    });

    // worksheet.getCell(Object.keys(this.data[0]).length+1).alignment = { wrapText: true };

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, name + "( " + Date.now() + " )" + '.xlsx');
    });
  }
  exportExcel_New(data: Array<any>, id: any) {
    let FileName = '';
    this.colums = new Array<WorkshreetColums>();
    let workbook = new Workbook();

    this._profileService.getExportFileNameData(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        FileName = x;
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
    let worksheet = workbook.addWorksheet(FileName);

    this._profileService.getExportHeadersData(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        for (const element of Object.keys(data[0])) {
          if (element == 'photo2') {
            this.colums.push({
              header: 'Photo',
              key: 'photonew',
              style: {},
            });
          } else {
            if (element != 'photo') {
              const f = x.find((y) => y.actualName == element);

              let f2 = element;

              if (f != undefined) {
                f2 = f.displayName;
              }

              this.colums.push({ header: f2, key: element, style: {} });
            }
          }
        }

        worksheet.columns = this.colums;
        let c = 1;
        data.forEach((e) => {
          if (e.photo2 != null) {
            const imageId2 = workbook.addImage({
              base64: e.photo2,
              extension: 'jpeg',
            });

            worksheet.addImage(imageId2, {
              tl: { col: 1, row: c },
              ext: { width: 50, height: 50 },
            });
          }

          worksheet.addRow(e, 'n');
          if (e.photo2 != null) {
            worksheet.getRow(c + 1).height = 38;
          }
          else {
            worksheet.getRow(c + 1).height = 15;
          }
          worksheet.getRow(c + 1).alignment = { vertical: 'middle', horizontal: 'left' };
          let cc = 1;
          for (const element of this.colums) {
            worksheet.getRow(1).getCell(cc).border = {
              top: { style: 'thin', color: { argb: '#000000' } },
              left: { style: 'thin', color: { argb: '#000000' } },
              bottom: { style: 'thin', color: { argb: '#000000' } },
              right: { style: 'thin', color: { argb: '#000000' } },
            };

            worksheet.getRow(c + 1).getCell(cc).border = {
              top: { style: 'thin', color: { argb: '#000000' } },
              left: { style: 'thin', color: { argb: '#000000' } },
              bottom: { style: 'thin', color: { argb: '#000000' } },
              right: { style: 'thin', color: { argb: '#000000' } },
            };
            cc = cc + 1;
          }

          worksheet.getRow(1).height = 20;
          worksheet.getRow(1).font = { bold: true };
          worksheet.getRow(1).alignment = {
            vertical: 'middle',
            horizontal: 'center',
          };

          // worksheet.getCell('B'+(c+1)).alignment = { vertical: 'middle', horizontal: 'center' };
          c = c + 1;
        });

        // worksheet.getCell(Object.keys(this.data[0]).length+1).alignment = { wrapText: true };
        // let start = 0;
        // let end = 1;
        // let itsId: any = undefined;
        // data.forEach((e) => {

        //   if (itsId == undefined) {
        //     itsId = e.itsId;
        //     const count = data.filter(x => x.itsId == itsId).length;
        //     start = end + 1;
        //     end = count + (start - 1);
        //     //worksheet.mergeCells('A2:A6');

        //     worksheet.mergeCells('A' + start + ':' + 'A' + end);
        //     worksheet.mergeCells('B' + start + ':' + 'B' + end);
        //     worksheet.mergeCells('C' + start + ':' + 'C' + end);
        //     worksheet.mergeCells('D' + start + ':' + 'D' + end);
        //     worksheet.mergeCells('E' + start + ':' + 'E' + end);
        //     worksheet.mergeCells('F' + start + ':' + 'F' + end);
        //     worksheet.mergeCells('G' + start + ':' + 'G' + end);
        //   }
        //   else {
        //     if (itsId != e.itsId) {
        //       itsId = e.itsId;
        //       const count = data.filter(x => x.itsId == itsId).length;
        //       start = end + 1;
        //       end = count + (start - 1);

        //       worksheet.mergeCells('A' + start + ':' + 'A' + end);
        //       worksheet.mergeCells('B' + start + ':' + 'B' + end);
        //       worksheet.mergeCells('C' + start + ':' + 'C' + end);
        //       worksheet.mergeCells('D' + start + ':' + 'D' + end);
        //       worksheet.mergeCells('E' + start + ':' + 'E' + end);
        //       worksheet.mergeCells('F' + start + ':' + 'F' + end);
        //       worksheet.mergeCells('G' + start + ':' + 'G' + end);
        //     }

        //   }

        // });

        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          fs.saveAs(blob, FileName + "( " + Date.now() + " )" + '.xlsx');
        });
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
  exportBasic() {
    const count = this.khidmatGuzaars.filter((x) => x.select == true).length;

    if (count == 0) {
      alert('Kindly select KGs');
      return;
    }

    this._loader.callLoaderMethod('show');
    this._profileService.GetBasicExportData(this.khidmatGuzaars).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        console.log(JSON.stringify(x));
        // this.exportExcel(x);
        this.exportExcel_New(x, 2);
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });
  }
  exportBasicWithoutPhoto() {
    const count = this.khidmatGuzaars.filter((x) => x.select == true).length;

    if (count == 0) {
      alert('Kindly select KGs');
      return;
    }

    this._loader.callLoaderMethod('show');
    this._profileService
      .GetBasicExportDataWithoutPhoto(this.khidmatGuzaars)
      .subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');

          console.log(JSON.stringify(x));
          this.exportExcel_New(x, 1);
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          swal('Error!', err.error.message, 'error');
        },
      });
  }
  ListSelectAll() {
    if (this.listselectAll == true) {
      for (var y in this.filterMetadata.data) {
        this.filterMetadata.data[y].select = false;
      }
    } else {
      for (var y in this.filterMetadata.data) {
        this.filterMetadata.data[y].select = true;
      }
    }
  }
  clearselections() {
    for (let i = 0; i < this.ExportCategory.length; i++) {

      for (let j = 0; j < this.ExportCategory[i].toRemove.length; j++) {
        this.ExportCategory[i].toRemove[j].status = false;
      }

    }
  }

  selectall_suppress() {
    if (this.suppressSelectall == true) {
      this.suppress.aboutyourself = false;
      this.suppress.academic = false;
      this.suppress.basic = false;
      this.suppress.contact = false;
      this.suppress.cw = false;
      this.suppress.family = false;
      this.suppress.foi = false;
      this.suppress.house = false;
      this.suppress.khidmat = false;
      this.suppress.khidmatm = false;
      this.suppress.lp = false;
      this.suppress.otheridara = false;
      this.suppress.pastmm = false;
      this.suppress.personality = false;
      this.suppress.qualification = false;
      this.suppress.salary = false;
    } else {
      this.suppress.aboutyourself = true;
      this.suppress.academic = true;
      this.suppress.basic = true;
      this.suppress.contact = true;
      this.suppress.cw = true;
      this.suppress.family = true;
      this.suppress.foi = true;
      this.suppress.house = true;
      this.suppress.khidmat = true;
      this.suppress.khidmatm = true;
      this.suppress.lp = true;
      this.suppress.otheridara = true;
      this.suppress.pastmm = true;
      this.suppress.personality = true;
      this.suppress.qualification = true;

      if (this.SalaryPage == true) {
        this.suppress.salary = true;
      }
    }
  }

  clearcheckboxes() {
    for (var y in this.filterMetadata.data) {
      this.filterMetadata.data[y].select = false;
    }
  }
}
