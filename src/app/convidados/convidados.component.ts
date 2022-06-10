import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { query } from '@angular/animations';

@Component({
  selector: 'app-convidados',
  templateUrl: './convidados.component.html',
  styleUrls: ['./convidados.component.css']
})
export class ConvidadosComponent implements OnInit {

  //Declaração de variáveis
  formConvidadosNome:FormGroup = new FormGroup({})
  formConvidadosQuantidade:FormGroup = new FormGroup({})
  hadChangeNome: boolean = false;
  hadChangeQuantidade: boolean = false;
  convidadoId: string ='';
  casamentoId: string ='';

  constructor(
    private formBuilder: FormBuilder
    , private route: Router
    , private router: ActivatedRoute
    ) {
    this.convidadoId = this.router.snapshot.params['inviteeId']    
   }

  ngOnInit(): void {
    console.log(this.convidadoId)

    this.formConvidadosNome = this.formBuilder.group({      
      nome: [null]      
    });

    this.formConvidadosQuantidade = this.formBuilder.group({      
      quantidade: [null]      
    });    

    this.router.queryParams.subscribe(
      (queryParams:any) => {        
        this.casamentoId = queryParams['idCasamento'];
      }      
    );
  }

  onSubmit() {
    console.log(this.formConvidadosNome.value)
    console.log(this.formConvidadosQuantidade.value)
    if(this.hadChangeNome != false || this.hadChangeQuantidade != false){      
      if(this.hadChangeNome != false){
        console.log("Houve alteração no nome")
        //this.service.updatePartnerName(this.userId,this.formPartner1)        
      }

      if(this.hadChangeQuantidade != false){
        console.log("Houve alteração na quantidade")
        //this.service.updatePartnerName(this.userId,this.formPartner2)        
      }
      //alert("Atualizado com sucesso!"); 
    }
  }

  onChangeNome() {
    this.hadChangeNome = true;
  }

  onChangeQuantidade() {
    this.hadChangeQuantidade = true;
  }

  onClickCancelButton() {    
    this.route.navigate(['casamento/'+ this.casamentoId])
  }

}
