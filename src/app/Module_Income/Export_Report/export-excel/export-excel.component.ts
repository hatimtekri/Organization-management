import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import { ToastrService } from 'ngx-toastr';
import { Reciept } from 'src/app/AAAA_Models/RecieptModel';
import { ReportFilter } from 'src/app/AAAA_Models/ReportFilter-Model';
import { WorkshreetColums } from 'src/app/AAAA_Models/Worksheet_colums';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { MedicalService } from 'src/app/Modules_Admin/Services/medical.service';
import { AuthService } from 'src/app/Services/auth.service';
declare var swal: any;
import * as fs from 'file-saver';

@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.scss']
})
export class ExportExcelComponent implements OnInit {

  reportListDD = [
    { id: 43, name: 'Hub Received' },
    { id: 44, name: 'Student Fees Aging Report' },
    { id: 45, name: 'Student Allotment Report' },
    { id: 46, name: 'Student EWallet Report' },
    
  ];
  public FieldNames = new Array<any>();
  id:any;
  public colums = Array<WorkshreetColums>();
  constructor( private _medicalService: MedicalService,private _profileService: FacultyProfileService, private _loader: LoaderService, private toastr: ToastrService,private _authService:AuthService) { }
  searchObject = new Reciept();
  page:any;
  ngOnInit(): void {
    this._loader.callLoaderMethod('show');
    this._authService.getAdminRights().subscribe({
      next: (x) => {
        this.page = x.includes(77);

        if (this.page == true) {
          this._loader.callLoaderMethod('hide');
        }
        else
        {
        this._loader.callLoaderMethod('hide');

        }
      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
      },
    });

  }

  search() {



    // if (this.searchObject.fromDate1 != undefined) {

    //   if (this.searchObject.toDate1 == null || this.searchObject.toDate1 == undefined) {
    //     alert('Kindly enter to Date');
    //     return;
    //   }


      this.searchObject.fromDate = new Date(this.searchObject.fromDate1 ?? '');
      this.searchObject.toDate = new Date(this.searchObject.toDate1 ?? '');

      this.searchObject.fromDate.setDate(this.searchObject.fromDate.getDate() + 1);
      this.searchObject.toDate.setDate(this.searchObject.toDate.getDate() + 1);


    // }
    if (this.id == undefined || this.id == "" ) 
      {
        alert('Kindly select report');
        return;
      }

    let report = new ReportFilter();

    report.id = this.id;
    report.fromDate=this.searchObject.fromDate;
    report.toDate=this.searchObject.toDate;
    this._loader.callLoaderMethod('show');
  
    this._medicalService.exportReport(report).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');
    console.log(x.rData);
    if(this.id == 45)
    {
      this.exportExcel(JSON.parse(x.rData), 18);

    }
    else if(this.id == 43)
    {
      this.exportExcel(JSON.parse(x.rData), 16);

    }
    else if(this.id == 44)
    {
      this.exportExcel(JSON.parse(x.rData), 19);

    }
    else if(this.id == 46)
    {
      this.exportExcel(JSON.parse(x.rData), 20);

    }



      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
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


    this._profileService.getExportHeadersData(id).subscribe({
      next: (x) => {
        this._loader.callLoaderMethod('hide');


        for (const element of Object.keys(data[0])) {
          if (element == 'photo2') {
            this.colums.push({ header: 'Photo', key: 'photonew', style: {} });
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
    
        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          fs.saveAs(blob, FileName + '.xlsx');
        });



      },
      error: (err) => {
        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });


    
  }

}
