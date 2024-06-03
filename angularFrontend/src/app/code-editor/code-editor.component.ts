import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-code-editor',
  //standalone: true,
  //imports: [],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css'
})
export class CodeEditorComponent {
  editorOptions = { theme: 'vs-dark', language: 'python' };
  code: string = 'code';


  constructor(private http: HttpClient) { }


  onSave() {
    this.http.post('/api/update-code', { code: this.code })
      .subscribe(response => {
        console.log('Code updated successfully');
        // Reload the Streamlit iframe if necessary
        const iframe = document.getElementById('streamlit-iframe') as HTMLIFrameElement;
        iframe.src = iframe.src;
      });
  }

  server_address= "http://localhost:5000/"
  data = `import streamlit as st \nst.write("sample app") \nst.title("Welcome to first Streamlit App")\nst.header("Cutting-edge developments are underway. Stay tuned ....")`

  onClick(data: string){
    console.log('executed', this.server_address,JSON.stringify(data));
    return this.http.post(this.server_address, JSON.stringify(data))
  }

  submit(){
    this.onClick(this.data).subscribe()
  }

}
