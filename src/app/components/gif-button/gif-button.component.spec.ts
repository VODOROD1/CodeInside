import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifButtonComponent } from './gif-button.component';

describe('GifButtonComponent', () => {
  let component: GifButtonComponent;
  let fixture: ComponentFixture<GifButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GifButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
