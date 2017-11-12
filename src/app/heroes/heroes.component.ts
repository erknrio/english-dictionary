import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  model = new Hero();
  submitted = false;
  private id: number;
  private word: string;

  constructor(private heroService: HeroService) { }
  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(submitedForm: NgForm): void {
    this.submitted = true;
    var name = submitedForm.form.value.name.trim();

    if (!name) { return; }
    this.heroService.addHero({ name } as Hero, this.heroes[this.heroes.length -1].id)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
    submitedForm.reset();
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
