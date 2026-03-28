import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LegalEntityCreateComponent } from './legal-entity-create.component';

describe('LegalEntityCreateComponent', () => {
  let component: LegalEntityCreateComponent;
  let fixture: ComponentFixture<LegalEntityCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalEntityCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalEntityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
