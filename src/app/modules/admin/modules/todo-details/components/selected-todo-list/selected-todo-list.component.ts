import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBucketItem } from '../../types/todo-item.type';
import { SelectService } from 'src/app/modules/admin/services/select/select.service';
import { TodoItemService } from '../../services/todo-item/todo-item.service';
import { EventService } from 'src/app/modules/admin/services/event/event.service';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-selected-todo-list',
  templateUrl: './selected-todo-list.component.html',
  styleUrl: './selected-todo-list.component.scss',
})
export class SelectedTodoListComponent implements OnInit {
  @Input() todoId!: number;
  @Input() selectionMode = false;
  @Output() outselectionMode = new EventEmitter<boolean>();

  selectBucketItemlist?: IBucketItem[];

  selectedTodoListView = false;
  confirmClear = false;
  confirmDelete = false;
  confirmDone = false;

  constructor(
    private _selectService: SelectService,
    private _todoItemService: TodoItemService,
    private _eventService: EventService,
    public message: MessageService
  ) {}

  ngOnInit(): void {
    this.listenToBucketitemSelectedChanges();
  }

  listenToBucketitemSelectedChanges() {
    this._selectService.bucketItem$.subscribe((items) => {
      this.selectBucketItemlist = items;
    });
  }
  handleSelectionMode(): void {
    this.selectionMode = !this.selectionMode;
    this.outselectionMode.emit(this.selectionMode);
  }

  handleSelectedTodoListView(value: boolean) {
    this.selectedTodoListView = value;
  }

  markItemsAsDone(): void {
    if (this.selectBucketItemlist) {
      const itemsToUpdate = this.selectBucketItemlist.filter(
        (item) => !item.done
      );
      if (itemsToUpdate.length > 1) {
        this.message.createMessageloading();

        this._todoItemService
          .updateMultipleBucketItems(itemsToUpdate, this.todoId)
          .subscribe({
            next: (response) => {
              console.log('Update success:', response);
              this.message.createMessage('success', 'Update successful');
              this.handleSelectionMode();
              this._selectService.clearBucketItems();
              this._eventService.emitEvent('edit bucket items');
            },
            error: (err) => {
              console.error('Error during update:', err);
              this.message.createMessage('error', 'Update failed');
            },
          });
      } else {
        this.handleSelectionMode();
      }
    }
  }

  deleteSelectedItems(): void {
    if (this.selectBucketItemlist) {
      this.message.createMessageloading();

      const bucketItemIds = this.selectBucketItemlist.map((item) => item.id);
      this._todoItemService
        .deleteMultipleBucketItems(bucketItemIds, this.todoId)
        .subscribe({
          next: (response) => {
            console.log('Delete success:', response);
            this.message.createMessage('success', 'Delete successful');
            this.handleSelectionMode();
            this._eventService.emitEvent('deleteBucketItem');
            this._selectService.clearBucketItems();
          },
          error: (err) => {
            console.error('Error during delete:', err);
            this.message.createMessage('error', 'Delete failed');
          },
        });
    }
  }

  onConfirmClear(confirm: boolean) {
    if (confirm === true) {
      this._selectService.clearBucketItems();
      this.confirmClear = false;
      this.selectedTodoListView = false;
    } else {
      this.confirmClear = false;
    }
  }

  onConfirmDone(confirm: boolean) {
    if (confirm === true) {
      this.markItemsAsDone();
      this.confirmDone = false;
    } else {
      this.confirmDone = false;
    }
  }

  onConfirmDelete(confirm: boolean) {
    if (confirm === true) {
      this.deleteSelectedItems();
      this.confirmDelete = false;
    } else {
      this.confirmDelete = false;
    }
  }
}
