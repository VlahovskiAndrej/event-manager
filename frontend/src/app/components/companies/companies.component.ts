import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabLabel,MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [MatTabGroup,MatIcon,MatTab,MatTabLabel,MatTabsModule,MatCardModule, NgFor],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent {

}
