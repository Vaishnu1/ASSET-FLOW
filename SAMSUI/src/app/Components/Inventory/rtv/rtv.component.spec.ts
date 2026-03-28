import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtvComponent } from './rtv.component';

describe('RtvComponent', () => {
  let component: RtvComponent;
  let fixture: ComponentFixture<RtvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
