import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAssetCodeCreateComponent } from './change-asset-code-create.component';

describe('ChangeAssetCodeCreateComponent', () => {
  let component: ChangeAssetCodeCreateComponent;
  let fixture: ComponentFixture<ChangeAssetCodeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAssetCodeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAssetCodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
