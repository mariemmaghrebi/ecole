import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  upload!:any;
  path!:any;
  msg:string='';
  constructor(private formBuilder:FormBuilder,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    // Récupération de l'URL actuelle pour déterminer le rôle (admin ou client)
    this.path = this.router.url;
    console.log('path', this.path); // Affiche l'URL actuelle dans la console

    // Initialisation du formulaire de sign-up avec validation des champs
    this.signupForm = this.formBuilder.group({
      tel: ['', [Validators.required]],           // Champ de téléphone obligatoire
      studentTel: ['', [Validators.required]],           // Champ de téléphone obligatoire
      password: ['', [Validators.required]],      // Champ de mot de passe obligatoire
      email: ['', [Validators.required]],         // Champ d'email obligatoire
      adress: ['', [Validators.required]],        // Champ d'adresse obligatoire
      speciality: ['', [Validators.required]],    // Champ de spécialité obligatoire
      firstName: ['', [Validators.required]],     // Champ de prénom obligatoire
      lastName: ['', [Validators.required]],      // Champ de nom obligatoire
    });
}

signup() {
    // Vérifie si l'URL actuelle correspond à la route '/signupAdmin' pour définir le rôle
    if (this.path == '/signupTeacher') { 
      this.signupForm.value.role = 'teacher';   // Assigne le rôle 'teacher' si l'utilisateur s'inscrit en tant qu'un teacher
    } else if (this.path == '/signupParent'){
      this.signupForm.value.role = 'parent';  //Assigne le rôle 'parent' si l'utilisateur s'inscrit en tant qu'un parent
    }
    else if (this.path == '/signupStudent'){
      this.signupForm.value.role = 'student';  //Assigne le rôle 'student' si l'utilisateur s'inscrit en tant qu'un student
    }
    // Appel du service pour ajouter un utilisateur avec les données du formulaire et le fichier uploadé
    this.userService.addUser(this.signupForm.value, this.upload).subscribe(
      (response) => {
        console.log('here response after adding user', response); // Affiche la réponse du serveur après l'ajout de l'utilisateur

        // Si l'utilisateur est ajouté avec succès, redirige vers la page d'accueil
        if (response.isAdded == true) {
          this.router.navigate(['/']);
        }
       
        else {
          // Affiche un message d'erreur si l'email existe déjà
          this.msg = response.msg;
        }
      }
    )
}

selectFile(event: any) {
    // Sélectionne le fichier uploadé par l'utilisateur via l'input de fichier
    const inputElement = event.target as HTMLInputElement;
    
    // Vérifie si un fichier a bien été sélectionné
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.upload = inputElement.files[0];  // Stocke le fichier sélectionné dans la variable 'upload'
    }
}

}
