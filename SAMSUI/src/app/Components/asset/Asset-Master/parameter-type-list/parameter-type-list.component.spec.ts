import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParameterTypeListComponent } from './parameter-type-list.component';

describe('ParameterTypeListComponent', () => {
  let component: ParameterTypeListComponent;
  let fixture: ComponentFixture<ParameterTypeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
