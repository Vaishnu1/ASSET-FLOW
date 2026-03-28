import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFieldSearchComponent } from './custom-field-search.component';

describe('CustomFieldSearchComponent', () => {
  let component: CustomFieldSearchComponent;
  let fixture: ComponentFixture<CustomFieldSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFieldSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFieldSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
