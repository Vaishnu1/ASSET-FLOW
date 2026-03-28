import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtvCreateComponent } from './rtv-create.component';

describe('RtvCreateComponent', () => {
  let component: RtvCreateComponent;
  let fixture: ComponentFixture<RtvCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtvCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtvCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
