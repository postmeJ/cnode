import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface materialSelect {
  readonly value: string | number;
  readonly name: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})

export class SelectComponent implements OnInit {
  private activeClass: boolean = false;
  private selectValue: number | string;
  private selectName: string;

  @Input() placeholder: string = "Choose your option";
  private _list: materialSelect[]

  @Input()
  set list(list: materialSelect[]) {
    this._list = [...list];
  }
  get list() {
    return this._list;
  }
  @Output() onSelect = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  toggleSelect() {
    this.activeClass = true;
  }
  select(value: number | string, name: string) {
    this.activeClass = false;
    this.selectName = name;
    this.selectValue = value;
    this.onSelect.emit({ name, value })
  }
}
