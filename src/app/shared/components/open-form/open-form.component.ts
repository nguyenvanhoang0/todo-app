import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  buttonType,
  contentForm,
  deleteType,
  formNameTypes,
} from './open-form.types';
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
import { OpenModalComponent } from '../open-modal/open-modal.component';

@Component({
  selector: 'app-open-form',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    IconComponent,
    OpenModalComponent,
    ConfirmationFormComponent,
    AddBucketFormComponent,
    EditBocketFormComponent,
    DeleteFormComponent,
    AddBucketItemFormComponent,
    EditBocketItemFormComponent,
  ],
  templateUrl: './open-form.component.html',
  styleUrl: './open-form.component.scss',
})
export class OpenFormComponent implements OnDestroy {
  @Input() formName: formNameTypes = 'add bucket';
  @Input() label = true;
  @Input() currentForm?: formNameTypes | null = null;
  @Input() icon: IconNameTypes = 'plus';
  @Input() buttonType: buttonType = 'default';
  @Input() id?: number;
  @Input() parentId?: number;
  @Input() delete: deleteType | '' = '';
  @Input() content?: string;
  @Input() contents?: contentForm;
  @Output() complete = new EventEmitter<void>();

  private subscriptions: Subscription = new Subscription();
  constructor(private _eventService: EventService) {}
  change = false;
  confirmationForm = false;

  openForm() {
    this.currentForm = this.formName;
  }

  closeForm() {
    if (this.change === false) {
      this.currentForm = null;
    } else {
      this.confirmationForm = true;
    }
  }

  closeConfirmationForm(confirm: boolean) {
    if (confirm === true) {
      this.currentForm = null;
      this.confirmationForm = false;
      this.change = false;
    } else {
      this.confirmationForm = false;
    }
  }

  changeValue() {
    if (this.change === false) {
      this.change = true;
    }
  }

  done() {
    this.complete.emit();
    this.currentForm = null;
    this.change = false;
    this._eventService.emitEvent(
      this.formName === 'delete' ? this.delete : this.formName
    );
  }

  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
