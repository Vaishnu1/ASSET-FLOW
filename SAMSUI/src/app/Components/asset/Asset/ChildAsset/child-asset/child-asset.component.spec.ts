import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChildAssetComponent } from './child-asset.component';

describe('ChildAssetComponent', () => {
  let component: ChildAssetComponent;
  let fixture: ComponentFixture<ChildAssetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
