import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ImageModule } from 'primeng/image';


@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, RippleModule, ImageModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];
}

}
