import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsumablesCreateComponent } from './consumables-create.component';

describe('ConsumablesCreateComponent', () => {
  let component: ConsumablesCreateComponent;
  let fixture: ComponentFixture<ConsumablesCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumablesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumablesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
