import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../../services/catalog/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  catalog!: Array<any>;
  filter = {
    city: null,
    type: null,
    washrooms: null,
    rooms: null,
  };

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.getCatalog();
  }
  getCatalog() {
    this.catalogService.getCatalog().subscribe((res) => {
      this.catalog = res;
    });
  }
  filterFunc() {
    let params: { [k: string]: any } = {};
    this.filter.city != null ? (params.city = this.filter.city) : '';
    this.filter.type != null ? (params.type = this.filter.type) : '';
    this.filter.washrooms != null
      ? (params.washrooms = this.filter.washrooms)
      : '';
    this.filter.rooms != null ? (params.rooms = this.filter.rooms) : '';
    console.log('params :>> ', params);
    this.catalogService.getCatalog(params).subscribe((res) => {
      this.catalog = res;
    });
    console.log('this.filter :>> ', this.filter);
  }
}
