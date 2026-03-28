import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WinByCategoryComponent } from './win-by-category.component';

describe('WinByCategoryComponent', () => {
  let component: WinByCategoryComponent;
  let fixture: ComponentFixture<WinByCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
