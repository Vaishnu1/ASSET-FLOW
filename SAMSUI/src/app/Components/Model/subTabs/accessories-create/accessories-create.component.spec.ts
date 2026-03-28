import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccessoriesCreateComponent } from './accessories-create.component';

describe('AccessoriesCreateComponent', () => {
  let component: AccessoriesCreateComponent;
  let fixture: ComponentFixture<AccessoriesCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoriesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
