import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegionCreateComponent } from './region-create.component';

describe('RegionCreateComponent', () => {
  let component: RegionCreateComponent;
  let fixture: ComponentFixture<RegionCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
