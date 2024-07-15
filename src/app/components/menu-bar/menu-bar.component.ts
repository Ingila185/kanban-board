import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../themes.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [ToolbarModule, ToggleButtonModule, FormsModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  constructor(private themeService : ThemeService)
  {

  }
  checked: boolean = false;

  changeTheme()
  {
    let theme = (this.checked) ? "md-dark-deeppurple" : "md-light-deeppurple"
    console.log("working")
    this.themeService.switchTheme(theme);
    
  }

}
