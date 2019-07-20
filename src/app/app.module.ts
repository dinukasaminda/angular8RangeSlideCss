import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DRangeSliderComponent } from './components/d-range-slider/d-range-slider.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlC {
  constructor(private sanitizer: DomSanitizer) {}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
    //return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}

@NgModule({
  declarations: [AppComponent, DRangeSliderComponent, SafeHtmlC],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,

    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
