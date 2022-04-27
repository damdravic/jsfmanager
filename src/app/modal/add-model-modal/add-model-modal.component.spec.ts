import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModelModalComponent } from './add-model-modal.component';

describe('AddModelModalComponent', () => {
  let component: AddModelModalComponent;
  let fixture: ComponentFixture<AddModelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
