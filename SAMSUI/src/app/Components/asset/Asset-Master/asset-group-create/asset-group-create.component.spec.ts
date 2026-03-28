import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetGroupCreateComponent } from './asset-group-create.component';

describe('AssetGroupCreateComponent', () => {
  let component: AssetGroupCreateComponent;
  let fixture: ComponentFixture<AssetGroupCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
