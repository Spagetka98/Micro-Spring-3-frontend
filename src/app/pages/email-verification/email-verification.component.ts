import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EmailService } from 'src/app/services/api/email.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink]
})
export class EmailVerificationComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private emailService: EmailService = inject(EmailService);
  private translateService: TranslateService = inject(TranslateService)
  
  public message?: string;
  public isLoading: boolean = false;
  public isValidationFailed: boolean = false;
  public isValidationSuccess: boolean = false;

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.paramMap.get("token");
    if(token) this.validateEmailToken(token);
  }

  private validateEmailToken(token: string): void {
    this.isLoading = true;
    this.isValidationFailed = false;
    this.isValidationSuccess = false;

    this.emailService
      .emailConfirmation(token)
      .subscribe({
        next: () => this.displaySuccessMessage(),
        error: (err) => this.displayErrorMessage(err),
      })
      .add(() => this.isLoading = false);
  }

  private displaySuccessMessage(): void {
    this.isValidationFailed = false;
    this.isValidationSuccess = true;

    this.translateService.get("CONFIRMATION_EMAIL.SUCCESS").subscribe(data => this.message = data)
  }

  private displayErrorMessage(error: HttpErrorResponse): void {
    this.isValidationFailed = true;
    this.isValidationSuccess = false;

    switch (error.status) {
      case 423: {
        this.translateService.get("CONFIRMATION_EMAIL.FAILED_EXPIRATION").subscribe(data => this.message = data)
        break;
      }
      default: {
        this.translateService.get("CONFIRMATION_EMAIL.FAILED_SERVER").subscribe(data => this.message = data)
        break;
      }
    }
  }

}
