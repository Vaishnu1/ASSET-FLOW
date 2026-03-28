import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetGroupListComponent } from './asset-group-list.component';

describe('AssetGroupListComponent', () => {
  let component: AssetGroupListComponent;
  let fixture: ComponentFixture<AssetGroupListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
