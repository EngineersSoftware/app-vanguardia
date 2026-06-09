import { Component, input, output } from '@angular/core';
import { User } from '../../models/user';
import { HoverEffectDirective } from '../../../../shared/directives/hover-effect';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [HoverEffectDirective],
  templateUrl: './user-card.html',
})

export class UserCardComponent {

  userData = input.required<User>();

  deleteUser = output<number>();

  onDeleteClick() {
    let currentId = this.userData().id;
    if (currentId) {
      this.deleteUser.emit(currentId);
    }
  }
}
