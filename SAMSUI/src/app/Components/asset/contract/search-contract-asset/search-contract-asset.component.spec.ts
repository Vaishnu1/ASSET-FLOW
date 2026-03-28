import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContractAssetComponent } from './search-contract-asset.component';

describe('SearchContractAssetComponent', () => {
  let component: SearchContractAssetComponent;
  let fixture: ComponentFixture<SearchContractAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchContractAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchContractAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
