import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {
  teachers: any = [];
  user:any={};
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getAllTeachers().subscribe(
      (response) => {
        this.teachers = response.teachers;
        console.log('Teachers loaded:', this.teachers);
      }
    );
  }
  deleteUser(id: number) {
    // Appel du service pour supprimer l'utilisateur avec l'ID fourni
    this.userService.deleteUserById(id).subscribe(
      (response) => {
        // Affiche dans la console la réponse après la suppression de l'utilisateur
        console.log('here response after delete user', response);

        // Réinitialise le tableau avant de le remplir avec les données mises à jour
        this.teachers = [];

        // Après avoir supprimé l'utilisateur, récupère la liste mise à jour des utilisateurs
        this.userService.getAllTeachers().subscribe(
          (data) => {
            this.teachers = data.teachers;
            console.log('Teachers loaded:', this.teachers);
          }
        )
      }
    );
  }
  validateTeacher(id: any) {
    this.userService.validateTeacher(id).subscribe(
      (response) => {
        console.log('Teacher validation response:', response.msg);
        // Mettez à jour l'affichage 
       this.ngOnInit();
      }
    );
  }
  

}