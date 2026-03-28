import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetViewNhComponent } from './asset-view-nh.component';

describe('AssetViewNhComponent', () => {
  let component: AssetViewNhComponent;
  let fixture: ComponentFixture<AssetViewNhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetViewNhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetViewNhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
