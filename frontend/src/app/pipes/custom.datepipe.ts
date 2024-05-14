import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    standalone:true,
    name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {

    override transform(value: any, args?: any): any {
        return super.transform(value, "EEE d MMM ");
    }
}