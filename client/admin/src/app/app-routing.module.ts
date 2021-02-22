import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { UsersComponent } from './components/users/users.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddMovieComponent } from './components/movies/add-movie/add-movie.component';
import { AdduserComponent } from './components/users/adduser/adduser.component';
import { EdituserComponent } from './components/users/edituser/edituser.component';
import { EditmovieComponent } from './components/movies/editmovie/editmovie.component';
import { EditreviewComponent } from './components/reviews/editreview/editreview.component';
import { GroupbyComponent } from './components/movies/groupby/groupby.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [


  { path: 'movies', component: MoviesComponent,canActivate:[AuthGuard] },
  { path: "movies/:id", component: EditmovieComponent,canActivate:[AuthGuard] },
  { path: "addMovie", component: AddMovieComponent ,canActivate:[AuthGuard]},
  { path: "groupByMovie", component: GroupbyComponent ,canActivate:[AuthGuard]},


  { path: 'reviews', component: ReviewsComponent,canActivate:[AuthGuard] },
  { path: "reviews/:id", component: EditreviewComponent ,canActivate:[AuthGuard]},

  { path: 'users', component: UsersComponent ,canActivate:[AuthGuard]},
  { path: 'users/:id', component: EdituserComponent,canActivate:[AuthGuard] },
  { path: "addUser", component: AdduserComponent ,canActivate:[AuthGuard]},

  { path: 'statistics', component: StatisticsComponent,canActivate:[AuthGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: "/login", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
