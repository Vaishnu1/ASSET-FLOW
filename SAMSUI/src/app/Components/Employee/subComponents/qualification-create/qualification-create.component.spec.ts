import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QualificationCreateComponent } from './qualification-create.component';

describe('QualificationCreateComponent', () => {
  let component: QualificationCreateComponent;
  let fixture: ComponentFixture<QualificationCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
