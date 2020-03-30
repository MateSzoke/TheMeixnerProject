import { Component, OnInit } from '@angular/core';
import {DomService} from '../service/dom.service';
import {ModalService} from '../service/modal.service';
import {LoginComponent} from '../login/login.component';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {

  public today = new Date();
  public actualMonth = this.today.getMonth().toString().padStart(2, '0');
  public tantargyak:Array<String> = ['történelem', "matematika"];
  public evfolyamok = Array.from({ length: (8 - 5) / 1 + 1}, (_, i) => 5 + (i * 1));
  public osztalyok:Array<String> = ['a', 'b', 'c'];

  constructor(private modal: ModalService, private dom: DomService) { }

  ngOnInit(): void {
  }

  public removeModalnewExam() {
    this.modal.destroy();
  }

  public newExam() {
    this.dom.show(LoginComponent);
  }


}
