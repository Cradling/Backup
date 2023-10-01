// ==UserScript==
// @name         Twitter AutoScroll
// @namespace    https://github.com/Cradling/Backup
// @version      1.0
// @description  自动往下滑动Twitter页面
// @author       Unknown
// @match        https://twitter.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  // 创建一个容器元素
  const container = document.createElement('div');
  container.id = 'auto-scroll-container';

  // 创建一个往上滑按钮
  const scrollUpButton = document.createElement('button');
  scrollUpButton.textContent = 'Up';
  scrollUpButton.id = 'auto-scroll-up-button';

  // 创建一个往下滑按钮
  const scrollDownButton = document.createElement('button');
  scrollDownButton.textContent = 'Down';
  scrollDownButton.id = 'auto-scroll-down-button';

  // 创建一个停止按钮
  const stopButton = document.createElement('button');
  stopButton.textContent = 'Stop';
  stopButton.id = 'auto-scroll-stop-button';

  // 将按钮添加到容器中
  container.appendChild(scrollUpButton);
  container.appendChild(scrollDownButton);
  container.appendChild(stopButton);

  // 将容器添加到页面中
  document.body.appendChild(container);

  let intervalId;

  // 按钮点击事件处理程序 - 往上滑
  scrollUpButton.addEventListener('click', function () {
    const distance = -2000; // 设置快速滑动的距离为负值，表示往上滑
    const interval = 100; // 设置快速滑动的时间间隔
    intervalId = setInterval(() => scrollPage(distance), interval);
  });

  // 按钮点击事件处理程序 - 往下滑
  scrollDownButton.addEventListener('click', function () {
    const distance = 2000; // 设置快速滑动的距离为正值，表示往下滑
    const interval = 100; // 设置快速滑动的时间间隔
    intervalId = setInterval(() => scrollPage(distance), interval);
  });

  // 按钮点击事件处理程序 - 停止滑动
  stopButton.addEventListener('click', function () {
    clearInterval(intervalId);
  });

  // 滑动页面的函数
  function scrollPage(distance) {
    window.scrollBy({
      top: distance,
      behavior: 'auto' // 关闭动画效果
    });
  }

  // 添加样式以美化按钮和容器
  GM_addStyle(`
    #auto-scroll-container {
      position: fixed;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    button {
      padding: 8px 12px;
      background-color: #1da1f2;
      border: none;
      color: #ffffff;
      font-size: 14px;
      margin-bottom: 10px;
      cursor: pointer;
      border-radius: 4px;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    /* 淡入淡出效果 */
    #auto-scroll-container.fade-in {
      opacity: 1;
    }

    #auto-scroll-container.fade-out {
      opacity: 0;
    }

    button.fade-in {
      opacity: 1;
    }

    button.fade-out {
      opacity: 0;
    }

    /* 响应式设计 */
    @media (max-width: 600px) {
      #auto-scroll-container {
        bottom: 10px;
        top: auto;
        left: auto;
        right: 10px;
        transform: none;
        flex-direction: row;
        align-items: center;
      }

      button {
        margin-right: 10px;
      }
    }

    /* 主题颜色 */
    body[data-theme="dark"] #auto-scroll-container {
      background-color: #000000;
    }

    body[data-theme="dark"] #auto-scroll-up-button,
    body[data-theme="dark"] #auto-scroll-down-button {
      background-color: #ffffff;
    }

    /* 可访问性优化 */
    button:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(29, 161, 242, 0.5);
    }
  `);

  // 淡入容器和按钮
  setTimeout(() => {
    container.classList.add('fade-in');
    scrollUpButton.classList.add('fade-in');
    scrollDownButton.classList.add('fade-in');
    stopButton.classList.add('fade-in');
  }, 1000);

  // 淡出容器和按钮
  setTimeout(() => {
    container.classList.remove('fade-in');
    container.classList.add('fade-out');
    scrollUpButton.classList.remove('fade-in');
    scrollUpButton.classList.add('fade-out');
    scrollDownButton.classList.remove('fade-in');
    scrollDownButton.classList.add('fade-out');
    stopButton.classList.remove('fade-in');
    stopButton.classList.add('fade-out');
  }, 3000);
})();
