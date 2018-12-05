/**
 * @Author: Jxx
 * @Time: 2018-12-03
 * @description: pagination plugin
 */
;(function(win){

    function withID(id) {
        return document.getElementById(id);
    }

    function createElement(tagName) {
        return document.createElement(tagName)
    }
    
    //判断输入的页数有效性
    function checkNum(pageIndex) {
        var reg = /^\+?[1-9][0-9]*$/;
        return reg.test(pageIndex);
    }
    
    class page {
        constructor(el,size,num, success, fail) {
            this.el = el
            this.success = success
            this.fail = fail
            this.psize = size
            this.num = num
        }
        init() {
            this.initDOM()
            this.draw()
            this.bindEvents()
        }
        initDOM() {
            const trSum = this.el.rows.length
            //总共能分几页
            let pageSum;        
            if(trSum/this.psize > parseInt(trSum/this.psize)) {   
                pageSum = parseInt(trSum/this.psize) + 1;   
            } else {   
                pageSum = parseInt(trSum/this.psize);   
            };
            const tbodyContainer = this.el;
            const pageBar = withID('pageBar');
            const prevDiv = createElement('div')
            const prevA = createElement('a')
            const pageContainer = createElement('div')
            const itemSpan1 = createElement('span')
            const itemSpan2 = createElement('span')
            const itemSpan3 = createElement('span')
            const inputNum = createElement('input')
            const nextDiv = createElement('div')
            const nextA = createElement('a')
            const goBtn = createElement('div')
            const goBtnA = createElement('a')
            prevDiv.appendChild(prevA)
            prevDiv.className = 'page-classify fl'
            prevA.className = 'col9 cursor-normal'
            prevA.innerHTML = '上一页'
            pageContainer.className = 'page-total fl'
            itemSpan1.className = 'page-span'
            itemSpan1.innerHTML = '第'
            itemSpan2.className = 'page-span'
            itemSpan2.innerHTML = '/' + pageSum
            itemSpan3.className = 'page-span'
            itemSpan3.innerHTML = '页'
            inputNum.value = this.num
            inputNum.className = 'page-state'
            nextDiv.className = 'page-classify fl'
            nextA.innerHTML = '下一页'
            goBtn.className = 'page-go fl'
            goBtnA.className = 'page-go-a';
            goBtnA.innerHTML = 'Go'
            pageContainer.appendChild(itemSpan1)
            pageContainer.appendChild(inputNum);
            pageContainer.appendChild(itemSpan2)
            pageContainer.appendChild(itemSpan3)
            nextDiv.appendChild(nextA)
            goBtn.appendChild(goBtnA)
            pageBar.appendChild(prevDiv)
            pageBar.appendChild(pageContainer)
            pageBar.appendChild(nextDiv)
            pageBar.appendChild(goBtn)
            Object.assign(this, {
                tbodyContainer, prevA, inputNum, nextA, goBtnA, pageSum
            })
        }
        draw() {
            var trSum = this.el.rows.length
            this.num = this.inputNum.value
            if (this.num == 1) {
                this.prevA.className = 'col9 cursor-normal'
                this.nextA.className = ''
            } else if (this.num == this.pageSum) {
                this.prevA.className = ''
                this.nextA.className = 'col9 cursor-normal'
            } else {
                this.prevA.className = ''
                this.nextA.className = ''
            }
            //开始显示的行
            var startRow = (this.num - 1) * this.psize+1;
            //结束显示的行
            var endRow = this.num * this.psize;
            endRow = (endRow > trSum)? trSum : endRow;
               //遍历显示数据实现分页
            for(var i=1;i<(trSum+1);i++){    
                var irow = this.el.rows[i-1];
                if(i>=startRow && i<=endRow){
                    irow.style.display = "block";    
                }else{
                    irow.style.display = "none";
                }
            }
        }
        bindEvents() {
            //上一页
            this.prevA.addEventListener('click', (e) => {
                this.num = this.inputNum.value
                if(this.num > 1 && this.num <= this.pageSum) {
                    this.num--
                    this.inputNum.value = this.num
                } else {
                    this.fail()
                    return false
                }
                this.draw()
                this.success && this.success()
            })
            //下一页
            this.nextA.addEventListener('click', (e) => {
                this.num = this.inputNum.value
                if(this.num < this.pageSum && this.num >= 1) {
                    this.num++
                    this.inputNum.value = this.num
                } else {
                    this.fail && this.fail()
                    return false
                }
                this.draw()
                this.success && this.success()
            })
            //Go
            this.goBtnA.addEventListener('click', (e) => {
                this.num = this.inputNum.value
                if (!checkNum(this.num)) {
                    alert('请输入有效值')
                    this.fail && this.fail()
                    return false
                }
                if (this.num > this.pageSum) {
                    alert('您输入的值太大了')
                    this.fail && this.fail()
                    return false
                }
                this.draw()
                this.success && this.success()
            })
        }
    }
    
    window.page = {
        init: function(element, size, num, success, fail) {
            new page(element, size, num, success, fail).init()
        }
    }
})(window)

