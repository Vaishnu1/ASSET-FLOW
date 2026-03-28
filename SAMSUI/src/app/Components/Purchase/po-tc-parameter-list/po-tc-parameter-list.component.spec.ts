import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoTcParameterListComponent } from './po-tc-parameter-list.component';

describe('PoTcParameterListComponent', () => {
  let component: PoTcParameterListComponent;
  let fixture: ComponentFixture<PoTcParameterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoTcParameterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoTcParameterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
