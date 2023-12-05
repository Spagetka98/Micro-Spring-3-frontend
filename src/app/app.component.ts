import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private translateService: TranslateService = inject(TranslateService);
  
  constructor(){
    this.translateService.setDefaultLang("cs");
  }

  switchLanguage(language: string){
    this.translateService.use(language);
  }
}
