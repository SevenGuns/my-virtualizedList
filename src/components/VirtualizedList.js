import React, { createRef } from 'react';
import uniqueId from 'lodash/uniqueId';
import debounce from 'lodash/debounce';

// 取消之前的任务只能通过debounce吧
function throttle(func, time = 300) {
  let lastTime;
  return (...args) => {
    const now = Date.now();
    if (now - lastTime < time) return;
    func(...args);
    lastTime = now;
  };
}

// after是要清楚先执行的任务 所以要用的setTimeout
function myDebounceAfter(func, time = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, time);
  };
}

// before是要拦截剩下的任务所以不一定要setTimeout
function myDebounceBefore(func, time = 300) {
  let lastTime;
  return (...args) => {
    const now = Date.now();
    if (now - lastTime > time) func(...args);
    lastTime = now;
  };
}

function initList(size) {
  const res = [];
  for (let i = 0; i < size; i++) {
    res.push({
      key: uniqueId(),
      label: `测试_${i}`
    });
  }
  return res;
}

// 异步渲染会让这个东西变复杂
export default class VirtualizedList extends React.PureComponent {
  myList = createRef();
  scrollHeight = 300;
  itemClientHeight = 40;
  state = {
    list: initList(100000),
    listSize: 0,
    startIndex: 0,
    pointerEvents: ''
  };
  componentDidMount() {
    this.setState({ listSize: Math.floor((300 / this.itemClientHeight) * 3) });
  }
  onScroll = () => {
    const { scrollTop } = this.myList.current;
    // 数据内容会不会变？？ 我要假装我的数据是满的但是元素其实是通过绝对定位定到底部的
    this.setState({
      startIndex: Math.floor(scrollTop / this.itemClientHeight),
      pointerEvents: 'none'
    });
    this.dounceChange();
  };
  dounceChange = debounce(() => {
    this.setState({ pointerEvents: '' });
  }, 500);
  render() {
    const { itemClientHeight, scrollHeight } = this;
    const { list, startIndex, listSize, pointerEvents } = this.state;
    const dataList = list.slice(startIndex, listSize + startIndex);
    return (
      <div
        style={{ overflow: 'auto', height: `${scrollHeight}px` }}
        onScroll={this.onScroll}
        ref={this.myList}
      >
        <div
          className="list"
          style={{
            position: 'relative',
            height: list.length * itemClientHeight,
            overflow: 'hidden',
            ...(pointerEvents && { pointerEvents })
          }}
        >
          {dataList.map((item, idx) => (
            <div
              key={item.key}
              style={{
                position: 'absolute',
                lineHeight: `${itemClientHeight}px`,
                top: `${(idx + startIndex) * itemClientHeight}px`
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
