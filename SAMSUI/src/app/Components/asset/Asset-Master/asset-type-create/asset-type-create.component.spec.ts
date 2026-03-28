import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetTypeCreateComponent } from './asset-type-create.component';

describe('AssetTypeCreateComponent', () => {
  let component: AssetTypeCreateComponent;
  let fixture: ComponentFixture<AssetTypeCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
