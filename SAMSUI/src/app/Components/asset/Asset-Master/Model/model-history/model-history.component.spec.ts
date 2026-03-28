import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelHistoryComponent } from './model-history.component';

describe('ModelHistoryComponent', () => {
  let component: ModelHistoryComponent;
  let fixture: ComponentFixture<ModelHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
