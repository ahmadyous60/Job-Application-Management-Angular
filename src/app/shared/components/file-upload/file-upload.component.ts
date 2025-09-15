// file-upload.component.ts
import { DecimalPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [NgIf, DecimalPipe]
})
export class FileUploadComponent {
  @Input() acceptedTypes = '.pdf,.docx,.jpg,.png';
  @Input() maxSize = 5; // in MB
  @Input() label = 'Upload File';
  @Output() fileSelected = new EventEmitter<File>();
  
  selectedFile: File | null = null;
  errorMessage = '';

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.errorMessage = '';
    
    if (!file) return;
    
    // Check file type
    const allowedExtensions = this.acceptedTypes.split(',').map(ext => ext.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      this.errorMessage = `Invalid file type. Allowed types: ${this.acceptedTypes}`;
      return;
    }
    
    // Check file size
    if (file.size > this.maxSize * 1024 * 1024) {
      this.errorMessage = `File size exceeds ${this.maxSize}MB`;
      return;
    }
    
    this.selectedFile = file;
    this.fileSelected.emit(file);
  }
  
  removeFile(): void {
    this.selectedFile = null;
    this.errorMessage = '';
  }
}