import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';
import { VendorDetailsService } from 'src/app/Services/Expense/vendor-details.service';
declare var swal: any;

@Component({
  selector: 'app-view-bill-pdf',
  templateUrl: './view-bill-pdf.component.html',
  styleUrls: ['./view-bill-pdf.component.scss']
})
export class ViewBillPdfComponent implements OnInit {

  id: any;
  bankDetails:any;

  constructor(
    private _vendorService: VendorDetailsService,
    private _loader: LoaderService,
    private toastr: ToastrService,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('billId');

    this._loader.callLoaderMethod('show');
    this._vendorService.getBillBankDetails(this.id).subscribe({
      next: (x) => {
        this.bankDetails = x[0];
        this._loader.callLoaderMethod('hide');
        window.print();
      },
      error: (err) => {

        this._loader.callLoaderMethod('hide');
        swal('Error!', err.error.message, 'error');
      },
    });

    
  }

}
