import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewChildassetInPreinwardComponent } from './view-childasset-in-preinward.component';

describe('ViewChildassetInPreinwardComponent', () => {
  let component: ViewChildassetInPreinwardComponent;
  let fixture: ComponentFixture<ViewChildassetInPreinwardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChildassetInPreinwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChildassetInPreinwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
