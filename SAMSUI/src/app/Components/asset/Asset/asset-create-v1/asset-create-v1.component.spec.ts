import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCreateV1Component } from './asset-create-v1.component';

describe('AssetCreateV1Component', () => {
  let component: AssetCreateV1Component;
  let fixture: ComponentFixture<AssetCreateV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCreateV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCreateV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
