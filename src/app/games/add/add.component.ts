import { setAPIStatus } from 'src/app/shared/store/app.action';
import { InvokeSaveGamesAPI } from './../store/games.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Games } from './../store/games';
import { Router } from '@angular/router';
import { Appstate } from 'src/app/shared/store/appstate';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}
  gameForm: Games = {
    id: 0,
    name: '',
    img: '',
  };

  ngOnInit(): void {}

  save() {
    this.store.dispatch(InvokeSaveGamesAPI({ payload: this.gameForm }));
    let appStore$ = this.appStore.pipe(select(selectAppState));
    appStore$.subscribe((data) => {
      if (data.apiStatus === 'success')
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      this.router.navigate(['/games']);
    });
  }
}
