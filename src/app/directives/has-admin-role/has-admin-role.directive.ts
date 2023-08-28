import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Directive({ selector: '[hasAdminRole]' })
export class HasAdminRoleDirective implements OnInit, OnDestroy {
  @Input() hasAdminRole: string | null = null;
  @Input() setHasAdminRoleElse(templateRef: TemplateRef<any> | null) {
    this._elseTpl = templateRef;
  }
  private _elseTpl: TemplateRef<any> | null = null;
  private _onDestroy$ = new Subject<void>();
  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private _cdr: ChangeDetectorRef,
    private _userService: UserService
  ) {}
  ngOnInit(): void {
    this._userService
      .hasRoleAdmin(this.hasAdminRole as string)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((hasAdminRole: boolean) => {
        this._viewContainer.clear();
        if (hasAdminRole) {
          this._viewContainer.createEmbeddedView(this._templateRef);
        } else {
          if (this._elseTpl) {
            this._viewContainer.createEmbeddedView(this._elseTpl);
          }
        }
        this._cdr.detectChanges();
      });
  }
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
