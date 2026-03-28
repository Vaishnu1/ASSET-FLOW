import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetItemEditComponent } from './asset-item-edit.component';

describe('AssetItemEditComponent', () => {
  let component: AssetItemEditComponent;
  let fixture: ComponentFixture<AssetItemEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
