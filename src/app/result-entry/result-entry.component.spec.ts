import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultEntryComponent } from './result-entry.component';

describe('ResultEntryComponent', () => {
  let component: ResultEntryComponent;
  let fixture: ComponentFixture<ResultEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
