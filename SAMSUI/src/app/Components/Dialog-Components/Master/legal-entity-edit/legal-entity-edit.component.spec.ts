import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LegalEntityEditComponent } from './legal-entity-edit.component';

describe('LegalEntityEditComponent', () => {
  let component: LegalEntityEditComponent;
  let fixture: ComponentFixture<LegalEntityEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalEntityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalEntityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
