import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourListsComponent } from './your-lists.component';

describe('YourListsComponent', () => {
  let component: YourListsComponent;
  let fixture: ComponentFixture<YourListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
