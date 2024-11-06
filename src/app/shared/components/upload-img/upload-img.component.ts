import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { IconComponent } from '../icon/icon.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-img',
  standalone: true,
  imports: [CommonModule, NzUploadModule, IconComponent],
  templateUrl: './upload-img.component.html',
  styleUrl: './upload-img.component.css',
})
export class UploadImgComponent {
  selectedImage: string | ArrayBuffer | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
