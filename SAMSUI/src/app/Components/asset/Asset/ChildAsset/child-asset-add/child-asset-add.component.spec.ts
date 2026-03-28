import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChildAssetAddComponent } from './child-asset-add.component';

describe('ChildAssetAddComponent', () => {
  let component: ChildAssetAddComponent;
  let fixture: ComponentFixture<ChildAssetAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildAssetAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAssetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
