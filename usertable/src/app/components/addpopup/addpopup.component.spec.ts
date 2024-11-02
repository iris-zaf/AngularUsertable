import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpopupComponent } from './addpopup.component';

describe('AddpopupComponent', () => {
  let component: AddpopupComponent;
  let fixture: ComponentFixture<AddpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
