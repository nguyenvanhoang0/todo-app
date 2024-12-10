import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit{
  searchContent?: string;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const currentParams = { ...this._route.snapshot.queryParams };
    this.searchContent = currentParams ? currentParams['search'] || '' : '';
  }

  onSearch(search: string): void {
    const currentParams = { ...this._route.snapshot.queryParams };
    this._router.navigate(['admin/todo'], {
      queryParams: { ...currentParams, search },
    });
  }
}
