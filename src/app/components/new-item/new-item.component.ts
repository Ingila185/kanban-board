import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css',

})
export class NewItemComponent {
  visible: boolean = false;

  constructor(){}

  showDialog() {
    console.log("Cliked")
    this.visible = true;
}

}
