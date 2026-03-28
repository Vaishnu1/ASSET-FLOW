import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetDocCreateComponent } from './asset-doc-create.component';

describe('AssetDocCreateComponent', () => {
  let component: AssetDocCreateComponent;
  let fixture: ComponentFixture<AssetDocCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDocCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDocCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
