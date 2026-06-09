import { Component, signal, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
import { User } from '../../models/user';
import { HoverEffectDirective } from '../../../../shared/directives/hover-effect';
import { UserCardComponent } from '../user-card/user-card';

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HoverEffectDirective, UserCardComponent],
  templateUrl: './users-dashboard.html',
})
export class UsersDashboardComponent implements OnInit {

  private UserService = inject(UserService);
  private fb = inject(FormBuilder);

  userForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  users = signal<User[]>([]);
  isLoading = signal<boolean>(false);

  totalUsers = computed(() => this.users().length);

  ngOnInit() {
    this.UserService.getUser().subscribe( data => {
      this.users.set(data.slice(0, 5));
    });
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.UserService.getUser().subscribe({
      next: (data) => {
        this.users.set(data.slice(0, 5));
        this.isLoading.set(false);
      },
      error: () => {
        this.users.set([]);
        this.isLoading.set(false);
      },
    });
  }

  onSubmit() {
    if (this.userForm.valid){
      let newUser = this.userForm.getRawValue();

      this.users.update(currentUsers => [...currentUsers, { ...newUser, id: Date.now()}]);
      this.userForm.reset();

      this.UserService.createUser(newUser).subscribe({
        next: (response) => {
          console.log('Usuario guardado en API', response);
        }
      })
    }
  }

  handleUserDeletion(idToDelete: number){
    this.users.update(currentUsers => currentUsers.filter(user => user.id !== idToDelete));
  }

}
