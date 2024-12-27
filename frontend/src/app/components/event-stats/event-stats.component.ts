import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Chart } from 'chart.js';
import {MatIconModule} from '@angular/material/icon';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { CommonModule } from "@angular/common";
import { EChartsOption } from 'echarts';
import { TicketService } from "../../services/ticket.service";
import { Stats } from "../../interfaces/stats";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-event-stats',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule, NgxEchartsDirective
  ],
  templateUrl: './event-stats.component.html',
  styleUrl: './event-stats.component.css',
  providers: [
    provideEcharts(),
  ]
})
export class EventStatsComponent implements OnInit{

  stats: Stats|undefined

  constructor(private ticketService: TicketService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.ticketService.getStatsByEventId(id).subscribe(
      (s) => this.stats = s
    )
  }

  chartOption: EChartsOption = {
    title: {
      text: 'Revenue by month',
      subtext: 'Real time data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
    ],
  };


  option: EChartsOption = {
    title: {
      text: 'Customer split by gender',
      subtext: 'Real time data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Gender',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Man' },
          { value: 735, name: 'Woman' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };


  option2: EChartsOption = {
    title: {
      text: 'Customer split by age range',
      subtext: 'Real time data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Age range',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 40, name: '<18' },
          { value: 38, name: '18..30' },
          { value: 32, name: '30..40' },
          { value: 30, name: '40..50' },
          { value: 28, name: '50..60' },
          { value: 26, name: '60..70' },
          { value: 22, name: '70+' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };


  option3: EChartsOption = {
    title: {
      text: 'Ticket sales'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    series: [
      {
        name: 'With Coupon',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230, 352541]
      },
      {
        name: 'Without Coupon',
        type: 'bar',
        data: [19325, 23438, 31000, 121594, 134141, 681807, 480152]
      }
    ]
  };

}
