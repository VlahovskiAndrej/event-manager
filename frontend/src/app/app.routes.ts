import { Routes } from '@angular/router';
import { SearchEventsComponent } from './components/search-events/search-events.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { SearchMyEventsComponent } from './components/search-my-events/search-my-events.component';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'events',
        component: SearchEventsComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'events/create',
        component: CreateEventComponent,
    },
    {
        path: 'events/my-events',
        component: SearchMyEventsComponent,
    },
    {
        path: 'events/:id/update',
        component: UpdateEventComponent,
    },
    {
        path: '**',
        component: HomePageComponent,
    }

];
