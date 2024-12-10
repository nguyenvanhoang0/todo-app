import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzInputModule],
  templateUrl: './searchField.component.html',
  styleUrl: './searchField.component.scss',
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  @Input() set value(val: string | undefined) {
    this.searchControl.setValue(val || '', { emitEvent: false });
  }
  @Output() searchContent = new EventEmitter<string>();
  private destroy$ = new Subject<void>();
  searchControl = new FormControl('', { updateOn: 'change' });

  content?: string;

  ngOnInit(): void {
    this.searchWithDebounce();
  }

  searchWithDebounce(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.content = value || '';
        this.searchContent.emit(this.content);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
