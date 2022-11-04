import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxesComponent } from './components/boxes/boxes.component';
import { BoxComponent } from './components/box/box.component';

const routes: Routes = [
  { path: '', component: BoxesComponent },
  { path: 'box/:id', component: BoxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
