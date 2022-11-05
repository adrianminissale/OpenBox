import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';

import { UserLogin } from './user.actions';
import { UserStateModel } from './user.model';

@State<UserStateModel>({
  name: 'user',
  defaults: {
    isLoggedIn: false,
  },
})
@Injectable()
export class UserState {
  @Action(UserLogin.Login)
  userLogin(ctx: StateContext<UserStateModel>, actions: UserLogin.Login) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isLoggedIn: actions.payload,
    });
  }

  @Selector()
  static isLoggedIn(state: UserStateModel) {
    return !!state.isLoggedIn;
  }
}
