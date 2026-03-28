import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoPdfPreviewComponent } from './po-pdf-preview.component';

describe('PoPdfPreviewComponent', () => {
  let component: PoPdfPreviewComponent;
  let fixture: ComponentFixture<PoPdfPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoPdfPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoPdfPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
