import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewWorkOrderModalComponent } from './add-new-work-order-modal.component';

describe('AddNewWorkOrderModalComponent', () => {
  let component: AddNewWorkOrderModalComponent;
  let fixture: ComponentFixture<AddNewWorkOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewWorkOrderModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewWorkOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
