import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
 
const appRoutes: Routes = [
  { path: 'chatbot', component: AppComponent },
  { path: '', redirectTo: '/chatbot', pathMatch: 'full' }
];
 
export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);