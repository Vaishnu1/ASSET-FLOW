import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtvGrnListComponent } from './rtv-grn-list.component';

describe('RtvGrnListComponent', () => {
  let component: RtvGrnListComponent;
  let fixture: ComponentFixture<RtvGrnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtvGrnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtvGrnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
