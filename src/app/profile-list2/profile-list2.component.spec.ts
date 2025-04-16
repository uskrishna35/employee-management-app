import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileList2Component } from './profile-list2.component';

describe('ProfileList2Component', () => {
  let component: ProfileList2Component;
  let fixture: ComponentFixture<ProfileList2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileList2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
