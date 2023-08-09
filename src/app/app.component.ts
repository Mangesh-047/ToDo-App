import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToDoService } from './shared/services/to-do.service';
import { ToDoFormComponent } from './shared/components/to-do-form/to-do-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ToDo-App';

  todoArr: Array<any> = []
  constructor(
    public dialog: MatDialog,
    private _todoService: ToDoService,
  ) { }

  ngOnInit(): void {
    this._todoService.getAllTodoItem()
      .subscribe(
        res => {
          // console.log(res);
          this.todoArr = res
        }
      )
  }
  openDialog() {
    const dialogConf = new MatDialogConfig()
    dialogConf.width = '400px'
    dialogConf.autoFocus = true
    dialogConf.disableClose = true
    const dialogRef = this.dialog.open(ToDoFormComponent, dialogConf);

    dialogRef.afterClosed()
      .subscribe(result => {
        // console.log(`Dialog result: ${result}`);
        if (result) {
          setTimeout(() => {
            this._todoService.getAllTodoItem()
              .subscribe(
                res => {
                  // console.log(res);
                  this.todoArr = res
                }
              )
          }, 500)


        }
      });
  }
}
