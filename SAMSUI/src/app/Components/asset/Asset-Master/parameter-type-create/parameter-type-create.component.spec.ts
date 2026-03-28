import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParameterTypeCreateComponent } from './parameter-type-create.component';

describe('ParameterTypeCreateComponent', () => {
  let component: ParameterTypeCreateComponent;
  let fixture: ComponentFixture<ParameterTypeCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
