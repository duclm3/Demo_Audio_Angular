import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {element} from 'protractor';
import { takeUntil } from 'rxjs/operators';

import Events = NodeJS.Events;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  audioObj = new Audio();
  audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart'
  ];
  title = 'AudioApp';
  files = [
      {
        url: './assets/LamLem_HaiSam.mp3',
        name: 'Lấm lem'
      },
      {
        url: './assets/docthan.mp3',
        name: 'Độc thân'
      },
      {
        url: './assets/CoEmDoiBongVui.mp3',
        name: 'Có em bên đời bỗng vui'
      },
  ];
  currentTime = 0;
  duration = 0;
  removeEvent(obj, events, handler) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  streamObserver(url) {
    return new Observable(observer => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();
      this.duration = this.audioObj.duration;
      console.log('vao stream');
      const handler = (eventTarget: Event) => {
        console.log('vao handler');
        this.currentTime = this.audioObj.currentTime;
        console.log(eventTarget);
      };
      this.addEvent(this.audioObj, this.audioEvents, handler);
      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // this.removeEvent(this.audioObj, this.audioEvents, handler);
      };
    });
  }

  addEvent(obj, events, handler) {
    // tslint:disable-next-line:no-shadowed-variable
    events.forEach( element => {
      obj.addEventListener(events, handler);
      console.log(handler);
    });
  }

  setVolume(event) {
    this.audioObj.volume = event.target.value;
    console.log(event);
  }
  openFile(url) {
    this.streamObserver(url).subscribe(event => {
      console.log(event);
    });
    console.log(url);
  }
  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
  }

}
