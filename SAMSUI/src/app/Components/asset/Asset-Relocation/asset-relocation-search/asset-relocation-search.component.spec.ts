import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetRelocationSearchComponent } from './asset-relocation-search.component';

describe('AssetRelocationSearchComponent', () => {
  let component: AssetRelocationSearchComponent;
  let fixture: ComponentFixture<AssetRelocationSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetRelocationSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRelocationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
