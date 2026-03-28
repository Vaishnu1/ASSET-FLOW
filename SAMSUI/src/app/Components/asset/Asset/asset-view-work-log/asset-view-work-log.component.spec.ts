import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetViewWorkLogComponent } from './asset-view-work-log.component';

describe('AssetViewWorkLogComponent', () => {
  let component: AssetViewWorkLogComponent;
  let fixture: ComponentFixture<AssetViewWorkLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetViewWorkLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetViewWorkLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
