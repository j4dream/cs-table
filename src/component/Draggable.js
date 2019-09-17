import React from 'react';
import { findDOMNode } from 'react-dom';
import { matchsSlelector } from './util';
const DRAG_THRESHOLD = 2;

export default class Draggable extends React.Component {

  static defaultProps = {
    axis: 'none',
    handle: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      mouseDown: false,
      dragging: false
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseDown(e) {
    // left button
    if(e.button === 0) {
      //e.stopPropagation();
      const domNode = findDOMNode(this);
      const { handle } = this.props;
      if (handle && !matchsSlelector(e.target, handle, domNode)) {
        return;
      }
      this.addEvent();
      const pageOffset = findDOMNode(this).getBoundingClientRect();
      const { width, height, left, top } = pageOffset;
      this.setState({
        mouseDown: true,
        originX: e.pageX,
        originY: e.pageY,
        elementX: left,
        elementY: top,
        width,
        height
      });
    }
  }

  onMouseMove(e) {
    const deltaX = e.pageX - this.state.originX;
    const deltaY = e.pageY - this.state.originY;
    const distance = Math.abs(deltaX) + Math.abs(deltaY);
    if (!this.state.dragging && distance > DRAG_THRESHOLD) {
      if (this.props.onDragStart) {
        this.props.onDragStart(this.props.dragData);
      }
      this.state.dragging = true;
    }
    if(this.state.dragging) {
      this.setState((prestate) => {
        const pos = {};
        const computedLeft = prestate.elementX + deltaX + document.body.scrollLeft;
        const computedTop  = prestate.elementY + deltaY + document.body.scrollTop;
        if (this.props.axis === 'none') {
          pos.left = computedLeft;
          pos.top = computedTop;
        }
        if (this.props.axis === 'x') {
          pos.left = computedLeft;
          pos.top =prestate.elementY;
        }
        if (this.props.axis === 'y') {
          pos.left = prestate.elementX;
          pos.top = computedTop;
        }
        return pos;
      });
    }
  }

  onMouseUp() {
    this.removeEvent();
    const { onDragStop } = this.props;
    const { dragging } = this.state;
    if (dragging) {
      if (onDragStop) {
        onDragStop();
      }
      this.setState({ dragging: false });
    }
  }

  addEvent() {
    document.onselectstart = () => false;
    document.ondragstart = () => false;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  removeEvent() {
    document.onselectstart = null;
    document.ondragstart = null;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  style() {
    const { dragging, left, top, width, height } = this.state;
    if (dragging) {
      return {
        position: 'fixed',
        opacity: .6,
        left,
        top,
        width,
        height,
        zIndex: 12,
      }
    }
    return {};
  }

  render() {
    return (
      <div
        style={this.style()}
        className={this.props.className}
        onMouseDown={this.onMouseDown}>
        {this.props.children}
      </div>
    );
  }
}