import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelfanalysisCreateComponent } from './selfanalysis-create.component';

describe('SelfanalysisCreateComponent', () => {
  let component: SelfanalysisCreateComponent;
  let fixture: ComponentFixture<SelfanalysisCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfanalysisCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfanalysisCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
