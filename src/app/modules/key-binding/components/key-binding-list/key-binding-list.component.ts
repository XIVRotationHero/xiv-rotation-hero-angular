import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {KeyBindingService} from "../../services/key-binding.service";
import {filter, map, switchMap, takeUntil } from "rxjs/operators";
import {fromEvent, merge, Subject} from "rxjs";

@Component({
  selector: 'rh-key-binding-list',
  templateUrl: './key-binding-list.component.html',
  styleUrls: ['./key-binding-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyBindingListComponent implements OnInit {
  public readonly labelMap$ = this.keyBindingService.keyMaps$.pipe(
    map(([ , labelMap ]) => Object.entries(labelMap))
  );

  public labelRecordingKey: string | null = null;
  public recordingTrigger$: Subject<string|undefined> = new Subject();

  constructor(private readonly keyBindingService: KeyBindingService) {}

  public ngOnInit(): void {
    const keyboardSequences =
      fromEvent<KeyboardEvent>(document, 'keydown', { capture: true })
        .pipe(
          filter((event) => !event.repeat),
          map(this.onKeyDown)
        );

    const mouseSequences =
      fromEvent<MouseEvent>(document, 'mousedown', { capture: true, once: true })
        .pipe(
          map(this.onMouseDown)
        );

    this.recordingTrigger$
      .pipe(
        filter((value): value is string => value !== undefined),
        switchMap((label) =>
          merge(keyboardSequences, mouseSequences)
            .pipe(
              takeUntil(this.recordingTrigger$),
              filter((sequence) => sequence.length > 0),
              map((sequence) => <[string, string]>[ label, sequence.join('+') ]),
            )
        )
      )
      .subscribe((keyBinding) => {
        this.recordingTrigger$.next();
        this.labelRecordingKey = null;
        if (keyBinding[1] !== 'Escape') {
          this.keyBindingService.registerBindingKey$.next(keyBinding);
        }
      });
  }

  public recordNewKeyForLabel(label: string): void {
    this.labelRecordingKey = label;
    this.recordingTrigger$.next(label);
  }

  public clearBinding(label: string): void {
    this.labelRecordingKey = null;
    this.keyBindingService.registerBindingKey$.next([label, undefined]);
  }

  private onKeyDown(evt: KeyboardEvent): string[] {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    const sequence = [];

    // User pressed escape, abort rebinding
    if (evt.key === 'Escape') {
      return ['Escape'];
    }

    // Return if a modifier was pressed
    const MODIFIER_KEYS = [
      'Shift',
      'Control',
      'Alt',
      'Meta'
    ];
    if (MODIFIER_KEYS.includes(evt.key)) {
      return [];
    }

    // Add modifiers to sequence
    evt.ctrlKey && sequence.push('Ctrl');
    evt.shiftKey && sequence.push('Shift');
    evt.altKey && sequence.push('Alt');

    // Check if a number was pressed
    const [,digitMatch] = evt.code.match(/Digit(\d)/) || [];
    if (digitMatch !== undefined) {
      return [...sequence, digitMatch];
    }

    const [numpadMatch] = evt.code.match(/Numpad(\d)/g) || [];
    if (numpadMatch !== undefined) {
      return [...sequence, numpadMatch];
    }

    const [keyMatch] = evt.code.match(/Key(\S)/g) || [];
    if (keyMatch !== undefined) {
      return [...sequence, keyMatch];
    } else {
      // Just return the barebones key
      return [...sequence, evt.code];
    }
  }

  private onMouseDown(evt: MouseEvent) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    const sequence = [];

    // Add modifiers to sequence
    evt.ctrlKey && sequence.push('Ctrl');
    evt.shiftKey && sequence.push('Shift');
    evt.altKey && sequence.push('Alt');

    return [...sequence, `M${evt.button}`];
  }
}
