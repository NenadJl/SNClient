import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Photo } from "../../_models/Photo";
import { FileUploader } from "ng2-file-upload";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../_services/authorization/auth.service";
import { UserService } from "../../_services/users/user.service";
import { AlertifyService } from "../../_services/alertify/alertify.service";

@Component({
  selector: "app-photo-editor",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.css"]
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMainPhoto: Photo;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertifySerivce: AlertifyService
  ) {}

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        "users/" +
        this.authService.decodedToken.nameid +
        "/photos",
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingAll = file => (file.withCredentials = false);

    this.uploader.onSuccessItem = (item, response) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userService
      .setMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          const cmp = this.photos.filter(p => p.isMain)[0];
          console.log(cmp);
          cmp.isMain = false;
          photo.isMain = true;
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            "user",
            JSON.stringify(this.authService.currentUser)
          );
        },
        err => this.alertifySerivce.error(err)
      );
  }
  deletePhoto(photoId: number) {
    this.alertifySerivce.confirm(
      "are you sure you want to delet this photo",
      () =>
        this.userService
          .deletePhoto(this.authService.decodedToken.nameid, photoId)
          .subscribe(
            () => {
              this.photos.splice(
                this.photos.findIndex(p => p.id === photoId),
                1
              );
              this.alertifySerivce.success("Yo have success del photo");
            },
            err => this.alertifySerivce.error(err)
          )
    );
  }
}
