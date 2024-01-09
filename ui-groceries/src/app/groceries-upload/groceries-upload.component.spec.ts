import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceriesUploadComponent } from './groceries-upload.component';

describe('GroceriesUploadComponent', () => {
  let component: GroceriesUploadComponent;
  let fixture: ComponentFixture<GroceriesUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroceriesUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroceriesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
