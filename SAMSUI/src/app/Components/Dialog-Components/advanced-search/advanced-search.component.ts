import { Component, OnInit, Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})

@Injectable()
export class AdvancedSearchComponent {

  private sidenav: MatSidenav;

	public setSidenav(sidenav: MatSidenav) {
		this.sidenav = sidenav;
	}

	public open() {
		return this.sidenav.open();
	}


	public close() {
		return this.sidenav.close();
	}

	public toggle(): void {
		this.sidenav.toggle();
	}

  constructor() { }

  ngOnInit() {
  }
  

}
