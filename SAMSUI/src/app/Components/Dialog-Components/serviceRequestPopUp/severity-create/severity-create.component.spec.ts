import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeverityCreateComponent } from './severity-create.component';

describe('SeverityCreateComponent', () => {
  let component: SeverityCreateComponent;
  let fixture: ComponentFixture<SeverityCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeverityCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeverityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
