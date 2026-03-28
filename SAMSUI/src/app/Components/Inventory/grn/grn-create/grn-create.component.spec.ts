import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GrnCreateComponent } from './grn-create.component';

describe('GrnCreateComponent', () => {
  let component: GrnCreateComponent;
  let fixture: ComponentFixture<GrnCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
