import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetStatusEditComponent } from './asset-status-edit.component';

describe('AssetStatusEditComponent', () => {
  let component: AssetStatusEditComponent;
  let fixture: ComponentFixture<AssetStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetStatusEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
