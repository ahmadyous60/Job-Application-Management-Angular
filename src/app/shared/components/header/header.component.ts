import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // ✅ use CommonModule
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,                             // ✅ mark as standalone
  imports: [CommonModule, RouterModule],        // ✅ correct imports
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']        // ✅ fixed typo
})
export class HeaderComponent {}
