import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconComponent } from '../icon/icon.component';
import { IconNameTypes } from '../icon/icon.types';
import { SearchFieldComponent } from '../searchField/searchField.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NzButtonModule, IconComponent, SearchFieldComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() icon: IconNameTypes = 'book';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() contentTemplate!: TemplateRef<any>;

  sidebarView = false;
  searchContent?: string;

  openSidebar() {
    this.sidebarView = !this.sidebarView;
  }

  onSearch(query: string): void {
    this.searchContent = query;
  }
}
