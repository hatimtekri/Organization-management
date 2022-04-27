import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import { ToastrService } from 'ngx-toastr';
import { DropDownData } from 'src/app/AAAA_Models/DropDown_Data-Model';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';
import { WafdTrainingSummary } from 'src/app/AAAA_Models/WafdTrainingSummary-Model';
import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';
import { AuthService } from 'src/app/Services/auth.service';
import { FacultyProfileService } from '../../Services/faculty-profile.service';
import { LoaderService } from '../../Services/loader.service';
import * as fs from 'file-saver';
declare var swal: any;

@Component({
  selector: 'app-wh-training',
  templateUrl: './wh-training.component.html',
  styleUrls: ['./wh-training.component.scss']
})
export class WhTrainingComponent implements OnInit {

  public itsIdDD = new Array<DropDownData>();
  public nameDD = new Array<DropDownData>();
  public mozeDD = new Array<DropDownData>();
  public farigFromDD = new Array<DropDownData>();
  public farigDarajahDD = new Array<DropDownData>();
  public trainingDarajaDD = new Array<DropDownData>();
  public SummaryData = new Array<any>();
  public colums = Array<WorkshreetColums>();
  sectionId: any;

  public zipAssignment: any;
  public zipYear: any;
  public zipMonth: any;
  public zipTrainingDarajah: any;
  public zipMiqaat: any;
  public zipDarajahMultiple: any;
  //public searchObject:any;
  public assignmentDD = [
    { id: 1, name: 'Book/Magazine Review' },
    { id: 2, name: 'Nazam' },
    { id: 3, name: 'Essay (LSD/Arabic/Eng)' },
  ];

  public darajahDD = [
    { id: 13, name: '5' },
    { id: 14, name: '6' },
    { id: 15, name: '7' },
    { id: 16, name: '8' },
    { id: 17, name: '9' },
    { id: 18, name: '10' },
    { id: 19, name: '11' }
  ];

  public monthDD = [
    { id: 1, },
    { id: 2, },
    { id: 3, },
    { id: 4, },
    { id: 5, },
    { id: 6, },
    { id: 7, },
    { id: 8, },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
  ];

  public yearDD = [
    { year: 1443 }
  ];

  public miqaatDD = [
    {
      id: 1,
      name: "Milad SMS T.A (Lailatul Qadr)"
    },
    {
      id: 2,
      name: "Eid al-Fitr"
    },
    {
      id: 3,
      name: "Milad STS R.A"
    },
    {
      id: 4,
      name: "Ashara Mubaraka"
    },
    {
      id: 5,
      name: "Milad al-Nabi S.A.W"
    },
    {
      id: 6,
      name: "Urs SMB R.A"
    },
    {
      id: 7,
      name: "Milad Imam al-Zaman A.S"
    },
    {
      id: 8,
      name: "Milad SMB R.A"
    }
  ];

  selectall_basic: any;
  selectall_training: any;
  public ExportCategory = new Array<any>();
  public ExportCategory2 = new Array<any>();
  listselectAll: any;

  constructor(private toastr: ToastrService,
    private _router: Router,
    private route: ActivatedRoute,
    private _profileService: FacultyProfileService,
    private _authService: AuthService,
    private _loader: LoaderService) { }

  public columndisplay = new WafdTrainingSummary();
  public filterMetadata = { count: 0, data: new Array<any>() };
  itsId: number = 0;
  
  public searchObject = new FacultyProfile();

  ngOnInit(): void {
    this.selectall_basic = false;

    this._loader.callLoaderMethod('show');
    this._profileService.getWafdTrainingSummary().subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
        //console.log(JSON.stringify(x));
        this.SummaryData = x.model;
        this.farigDarajahDD = x.farigDarajDD;
        this.farigFromDD = x.categoryDD;
        this.trainingDarajaDD = x.trainingDarajaDD;
        this.mozeDD = x.mozeDD;
        this.nameDD = x.nameDD;
        this.itsIdDD = x.itsIdDD;
        this.columndisplay.show_age = true;
        this.columndisplay.show_farigdarajah = true;
        this.columndisplay.show_farigfrom = true;
        this.selectall_training = true;
        this.ExportCategory2 = x.exportDisplayFields;

        console.log(JSON.stringify(this.ExportCategory2));

        // for (let i = 0; i < this.SummaryData.length; i++) {
        //   this.SummaryData[i].overAllPercentage = (this.SummaryData[i].totalMarks/this.SummaryData[i].outOf)*100;
        //   this.SummaryData[i].overAllPercentage=this.SummaryData[i].overAllPercentage.toFixed(2);
        // }

      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    // this._profileService.getDropdownData(20).subscribe({
    //   next: (x) => {
    //     this._loader.callLoaderMethod('hide');
    //     this.farigDarajagDD = x.data;
    //   },
    //   error: (err) => {
    //     this._loader.callLoaderMethod('hide');
    //   },
    // });
  }

  selectAll_basic() {

    this.columndisplay.show_its = !this.selectall_basic;
    this.columndisplay.show_age = !this.selectall_basic;
    this.columndisplay.show_mobile = !this.selectall_basic;
    this.columndisplay.show_whatsapp = !this.selectall_basic;
    this.columndisplay.show_primary = !this.selectall_basic;
    this.columndisplay.show_farigyear = !this.selectall_basic;
    this.columndisplay.show_farigdarajah = !this.selectall_basic;
    this.columndisplay.show_farigfrom = !this.selectall_basic;
    this.columndisplay.show_hifzyear = !this.selectall_basic;
  }

  selectAll_training() {

    this.columndisplay.show_assessmentstart = !this.selectall_training;
    this.columndisplay.show_assessmenttill = !this.selectall_training;
    this.columndisplay.show_quranikh = !this.selectall_training;
    this.columndisplay.show_maqraatattended = !this.selectall_training;
    this.columndisplay.show_maqraatmarks = !this.selectall_training;
    this.columndisplay.show_essaycount = !this.selectall_training;
    this.columndisplay.show_essaymarks = !this.selectall_training;
    this.columndisplay.show_bmcount = !this.selectall_training;
    this.columndisplay.show_bmmarks = !this.selectall_training;
    this.columndisplay.show_nazamcount = !this.selectall_training;
    this.columndisplay.show_nazammarks = !this.selectall_training;
    this.columndisplay.show_isitinsakhcompletion = !this.selectall_training;
    this.columndisplay.show_istinsakhmarks = !this.selectall_training;
    this.columndisplay.show_researchlongessaypaper = !this.selectall_training;
    this.columndisplay.show_cwcount = !this.selectall_training;
    this.columndisplay.show_cwcountmarks = !this.selectall_training;
    this.columndisplay.show_totalhours = !this.selectall_training;
    this.columndisplay.show_totalhoursmarks = !this.selectall_training;
    this.columndisplay.show_cwmarks = !this.selectall_training;
    this.columndisplay.show_fitnesscount = !this.selectall_training;
    this.columndisplay.show_fitnessmarks = !this.selectall_training;
    this.columndisplay.show_bmiValue = !this.selectall_training;
    this.columndisplay.show_bmiMarks = !this.selectall_training;
    this.columndisplay.show_totalmarks = !this.selectall_training;
    this.columndisplay.show_outof = !this.selectall_training;
    this.columndisplay.show_overallpercentage = !this.selectall_training;
  }

  callZipApi() {
    if (this.zipAssignment == null || this.zipAssignment == undefined || this.zipAssignment == '') {
      alert('Kindly select Assignment Type');
      return;
    }
    //console.log(this.zipAssignment);
    if (this.zipAssignment == 1) {
      //console.log('inside 3');
      this.brZipFile();
    }
    else if (this.zipAssignment == 2) {
      //console.log('inside 2');

      this.nazamZipFile();
    }
    else if (this.zipAssignment == 3) {
      //console.log('inside 3');
      this.inshaZipFile();
    }

  }

  inshaZipFile() {
    this._loader.callLoaderMethod('show');
    this._profileService.getInshaZipfile(this.zipYear, this.zipMonth, this.zipTrainingDarajah).subscribe({
      next: (x) => {

        this.downloadZip(x);
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        console.log(JSON.stringify(err));
      },
    });
  }

  brZipFile() {
    this._loader.callLoaderMethod('show');
    this._profileService.getBRZipfile(this.zipYear, this.zipMonth, this.zipTrainingDarajah).subscribe({
      next: (x) => {

        this.downloadZip(x);
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        console.log(JSON.stringify(err));
      },
    });
  }

  nazamZipFile() {
    let data = {
      darajah: this.zipDarajahMultiple.join(','),
      miqaatId: this.zipMiqaat,
      acedamicYear: this.zipYear,

    };
    console.log(JSON.stringify(data));
    this._loader.callLoaderMethod('show');
    this._profileService.getNazamZipfile(data).subscribe({
      next: (x) => {

        this.downloadZip(x);
        this._loader.callLoaderMethod('hide');
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        console.log(JSON.stringify(err));
      },
    });
  }

  downloadZip(uri: any) {
    let link = document.createElement("a");

    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }

  Export_Basic(id: number) {

    const count = this.SummaryData.filter((x) => x.select == true).length;

    if (count == 0) {
      alert('Kindly select KGs');
      return;
    }

    this._loader.callLoaderMethod('show');
    this.ExportCategory = new Array<any>();
    this.ExportCategory.push({ model: this.SummaryData, categoryId: id });


    this._profileService.Get_WHTrainingDataToExport(this.ExportCategory).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');

        if (id == 13) {
          this.exportExcel_WithOutPhoto(x.export, x.fileName);

        }
        else {
          this.exportExcel_WithPhoto(x.export, x.fileName);

        }



      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        console.log('Error');
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

  exportExcel_WithPhoto(data: Array<any>, name: any) {
    this.colums = new Array<WorkshreetColums>();
    let workbook = new Workbook();


    let worksheet = workbook.addWorksheet(name);

    for (const element of Object.keys(data[0])) {
      if (element == 'photo2') {
        this.colums.push({ header: 'Photo', key: 'photonew', style: {} });
      } else {
        if (element != 'photo') {
          const f = this.ExportCategory2.find(
            (x) => x.propertyName == element
          );

          console.log(JSON.stringify(f));

          let f2 = element;

          if (f != undefined) {
            f2 = f.propertyDisplayName;
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
      fs.saveAs(blob, name + '.xlsx');
    });
  }
  exportExcel_WithOutPhoto(data: Array<any>, name: any) {
    this.colums = new Array<WorkshreetColums>();
    let workbook = new Workbook();



    let worksheet = workbook.addWorksheet(name);

    for (const element of Object.keys(data[0])) {

      if (element != 'photo') {
        const f = this.ExportCategory2.find(
          (x) => x.propertyName == element
        );

        console.log(JSON.stringify(f));

        let f2 = element;

        if (f != undefined) {
          f2 = f.propertyDisplayName;
        }

        this.colums.push({ header: f2, key: element, style: {} });
      }

    }
    worksheet.columns = this.colums;
    let c = 1;
    data.forEach((e) => {


      worksheet.addRow(e, 'n');


      worksheet.getRow(c + 1).height = 15;

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
      fs.saveAs(blob, name + '.xlsx');
    });
  }

  ExportSection() {
    const count = this.SummaryData.filter((x) => x.select == true).length;

    if (count == 0) {
      alert('Kindly select KGs');
      return;
    }

    this._loader.callLoaderMethod('show');
    

    this.ExportCategory = new Array<any>();
    this.ExportCategory.push({ model: this.SummaryData, categoryId:this.sectionId });


    this._profileService
      .GetWafdExportTrainingSectionData(this.ExportCategory)
      .subscribe({
        next: (x) => {
          this._loader.callLoaderMethod('hide');

          this.exportExcel_New(x.export, this.ExportCategory[0].categoryId);
        },
        error: (err) => {
          this._loader.callLoaderMethod('hide');
          console.log(err);
        },
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

}
