import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoService } from '../../services/to-do.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.scss']
})
export class ToDoFormComponent implements OnInit {

  todoForm!: FormGroup
  id!: string
  constructor(
    private _fb: FormBuilder,
    private _toDoservice: ToDoService,
    private _snackbarService: SnackbarService,
    private _dialogRef: DialogRef<ToDoListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }



  ngOnInit(): void {
    this.todoForm = this._fb.group({
      todoItem: [null, Validators.required]
    })

    this.todoForm.patchValue(this.data)
    if (this.data) {

      this.id = this.data.id
      console.log(this.id);

    }


  }



  onFormSubmit() {
    if (this.todoForm.valid) {
      // console.log(this.todoForm.controls);
      // console.log(this.todoForm.value);

      if (!this.id) {
        this._toDoservice.addToDoItem(this.todoForm.value)
          .subscribe(
            res => {
              // console.log(res);
              this._snackbarService.openSnackBar('ToDo Item Added Successfully')
            }
          )
      }



    }

  }

  onUpdate() {
    if (this.todoForm.valid) {
      // console.log(this.todoForm.value, this.id);
      this._toDoservice.updateToDoItem(this.id, this.todoForm.value)
        .subscribe(
          res => {
            // console.log(res);
            let obj = {
              todoItem: this.todoForm.controls['todoItem'].value,
              id: this.id
            }
            // console.log(obj);
            this._snackbarService.openSnackBar(`Updated Successfully`)

            this._toDoservice.updateDate$.next(obj)

          }
        )
    }
  }

}
