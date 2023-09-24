import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPassEmailComponent } from './forget-pass-email.component';

describe('ForgetPassEmailComponent', () => {
  let component: ForgetPassEmailComponent;
  let fixture: ComponentFixture<ForgetPassEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetPassEmailComponent]
    });
    fixture = TestBed.createComponent(ForgetPassEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
