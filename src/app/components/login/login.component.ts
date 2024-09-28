import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {jwtDecode} from 'jwt-decode'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor( private formBuilder: FormBuilder,private  router:Router, private userService:UserService) { }
user:any={};
errorMessage:string='';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      tel: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  login() {
    // Affiche dans la console les valeurs saisies dans le formulaire de connexion
    console.log('here object', this.loginForm.value);

    // Appel du service pour envoyer les données du formulaire de connexion à l'API
    this.userService.loginUser(this.loginForm.value).subscribe(
      (response) => {
        // Affiche dans la console la réponse reçue du backend
        console.log('here response', response);

        // Vérifie si la réponse contient un token utilisateur
        if (response.user) {
          // Décode le token JWT pour extraire les informations utilisateur
          let decoded: any = jwtDecode(response.user);

          // Stocke le token dans le sessionStorage pour maintenir la session utilisateur
          sessionStorage.setItem('token', response.user)

          // Vérifie le rôle de l'utilisateur décodé pour rediriger vers le tableau de bord approprié
          if (decoded.role == 'admin') {
            // Redirige vers le tableau de bord Admin
            this.router.navigate(['/dashboardAdmin']);
          } else if (decoded.role == 'teacher' ) {
              if( decoded.status=="validated"){
                // Redirige vers le tableau de bord Enseignant
              this.router.navigate(['/dashboardTeacher']);
              }
              else{
                this.errorMessage='You are  not Validated'
              }
          } else if (decoded.role == 'student') {
            // Redirige vers le tableau de bord Étudiant
            this.router.navigate(['/dashboardStudent']);
          } else if (decoded.role == 'parent'){
            // Si le rôle est autre (ou non reconnu), redirige vers la page d'accueil
            this.router.navigate(['/']);
          }
          
        } else {
          // Si la connexion échoue, affiche le message d'erreur reçu dans la réponse
          this.errorMessage = response.msg;
        }
      }
    );
}

}
