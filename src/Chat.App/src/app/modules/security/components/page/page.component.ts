import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [PageService]
})
export class PageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor(private pageService : PageService) { }

  ngOnInit() {
    this.dtOptions = {
      lengthMenu:[[10, 25, 50], [10, 25, 50]],
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (request: any, callback) => {
        request.filter = {};
        this.pageService.dataTablePaging(request).subscribe(response =>{
          callback({
            recordsTotal: response.recordsTotal,
            recordsFiltered: response.recordsFiltered,
            data: response.data,
          });
        })
      },
      columns: [
        { data: 'Id', name: 'Id', title: 'Id', },
        { data: 'Name', name: 'Name', title: 'Tên nhóm', },
      ],
    };
  }

}
