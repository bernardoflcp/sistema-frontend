import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-footer',
  template: `
    <div class="footer">
        <div class="card clearfix">
          <span class="footer-text-left"></span>
          <span class="footer-text-right">
            <span class="ui-icon ui-icon-copyright"></span>
          </span>
        </div>
    </div>
  `
})
export class AppFooterComponent implements OnInit {
    version: string;
    constructor() {
    }

    ngOnInit(): void {
        this.version = '0.0.1';
    }
}
