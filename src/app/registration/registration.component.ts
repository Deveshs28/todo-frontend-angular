import { Component, OnInit } from '@angular/core';
import { TodoHttpService } from '../todo-http.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  public firstName: string;
  public lastName: string;
  public emailId: string;
  public password: string;
  public mobileNumber: string;
  public countryCode: string;
  public countryCodeArr = [];
  public loading = false;
  public emailPattern = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';

  constructor(
    private todoHttpService: TodoHttpService,
    private _route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCountryCode();
  }

  public registerUser = () => {
    if (!this.firstName) {
      this.toastr.warning('Enter first name');
    } else if (!this.lastName) {
      this.toastr.warning('Enter last name');
    } else if (!this.emailId) {
      this.toastr.warning('Enter email');
    } else if (!this.password) {
      this.toastr.warning('Enter password');
    } else if (!this.mobileNumber) {
      this.toastr.warning('Enter mobile number');
    } else if (!this.countryCode) {
      this.toastr.error('Select Country Code');
    } else if (this.countryCode === 'Country Code') {
      this.toastr.error('Select Country Code');
    } else {
      let data = {
        email: this.emailId,
        mobileNumber: this.mobileNumber,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        countryCode: this.countryCode,
      };

      this.loading = true;
      this.todoHttpService.register(data).subscribe(
        (apiResponse) => {
          this.loading = false;
          console.log(apiResponse);
          if (apiResponse.status === 200) {
            this.toastr.success('Registration Successful');
            this.router.navigate(['/login']);
          } else {
            this.toastr.error('Error while registration');
          }
        },
        (err) => {
          this.loading = false;
          if (err.status === 404 || err.status === 500) {
            this.router.navigate([
              '/serverError',
              `${err.status}`,
              `${err.error.message}`,
            ]);
          } else {
            this.toastr.error(err.error.message);
          }
        }
      );
    }
  };

  private getCountryCode() {
    this.countryCodeArr = [
      '880',
      '32',
      '226',
      '359',
      '387',
      '+1-246',
      '681',
      '590',
      '+1-441',
      '673',
      '591',
      '973',
      '257',
      '229',
      '975',
      '+1-876',
      '267',
      '685',
      '599',
      '55',
      '+1-242',
      '+44-1534',
      '375',
      '501',
      '7',
      '250',
      '381',
      '670',
      '262',
      '993',
      '992',
      '40',
      '690',
      '245',
      '+1-671',
      '502',
      '30',
      '240',
      '590',
      '81',
      '592',
      '+44-1481',
      '594',
      '995',
      '+1-473',
      '44',
      '241',
      '503',
      '224',
      '220',
      '299',
      '350',
      '233',
      '968',
      '216',
      '962',
      '385',
      '509',
      '36',
      '852',
      '504',
      '58',
      '+1-787',
      '970',
      '680',
      '351',
      '47',
      '595',
      '964',
      '507',
      '689',
      '675',
      '51',
      '92',
      '63',
      '870',
      '48',
      '508',
      '260',
      '212',
      '372',
      '20',
      '27',
      '593',
      '39',
      '84',
      '677',
      '251',
      '252',
      '263',
      '966',
      '34',
      '291',
      '382',
      '373',
      '261',
      '590',
      '212',
      '377',
      '998',
      '95',
      '223',
      '853',
      '976',
      '692',
      '389',
      '230',
      '356',
      '265',
      '960',
      '596',
      '+1-670',
      '+1-664',
      '222',
      '+44-1624',
      '256',
      '255',
      '60',
      '52',
      '972',
      '33',
      '246',
      '290',
      '358',
      '679',
      '500',
      '691',
      '298',
      '505',
      '31',
      '47',
      '264',
      '678',
      '687',
      '227',
      '672',
      '234',
      '64',
      '977',
      '674',
      '683',
      '682',
      '225',
      '41',
      '57',
      '86',
      '237',
      '56',
      '61',
      '1',
      '242',
      '236',
      '243',
      '420',
      '357',
      '61',
      '506',
      '599',
      '238',
      '53',
      '268',
      '963',
      '599',
      '996',
      '254',
      '211',
      '597',
      '686',
      '855',
      '+1-869',
      '269',
      '239',
      '421',
      '82',
      '386',
      '850',
      '965',
      '221',
      '378',
      '232',
      '248',
      '7',
      '+1-345',
      '65',
      '46',
      '249',
      '+1-809',
      '+1-767',
      '253',
      '45',
      '+1-284',
      '49',
      '967',
      '213',
      '1',
      '598',
      '262',
      '1',
      '961',
      '+1-758',
      '856',
      '688',
      '886',
      '+1-868',
      '90',
      '94',
      '423',
      '371',
      '676',
      '370',
      '352',
      '231',
      '266',
      '66',
      '228',
      '235',
      '+1-649',
      '218',
      '379',
      '+1-784',
      '971',
      '376',
      '+1-268',
      '93',
      '+1-264',
      '+1-340',
      '354',
      '98',
      '374',
      '355',
      '244',
      '+1-684',
      '54',
      '61',
      '43',
      '297',
      '91',
      '+358-18',
      '994',
      '353',
      '62',
      '380',
      '974',
      '258',
    ];
  }
}
