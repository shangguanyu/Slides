/**
 * Created by wyx on 2017/9/8.
 */
window.slides=function (element) {
    var $el=$(element);
    console.log($el);
    var width=$el.width();
    let $view=$el.children('.view');
    console.log(typeof $view)
    console.log(width)
    var count=$el.find('.slide').length;
    var currentIndex=0
    let timerId

    var $ol=$('<ol class="controls"></ol>')//添加ol 名字叫controls
    for(let i=0;i<count;i++){
        $ol.append(`<li></li>`)
    }
    $el.append($ol)
    $controls=$ol.find('li')
    $controls.eq(0).addClass('active')
    $el.on('click','li',function (e) {
        let $li=$(e.currentTarget)
        console.log($li)
        let index=$li.index();
        goToSlide(index);
    })
    $view.on('mouseenter',function () {
        window.clearTimeout(timerId)
    })
    $view.on('mouseleave',function () {
        autoPlay()
    })
    function goToSlide(index) {
        if(index<0){
            index=count-1
        }else if(index>=count){
            index=0
        }
        if(index === 0){
            let $li=$el.find('.slide').eq(0).clone();
            $li.appendTo($view);
            let number= - width*count;
            $view.one("transitionend",function () {
                $li.remove();
                let oldTransition=$view.css('transition')
                $view.css({
                    transition:'none',
                    transform:`translateX(0px)`
                })
                $view.offset()//强制分开执行，先执行上面的然后在执行下面的
                $view.css('transition',oldTransition)
                currentIndex=index
            })
            $view.css({
                transform:`translateX(${number}px)`
            })
            $controls.removeClass('active')
            $controls.eq(index).addClass('active')
            return
        }
        let number= - width*index;
        $view.css({
            transform:`translateX(${number}px)`
        })
        $controls.removeClass('active')
        $controls.eq(index).addClass('active')
        currentIndex=index
    }
   function autoPlay() {
       timerId=setInterval(function () {
           goToSlide(currentIndex+1)
       },3000)
   }
   autoPlay()
}
slides(document.querySelectorAll('.slides'))