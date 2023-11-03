import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EmailService } from 'src/app/services/api/email.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  private token: string | null | undefined;
  public message: string | undefined;
  public isLoading: boolean = false;
  public isConfirmationFailed: boolean = false;
  public isConfirmationSuccess: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _emailService: EmailService,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.token = this._activatedRoute.snapshot.paramMap.get("token");
    if(this.token) this.validateEmailToken(this.token);
  }

  private validateEmailToken(token: string) {
    this.isLoading = true;
    this.isConfirmationFailed = false;
    this.isConfirmationSuccess = false;

    this._emailService
      .emailConfirmation(token)
      .subscribe({
        next: () => this.displaySuccessMessage(),
        error: (err) => this.displayErrorMessage(err),
      })
      .add(() => this.isLoading = false);
  }

  private displaySuccessMessage(): void {
    this.isConfirmationFailed = false;
    this.isConfirmationSuccess = true;

    this._translate.get("CONFIRMATION_EMAIL.SUCCESS").subscribe(data => this.message = data)
  }

  private displayErrorMessage(error: HttpErrorResponse): void {
    this.isConfirmationFailed = true;
    this.isConfirmationSuccess = false;

    switch (error.status) {
      case 423: {
        this._translate.get("CONFIRMATION_EMAIL.FAILED_EXPIRATION").subscribe(data => this.message = data)
        break;
      }
      default: {
        this._translate.get("CONFIRMATION_EMAIL.FAILED_SERVER").subscribe(data => this.message = data)
        break;
      }
    }
  }

}
