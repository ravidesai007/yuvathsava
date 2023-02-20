// Master DOManipulator v2 ------------------------------------------------------------
const items = document.querySelectorAll('.item'),
controls = document.querySelectorAll('.control'),
headerItems = document.querySelectorAll('.item-header'),
descriptionItems = document.querySelectorAll('.item-description'),
activeDelay = .76,
interval = 5000;

let current = 0;

const slider = {
  init: () => {
    controls.forEach(control => control.addEventListener('click', e => {slider.clickedControl(e);}));
    controls[current].classList.add('active');
    items[current].classList.add('active');
  },
  nextSlide: () => {// Increment current slide and add active class
    slider.reset();
    if (current === items.length - 1) current = -1; // Check if current slide is last in array
    current++;
    controls[current].classList.add('active');
    items[current].classList.add('active');
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
  },
  clickedControl: e => {// Add active class to clicked control and corresponding slide
    slider.reset();
    clearInterval(intervalF);

    const control = e.target,
    dataIndex = Number(control.dataset.index);

    control.classList.add('active');
    items.forEach((item, index) => {
      if (index === dataIndex) {// Add active class to corresponding slide
        item.classList.add('active');
      }
    });
    current = dataIndex; // Update current slide
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
    intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
  },
  reset: () => {// Remove active classes
    items.forEach(item => item.classList.remove('active'));
    controls.forEach(control => control.classList.remove('active'));
  },
  transitionDelay: items => {// Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
    let seconds;

    items.forEach(item => {
      const children = item.childNodes; // .vertical-part(s)
      let count = 1,
      delay;

      item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

      children.forEach(child => {// iterate through .vertical-part(s) and style b element
        if (child.classList) {
          item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
          child.firstElementChild.style.transitionDelay = `${delay}s`; // b element
          count++;
        }
      });
    });
  } };


let intervalF = setInterval(slider.nextSlide, interval);
slider.init();

// countdown

(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  //I'm adding this section so I don't have to keep updating this pen every year :-)
  //remove this if you don't need it
  let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth = "03/29/",
      birthday = dayMonth + yyyy;
  
  today = mm + "/" + dd + "/" + yyyy;
  if (today > birthday) {
    birthday = dayMonth + nextYear;
  }
  //end
  
  const countDown = new Date(birthday).getTime(),
      x = setInterval(function() {    

        const now = new Date().getTime(),
              distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        if (distance < 0) {
          document.getElementById("headline").innerText = "Begin the youvatsava";
          document.getElementById("countdown").style.display = "none";
          document.getElementById("content").style.display = "block";
          clearInterval(x);
        }
        //seconds
      }, 0)
  }());

  //cards

  var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
      invert: false,
    },
    // autoHeight: true,
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    }
  });

  //notice

  (function($) {
    $.fn.autoscroll = function(options) {
      var settings = $.extend({}, $.fn.autoscroll.defaults, options);
      return this.each(function() {
        var $this = $(this);
        if ($this.length > 0 &&
          $this[0].scrollHeight > $this[0].clientHeight) {
          var scrollTimer,
            scrollTop = 0;
  
          function scrollList() {
            var itemHeight = $this.children().eq(1).outerHeight(true); // 取第二个高度防止第一个没有上间距
            scrollTop++;
            if (scrollTop >= itemHeight) {
              $this.scrollTop(0).children().eq(0).appendTo($this);
              scrollTop = 0;
            } else {
              $this.scrollTop(scrollTop);
            }
          }
          // 鼠标悬停时停止播放
          $this.hover(function() {
            clearInterval(scrollTimer);
            $this.css("overflow-y", "auto");
            if (settings.hideScrollbar) {
              $this.addClass("hide-scrollbar");
            }
            if($.type(settings.handlerIn) === "function") {
              settings.handlerIn();
            }
          }, function() {
            $this.css("overflow-y", "hidden");
            scrollTimer = setInterval(function() {
              scrollList();
            }, settings.interval);
            if($.type(settings.handlerOut) === "function") {
              settings.handlerOut();
            }
          }).trigger("mouseleave");
        }
      });
    }
    $.fn.autoscroll.defaults = {
      interval: 50, // 控制速度
      hideScrollbar: true, // 隐藏滚动条但可以滚动
      handlerIn: null, // 鼠标悬停
      handlerOut: null // 鼠标离开
  
    };
    $(function() {
      // 需在目标元素上添加data-autoscroll
      $("[data-autoscroll]").autoscroll();
    });
  })(jQuery);
  