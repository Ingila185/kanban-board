import { Component, Input, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'edit-item',
  standalone: true,
  imports: [ DialogModule , InputTextModule, ButtonModule],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css'
})
export class EditItemComponent implements OnInit{
  @Input() itemId: string = "";

 // itemId: string = "";


  ngOnInit(): void {
console.log(this.itemId)

  }
  
isVisible: boolean = true;


}
