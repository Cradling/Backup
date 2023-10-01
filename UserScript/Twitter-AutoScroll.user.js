// ==UserScript==
// @name         Twitter-AutoScroll
// @namespace    https://github.com/Cradling/Backup
// @version      1.0
// @description  Automatic scrolling on Twitter with text buttons "Up", "Stop", and "Down" for scrolling control.
// @author       404 Not Found
// @match       https://twitter.com/*
// @match       https://mobile.twitter.com/*
// @match       https://tweetdeck.twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var scrollInterval; // 用于存储滚动的定时器

    // 创建按钮容器
    var buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.left = '20px';
    buttonContainer.style.top = '50%';
    buttonContainer.style.transform = 'translateY(-50%)';
    buttonContainer.style.zIndex = '9999';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'column';
    document.body.appendChild(buttonContainer);

    // 创建向上滚动按钮
    var upButton = createButton('Up', startScrollUp);
    upButton.style.fontSize = '14px';
    upButton.style.fontWeight = 'bold';
    buttonContainer.appendChild(upButton);

    // 创建停止按钮
    var stopButton = createButton('Stop', stopScroll);
    stopButton.style.fontSize = '14px';
    buttonContainer.appendChild(stopButton);

    // 创建向下滚动按钮
    var downButton = createButton('Down', startScrollDown);
    downButton.style.fontSize = '14px';
    downButton.style.fontWeight = 'bold';
    buttonContainer.appendChild(downButton);

    // 创建按钮的辅助函数
    function createButton(text, clickHandler) {
        var button = document.createElement('button');
        button.textContent = text;
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.padding = '8px 12px';
        button.style.fontWeight = 'bold';
        button.style.cursor = 'pointer';
        button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
        button.style.transition = 'background-color 0.3s ease';
        button.addEventListener('click', clickHandler);
        button.addEventListener('mouseenter', function() {
            button.style.backgroundColor = '#eee'; // 鼠标悬停时的背景颜色
        });
        button.addEventListener('mouseleave', function() {
            button.style.backgroundColor = 'transparent';
        });
        return button;
    }

    // 向上滚动
    function startScrollUp() {
        stopScroll(); // 停止其他滚动
        scrollInterval = setInterval(function() {
            window.scrollTo(0, window.scrollY - 500); // 向上滚动距离
        }, 250); // 滚动速度
    }

    // 向下滚动
    function startScrollDown() {
        stopScroll(); // 停止其他滚动
        scrollInterval = setInterval(function() {
            window.scrollTo(0, window.scrollY + 500); // 向下滚动的距离
        }, 250); // 滚动速度
    }

    // 停止滚动
    function stopScroll() {
        clearInterval(scrollInterval);
    }

    // 响应式设计
    var mediaQuery = window.matchMedia('(max-width: 768px)'); // 响应式断点
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    function handleMediaQueryChange(mediaQuery) {
        if (mediaQuery.matches) {
            // 移动设备样式
            buttonContainer.style.left = '10px';
            buttonContainer.style.top = '10px';
            buttonContainer.style.transform = 'none';
        } else {
            // 桌面设备样式
            buttonContainer.style.left = '20px';
            buttonContainer.style.top = '50%';
            buttonContainer.style.transform ='translateY(-50%)';
        }
    }
})();
