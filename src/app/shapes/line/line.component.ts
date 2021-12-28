import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { fabric } from "fabric";

@Component({
    selector: 'app-line',
    templateUrl: './line.component.html',
    styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        var canvas = new fabric.Canvas('c', { selection: false });

        var line, isDown;

        canvas.on('mouse:down', function (o) {
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            var points = [pointer.x, pointer.y, pointer.x, pointer.y];
            line = new fabric.Line(points, {
                fill: '',
                stroke: 'black',
                strokeWidth: 1,
                originX: 'center',
                originY: 'center'
            });
            canvas.add(line);
        });

        canvas.on('mouse:move', function (o) {
            if (!isDown) return;
            var pointer = canvas.getPointer(o.e);
            line.set({ x2: pointer.x, y2: pointer.y });
            canvas.renderAll();
        });

        canvas.on('mouse:up', function (o) {
            isDown = false;
        });
    }

}
