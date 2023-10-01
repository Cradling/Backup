// ==UserScript==
// @name         Twitter AutoScroll
// @namespace    your-namespace
// @version      1.0
// @description  自动往下滑动Twitter页面
// @author       Unknown
// @match        https://twitter.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  // 创建一个标志变量来控制自动滑动的开关
  let autoScrollEnabled = false;
  let intervalId;

  // 创建一个容器元素
  const container = document.createElement('div');
  container.id = 'auto-scroll-container';

  // 创建一个按钮元素
  const toggleButton = document.createElement('button');
  toggleButton.textContent = '滑动开关';
  toggleButton.id = 'auto-scroll-toggle-button';

  // 创建一个滚动距离输入框
  const distanceInput = document.createElement('input');
  distanceInput.type = 'number';
  distanceInput.id = 'auto-scroll-distance-input';
  distanceInput.placeholder = '距离px';

  // 创建一个时间间隔输入框
  const intervalInput = document.createElement('input');
  intervalInput.type = 'number';
  intervalInput.id = 'auto-scroll-interval-input';
  intervalInput.placeholder = '间隔ms';

  // 将按钮和输入框添加到容器中
  container.appendChild(toggleButton);
  container.appendChild(distanceInput);
  container.appendChild(intervalInput);

  // 将容器添加到页面中
  document.body.appendChild(container);

  // 按钮点击事件处理程序
  toggleButton.addEventListener('click', function () {
    // 切换自动滑动的状态
    autoScrollEnabled = !autoScrollEnabled;

    // 如果开启自动滑动，则开始滑动页面
    if (autoScrollEnabled) {
      const distance = parseInt(distanceInput.value) || window.innerHeight;
      const interval = parseInt(intervalInput.value) || 1000;
      intervalId = setInterval(() => scrollPage(distance), interval);
      toggleButton.textContent = '停止滑动';
    } else {
      // 如果关闭自动滑动，则停止滑动并更新按钮文本
      clearInterval(intervalId);
      toggleButton.textContent = '自动滑动开关';
    }
  });

  // 滑动页面的函数
  function scrollPage(distance) {
    window.scrollBy(0, distance);
  }

  // 添加样式以美化按钮和输入框，并设置容器的样式
  GM_addStyle(`
    #auto-scroll-container {
      position: fixed;
      bottom: 10px;
      left: 10px;
      z-index: 9999;
      display: flex;
      align-items: center;
    }

    #auto-scroll-toggle-button {
      padding: 8px 12px;
      background-color: #1da1f2;
      border: none;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      border-radius: 5px;
      margin-right: 10px;
      transition: background-color 0.3s ease;
    }

    #auto-scroll-toggle-button:hover {
      background-color: #0c87b8;
    }

    #auto-scroll-distance-input,
    #auto-scroll-interval-input {
      width: 80px;
      padding: 4px;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-right: 10px;
      transition: border-color 0.3s ease;
    }

    #auto-scroll-distance-input:focus,
    #auto-scroll-interval-input:focus {
      outline: none;
      border-color: #1da1f2;
    }

    @media screen and (max-width: 600px) {
      #auto-scroll-container {
        flex-direction: column;
        left: 5px;
        bottom: 5px;
      }

      #auto-scroll-toggle-button {
        margin-bottom: 5px;
      }

      #auto-scroll-distance-input,
      #auto-scroll-interval-input {
        width: 100%;
        margin-bottom: 5px;
      }
    }
  `);

  // 添加键盘事件处理程序，以便使用空格键切换自动滑动的开关
  document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      event.preventDefault();
      toggleButton.click();
    }
  });

  // 添加可访问性属性
  toggleButton.setAttribute('aria-pressed', 'false');
  toggleButton.setAttribute('role', 'button');
  toggleButton.setAttribute('aria-label', '切换自动滑动开关');

  distanceInput.setAttribute('aria-label', '距离px）');
  distanceInput.setAttribute('aria-describedby', 'auto-scroll-distance-input');
  distanceInput.setAttribute('role', 'textbox');

  intervalInput.setAttribute('aria-label', '间隔ms');
  intervalInput.setAttribute('aria-describedby', 'auto-scroll-interval-input');
  intervalInput.setAttribute('role', 'textbox');
})();
