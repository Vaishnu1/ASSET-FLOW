import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterGroupCreateComponent } from './parameter-group-create.component';

describe('ParameterGroupCreateComponent', () => {
  let component: ParameterGroupCreateComponent;
  let fixture: ComponentFixture<ParameterGroupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterGroupCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
