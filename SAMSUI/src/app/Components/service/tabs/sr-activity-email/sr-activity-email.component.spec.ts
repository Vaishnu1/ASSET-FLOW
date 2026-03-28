import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SrActivityEmailComponent } from './sr-activity-email.component';

describe('SrActivityEmailComponent', () => {
  let component: SrActivityEmailComponent;
  let fixture: ComponentFixture<SrActivityEmailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SrActivityEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrActivityEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
