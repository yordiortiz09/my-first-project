import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../Interfaces/user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  user: User;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {
    this.user = data.user;
 
  }

  saveUser(): void {
    this.authService.updateUserRoleAndStatus(this.user.id, this.user.rol_id, this.user.status)
      .subscribe(updatedUser => {
        this.dialogRef.close(updatedUser);
      
      });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}


