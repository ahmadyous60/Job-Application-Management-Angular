// app.component.ts
import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { Dialog } from "primeng/dialog";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService],
  imports: [HeaderComponent, FooterComponent, Dialog, RouterOutlet]
})
export class AppComponent {
  title = 'Job Application Management System';
}