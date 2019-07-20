import { Component, OnInit } from '@angular/core';
export const DRangeSliderTokenGen = () => {
  return Math.floor(Math.random() * 10000 + 1);
};
@Component({
  selector: 'app-d-range-slider',
  templateUrl: './d-range-slider.component.html',
  styleUrls: ['./d-range-slider.component.scss']
})
export class DRangeSliderComponent implements OnInit {
  selected = false;

  sliderBarId = 'slider-bar-' + DRangeSliderTokenGen();
  dotHandlerId1 = 'dot-handler1-' + DRangeSliderTokenGen();
  dotHandlerId2 = 'dot-handler2-' + DRangeSliderTokenGen();

  ElmtThumb1 = null;
  ElmtThumb2 = null;
  ElmtSliderBar = null;
  sliderWidth = 0;
  startedx = 0;

  thumb_size = 15;

  slected_thumb_side = 'left';

  left_thumb_pos = 0;
  left_thumb_moving = 0;

  right_thumb_pos = 0;
  right_thumb_moving = 0;

  padd_diff = 5;
  constructor() {}
  ngOnInit(): void {
    document.addEventListener('mousemove', event => {
      this.onMouseMove(event.clientX);
    });
    document.addEventListener('mouseup', event => {
      this.onMouseUp(event);
    });

    document.addEventListener('touchmove', event => {
      if (event.changedTouches.length > 0) {
        this.onMouseMove(Math.floor(event.changedTouches[0].clientX));
      }
    });
    document.addEventListener('touchend', event => {
      this.onMouseUp(event);
    });
    document.addEventListener('touchcancel', event => {
      this.onMouseUp(event);
    });
  }
  ngAfterViewInit(): void {
    this.ElmtThumb1 = document.getElementById(this.dotHandlerId1);
    this.ElmtThumb2 = document.getElementById(this.dotHandlerId2);
    this.ElmtSliderBar = document.getElementById(this.sliderBarId);
    this.sliderWidth = this.ElmtSliderBar.offsetWidth;
    this.right_thumb_pos = this.sliderWidth / 2;
    this.ElmtThumb1.style.left = this.left_thumb_pos + 'px';
    this.ElmtThumb2.style.left = this.right_thumb_pos + 'px';
    this.ElmtThumb1.ondragstart = function() {
      return false;
    };
    this.ElmtThumb2.ondragstart = function() {
      return false;
    };
  }
  onMouseMove(clientX) {
    // console.log('onMouseMove', event, this.selected);
    if (!this.selected) {
      return;
    }

    let mdelta = clientX - this.startedx;

    if (this.slected_thumb_side == 'left') {
      this.left_thumb_moving = this.left_thumb_pos + mdelta;
      if (this.left_thumb_moving < 0) {
        this.left_thumb_moving = 0;
      }
      if (this.left_thumb_moving > this.sliderWidth - this.thumb_size) {
        this.left_thumb_moving = this.sliderWidth - this.thumb_size;
      }
      if (this.left_thumb_moving >= this.right_thumb_pos - this.padd_diff) {
        this.left_thumb_moving = this.right_thumb_pos - this.padd_diff;
      }
      this.ElmtThumb1.style.left = this.left_thumb_moving + 'px';
    } else {
      this.right_thumb_moving = this.right_thumb_pos + mdelta;
      if (this.right_thumb_moving < 0) {
        this.right_thumb_moving = 0;
      }
      if (this.right_thumb_moving <= this.left_thumb_moving + this.padd_diff) {
        this.right_thumb_moving = this.left_thumb_moving + this.padd_diff;
      }

      if (this.right_thumb_moving > this.sliderWidth - this.thumb_size) {
        this.right_thumb_moving = this.sliderWidth - this.thumb_size;
      }
      this.ElmtThumb2.style.left = this.right_thumb_moving + 'px';
    }
  }
  onMouseUp(event) {
    if (this.slected_thumb_side == 'left') {
      this.left_thumb_pos = this.left_thumb_moving;
    } else {
      this.right_thumb_pos = this.right_thumb_moving;
    }

    this.selected = false;
  }
  onMouseDown(event, side: string) {
    event.preventDefault();
    this.slected_thumb_side = side;
    this.selected = true;

    this.startedx = event.clientX;
  }
  onTouchStart(event, side: string) {
    event.preventDefault();
    console.log(event);
    if (event.changedTouches.length > 0) {
      this.slected_thumb_side = side;
      this.selected = true;

      this.startedx = Math.floor(event.changedTouches[0].clientX);
    }
  }
}
