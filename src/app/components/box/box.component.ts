import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Box } from './box.model';
import { GET_BOX } from './box.query';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public box!: Box;
  public querySubscription!: Subscription;

  public boxInfo!: Box;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    const ID = this.router.url.split('/').pop() || '';
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_BOX(ID),
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.box = data && data.box;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
