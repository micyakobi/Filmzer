import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../services/statistic.service';
import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';
import { Statistics } from '../../models/statistics';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';




@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements OnInit {


  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartData = [];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero: true
        }
      }]
    }
   

  };
  public barChartLegend = true;

  constructor(private stat: StatisticService) { }

  ngOnInit(): void {
    this.load();

  }

  load() {
    this.stat.getSta().subscribe(res => {

      var count = res.map(o => o.count);
      var gen = res.map(o => o.genre);
      this.doughnutChartLabels = gen;
      this.doughnutChartData = count
      this.doughnutChartType = 'doughnut';


    });

    this.stat.getAvg().subscribe(res => {

      var year = res.map(o => o.year);
      var countAvg = res.map(o => o.avg_count);
      this.barChartLabels = year;
      this.barChartData = [{ data: countAvg, label: 'Avg' }]

    });

  }



  public colors: any = [{
    borderColor: 'black',
    backgroundColor: ["#f9f990",
      "#90f997",
      "#9790f9",
      "#99e5e5",
      "#f7bd83",
      "#ffbb33",
      "#004d66",
      "#339966",
      "#ffbb33",
      "#ffbb35"
    ]
  }];

}
