import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { fabric } from "fabric";

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    var canvas = new fabric.Canvas('c', { selection: false });

    var rect, isDown, origX, origY;

    canvas.on('mouse:down', function (o) {
      isDown = true;
      var pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      var pointer = canvas.getPointer(o.e);
      rect = new fabric.Rect({
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        width: pointer.x - origX,
        height: pointer.y - origY,
        angle: 0,
        fill: '',
        stroke: 'black',
        strokeWidth: 1,
        transparentCorners: false
      });
      canvas.add(rect);
    });

    canvas.on('mouse:move', function (o) {
      if (!isDown) return;
      var pointer = canvas.getPointer(o.e);

      if (origX > pointer.x) {
        rect.set({ left: Math.abs(pointer.x) });
      }
      if (origY > pointer.y) {
        rect.set({ top: Math.abs(pointer.y) });
      }

      rect.set({ width: Math.abs(origX - pointer.x) });
      rect.set({ height: Math.abs(origY - pointer.y) });


      canvas.renderAll();
    });

    canvas.on('mouse:up', function (o) {
      isDown = false;
    });
  }

}
