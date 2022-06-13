import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDialogDeleteComponent } from './home-dialog-delete.component';

describe('HomeDialogDeleteComponent', () => {
  let component: HomeDialogDeleteComponent;
  let fixture: ComponentFixture<HomeDialogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDialogDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
