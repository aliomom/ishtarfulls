import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StatueListPageComponent} from './component/statue-list-page/statue-list-page.component';
import {StatueDetailsPageComponent} from './component/statue-details-page/statue-details-page.component';
import {StatueDetailsComponent} from './component/statue-details/statue-details.component';
import {StatueCommentComponent} from './component/statue-comment/statue-comment.component';
import {StatueCommentItemComponent} from './component/statue-comment-item/statue-comment-item.component';
import {StatueListComponent} from './component/statue-list/statue-list.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {TranslateModule} from '@ngx-translate/core';
import {InteractionsModule} from '../interactions/interactions.module';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxImageZoomModule} from 'ngx-image-zoom';
import {StatueComponent} from './statue/statue.component';
import {StatueRoutingModule} from './statue-routing.module';

@NgModule({
  declarations: [
    StatueCommentComponent,
    StatueCommentItemComponent,
    StatueDetailsComponent,
    StatueDetailsPageComponent,
    StatueListComponent,
    StatueListPageComponent,
    StatueComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StatueRoutingModule,
    MDBBootstrapModule,
    TranslateModule.forChild(),
    InteractionsModule,
    SharedModule,
    NgxImageZoomModule,
  ],
  exports: [
    StatueCommentComponent,
    StatueCommentItemComponent,
    StatueDetailsComponent,
    StatueDetailsPageComponent,
    StatueListComponent,
    StatueListPageComponent,
  ]
})
export class StatueModule {
}
