import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CertificatesCreateComponent } from './certificates-create.component';

describe('CertificatesCreateComponent', () => {
  let component: CertificatesCreateComponent;
  let fixture: ComponentFixture<CertificatesCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
