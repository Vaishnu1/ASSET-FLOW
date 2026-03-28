import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAuditImagesComponent } from './view-audit-images.component';

describe('ViewAuditImagesComponent', () => {
  let component: ViewAuditImagesComponent;
  let fixture: ComponentFixture<ViewAuditImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAuditImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAuditImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
