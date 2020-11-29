import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {UserRequest} from "../swagger-api";
import RoleEnum = UserRequest.RoleEnum;
import {AuthenticationService} from "./service/authentication.service";

describe('AppComponent', () => {
  const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['userRole']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{
        provide: AuthenticationService,
        useValue: authenticationServiceSpy
      }]
    }).compileComponents();
  }));

  it('AppComponent test #1: should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`AppComponent test #2: should have as title 'angular-meixner'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-meixner');
  });

  it('AppComponent test #3: test admin check function by setting variable', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.userRole = null;
    expect(app.isAdmin()).toBe(false);
    app.userRole = RoleEnum.ADMIN;
    expect(app.isAdmin()).toBe(true);
    app.userRole = RoleEnum.STUDENT;
    expect(app.isAdmin()).toBe(false);
  });

  it('AppComponent test #4: test admin check function by mocking service null', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    authenticationServiceSpy.userRole.and.returnValue(null);
    expect(app.isAdmin()).toBe(false);
  });

  it('AppComponent test #5: test admin check function by mocking service ADMIN', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    authenticationServiceSpy.userRole.and.returnValue(RoleEnum.ADMIN);
    expect(app.isAdmin()).toBe(true);
  });

  it('AppComponent test #6: test admin check function by mocking service STUDENT', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    authenticationServiceSpy.userRole.and.returnValue(RoleEnum.STUDENT);
    expect(app.isAdmin()).toBe(false);
  });
});
