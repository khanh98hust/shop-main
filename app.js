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

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('pw');
const password2 = document.getElementById('pw2');

var errName, errEmail, errPw, errPw2

showErr = (input, msg) => {
  var formItem = input.parentElement;
  // console.log(formItem);
  formItem.className = 'form-item form-err';
  var small = formItem.querySelector('small')
  small.innerText = msg
  if(input == username) errName = true
  if(input == email) errEmail = true
  if(input == password) errPw = true
  if(input == password2) errPw2 = true
}

showSucces = (input) => {
  var formItem = input.parentElement;
  formItem.className = 'form-item form-success';
  if(input == username) errName = false
  if(input == email) errEmail = false
  if(input == password) errPw = false
  if(input == password2) errPw2 = false
}

regisName = () => {
  var namebodau = bodautiengviet(username.value)
  var regex = /^[a-zA-Z0-9 ]+$/g
  // console.log(regex.test(namebodau));
  if(!regex.test(namebodau)){
    showErr(username, 'Tên không được chứa ký tự đặc biệt !')
  }else {
    showSucces(username)
  }
  disableSubmit()
}

regisEmail = () => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value.trim())) {
        showSucces(email)
    }else {
        showErr(email,'Email không đúng !');
    }
  disableSubmit()
}

regisPassword = () => {
  // console.log(password.value.length );
  if(password.value.length < 8 || password.value.length > 32){
    showErr(password , 'Password chứa 8 - 32 ký tự !')
  }else {
    var chuhoa = /[A-Z]/g
    var chuthuong = /[a-z]/g
    if(password.value.match(chuhoa) && password.value.match(chuthuong)){
      showSucces(password)
    }else {
      showErr(password , 'Password phải chứa ít nhất 1 chữ hoa và chữ thường')
    }
  }
  disableSubmit()
}

confirmPassword = () =>{
  if(password.value != password2.value || password2.value == '') {
    showErr(password2 , 'Password không trùng !')
  }else {
    showSucces(password2)
  }
  disableSubmit()
}

disableSubmit = () => {
  if(errName || errPw || errPw2 || errEmail) {
    document.getElementById('regis-btn').disabled = true
    document.getElementById('regis-btn').style.cursor = 'no-drop'
  }else{
    document.getElementById('regis-btn').disabled = false
    document.getElementById('regis-btn').style.cursor = 'auto'
  }
}

showRegisSuccess = () => {
  registerShow();
  document.getElementsByClassName("regis-success-box")[0].style.display = "flex"
  setTimeout(()=> {
    document.getElementsByClassName("regis-success-box")[0].style.display = "none"
  }, 1000)
}

register = (event) => {
  event.preventDefault();
    regisName();
    regisEmail();
    regisPassword();
    confirmPassword();
  if(errName || errPw || errPw2 || errEmail){
  }else {
    showRegisSuccess()
  }
}

sliderInterval();
