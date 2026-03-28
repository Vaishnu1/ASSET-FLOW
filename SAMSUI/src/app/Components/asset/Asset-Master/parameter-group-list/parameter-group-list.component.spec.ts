import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterGroupListComponent } from './parameter-group-list.component';

describe('ParameterGroupListComponent', () => {
  let component: ParameterGroupListComponent;
  let fixture: ComponentFixture<ParameterGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
