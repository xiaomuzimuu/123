<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>分数学习</title>
    <style>
        .lesson-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .drag-area {
            display: flex;
            gap: 10px;
        }
        .drag-item {
            border: 1px solid #ccc;
            padding: 5px 10px;
            cursor: move;
        }
        .drop-area {
            border: 2px dashed #ccc;
            min-height: 30px;
            margin-top: 10px;
            text-align: center;
        }
        .feedback.correct {
            color: green;
        }
        .feedback.wrong {
            color: red;
        }
    </style>
</head>
<body>
    <div id="content">
        <div class="lesson-header">
            <h3>分数学习</h3>
            <button onclick="showLesson('concept')">开始学习</button>
        </div>
    </div>

    <script>
        // 教学数据
        const lessons = {
            concept: {
                title: "什么是分数？",
                content: `
                    <div class="lesson-content">
                        <h3>分数的概念</h3>
                        <p>分数表示一个整体被平均分成若干份，取其中的几份。</p>
                        <div class="fraction-box">
                            <div class="fraction">1</div>
                            <div style="border-bottom: 2px solid; width: 30px"></div>
                            <div class="fraction">2</div>
                        </div>
                        <p>→ 表示整体被分成<strong>2等份</strong>，取其中的<strong>1份</strong></p>
                        
                        <h3>生活中的分数</h3>
                        <ul>
                            <li>一个披萨平均分成8块，取3块 → 3/8</li>
                            <li>一盒巧克力有12颗，吃了5颗 → 5/12</li>
                        </ul>
                        
                        <button onclick="showLesson('practice')">开始练习</button>
                    </div>
                `
            },
            practice: {
                title: "分数练习",
                content: `
                    <div class="lesson-content">
                        <h3>拖拽练习：匹配分数表示</h3>
                        <p>将右侧的分数拖到对应的图片上</p>
                        
                        <div class="drag-area">
                            <div class="drag-item" draggable="true" data-value="1/2">1/2</div>
                            <div class="drag-item" draggable="true" data-value="1/4">1/4</div>
                            <div class="drag-item" draggable="true" data-value="3/4">3/4</div>
                        </div>
                        
                        <div style="display: flex; justify-content: space-around; margin-top: 30px;">
                            <div>
                                <img src="https://via.placeholder.com/100?text=半圆" width="100" alt="半圆示意图">
                                <div class="drop-area" data-answer="1/2"></div>
                            </div>
                            <div>
                                <img src="https://via.placeholder.com/100?text=1/4圆" width="100" alt="四分之一圆示意图">
                                <div class="drop-area" data-answer="1/4"></div>
                            </div>
                            <div>
                                <img src="https://via.placeholder.com/100?text=3/4圆" width="100" alt="四分之三圆示意图">
                                <div class="drop-area" data-answer="3/4"></div>
                            </div>
                        </div>
                        
                        <div class="feedback" id="feedback"></div>
                        
                        <button onclick="showLesson('test')">进入测验</button>
                        <button onclick="checkAnswers()">检查答案</button>
                    </div>
                `
            },
            test: {
                title: "知识检测",
                content: `
                    <div class="lesson-content">
                        <h3>选择题</h3>
                        <div class="question">
                            <p>1. 下面哪个表示"三分之一"？</p>
                            <div>
                                <input type="radio" name="q1" value="a"> 1/2<br>
                                <input type="radio" name="q1" value="b"> 1/3<br>
                                <input type="radio" name="q1" value="c"> 1/4
                            </div>
                        </div>
                        
                        <div class="question">
                            <p>2. 把圆平均分成8份，涂色3份，用分数表示是？</p>
                            <div>
                                <input type="radio" name="q2" value="a"> 3/8<br>
                                <input type="radio" name="q2" value="b"> 5/8<br>
                                <input type="radio" name="q2" value="c"> 8/3
                            </div>
                        </div>
                        
                        <div class="feedback" id="test-feedback"></div>
                        
                        <button onclick="showLesson('concept')">重新学习</button>
                        <button onclick="checkTest()">提交答案</button>
                    </div>
                `
            }
        };

        // 显示课程内容
        function showLesson(lessonKey) {
            if (!lessonKey) {
                document.getElementById('content').innerHTML = `
                    <div class="lesson-header">
                        <h3>分数学习</h3>
                        <button onclick="showLesson('concept')">开始学习</button>
                    </div>
                `;
                return;
            }
            
            const lesson = lessons[lessonKey];
            document.getElementById('content').innerHTML = `
                <div class="lesson-header">
                    <h3>${lesson.title}</h3>
                    <button onclick="showLesson('')">返回首页</button>
                </div>
                ${lesson.content}
            `;
            
            // 初始化拖拽功能
            if(lessonKey === 'practice') {
                initDragAndDrop();
            }
        }

        // 初始化拖拽功能
        function initDragAndDrop() {
            const dragItems = document.querySelectorAll('.drag-item');
            const dropAreas = document.querySelectorAll('.drop-area');
            
            dragItems.forEach(item => {
                item.addEventListener('dragstart', e => {
                    e.dataTransfer.setData('text/plain', e.target.dataset.value);
                });
            });
            
            dropAreas.forEach(area => {
                area.addEventListener('dragover', e => {
                    e.preventDefault();
                });
                
                area.addEventListener('drop', e => {
                    e.preventDefault();
                    const data = e.dataTransfer.getData('text/plain');
                    area.textContent = data;
                    area.dataset.userAnswer = data;
                });
            });
        }

        // 检查练习答案
        function checkAnswers() {
            const dropAreas = document.querySelectorAll('.drop-area');
            let allCorrect = true;
            
            dropAreas.forEach(area => {
                const correctAnswer = area.dataset.answer;
                const userAnswer = area.dataset.userAnswer || '';
                
                if(userAnswer === correctAnswer) {
                    area.style.borderColor = 'green';
                } else {
                    area.style.borderColor = 'red';
                    allCorrect = false;
                }
            });
            
            const feedback = document.getElementById('feedback');
            feedback.textContent = allCorrect 
                ? "✓ 太棒了！全部正确！" 
                : "✗ 有些题目不正确，请再试一次";
            feedback.className = `feedback ${allCorrect ? 'correct' : 'wrong'}`;
        }

        // 检查测验答案
        function checkTest() {
            const q1Answer = document.querySelector('input[name="q1"]:checked')?.value;
            const q2Answer = document.querySelector('input[name="q2"]:checked')?.value;
            
            let score = 0;
            if(q1Answer === 'b') score++;
            if(q2Answer === 'a') score++;
            
            const feedback = document.getElementById('test-feedback');
            feedback.innerHTML = `
                <p>你的得分：${score}/2</p>
                <p>${score === 2 ? '✓ 优秀！全部答对！' : '✗ 请继续加油！'}</p>
            `;
            feedback.className = `feedback ${score === 2 ? 'correct' : 'wrong'}`;
        }
    </script>
</body>
</html>
