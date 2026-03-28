import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdditionalinfoCreateComponent } from './additionalinfo-create.component';

describe('AdditionalinfoCreateComponent', () => {
  let component: AdditionalinfoCreateComponent;
  let fixture: ComponentFixture<AdditionalinfoCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalinfoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalinfoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
