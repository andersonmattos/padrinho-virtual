import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home-dialog-delete',
  templateUrl: './home-dialog-delete.component.html',
  styleUrls: ['./home-dialog-delete.component.css']
})
export class HomeDialogDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HomeDialogDeleteComponent>) { }

  ngOnInit(): void {
  }

}
