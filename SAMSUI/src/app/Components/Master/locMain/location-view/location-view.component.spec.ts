import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocationViewComponent } from './location-view.component';

describe('LocationViewComponent', () => {
  let component: LocationViewComponent;
  let fixture: ComponentFixture<LocationViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
