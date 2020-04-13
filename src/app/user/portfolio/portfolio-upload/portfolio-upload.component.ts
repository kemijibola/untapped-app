import {
  Component,
  OnInit,
  ElementRef,
  HostBinding,
  Input,
} from "@angular/core";
import { ModalService } from "src/app/services/modal.service";

@Component({
  selector: "app-portfolio-upload",
  templateUrl: "./portfolio-upload.component.html",
  styleUrls: ["./portfolio-upload.component.css"],
})
export class PortfolioUploadComponent {
  constructor(private modalService: ModalService) {}

  openModal(id: string) {
    this.modalService.open(id);
  }
}
