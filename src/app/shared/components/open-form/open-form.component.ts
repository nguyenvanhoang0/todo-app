import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { formNameTypes } from './open-form.types';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconComponent } from '../icon/icon.component';
import { IconNameTypes } from '../icon/icon.types';
import { ConfirmationFormComponent } from '../confirmation-form/confirmation-form.component';
import { EventService } from 'src/app/modules/admin/services/event/event.service';
import { AddBucketFormComponent } from './components/add-bucket-form/add-bucket-form.component';
import { EditBocketFormComponent } from './components/edit-bocket-form/edit-bocket-form.component';
import { DeleteFormComponent } from './components/delete-form/delete-form.component';
import { AddBucketItemFormComponent } from './components/add-bucket-item-form/add-bucket-item-form.component';
import { EditBocketItemFormComponent } from './components/edit-bocket-item-form/edit-bocket-item-form.component';

@Component({
  selector: 'app-open-form',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    IconComponent,
    ConfirmationFormComponent,
    AddBucketFormComponent,
    EditBocketFormComponent,
    DeleteFormComponent,
    AddBucketItemFormComponent,
    EditBocketItemFormComponent
  ],
  templateUrl: './open-form.component.html',
  styleUrl: './open-form.component.scss'
})
export class OpenFormComponent implements OnDestroy {
  @Input() formName: formNameTypes = 'add bucket';
  @Input() label= true;
  @Input() currentForm?: formNameTypes | null = null;
  @Input() icon: IconNameTypes = 'plus';
  @Input() buttonType: 'success' | 'warning' | 'danger' | 'default' | 'text' = 'default';
  @Input() id?: number;
  @Input() parentId?: number;
  @Input() delete: 'Bucket' | 'Bucket item' = 'Bucket';
  @Input() content?: string;
  @Output() complete = new EventEmitter<void>();
  change = false;
  confirmationForm= false;
  private subscriptions: Subscription = new Subscription();
  constructor(private _eventService: EventService) { }

  openForm() {
    this.currentForm = this.formName
    console.log(this.content);
    
  }

  closeForm() {
    if (this.change === false) {
      this.currentForm = null
    } else {
      this.confirmationForm = true
    }
  }

  closeConfirmationForm(confirm: boolean) {
    if (confirm === true) {
      this.currentForm = null
      this.confirmationForm = false
      this.change = false

    } else {
      this.confirmationForm = false
    }
  }

  changeValue() {    
    if (this.change === false) {
      this.change = true;
    }
  }

  done() {
    this.complete.emit();
    this.currentForm = null
    this._eventService.emitEvent();    
  }

  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
