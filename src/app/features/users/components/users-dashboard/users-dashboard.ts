import { UserService } from './../../services/user';
import { Component, signal, OnInit, computed, inject, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserCardComponent } from '../user-card/user-card';

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, UserCardComponent],
  templateUrl: './users-dashboard.html',
})
export class UsersDashboardComponent implements OnInit {

  private UserService = inject(UserService);
  private fb = inject(FormBuilder);

  // LOS ESTADOS
  users = signal<User[]>([]);
  isLoading = signal<boolean>(true);

  totalUsers = computed(() => this.users().length);

  isEmpty = computed(() => this.totalUsers() === 0);

  userForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(){
    effect(() => {
      console.log(`[AUDITORIA] El sistemas tiene ahora ${this.totalUsers()} usuarios.`);
    });
  }

  ngOnInit(){
    this.UserService.getUser().subscribe(data => {
        this.users.set(data.slice(0, 4));
        this.isLoading.set(false);
    });
  }

  addUser(){
    if(this.userForm.valid){
      const newUser = {
        id: Date.now(),
        ...this.userForm.getRawValue()
      };
      this.users.update(currentList => [newUser, ...currentList]);
      this.userForm.reset();
    }
  }

  removeUser(id: number){
    this.users.update(currentList => currentList.filter(u => u.id !== id));
  }

}
