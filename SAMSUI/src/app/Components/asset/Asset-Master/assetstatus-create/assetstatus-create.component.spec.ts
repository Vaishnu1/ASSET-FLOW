import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetstatusCreateComponent } from './assetstatus-create.component';

describe('AssetstatusCreateComponent', () => {
  let component: AssetstatusCreateComponent;
  let fixture: ComponentFixture<AssetstatusCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetstatusCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetstatusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
