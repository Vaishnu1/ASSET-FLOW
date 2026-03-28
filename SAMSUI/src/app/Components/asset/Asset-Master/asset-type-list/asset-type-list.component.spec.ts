import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetTypeListComponent } from './asset-type-list.component';

describe('AssetTypeListComponent', () => {
  let component: AssetTypeListComponent;
  let fixture: ComponentFixture<AssetTypeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
