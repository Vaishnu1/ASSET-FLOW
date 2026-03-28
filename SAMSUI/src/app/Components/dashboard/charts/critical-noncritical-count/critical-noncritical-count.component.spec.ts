import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CriticalNoncriticalCountComponent } from './critical-noncritical-count.component';

describe('CriticalNoncriticalCountComponent', () => {
  let component: CriticalNoncriticalCountComponent;
  let fixture: ComponentFixture<CriticalNoncriticalCountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalNoncriticalCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalNoncriticalCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
