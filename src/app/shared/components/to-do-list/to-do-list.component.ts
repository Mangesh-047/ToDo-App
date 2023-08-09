import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToDoService } from '../../services/to-do.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ToDoFormComponent } from '../to-do-form/to-do-form.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {


  @Input()
  todoArr!: any[]
  constructor(
    public dialog: MatDialog,
    private _todoService: ToDoService,
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this._todoService.updateDate$
      .subscribe(
        res => {
          // console.log(res);
          this.todoArr.forEach(e => {
            if (e.id === res.id) {
              e.todoItem = res.todoItem
            }
          })
        }
      )
  }

  onEdit(td: any) {
    const dialogConfig = new MatDialogConfig

    dialogConfig.width = '400px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = td
    this.dialog.open(ToDoFormComponent, dialogConfig)
  }


  onDelete(td: any) {
    const dialogConfig = new MatDialogConfig

    dialogConfig.width = '300px'
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, dialogConfig)


    dialogRef.afterClosed()
      .subscribe(result => {
        // console.log(result);
        if (result) {

          this._todoService.DeleteTodoItem(td.id)
            .subscribe(
              res => {
                // console.log(res);
                this._snackbarService.openSnackBar(`${td.todoItem} Deleted Successfully`)
                this.todoArr.forEach((e, i) => {
                  if (e.id === td.id) {
                    // console.log(e);
                    this.todoArr.splice(i, 1)
                  }
                })
              }
            )
        }
      })
  }


}
