import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetCreateComponent } from './asset-create.component';

describe('AssetCreateComponent', () => {
  let component: AssetCreateComponent;
  let fixture: ComponentFixture<AssetCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
