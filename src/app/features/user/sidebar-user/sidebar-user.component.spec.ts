import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { SidebarUserComponent } from './sidebar-user.component';

describe('SidebarUserComponent', () => {
  let component: SidebarUserComponent;
  let fixture: ComponentFixture<SidebarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
