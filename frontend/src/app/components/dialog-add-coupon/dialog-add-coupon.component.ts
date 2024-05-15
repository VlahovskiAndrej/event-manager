import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import { CouponsService } from '../../services/coupons.service';
import { UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-dialog-add-coupon',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatSelectModule,
    MatSliderModule,
    UpperCasePipe
  ],
  templateUrl: './dialog-add-coupon.component.html',
  styleUrl: './dialog-add-coupon.component.css'
})
export class DialogAddCouponComponent {

  constructor(private couponService: CouponsService){}

  onSubmit(name: string, discount: string){
   
    this.couponService.createCoupon(name, Number.parseInt(discount)).subscribe(
      (res) => console.log(res)
    )
  }
}
