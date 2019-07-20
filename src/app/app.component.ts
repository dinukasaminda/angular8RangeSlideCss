import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-mofyz-web-ssr';
  editorConfig = {
    toolbar: [
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean']
    ]
  };
  DocumentMaxSize = 5000;
  editorContentLength = 0;
  contentPresntage = 0;
  editorContent: string = '<h1>bbbb</h1><script>console.log("aaaaaa");</script>';
  editorForm: FormGroup;
  constructor() {}
  ngOnInit(): void {
    this.editorForm = new FormGroup({
      editor: new FormControl(null)
    });
  }
  onSubmit() {
    console.log(this.editorForm.get('editor').value);
  }
  contentChanged(e: any) {
    this.editorContent = this.editorForm.get('editor').value;
    this.editorContentLength = this.editorContent.length;
    this.contentPresntage = Math.floor(100 * (this.editorContentLength / this.DocumentMaxSize));
  }
}
