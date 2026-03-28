import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuildMenuComponent } from './build-menu.component';

describe('BuildMenuComponent', () => {
  let component: BuildMenuComponent;
  let fixture: ComponentFixture<BuildMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
