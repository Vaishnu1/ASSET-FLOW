import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoTcTemplateListComponent } from './po-tc-template-list.component';

describe('PoTcTemplateListComponent', () => {
  let component: PoTcTemplateListComponent;
  let fixture: ComponentFixture<PoTcTemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoTcTemplateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoTcTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
