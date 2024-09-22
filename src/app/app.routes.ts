import { Routes } from '@angular/router';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [
    {
        path: 'admin', children: adminRoutes
    }
];
