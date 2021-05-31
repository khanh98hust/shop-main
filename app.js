$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find(".link");
    // Evento
    links.on("click", {
      el: this.el,
      multiple: this.multiple
    }, this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el;
    ($this = $(this)), ($next = $this.next());

    $next.slideToggle();
    $this.parent().toggleClass("open");

    if (!e.data.multiple) {
      $el.find(".submenu").not($next).slideUp().parent().removeClass("open");
    }
  };

  var accordion = new Accordion($("#accordion"), false);
});

var btn = $(".on-top");

$(window).scroll(function () {
  if ($(window).scrollTop() > 900) {
    btn.addClass("show");
  } else {
    btn.removeClass("show");
  }
});

btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({
    scrollTop: 0
  }, "300");
});

//slide show

var listSliders = [
  "../public/slider1.png",
  "../public/slider2.png",
  "../public/slider3.png",
];

var index = 0;

showSlide = (x) => {
  if(x < 0) {
    index = listSliders.length - 1
  }
  if(x > listSliders.length - 1) {
    index = 0
  }
  // console.log(x);
  document.getElementById("slide-show").style.backgroundImage = `url(${listSliders[index]})`
  var dot = document.getElementsByClassName("pick");
  for (i = 0; i < dot.length; i++) {
    dot[i].className = dot[i].className.replace("pick-dot", "");
  }
  dot[index].classList.add("pick-dot")
}

sliderInterval = () => {
  setInterval(() => {
    showSlide(index)
    index++
  }, 1000)
}

previus = (n) => {
  index += n;
  showSlide(index)
};

pickSlide = (n) => {
  index = n
  showSlide(index)
};

registerShow = () => {
  var login = document.getElementById("registration")
  login.style.display === 'none' ? login.style.display = 'block' : login.style.display = 'none'
}

function bodautiengviet (str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

register = () => {
  var name = document.getElementById('username').value
  var namebodau = bodautiengviet(name)
  regex = /^[a-zA-Z0-9 ]/g
  console.log(regex.test(namebodau));
}

regis = () => {
  var name = document.getElementById('username').value
  var namebodau = bodautiengviet(name)
  regex = /^[a-zA-Z0-9 ]/g
  console.log(regex.test(namebodau));
}

sliderInterval();
