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
  }else if(x > listSliders.length - 1) {
    index = 0
  }
  document.getElementById("slide-show").style.backgroundImage = `url(${listSliders[index]})`
  var dot = document.getElementsByClassName("pick");
  for (i = 0; i < dot.length; i++) {
    dot[i].className = dot[i].className.replace("pick-dot", "");
  }
  dot[index].classList.add("pick-dot")
}

var slideInterval = setInterval(() => {
  ++index
  showSlide(index)
}, 5000)

//debounce

function debounce(func, timeout = 1000){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

var debo = debounce(() => {
  return slideInterval = setInterval(() => {
    ++index
    showSlide(index)
  }, 5000)
})

// chuyen slide
move = (n) => {
  showSlide(index += n)
  clearInterval(slideInterval)
  debo()
};

pickSlide = (n) => {
  showSlide(index = n)
};

// register

registerShow = () => {
  var login = document.getElementById("registration")
  login.style.display === 'none' ? login.style.display = 'block' : login.style.display = 'none'
}

function bodautiengviet (str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
  str = str.replace(/??|??|???|???|??/g, "i");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
  str = str.replace(/???|??|???|???|???/g, "y");
  str = str.replace(/??/g, "d");
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
    showErr(username, 'T??n kh??ng ???????c ch???a k?? t??? ?????c bi???t !')
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
        showErr(email,'Email kh??ng ????ng !');
    }
  disableSubmit()
}

regisPassword = () => {
  // console.log(password.value.length );
  if(password.value.length < 8 || password.value.length > 32){
    showErr(password , 'Password ch???a 8 - 32 k?? t??? !')
  }else {
    var chuhoa = /[A-Z]/g
    var chuthuong = /[a-z]/g
    if(password.value.match(chuhoa) && password.value.match(chuthuong)){
      showSucces(password)
    }else {
      showErr(password , 'Password ph???i ch???a ??t nh???t 1 ch??? hoa v?? ch??? th?????ng')
    }
  }
  disableSubmit()
}

confirmPassword = () =>{
  if(password.value != password2.value || password2.value == '') {
    showErr(password2 , 'Password kh??ng tr??ng !')
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


