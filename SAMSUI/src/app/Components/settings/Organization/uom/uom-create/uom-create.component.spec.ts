import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UomCreateComponent } from './uom-create.component';

describe('UomCreateComponent', () => {
  let component: UomCreateComponent;
  let fixture: ComponentFixture<UomCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UomCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UomCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
