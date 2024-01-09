import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-groceries-upload',
  templateUrl: './groceries-upload.component.html',
  styleUrl: './groceries-upload.component.css'
})
export class GroceriesUploadComponent {
  
  showProgress: boolean = false; 
  filename: string =''; 
  imagePath: any; 
  url: any; 
  results: any; 

  public Total=0;
  public MaxHeight= 160;

  public names = ['Harriz', 'Arissa', 'Jesslynn', 'Lew Jun Xian', 'Amirul Ashraf', 'Syahir']

  constructor(private http: HttpClient) {

  }

  public upload(event:any){
    
    const files = event?.target?.files;
    if (files.length === 0) 
    { return; }
        
    

    this.results = null;
    this.filename = files[0]?.name;
    this.showProgress = true;
    
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
        this.url = reader.result; 
    }

    setTimeout(()=>{this.prediction(files[0]);}, 2000)

    

  }

  private prediction(file: any) {

    let formData: FormData = new FormData();
    formData.append('image', file);
    
    let url = '/api/predict';
    

    this.http.post(url, formData).subscribe({
      next: (resp:any)=>{

        this.showProgress = false;
        if (resp) {
          console.log('test2,' , resp.predictions[0]);

          this.results = [];
          const pred = resp.predictions[0];
          for (let i=0; i< pred.length; i++) {

            let title = '';
            let color = '';
            let height = '3px';

            if (i==0) {
              title = 'Avocado'; 
              color = 'green';

            } else if (i == 1) {
              title = 'Orange';
              color = 'orange';

            } else if (i==2) {
              title = 'Pineapple';
              color = 'yellow';
            }

            const val = pred[i];
            
            if (val >0) {
              height = parseInt(val) + 'px';
            }

            var result = {
              title: title, 
              color: color, 
              height: height
            }

            this.results.push(result);

          }

          console.log('this.results', this.results);
        }
      }, error: (err:any) => {
        this.showProgress = false;
        console.log('err', err);
        alert(err.status + ' ' + err.statusText);
      }
    })
  }

  // MontarGrafico(){
  //   this.List.forEach(element => {
  //     this.Total += element.Value;
  //   });

  //   this.List.forEach(element => {
  //     element.Size = Math.round((element.Value*this.MaxHeight)/this.Total) + '%';
  //   });
  // }

}
