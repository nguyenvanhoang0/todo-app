import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-upload-img',
  standalone: true,
  imports: [CommonModule, NzUploadModule, IconComponent],
  templateUrl: './upload-img.component.html',
  styleUrl: './upload-img.component.scss',
})
export class UploadImgComponent implements OnChanges {
  @Input() img: string | ArrayBuffer | null = null;

  selectedImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  @Output() fileUploaded = new EventEmitter<File>();
  @Output() Uploaded = new EventEmitter<string | ArrayBuffer | null>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['img']) {
      this.selectedImage = changes['img'].currentValue;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.fileUploaded.emit(this.selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.Uploaded.emit(reader.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
