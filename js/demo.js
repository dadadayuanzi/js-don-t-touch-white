var go = document.getElementById('go');
var main = document.getElementById('main');
var colors = ['red','yellow','blue','black'];
var speed = 2,score = 0,timer, flag = true;
// 游戏入口
function startGame() {
    go.addEventListener('click', function () {
        go.style.display = "none";
        moveS()
    })
}
startGame()

// 方块移动 需要判断游戏是否结束
function moveS() {
    clearInterval(timer);
    timer = setInterval(function () {
        var step = main.offsetTop + speed;
        main.style.top = step + 'px';
        if (parseInt(main.offsetTop) >= 0) {
            main.style.top = "-150px";
        }
        createDiv()
        var len = main.childNodes.length;
        if (len >= 6) {
            for (let k = 0; k <4 ;k++){
                if(main.childNodes[len-1].childNodes[k].classList.contains('needClick')) {
                    alert('game over 得分：' + score)
                    clearInterval(timer);
                    flag = false;
                }
            }
            main.removeChild(main.childNodes[len-1])
        }
    },1000)
    bindEvent()
}

// 创建方块元素
function createDiv () {
    var rDiv = document.createElement('div');
    var clickIndex = Math.floor(Math.random() * 4);
    rDiv.setAttribute('class','rowDiv');
    for (let i = 0; i < 4;i++){
        var cDiv = document.createElement('div');
        rDiv.appendChild(cDiv);
    }
    if (main.childNodes.length == 0){
        main.appendChild(rDiv);
    }else {
        main.insertBefore(rDiv,main.childNodes[0])
    }
    var clickDiv = main.childNodes[0].childNodes[clickIndex];
    clickDiv.setAttribute('class' , 'needClick');
    clickDiv.style.backgroundColor = colors[clickIndex];
}


// 点击方块 也需要判断游戏是否结束
function bindEvent() {
    main.addEventListener('click' ,function (e) {
        var tar = e.target;
        if(flag){
            if (tar.className == 'needClick') {
                tar.style.backgroundColor = "#bbb";
                tar.classList.remove('needClick');
                score++;
            }else {
                alert('game over 得分：' + score);
                clearInterval(timer);
                flag = false;
            }
        }
    })
}