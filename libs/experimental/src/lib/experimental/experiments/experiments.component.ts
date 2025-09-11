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

    console.log(1);

    setTimeout(() => console.log(2));

    Promise.resolve().then(() => console.log(3));

    Promise.resolve().then(() => setTimeout(() => console.log(4)));

    Promise.resolve().then(() => console.log(5));

    setTimeout(() => console.log(6));

    console.log(7);
  }
}
