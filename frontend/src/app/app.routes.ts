import { Routes } from '@angular/router';
import { SearchEventsComponent } from './components/search-events/search-events.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateEventComponent } from './create-event/create-event.component';

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

];
