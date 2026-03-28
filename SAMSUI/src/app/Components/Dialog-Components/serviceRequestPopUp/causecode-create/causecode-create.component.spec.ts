import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CausecodeCreateComponent } from './causecode-create.component';

describe('CausecodeCreateComponent', () => {
  let component: CausecodeCreateComponent;
  let fixture: ComponentFixture<CausecodeCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CausecodeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CausecodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
