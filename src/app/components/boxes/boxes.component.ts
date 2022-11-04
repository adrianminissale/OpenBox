import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

import { Boxes } from './boxes.model';
import { GET_BOXES } from './boxes.query';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss'],
})
export class BoxesComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public boxes!: Boxes[];
  public querySubscription!: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_BOXES,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.boxes = data && data.boxes.edges;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
