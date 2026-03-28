import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnDocInfoComponent } from './grn-doc-info.component';

describe('GrnDocInfoComponent', () => {
  let component: GrnDocInfoComponent;
  let fixture: ComponentFixture<GrnDocInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnDocInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnDocInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
