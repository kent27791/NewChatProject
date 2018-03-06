import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { IcheckDirective } from './directives/icheck.directive';
import { CreateOrUpdateModalComponent } from './components/modals/create-or-update-modal/create-or-update-modal.component';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports:[
    CommonModule,
    FormsModule
  ],
  declarations: [
    IcheckDirective,
    PageNotFoundComponent,
    CreateOrUpdateModalComponent,
    DeleteModalComponent,
  ],
  exports: [
    IcheckDirective,
    PageNotFoundComponent,
    CreateOrUpdateModalComponent,
    DeleteModalComponent,
  ],
  providers: []
})
export class SharedModule { }
