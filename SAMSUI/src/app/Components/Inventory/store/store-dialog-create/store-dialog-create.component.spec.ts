import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StoreDialogCreateComponent } from './store-dialog-create.component';

describe('StoreDialogCreateComponent', () => {
  let component: StoreDialogCreateComponent;
  let fixture: ComponentFixture<StoreDialogCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDialogCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDialogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
