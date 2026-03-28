import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImportMainComponent } from './import-main.component';

describe('ImportMainComponent', () => {
  let component: ImportMainComponent;
  let fixture: ComponentFixture<ImportMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
