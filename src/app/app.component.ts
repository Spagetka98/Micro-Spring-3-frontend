import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _translate: TranslateService){
    _translate.setDefaultLang("cs");
  }

  switchLanguage(language: string){
    this._translate.use(language);
  }
}
