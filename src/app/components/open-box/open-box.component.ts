import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import { Store } from '@ngxs/store';
import { UserState } from 'src/app/state';

import { ItemVariant } from './open-box.model';
import { OPEN_BOX, GET_ITEM_VARIANT } from './open-box.query';

@Component({
  selector: 'app-open-box',
  templateUrl: './open-box.component.html',
  styleUrls: ['./open-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenBoxComponent implements OnInit, OnDestroy {
  @Input() id!: string;

  public loading!: boolean;
  public itemVariant!: ItemVariant;
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

  open() {
    this.loading = true;
    this.apollo
      .mutate({
        mutation: OPEN_BOX,
        variables: {
          input: {
            boxId: this.id,
            amount: 1,
          },
        },
      })
      .subscribe(({ data }) => {
        if (data) {
          const ID = data;
          this.querySubscription = this.apollo
            .watchQuery<any>({
              query: GET_ITEM_VARIANT(ID),
            })
            .valueChanges.subscribe(({ data, loading }) => {
              this.loading = loading;
              this.itemVariant = data && data.itemVariant;
              this.ref.markForCheck();
            });
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
