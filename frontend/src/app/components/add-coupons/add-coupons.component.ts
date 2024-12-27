import { Component, OnInit } from '@angular/core';
import { Coupon } from '../../interfaces/coupon';
import { CouponsService } from '../../services/coupons.service';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCouponComponent } from '../dialog-add-coupon/dialog-add-coupon.component';

@Component({
  selector: 'app-add-coupons',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ],
  templateUrl: './add-coupons.component.html',
  styleUrl: './add-coupons.component.css'
})
export class AddCouponsComponent implements OnInit{

  coupons: Coupon[] = []

  constructor(private couponService: CouponsService, public dialog: MatDialog){}

  ngOnInit(): void {
    console.log('open oninit')
    this.couponService.getCoupons().subscribe(
      (coupons) => {
        console.log(coupons)
        this.coupons = coupons
      }
    )
  }


  onAddCoupon(){
    this.dialog.open(DialogAddCouponComponent, {
    }).afterClosed().subscribe(
      () => this.ngOnInit()
    )
  }

  remove(name: string){
    this.couponService.deleteCoupon(name).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }
}
