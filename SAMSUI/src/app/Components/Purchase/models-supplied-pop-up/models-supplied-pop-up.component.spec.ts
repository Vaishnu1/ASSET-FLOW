import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelsSuppliedPopUpComponent } from './models-supplied-pop-up.component';

describe('ModelsSuppliedPopUpComponent', () => {
  let component: ModelsSuppliedPopUpComponent;
  let fixture: ComponentFixture<ModelsSuppliedPopUpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsSuppliedPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsSuppliedPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
