import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAutomatedReportsComponent } from './ai-automated-reports.component';

describe('AiAutomatedReportsComponent', () => {
  let component: AiAutomatedReportsComponent;
  let fixture: ComponentFixture<AiAutomatedReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiAutomatedReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiAutomatedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});