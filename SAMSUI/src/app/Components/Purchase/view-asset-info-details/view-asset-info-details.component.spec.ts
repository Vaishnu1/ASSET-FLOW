import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewAssetInfoDetailsComponent } from './view-asset-info-details.component';

describe('ViewAssetInfoDetailsComponent', () => {
  let component: ViewAssetInfoDetailsComponent;
  let fixture: ComponentFixture<ViewAssetInfoDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAssetInfoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssetInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
