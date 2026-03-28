import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntityGroupListComponent } from './entity-group-list.component';

describe('EntityGroupListComponent', () => {
  let component: EntityGroupListComponent;
  let fixture: ComponentFixture<EntityGroupListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
