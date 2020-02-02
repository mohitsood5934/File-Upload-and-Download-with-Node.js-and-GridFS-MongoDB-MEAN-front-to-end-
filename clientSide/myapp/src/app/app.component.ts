import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '../../node_modules/@angular/forms';
import { GridserviceService } from './gridservice.service'
import { saveAs } from 'file-saver'
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  count = 0
  fileList: any = []
  downloadedChoosenItems: any = []
  clicked = false;
  file: any;
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });
  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private grid: GridserviceService) { }
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
      this.getFiles()
    };
    this.getFiles()
  }
  //getting all files
  getFiles() {
    this.grid.getFiles()
      .then((data) => {
        this.fileList = data
      })
      .catch((err) => {
        console.log(err)
      })
  }
  //downloading the file
  //binary data whose type is unknown is generally
  downloadFile(id, name) {
    console.log(id)
    this.grid.download(id)
      .then(
        data => {
          const blob = new Blob([data], {
            type: 'application/octet-stream'
          });
          saveAs(blob, name);
          if (this.count == 1) {
            this.toastr.success('File Downloaded successfully!');
          }
        })
      .catch((err) => {
        console.log(err)
      })
  }
  downloadAllFiles() {
    for (var i = 0; i < this.downloadedChoosenItems.length; i++) {
      this.downloadFile(this.downloadedChoosenItems[i]._id, this.downloadedChoosenItems[i].filename)
    }
    if (this.count > 1) {
      this.toastr.success(this.count + 'files are downloaded');
    }
    this.count = 0
    this.downloadedChoosenItems = []
  }
  addToDownloadBucket(item) {
    this.count += 1;
    this.downloadedChoosenItems.push(item)
    this.toastr.success('File added to download queue');
  }
  //deleting the file
  deleteFile(id, name) {
    this.getFiles()
    this.grid.delete(id, name)
      .subscribe((data) => {
        this.toastr.info('File Deleted successfully!');
      })
  }

}