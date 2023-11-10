import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdxPageComponent } from './sdx-page.component';

describe('SdxPageComponent', () => {
  let component: SdxPageComponent;
  let fixture: ComponentFixture<SdxPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SdxPageComponent]
    });
    fixture = TestBed.createComponent(SdxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
