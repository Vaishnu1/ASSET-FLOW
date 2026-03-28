import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LegalEntityViewComponent } from './legal-entity-view.component';

describe('LegalEntityViewComponent', () => {
  let component: LegalEntityViewComponent;
  let fixture: ComponentFixture<LegalEntityViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalEntityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalEntityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
