import { Component } from '@angular/core';
import { MemberListService } from '../member-list.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicetesterService } from '../servicetester.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  filter: string;

  public displayList = this.DataSrv.membersList;

  async applyFilter(){
    if (this.filter == 'all_members'){
      this.displayList = this.DataSrv.membersList;
    }
    else{
    this.displayList = [];
    for (let member of this.DataSrv.membersList){
      if (member['membership'] == this.filter){
        this.displayList.push(member)
        }
      }
    }
  }

  addMember(){
    this.router.navigate(['/tabs/tab3']);
  }

  removeMember(){
    this.displayList.pop();
  }

  async showAlert(memberID) {
    
    const alert = await this.alertController.create({
      header: 'The member of the following information has been registered:',
      message: 
      "Name: "+ this.DataSrv.membersList[memberID].name +
      "<br>Age: " + this.DataSrv.membersList[memberID].age +
      "<br>Gender: " + this.DataSrv.membersList[memberID].gender +
      "<br>Membership type: " + this.DataSrv.membersList[memberID].membership +
      "<br>Field of interests: " + this.DataSrv.membersList[memberID].foi,
      buttons: ['OK']

      
    });

    await alert.present();
  }
  
  constructor(public alertController: AlertController, private router: Router, public DataSrv: MemberListService) { }
  
  ngOnInit() {
  }

}
