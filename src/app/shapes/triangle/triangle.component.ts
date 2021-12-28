import { Component, OnInit } from '@angular/core';
import { fabric } from "fabric";
@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.css']
})
export class TriangleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Initiate a Canvas instance
    var canvas = new fabric.Canvas("canvas");
    var isDown;
    var origX, origY;
    var triangle;

    canvas.on('mouse:down', function (o) {
      isDown = true;
      var pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      var points = [pointer.x, pointer.y, pointer.x, pointer.y];
      triangle = new fabric.Triangle({
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
      canvas.add(triangle);
      // canvas.centerObject(triangle);
    });

    canvas.on('mouse:move', function (o) {
      if (!isDown) return;
      var pointer = canvas.getPointer(o.e);

      if (origX > pointer.x) {
        triangle.set({ left: Math.abs(pointer.x) });
      }
      if (origY > pointer.y) {
        triangle.set({ top: Math.abs(pointer.y) });
      }

      triangle.set({ width: Math.abs(origX - pointer.x) });
      triangle.set({ height: Math.abs(origY - pointer.y) });

      canvas.renderAll();
    });

    canvas.on('mouse:up', function (o) {
      isDown = false;
    });


  }

}
