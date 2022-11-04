import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import { User } from './toolbar.model';
import { GET_USER, GET_WALLETS } from './toolbar.query';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public title: string = '🎁 OpenBox';
  public loading: boolean = true;
  public user!: User;
  public querySubscription!: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_USER,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.user = data && data.currentUser;
      });

    this.apollo
      .subscribe({
        query: GET_WALLETS,
      })
      .subscribe();
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
