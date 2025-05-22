import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { PagoCompletadoComponent } from './paginas/pago-completado/pago-completado.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // ahora esta es la página principal
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'productos', component: ProductoComponent, canActivate: [AuthGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard] },
  { path: 'pago-completado', component: PagoCompletadoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

export default routes;
