import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  delay,
  interval,
  map,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  of,
  OperatorFunction,
  take,
  tap,
  timer,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

function squaring(): MonoTypeOperatorFunction<number> {
  return (source) => {
    return source.pipe(map((val) => Math.pow(val, 2)));
  };
}

function customMap<T, K>(
  fn: (val: T) => K
): OperatorFunction<T, K> {
  return (source) => {
    return new Observable((observer) => {
      source.pipe(takeUntilDestroyed()).subscribe({
        next: (val) => {
          observer.next(fn(val));
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  };
}

@Component({
  selector: 'tt-experiments',
  imports: [RouterLink],
  templateUrl: './experiments.component.html',
  styleUrl: './experiments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperimentsComponent {
  constructor() {
  //   timer(0, 1000)
  //     .pipe(
  //       squaring(),
  //       customMap((val) => val * 10),
  //       tap((val) => console.log(val))
  //     )
  //     .subscribe();

    // const observable$ = of('first').pipe(delay(1000));
    // const observavle2$ = interval(500).pipe(take(4));
    //
    // merge(observable$, observavle2$).subscribe({
    //   next: val => console.log(val),
    //   complete: () => console.log(`that's all`)
    // })
  //   const fg = new FormGroup({
  //     name: new FormControl('')
  //   })
  //   const fa = new FormArray([
  //     new FormControl('')
  //   ])
  //   fg.setValue({name: 'sdfsdf'})
  //   fa.setValue(['sdfsd'])
  //
  //   class Animal {
  //     run(d: string[]) {
  //       return [d[0]];
  //     }
  //   }
  //   class Dog extends Animal {
  //     override run(d: string[]) {
  //       return d;
  //     }
  //   }
  //   function add(animal: Animal) {
  //     console.log(animal.run(['1', 'dsf', 'sdfsdfsd']))
  //   }
  //
  //   add(new Dog());

    async function wrapper() {
      console.log(1);
      await child();
      console.log(2);
    }

    async function child() {
      console.log(3);
      await Promise.resolve();
      console.log(4);
    }

    console.log(5);
    wrapper();
    console.log(6);
  }
}
