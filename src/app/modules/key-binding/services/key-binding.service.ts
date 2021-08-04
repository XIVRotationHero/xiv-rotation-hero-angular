import { Injectable } from '@angular/core';
import {fromEvent, merge, Observable, of, ReplaySubject, Subject} from "rxjs";
import {filter, map, scan, share, shareReplay, switchMap, tap, withLatestFrom} from "rxjs/operators";

type KeyMap = { [ key: string ]: string };
type LabelMap = { [ label: string ]: string | undefined };

@Injectable({
  providedIn: 'root'
})
export class KeyBindingService {
  private triggeredLabel$: Observable<string>;

  private availableBindings: { [ label: string ]: () => {} } = {};
  private labelToBindingMapping: { [ label: string ]: string } = {};
  private bindingToLabelMapping: { [ binding: string ]: string } = {};

  private lastKeyboardEvent?: KeyboardEvent;

  public readonly registerBindingLabel$: Subject<string> = new ReplaySubject(1);
  public readonly registeredBindingLabels$ = this.registerBindingLabel$.pipe(
    scan((acc, value) => { acc.add(value); return acc; }, new Set()),
    shareReplay(1)
  );

  private readonly initialKeyMaps$ = of(this.loadKeyMap());
  public readonly registerBindingKey$: Subject<[string, string | undefined]> = new Subject();
  public readonly keyMaps$ =
    this.initialKeyMaps$.pipe(
      switchMap((keyMaps) =>
        merge(
          this.registerBindingKey$,
          this.registerBindingLabel$.pipe(map((label) => [ label, keyMaps[1][label] ] as [ string, string | undefined ]))
        ).pipe(
          scan(this.accumulateKeyMap, keyMaps),
          shareReplay(1)
        )
      )
    );

  public constructor() {
    const keyDownEventSequence$ =
      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(
          // Filter repeated events and events where the target is an input
          filter((event) => {
            return !event.repeat && (<HTMLElement>event.target)?.nodeName !== 'INPUT';
          }),
          tap((event) => {
            this.lastKeyboardEvent = event;
            event.preventDefault();
          }),
          map((event) => this.getSequenceFromKeyboardEvent(event))
        );

    const mouseEventSequence$ =
      fromEvent<MouseEvent>(document, 'mousedown')
        .pipe(map((event) => this.getSequenceFromMouseEvent(event)));

    this.triggeredLabel$ = merge(keyDownEventSequence$, mouseEventSequence$)
      .pipe(
        withLatestFrom(this.keyMaps$, (sequence, [ keyMap ]) => keyMap[ sequence.join('+') ]),
        filter((label): label is string => label !== undefined),
        share()
      );

    // Handle key ups to clear last keyboard event
    fromEvent<KeyboardEvent>(document, 'keyup')
      .pipe(
        tap((event) => this.lastKeyboardEvent = undefined)
      )
      .subscribe();

    // Subscribe on registered bindings so they don't get lost
    this.registeredBindingLabels$.subscribe();

    // Subscribe to registered binding keys to be able to save them
    this.keyMaps$.subscribe(([, labelMap]) => this.saveLabelMap(labelMap));
  }

  public getBindingLabelStream(keyBindingLabel: string): Observable<string> {
    return this.triggeredLabel$
      .pipe(filter((label) => label === keyBindingLabel));
  }

  /**
   * Returns an observable stream of the keys assigned to a label
   */
  public getBindingKeyStream(keyBindingLabel: string): Observable<string | undefined> {
    return this.keyMaps$.pipe(
      map(([ , labelMap ]) => labelMap[keyBindingLabel])
    )
  }

  /** @deprecated **/
  public registerAvailableBindings(label: string, keyDefault: string | undefined, cb: () => any): void {
    this.availableBindings[ label ] = cb;

    if (keyDefault && !Object.values(this.bindingToLabelMapping).includes(label)) {
      this.bindingToLabelMapping[ keyDefault ] = label;
      this.labelToBindingMapping[ label ] = keyDefault;
    }
  }

  private accumulateKeyMap(
    [ keyMap, labelMap ]: [ KeyMap, LabelMap ],
    [ label, key ]: [ string, string | undefined ]
  ): [ KeyMap, LabelMap ] {
    let oldBindingLabel: string | undefined;
    let oldBindingKey: string | undefined = labelMap[label];

    if (key) {
      oldBindingLabel = keyMap[key];
    }

    if (oldBindingLabel) {
      labelMap[oldBindingLabel] = undefined;
    }

    if (oldBindingKey) {
      delete keyMap[oldBindingKey];
    }

    if (key) {
      keyMap[key] = label;
    }
    labelMap[label] = key;

    return [ keyMap, labelMap ];
  }

  private getSequenceFromKeyboardEvent(evt: KeyboardEvent): string[] {
    const { code, ctrlKey, shiftKey, altKey } = evt;

    const sequence = [];
    if (ctrlKey) sequence.push('Ctrl');
    if (shiftKey) sequence.push('Shift');
    if (altKey) sequence.push('Alt');

    // Check if a number was pressed
    const [,digitMatch] = evt.code.match(/Digit(\d)/) || [];
    const [numpadMatch] = evt.code.match(/Numpad(\d)/g) || [];
    if (digitMatch !== undefined) {
      sequence.push(digitMatch);
    } else if (numpadMatch !== undefined) {
      sequence.push(numpadMatch);
    } else {
      sequence.push(code);
    }

    return sequence;
  }

  private getSequenceFromMouseEvent(event: MouseEvent): string[] {
    const { button } = event;
    let sequence: string[] = [];

    if (this.lastKeyboardEvent) {
      sequence = this.getSequenceFromKeyboardEvent(this.lastKeyboardEvent)
    }

    sequence.push(`M${button}`);
    return sequence;
  }

  private loadKeyMap(): [ KeyMap, LabelMap ] {
    let savedKeyBindings = localStorage.getItem('key-bindings');

    if (savedKeyBindings) {
      const labelMap: LabelMap = JSON.parse(savedKeyBindings);
      return Object.entries(labelMap).reduce(this.accumulateKeyMap, [ <KeyMap>{}, <LabelMap>{} ]);
    }

    return [ {}, {} ];
  }

  private saveLabelMap(labelMap: LabelMap): void {
    localStorage.setItem('key-bindings', JSON.stringify(labelMap));
  }
}
