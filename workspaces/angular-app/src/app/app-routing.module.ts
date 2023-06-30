import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogifierComponent } from './components/logifier/logifier.component';

const routes: Routes = [
	{
		path: '',
		component: LogifierComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
