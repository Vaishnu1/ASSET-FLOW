import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAssigneeTempComponent } from './asset-assignee-temp.component';

describe('AssetAssigneeTempComponent', () => {
  let component: AssetAssigneeTempComponent;
  let fixture: ComponentFixture<AssetAssigneeTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAssigneeTempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAssigneeTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
