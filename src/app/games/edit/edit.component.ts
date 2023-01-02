import { InvokeUpdateGamesAPI } from './../store/games.action';
import { selectGameById } from './../store/games.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { switchMap } from 'rxjs';
import { Games } from './../store/games';
import { Appstate } from 'src/app/shared/store/appstate';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private appStore: Store<Appstate>
  ) {}
  gameForm: Games = {
    id: 0,
    name: '',
    img: '',
  };
  ngOnInit(): void {
    let fetchFromData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.pipe(select(selectGameById(id)));
      })
    );
    fetchFromData$.subscribe((data) => {
      if (data) {
        this.gameForm = { ...data };
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  update() {
    this.store.dispatch(InvokeUpdateGamesAPI({ payload: this.gameForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/games']);
      }
    });
  }
}
