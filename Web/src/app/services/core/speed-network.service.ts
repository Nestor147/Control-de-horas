import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SpeedNetworkService {

  isSlowInternet(): Observable<boolean> {
    return new Observable(
      (observer) => {
        var imageAddr = "https://upload.wikimedia.org/wikipedia/commons/8/8a/BVU_cs_chinh.jpg"; // this is just an example, you rather want an image hosted on your server
        var downloadSize = 1146214; // this must match with the image above (1.1 mb)
        var download = new Image();
        download.onload = function () {
          var endTime = (new Date()).getTime();
          var duration = (endTime - startTime) / 1000;
          var bitsLoaded = downloadSize * 8;
          var speedBps = (bitsLoaded / duration).toFixed(2);
          var speedKbps = (Number(speedBps) / 1024).toFixed(2);
          var speedMbps = (Number(speedKbps) / 1024).toFixed(2);
          observer.next(Number(speedMbps) >= 5 ? false : true); // (5) Mbps is speed minimum to internet
          observer.complete();
        }
        var startTime = (new Date()).getTime();
        var cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;
      });
  }
}

