import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    standalone:true,
    name: 'customDateDetails'
})
export class CustomDatePipeDetails extends DatePipe implements PipeTransform {

    override transform(value: any, args?: any): any {
        return super.transform(value, "EEEE d MMM y ");
    }
}