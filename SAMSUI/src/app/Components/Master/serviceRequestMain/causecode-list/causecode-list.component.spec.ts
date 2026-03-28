import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CausecodeListComponent } from './causecode-list.component';

describe('CausecodeListComponent', () => {
  let component: CausecodeListComponent;
  let fixture: ComponentFixture<CausecodeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CausecodeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CausecodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
