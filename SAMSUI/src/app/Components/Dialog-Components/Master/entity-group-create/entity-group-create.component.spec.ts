import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntityGroupCreateComponent } from './entity-group-create.component';

describe('EntityGroupCreateComponent', () => {
  let component: EntityGroupCreateComponent;
  let fixture: ComponentFixture<EntityGroupCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
