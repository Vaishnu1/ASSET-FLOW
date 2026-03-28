import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InactiveAssetsComponent } from './inactive-assets.component';

describe('InactiveAssetsComponent', () => {
  let component: InactiveAssetsComponent;
  let fixture: ComponentFixture<InactiveAssetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
