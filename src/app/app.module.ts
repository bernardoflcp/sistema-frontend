import { DesvincularProcedimentoComponent } from './add-plano/desvincular/desvincular-procedimento.component';
import { VincularProcedimentoComponent } from './add-plano/vincular-plano/vincular-procedimento.component';
import { AutorizacaoProcedimentosComponent } from './autorizacao-procedimentos/autorizacao-procedimentos.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MainContentComponent } from './main-content/main-content.component';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { StartPageComponent } from './start-page/start-page.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppFooterComponent } from './app.footer.component';
import { AppRightPanelComponent } from './app.rightpanel.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppRoutes } from './app.routes';
import { AddClientModule } from './add-cliente/add-cliente.module';
import { PRIMENG_IMPORTS } from './primeng-imports';
import { AddPlanoModule } from './add-plano/add-plano.module';
import { AddProcedimentoModule } from './add-procedimento/add-procedimento.module';
import { AddPlanoComponent } from './add-plano/add-plano.component';
import { AddProcedimentoComponent } from './add-procedimento/add-procedimento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddClienteService } from './add-cliente/service/add-cliente.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AutorizacaoProcedimentosModule } from './autorizacao-procedimentos/autorizacao-procedimentos.module';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    AddClienteComponent,
    StartPageComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppRightPanelComponent,
    AddPlanoComponent,
    AddProcedimentoComponent,
    AutorizacaoProcedimentosComponent,
    VincularProcedimentoComponent,
    DesvincularProcedimentoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    SidebarModule,
    AppRoutes,
    AddClientModule,
    AddPlanoModule,
    AddProcedimentoModule,
    AutorizacaoProcedimentosModule,
    PRIMENG_IMPORTS,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule

  ],
  providers: [AddClienteService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
