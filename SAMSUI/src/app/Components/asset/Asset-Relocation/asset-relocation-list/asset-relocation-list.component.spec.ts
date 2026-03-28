import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetRelocationListComponent } from './asset-relocation-list.component';

describe('AssetRelocationListComponent', () => {
  let component: AssetRelocationListComponent;
  let fixture: ComponentFixture<AssetRelocationListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetRelocationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRelocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
