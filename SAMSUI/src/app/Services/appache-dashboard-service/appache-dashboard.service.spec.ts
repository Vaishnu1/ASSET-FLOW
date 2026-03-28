import { TestBed } from '@angular/core/testing';
import { AppacheDashboardService } from './appache-dashboard.service';


describe('AppacheDashboardService', () => {
  let service: AppacheDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppacheDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
