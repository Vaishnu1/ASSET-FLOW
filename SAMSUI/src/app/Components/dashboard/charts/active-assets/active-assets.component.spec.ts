import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActiveAssetsComponent } from './active-assets.component';

describe('ActiveAssetsComponent', () => {
  let component: ActiveAssetsComponent;
  let fixture: ComponentFixture<ActiveAssetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
