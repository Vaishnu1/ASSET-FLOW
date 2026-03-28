import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectRetiredDisposedOptionComponent } from './select-retired-disposed-option.component';

describe('SelectRetiredDisposedOptionComponent', () => {
  let component: SelectRetiredDisposedOptionComponent;
  let fixture: ComponentFixture<SelectRetiredDisposedOptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRetiredDisposedOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRetiredDisposedOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
