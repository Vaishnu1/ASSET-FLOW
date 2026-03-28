import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetAssignmentListComponent } from './asset-assignment-list.component';

describe('AssetAssignmentListComponent', () => {
  let component: AssetAssignmentListComponent;
  let fixture: ComponentFixture<AssetAssignmentListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetAssignmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
