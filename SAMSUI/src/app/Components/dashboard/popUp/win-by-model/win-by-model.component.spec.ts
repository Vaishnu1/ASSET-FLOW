import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WinByModelComponent } from './win-by-model.component';

describe('WinByModelComponent', () => {
  let component: WinByModelComponent;
  let fixture: ComponentFixture<WinByModelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinByModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinByModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
