import { Courses } from './../courses/courses';
import { InvokeFetchEmployeesAPI } from './../employees/store/employees.action';
import { InvokeFetchGamesAPI } from './../games/store/games.action';
import { selectEmployees } from './../employees/store/employees.selector';
import { selectGames } from './../games/store/games.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import {
  Component,
  ElementRef,
  NgModule,
  OnInit,
  Inject,
  ViewChild,
  Input,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DOCUMENT } from '@angular/common';
import { style } from '@angular/animations';

import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
const slogans = [
  'Elevate your learning with Kazrom',
  'Experience the power of online education with Kazrom',
  'Transform your knowledge with Kazrom elearning',
  "Advance your career with Kazrom's comprehensive courses",
  "Unlock your full potential with Kazrom's expert-led learning",
  'Join the Kazrom community and thrive in your field',
  "Expand your horizons with Kazrom's diverse course offerings",
  "Learn at your own pace with Kazrom's flexible elearning platform",
  "Achieve your goals with Kazrom's cutting-edge elearning solutions",
  'Discover a world of learning opportunities with Kazrom',
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchTerm: string;
  searchResults$: Observable<any>;
  slogan: string;
  constructor(private store: Store, private appStore: Store<Appstate>) {}

  games$ = this.store.pipe(select(selectGames));
  employees$ = this.store.pipe(select(selectEmployees));
  show: boolean = true;
  ngOnInit(): void {
    this.slogan = slogans[Math.floor(Math.random() * slogans.length)];
    // this.formModal = new window.bootstrap.Modal(
    //   document.getElementById('myModal')
    // );
    // this.store.dispatch(InvokeFetchGamesAPI());
    // this.store.dispatch(InvokeFetchEmployeesAPI());
  }
  search() {
    this.searchResults$ = fromEvent(
      document.getElementById('search-input'),
      'keyup'
    ).pipe(
      map((event: any) => event.target.value),
      debounceTime(1000),
      switchMap((searchTerm) => this.searchApi(searchTerm))
    );
  }
  // searchApi(searchTerm: string): Observable<any> {
  //   //Make API call to search for searchTerm
  //   //return observable with API response

  // }
  searchApi(s: string): string {
    return 's';
  }

  openNav() {
    //  document.getElementById('sidenav').style.width= "50";
    document.getElementById('sidenav').style.display = 'block';
    document.getElementById('sidenav').style.width = '50%';
  }
  closeNav() {
    document.getElementById('sidenav').style.width = '0';
  }
}
