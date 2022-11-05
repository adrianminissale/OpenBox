import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import { Store } from '@ngxs/store';
import { UserLogin, UserState } from 'src/app/state';

import { User } from './toolbar.model';
import { GET_USER, GET_WALLETS } from './toolbar.query';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public title: string = '🎁 OpenBox';
  public user!: User;
  public querySubscription!: Subscription;
  public isUserLogged: boolean = false;
  private isLoggedIn$ = this.store.select(UserState.isLoggedIn);

  constructor(
    private apollo: Apollo,
    private store: Store,
    private ref: ChangeDetectorRef
  ) {
    this.isLoggedIn$.subscribe((value) => {
      this.isUserLogged = value;
      this.ref.markForCheck();
    });
  }

  login() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_USER,
      })
      .valueChanges.subscribe(({ data }) => {
        this.user = data && data.currentUser;
        this.store.dispatch(new UserLogin.Login(true));
        localStorage.setItem('isUserLogged', 'true');
      });
  }

  logout() {
    this.store.dispatch(new UserLogin.Login(false));
    localStorage.removeItem('isUserLogged');
  }

  ngOnInit(): void {
    this.apollo
      .subscribe({
        query: GET_WALLETS,
      })
      .subscribe(() => this.ref.markForCheck());

    if (
      localStorage.getItem('isUserLogged') &&
      localStorage.getItem('isUserLogged') === 'true'
    ) {
      this.login();
    }
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
