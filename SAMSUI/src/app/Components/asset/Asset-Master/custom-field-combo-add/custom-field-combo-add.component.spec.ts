import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomFieldComboAddComponent } from './custom-field-combo-add.component';

describe('CustomFieldComboAddComponent', () => {
  let component: CustomFieldComboAddComponent;
  let fixture: ComponentFixture<CustomFieldComboAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFieldComboAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFieldComboAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
