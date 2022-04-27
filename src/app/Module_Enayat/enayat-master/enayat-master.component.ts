import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FacultyProfile } from 'src/app/AAAA_Models/FacultyProfile-Model';
import { User } from 'src/app/AAAA_Models/User-Model';
import { FacultyProfileService } from 'src/app/Modules_Admin/Services/faculty-profile.service';
import { LoaderService } from 'src/app/Modules_Admin/Services/loader.service';
import { AuthService } from 'src/app/Services/auth.service';

declare var $: any;
@Component({
  selector: 'app-enayat-master',
  templateUrl: './enayat-master.component.html',
  styleUrls: ['./enayat-master.component.scss']
})
export class EnayatMasterComponent implements OnInit {

  windowScrolled: any;
  constructor(
    private _loaderService: LoaderService,
    private _spinner: NgxSpinnerService,
    private _authService: AuthService,
    private _router: Router,
    private titleService: Title,
    private _profileService: FacultyProfileService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this._loaderService.getLoaderObservables().subscribe({
      next: (x) => {
        if (x == 'show') {
          this._spinner.show();
        } else if (x == 'hide') {
          this._spinner.hide();
        }
      },
      error: (err) => { },
    });

    this.titleService.setTitle("MZ Enayat");
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 4));
      }
    })();
  }


  public profileData = new FacultyProfile();
  public user1 = new User();
  ngOnInit(): void {
    this._authService.getUser().subscribe({
      next: (x) => {
        this.user1 = x;

        this._profileService.setITSIDData3(this.user1.itsId);
        console.log(JSON.stringify(x));
      },
      error: (er) => { },
    });


    $(document).ready(function () {
      $(document).on('click', '#sidebarCollapse', function () {
        console.log("Step - 1");
        $('#sidebar').toggleClass('active');
        if ($('#content').css('margin-left') == '0px') {
          $('#content').css('margin-left', '250px');
        } else if ($('#content').css('margin-left') == '250px') {
          $('#content').css('margin-left', '0px');
        }
        // $('#content').css('margin-left','250px');
        //console.log($('#content').css('margin-left'));
        $('#sidebar').css({ height: '100%', position: 'fixed' });
      });
      $('ul.collapse > li > a').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#content').css('margin-left', '0');
      });
      $('ul > li.anything > a').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#content').css('margin-left', '0');
      });
    });

    $(document).ready(function () {
      $(window).scroll(function () {
        if (document.documentElement.scrollTop > 50) {
          console.log("scrolling down");
          $('#back-to-top').css("display", "block");
          console.log("fade in");
        } else {
          $('#back-to-top').css("display", "none");
        }
      });
      // scroll body to 0px on click
      $('#back-to-top').click(function () {
        //document.documentElement.scrollTop = 0;
        $('#content').animate({
          scrollTop: 0
        }, 400);
        return false;
      });
    });

    // $(document).ready(function () {
    //   $('#sidebarCollapse').on('click', function () {
    //     $('#sidebar').toggleClass('active');
    //   });
    // });
  }

  logout() {

    localStorage.removeItem('newtoken');
    this._router.navigate(['/adminlogin']);
    localStorage.removeItem('countnew');
  }

}
