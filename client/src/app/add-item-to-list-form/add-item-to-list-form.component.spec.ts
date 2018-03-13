import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemToListFormComponent } from './add-item-to-list-form.component';

describe('AddItemToListFormComponent', () => {
  let component: AddItemToListFormComponent;
  let fixture: ComponentFixture<AddItemToListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemToListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemToListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
