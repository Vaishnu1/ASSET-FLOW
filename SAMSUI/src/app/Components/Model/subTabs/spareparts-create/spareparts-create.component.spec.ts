import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SparepartsCreateComponent } from './spareparts-create.component';

describe('SparepartsCreateComponent', () => {
  let component: SparepartsCreateComponent;
  let fixture: ComponentFixture<SparepartsCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SparepartsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparepartsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
