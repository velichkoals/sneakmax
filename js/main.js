"use strict";

function disableScroll() {
  var pagePosition = window.scrollY;
  document.body.classList.add('disable-scroll');
  document.body.dataset.position = pagePosition;
  document.body.style.top = -pagePosition + 'px';
}

function enableScroll() {
  var pagePosition = parseInt(document.body.dataset.position, 10);
  document.body.style.top = 'auto';
  document.body.classList.remove('disable-scroll');
  window.scroll({
    top: pagePosition,
    left: 0
  });
  document.body.removeAttribute('data-position');
}

var burger = document.querySelector('.burger');
var menu = document.querySelector('.header__nav');
burger.addEventListener('click', function () {
  burger.classList.toggle('burger--active');
  menu.classList.toggle('header__nav--active'); // if (burger.classList.contains('burger--active')) {
  // 	disableScroll();
  // } else {
  // 	enableScroll();
  // }
});
"use strict";

var cartBtn = document.querySelector('.cart__btn');
var miniCart = document.querySelector('.mini-cart');
cartBtn.addEventListener('click', function () {
  miniCart.classList.add('mini-cart--visible');
});
document.addEventListener('click', function (e) {
  if (!e.target.classList.contains('mini-cart') && !e.target.closest('mini-cart') && !e.target.classList.contains('cart__btn')) {
    miniCart.classList.remove('mini-cart--visible');
  }
});
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var accordions = document.querySelectorAll('.faq-accordion');
  accordions.forEach(function (el) {
    el.addEventListener('click', function (e) {
      var self = e.currentTarget;
      var control = self.querySelector('.faq-accordion__control');
      var content = self.querySelector('.faq-accordion__content');
      self.classList.toggle('open'); // если открыт аккордеон

      if (self.classList.contains('open')) {
        control.setAttribute('aria-expanded', true);
        content.setAttribute('aria-hidden', false);
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        control.setAttribute('aria-expanded', false);
        content.setAttribute('aria-hidden', true);
        content.style.maxHeight = null;
      }
    });
  });
});
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var catalogList = document.querySelector('.catalog-list');
var catalogMore = document.querySelector('.catalog__more');
var prodModal = document.querySelector('[data-graph-target="prod-modal"] .modal-content');
var prodModalSlider = prodModal.querySelector('.modal-slider .swiper-wrapper');
var prodModalPreview = prodModal.querySelector('.modal-slider .modal-preview');
var prodModalInfo = prodModal.querySelector('.modal-info__wrapper');
var prodModalDescr = prodModal.querySelector('.modal-prod-descr');
var prodModalChars = prodModal.querySelector('.prod-chars');
var prodModalVideo = prodModal.querySelector('.prod-modal__video');
var modal = null;
var prodQuantity = 9;
var dataLength = null;

var normalPrice = function normalPrice(str) {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1');
};

var prodSlider = new Swiper('.modal-slider__container', {
  slidesPerView: 1,
  spaceBetween: 20
});

if (catalogList) {
  var loadProducts = function loadProducts() {
    var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
    fetch('./data/data.json').then(function (response) {
      return response.json();
    }).then(function (data) {
      dataLength = data.length;
      catalogList.innerHTML = '';

      for (var i = 0; i < dataLength; i++) {
        if (i < quantity) {
          var item = data[i];
          console.log(item);
          catalogList.innerHTML += "\n\t\t\t\t\t\t\n\t\t\t\t\t\t<li class=\"catalog-list__item\">\n\t\t\t\t\t\t<article class=\"product\">\n\t\t\t\t\t\t\t<div class=\"product__image\">\n\t\t\t\t\t\t\t\t<img src=\"".concat(item.mainImage, "\" alt=\"").concat(item.title, "\">\n\t\t\t\t\t\t\t\t<div class=\"product__btns\">\n\t\t\t\t\t\t\t\t\t<button class=\"btn-reset product__btn\" data-graph-path=\"prod-modal\" data-id=\"").concat(item.id, "\" aria-label=\"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043D\u0444\u043E\u043C\u0440\u0430\u0446\u0438\u044E \u043E \u0442\u043E\u0432\u0430\u0440\u0435\">\n\t\t\t\t\t\t\t\t\t\t<svg>\n\t\t\t\t\t\t\t\t\t\t\t<use xlink:href='img/sprite.svg#eye'></use>\n\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t<button class=\"btn-reset product__btn add-to-cart-btn\" data-id=\"").concat(item.id, "\" aria-label=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443\">\n\t\t\t\t\t\t\t\t\t\t<svg>\n\t\t\t\t\t\t\t\t\t\t\t<use xlink:href='img/sprite.svg#cart'></use>\n\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<h3 class=\"product__title\">").concat(item.title, "</h3>\n\t\t\t\t\t\t\t<span class=\"product__price\">").concat(normalPrice(item.price), " \u0433\u0440\u043D</span>\n\t\t\t\t\t\t</article>\n\t\t\t\t\t</li>\n\t\t\t\t\t\t\n\t\t\t\t\t\t");
        }
      }
    }).then(function () {
      var productTitle = document.querySelectorAll('.product__title');
      productTitle.forEach(function (el) {
        $clamp(el, {
          clamp: '22px'
        });
      });
      var productBtns = document.querySelectorAll('.product__btn');
      productBtns.forEach(function (el) {
        console.log(el);
        el.addEventListener('focus', function (e) {
          var parent = e.currentTarget.closest('.product__btns');
          parent.classList.add('product__btns--active');
        }, true);
      });
      productBtns.forEach(function (el) {
        console.log(el);
        el.addEventListener('blur', function (e) {
          var parent = e.currentTarget.closest('.product__btns');
          parent.classList.remove('product__btns--active');
        }, true);
      });
      cartLogic();
      modal = new GraphModal({
        isOpen: function isOpen(modal) {
          if (modal.modalContainer.classList.contains('prod-modal')) {
            var openBtnId = modal.previousActiveElement.dataset.id;
            loadModalData(openBtnId);
            prodSlider.update();
          }
        }
      });
    });
  };

  loadProducts(prodQuantity);

  var loadModalData = function loadModalData() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    fetch('../data/data.json').then(function (response) {
      return response.json();
    }).then(function (data) {
      prodModalSlider.innerHTML = '';
      prodModalPreview.innerHTML = '';
      prodModalInfo.innerHTML = '';
      prodModalDescr.textContent = '';
      prodModalChars.innerHTML = '';
      prodModalVideo.innerHTML = '';

      var _iterator = _createForOfIteratorHelper(data),
          _step;

      try {
        var _loop = function _loop() {
          var dataItem = _step.value;

          if (dataItem.id == id) {
            console.log(dataItem);
            var slides = dataItem.gallery.map(function (image, idx) {
              return "\t\n\t\t\t\t\t\t\t<div class=\"swiper-slide\" data-index=\"".concat(idx, "\">\n\t\t\t\t\t\t\t\t<img src=\"").concat(image, "\" alt=\"\">\n\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t");
            });
            var preview = dataItem.gallery.map(function (image, idx) {
              return "\t \n\t\t\t\t\t\t\t<div class=\"modal-preview__item ".concat(idx === 0 ? 'modal-preview__item--active' : '', "\" tabindex=\"0\" data-index=\"").concat(idx, "\">\n\t\t\t\t\t\t\t<img src=\"").concat(image, "\" alt=\"\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t");
            });
            var sizes = dataItem.sizes.map(function (size, idx) {
              return "\t \n\t\t\t\t\t\t\t<li class=\"modal-sizes__item\">\n\t\t\t\t\t\t\t\t\t<button class=\"modal-sizes__btn btn-reset\">".concat(size, "</button>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t");
            });
            prodModalSlider.innerHTML = slides.join('');
            prodModalPreview.innerHTML = preview.join('');
            prodModalInfo.innerHTML = " \n\t\t\t\t\t\t\n\t\t\t\t\t\t<h3 class=\"modal-info__title\">".concat(dataItem.title, "</h3>\n\t\t\t\t\t\t<div class=\"modal-info__rate\">\n\t\t\t\t\t\t\t<img src=\"img/star.svg\" alt=\"\u0420\u0435\u0439\u0442\u0438\u043D\u0433 5 \u0438\u0437 5\">\n\t\t\t\t\t\t\t<img src=\"img/star.svg\" alt=\"\">\n\t\t\t\t\t\t\t<img src=\"img/star.svg\" alt=\"\">\n\t\t\t\t\t\t\t<img src=\"img/star.svg\" alt=\"\">\n\t\t\t\t\t\t\t<img src=\"img/star.svg\" alt=\"\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"modal-info__sizes\">\n\t\t\t\t\t\t\t<span class=\"modal-info__subtitle\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440</span>\n\t\t\t\t\t\t\t<ul class=\"list-reset modal-info__sized-list modal-sizes\">\n\t\t\t\t\t\t\t\t").concat(sizes.join(''), "\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"modal-info__price\">\n\t\t\t\t\t\t\t<span class=\"modal-info__current-price\">").concat(dataItem.price, " \u0433\u0440\u043D</span>\n\t\t\t\t\t\t\t<span class=\"modal-info__old-price\">").concat(dataItem.oldPrice ? dataItem.oldPrice + ' грн' : '', "</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t");
            prodModalDescr.textContent = dataItem.description;
            var charsItems = '';
            Object.keys(dataItem.chars).forEach(function eachKey(key) {
              charsItems += "<p class=\"prod-bottom__descr prod-chars__item\">".concat(key, ": ").concat(dataItem.chars[key], "</p>");
            });
            prodModalChars.innerHTML = charsItems;

            if (dataItem.video) {
              prodModalVideo.style.display = 'block';
              prodModalVideo.innerHTML = "\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<iframe src=\"".concat(dataItem.video, "\"\n\t\t\t\t\t\t\t\tallow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"\n\t\t\t\t\t\t\t\tallowfullscreen></iframe>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t");
            } else {
              prodModalVideo.style.display = 'none';
            }
          }
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }).then(function () {
      prodSlider.update();
      prodSlider.on('slideChangeTransitionEnd', function () {
        var idx = document.querySelector('.swiper-slide-active').dataset.index;
        document.querySelectorAll('.modal-preview__item').forEach(function (el) {
          el.classList.remove('modal-preview__item--active');
        });
        document.querySelector(".modal-preview__item[data-index=\"".concat(idx, "\"]")).classList.add('modal-preview__item--active');
      });
      document.querySelectorAll('.modal-preview__item').forEach(function (el) {
        el.addEventListener('click', function (e) {
          var idx = parseInt(e.currentTarget.dataset.index);
          document.querySelectorAll('.modal-preview__item').forEach(function (el) {
            el.classList.remove('modal-preview__item--active');
          });
          e.currentTarget.classList.add('modal-preview__item--active');
          prodSlider.slideTo(idx);
        });
      });
    });
  };

  catalogMore.addEventListener('click', function (e) {
    prodQuantity = prodQuantity + 3;
    loadProducts(prodQuantity);

    if (prodQuantity >= dataLength) {
      catalogMore.style.display = 'none';
    } else {
      catalogMore.style.display = 'block';
    }
  });
} //*------------------------------Работа с корзиной-------------------------------------------------------------------------------


var price = 0;
var minicartList = document.querySelector('.mini-cart__list');
var fullPrice = document.querySelector('.mini-cart__sum');
var cartCount = document.querySelector('.cart__count');

var priceWithoutSpaces = function priceWithoutSpaces(str) {
  return str.replace(/\s/g, '');
};

var plusFullPrice = function plusFullPrice(currentPrice) {
  return price += currentPrice;
};

var minusFullPrice = function minusFullPrice(currentPrice) {
  return price -= currentPrice;
};

var printFullPrice = function printFullPrice() {
  fullPrice.textContent = "".concat(normalPrice(price), " \u0433\u0440\u043D");
};

var printQuantity = function printQuantity(num) {
  cartCount.textContent = num;
};

var loadCartData = function loadCartData() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  fetch('../data/data.json').then(function (response) {
    return response.json();
  }).then(function (data) {
    var _iterator2 = _createForOfIteratorHelper(data),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var dataItem = _step2.value;

        if (dataItem.id == id) {
          console.log(dataItem);
          minicartList.insertAdjacentHTML('afterbegin', "\n\t\t\t\t\t\n\t\t\t\t\t<li class=\"mini-cart__item\" data-id=".concat(dataItem.id, ">\n\t\t\t\t\t\t\t\t<article class=\"mini-cart__product mini-product\">\n\t\t\t\t\t\t\t\t\t<div class=\"mini-product__image\">\n\t\t\t\t\t\t\t\t\t\t<img src=\"").concat(dataItem.mainImage, "\" alt=\"").concat(dataItem.title, "\">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"mini-product__content\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"mini-product__text\">\n\t\t\t\t\t\t\t\t\t\t\t<h3 class=\"mini-product__title\">").concat(dataItem.title, "</h3>\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"mini-product__price\">").concat(normalPrice(dataItem.price), " \u0433\u0440\u043D</span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<button class=\"btn-reset mini-product__delete\" aria-label=\"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440\">\n\t\t\t\t\t\t\t\t\t\t\u0423\u0434\u0430\u043B\u0438\u0442\u044C\n\t\t\t\t\t\t\t\t\t\t\t<svg>\n\t\t\t\t\t\t\t\t\t\t\t\t<use xlink:href=\"img/sprite.svg#trash\"></use>\n\t\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t\t</button>\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</article>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t"));
          return dataItem;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }).then(function (item) {
    plusFullPrice(item.price);
    printFullPrice();
    var num = document.querySelectorAll('.mini-cart__list .mini-cart__item').length;

    if (num > 0) {
      cartCount.classList.add('cart__count--visible');
    }

    printQuantity(num);
  }).then(function () {});
};

var cartLogic = function cartLogic() {
  var productBtn = document.querySelectorAll('.add-to-cart-btn');
  productBtn.forEach(function (el) {
    el.addEventListener('click', function (e) {
      var id = e.currentTarget.dataset.id;
      loadCartData(id);
      document.querySelector('.cart__btn').classList.remove('cart__btn--inactive');
      e.currentTarget.classList.add('product__btn--disabled');
    });
  });
  minicartList.addEventListener('click', function (e) {
    if (e.target.classList.contains('mini-product__delete')) {
      var self = e.target;
      var parent = self.closest('.mini-cart__item');

      var _price = parseInt(priceWithoutSpaces(parent.querySelector('.mini-product__price').textContent));

      var id = parent.dataset.id;
      document.querySelector(".add-to-cart-btn[data-id=\"".concat(id, "\"]")).classList.remove('product__btn--disabled');
      parent.remove();
      minusFullPrice(_price);
      printFullPrice();
      var num = document.querySelectorAll('.mini-cart__list .mini-cart__item').length;

      if (num == 0) {
        cartCount.classList.remove('cart__count--visible');
        miniCart.classList.remove('mini-cart--visible');
        document.querySelector('.cart__btn').classList.add('cart__btn--inactive');
      }

      printQuantity(num);
    }
  });
};

var openOrderModal = document.querySelector('.mini-cart__btn');
var orderModalList = document.querySelector('.cart-modal-order__list');
var orderModalQuantity = document.querySelector('.cart-modal-order__quantity span');
var orderModalSumm = document.querySelector('.cart-modal-order__summ span');
var orderModalShow = document.querySelector('.cart-modal-order__show');
openOrderModal.addEventListener('click', function () {
  var productsHTML = document.querySelector('.mini-cart__list').innerHTML;
  orderModalList.innerHTML = productsHTML;
  orderModalQuantity.textContent = "".concat(document.querySelectorAll('.mini-cart__list .mini-cart__item').length, " \u0448\u0442");
  orderModalSumm.textContent = fullPrice.textContent;
});
orderModalShow.addEventListener('click', function () {
  if (orderModalList.classList.contains('cart-modal-order__list--visible')) {
    orderModalList.classList.remove('cart-modal-order__list--visible');
    orderModalShow.classList.remove('cart-modal-order__show--active');
  } else {
    orderModalList.classList.add('cart-modal-order__list--visible');
    orderModalShow.classList.add('cart-modal-order__show--active');
  }
});
orderModalList.addEventListener('click', function (e) {
  if (e.target.classList.contains('mini-product__delete')) {
    var self = e.target;
    var parent = self.closest('.mini-cart__item');

    var _price2 = parseInt(priceWithoutSpaces(parent.querySelector('.mini-product__price').textContent));

    var id = parent.dataset.id;
    document.querySelector(".add-to-cart-btn[data-id=\"".concat(id, "\"]")).classList.remove('product__btn--disabled');
    parent.style.display = 'none';
    setTimeout(function () {
      parent.remove();
    }, 100);
    document.querySelector(".mini-cart__item[data-id=\"".concat(id, "\"]")).remove();
    minusFullPrice(_price2);
    printFullPrice();
    setTimeout(function () {
      var num = document.querySelectorAll('.cart-modal-order__list .mini-cart__item').length;

      if (num == 0) {
        cartCount.classList.remove('cart__count--visible');
        miniCart.classList.remove('mini-cart--visible');
        document.querySelector('.cart__btn').classList.add('cart__btn--inactive');
        modal.close();
      }

      printQuantity(num);
    }, 100);
  }
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var quizData = [{
  number: 1,
  title: "Какой тип кроссовок рассматриваете?",
  answer_alias: "type",
  answers: [{
    answer_title: "Blazer",
    type: "checkbox"
  }, {
    answer_title: "Force",
    type: "checkbox"
  }, {
    answer_title: "Dunk",
    type: "checkbox"
  }, {
    answer_title: "Air Max",
    type: "checkbox"
  }]
}, {
  number: 2,
  title: "какой размер вам подойдет?",
  answer_alias: "size",
  answers: [{
    answer_title: "Менее 36",
    type: "checkbox"
  }, {
    answer_title: "36-38",
    type: "checkbox"
  }, {
    answer_title: "39-41",
    type: "checkbox"
  }, {
    answer_title: "42-44",
    type: "checkbox"
  }, {
    answer_title: "45 и больше",
    type: "checkbox"
  }]
}, {
  number: 3,
  title: "Уточните какие-либо моменты",
  answer_alias: "message",
  answers: [{
    answer_title: "Введите сообщение",
    type: "textarea"
  }]
}];

var quizTemplate = function quizTemplate() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var dataLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var number = data.number,
      title = data.title;
  var nextBtnText = options.nextBtnText;
  var answers = data.answers.map(function (item) {
    if (item.type === 'checkbox') {
      return "\n\t\t\t<li class=\"quiz-question__item\">\n\t\t\t<img src =\"img/sneaker.jpg\">\n\t\t\t<label class=\"custom-checkbox quiz-question__label\">\n\t\t\t\t\t<input type=\"".concat(item.type, "\" class=\"custom-checkbox__field quiz-question__answer\" data-valid=\"false\" name=\"").concat(data.answer_alias, "\" ").concat(item.type == 'text' ? 'placeholder="Введите ваш вариант"' : '', " value=\"").concat(item.type !== 'text' ? item.answer_title : '', "\">\n\t\t\t\t\t<span class=\"custom-checkbox__content\">").concat(item.answer_title, "</span>\n\t\t\t</label>\n\t\t\t</li>\n\t\t\t");
    } else if (item.type === 'textarea') {
      return "\n\t\t\t<label class=\"quiz-question__label\">\n\t\t\t<textarea placeholder=\"".concat(item.answer_title, "\" class=\"quiz-question__message\"></textarea>\n\t\t\t</label> ");
    } else {
      return "\n\t\t\t\t<label label class=\"quiz-question__label\" >\n\t\t\t\t\t<input type=\"".concat(item.type, "\" data-valid=\"false\" class=\"quiz-question__answer\" name=\"").concat(data.answer_alias, "\" ").concat(item.type == 'text' ? 'placeholder="Введите ваш вариант"' : '', " value=\"").concat(item.type !== 'text' ? item.answer_title : '', "\">\n\t\t\t\t\t\t<span>").concat(item.answer_title, "</span>\n\t\t\t</label>\n\t\t\t");
    }
  });
  return "\n\t\t\t\t\t<div class=\"quiz-question\">\n\t\t\t\t\t\t<h3 class=\"quiz-question__title\">".concat(title, "</h3>\n\t\t\t\t\t\t<ul class=\"quiz-question__answers list-reset\">\n\t\t\t\t\t\t\t").concat(answers.join(''), "\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<div class=\"quiz-bottom\"><div class=\"quiz-question__count\">").concat(number, " \u0438\u0437 ").concat(dataLength, "</div>\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn  btn-reset btn--thirdly quiz-question__btn\" data-next-btn>").concat(nextBtnText, "</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t");
};

var Quiz = /*#__PURE__*/function () {
  function Quiz(selector, data, options) {
    _classCallCheck(this, Quiz);

    this.$el = document.querySelector(selector);
    this.options = options;
    this.data = data;
    this.counter = 0;
    this.dataLength = this.data.length;
    this.resultArray = [];
    this.tmp = {};
    this.init();
    this.events();
  }

  _createClass(Quiz, [{
    key: "init",
    value: function init() {
      console.log('init!');
      this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options);
    }
  }, {
    key: "nextQuestion",
    value: function nextQuestion() {
      console.log('next question!');

      if (this.valid()) {
        if (this.counter + 1 < this.dataLength) {
          this.counter++;
          this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options);

          if (this.counter + 1 == this.dataLength) {
            document.querySelector('.quiz-question__answers').style.display = 'block'; // this.$el.querySelector('.quiz-bottom').insertAdjacentHTML('beforeend', `<button button type = "button" data-send > ${this.options.sendBtnText}</button > `)
            // this.$el.querySelector('[data-next-btn]').remove();
          }
        } else {
          console.log('А все! конец!');
          document.querySelector('.quiz-questions').style.display = 'none';
          document.querySelector('.last-question').style.display = 'block';
          document.querySelector('.quiz__title').textContent = 'Ваша подборка готова!';
          document.querySelector('.quiz__descr').textContent = 'Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог';
        }
      } else {
        console.log('Не валидно!');
      }
    }
  }, {
    key: "events",
    value: function events() {
      var _this = this;

      console.log('events!');
      this.$el.addEventListener('click', function (e) {
        if (e.target == document.querySelector('[data-next-btn]')) {
          _this.addToSend();

          _this.nextQuestion();
        }

        if (e.target == document.querySelector('[data-send]')) {
          _this.send();
        }
      });
      this.$el.addEventListener('change', function (e) {
        if (e.target.tagName == 'INPUT') {
          if (e.target.type !== 'checkbox' && e.target.type !== 'radio') {
            var elements = _this.$el.querySelectorAll('input');

            elements.forEach(function (el) {
              el.checked = false;
            });
          }

          _this.tmp = _this.serialize(_this.$el);
        }
      });
    }
  }, {
    key: "valid",
    value: function valid() {
      var isValid = false;
      var textarea = this.$el.querySelector('textarea');

      if (textarea) {
        if (textarea.value.length > 0) {
          isValid = true;
          return isValid;
        }
      }

      var elements = this.$el.querySelectorAll('input');
      elements.forEach(function (el) {
        switch (el.nodeName) {
          case 'INPUT':
            switch (el.type) {
              case 'text':
                if (el.value) {
                  isValid = true;
                } else {
                  el.classList.add('error');
                }

              case 'checkbox':
                if (el.checked) {
                  isValid = true;
                } else {
                  el.classList.add('error');
                }

              case 'radio':
                if (el.checked) {
                  isValid = true;
                } else {
                  el.classList.add('error');
                }

            }

        }
      });
      return isValid;
    }
  }, {
    key: "addToSend",
    value: function addToSend() {
      this.resultArray.push(this.tmp);
    }
  }, {
    key: "send",
    value: function send() {
      if (this.valid()) {
        var formData = new FormData();

        var _iterator = _createForOfIteratorHelper(this.resultArray),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;

            for (var obj in item) {
              formData.append(obj, item[obj].substring(0, item[obj].length - 1));
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var response = fetch("mail.php", {
          method: 'POST',
          body: formData
        });
      }
    }
  }, {
    key: "serialize",
    value: function serialize(form) {
      var field,
          s = {};
      var valueString = '';

      if (_typeof(form) == 'object' && form.nodeName == "FORM") {
        var len = form.elements.length;

        for (var i = 0; i < len; i++) {
          field = form.elements[i];

          if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
            if (field.type == 'select-multiple') {
              for (j = form.elements[i].options.length - 1; j >= 0; j--) {
                if (field.options[j].selected) s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
              }
            } else if (field.type != 'checkbox' && field.type != 'radio' && field.value || field.checked) {
              valueString += field.value + ',';
              s[field.name] = valueString;
            }
          }
        }
      }

      return s;
    }
  }]);

  return Quiz;
}();

window.quiz = new Quiz('.quiz-form .quiz-questions', quizData, {
  nextBtnText: "Следующий шаг",
  sendBtnText: "Отправить"
});
"use strict";

var rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [2000, 25000],
    connect: true,
    step: 1,
    range: {
      'min': [2000],
      'max': [25000]
    }
  });
  var input0 = document.getElementById('input-0');
  var input1 = document.getElementById('input-1');
  var inputs = [input0, input1];
  rangeSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });

  var setRangeSlider = function setRangeSlider(i, value) {
    var arr = [null, null];
    arr[i] = value;
    rangeSlider.noUiSlider.set(arr);
  };

  inputs.forEach(function (el, index) {
    el.addEventListener('change', function (e) {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}
"use strict";

var btn = document.querySelector('.js-move-to');
var catalog = document.querySelector('.catalog');
var SneakMax = document.querySelector('.header__logo');
var hero = document.querySelector('.hero');
var about = document.querySelector('.about');
var quiz = document.querySelector('.quiz');
var team = document.querySelector('.team');
var faq = document.querySelector('.faq');
var contacts = document.querySelector('.contacts'); // * NAVIGATION --------------------------------

var catalogLink = document.querySelector('.nav__link--catalog');
var aboutLink = document.querySelector('.nav__link--about');
var quizLink = document.querySelector('.nav__link--quiz');
var teamLink = document.querySelector('.nav__link--team');
var faqLink = document.querySelector('.nav__link--faq');
var contactsLink = document.querySelector('.nav__link--contacts');

function scrollTo(element) {
  window.scroll({
    left: 0,
    top: element.offsetTop,
    behavior: 'smooth'
  });
}

btn.addEventListener('click', function () {
  scrollTo(catalog);
});
SneakMax.addEventListener('click', function () {
  scrollTo(hero);
}); // * Smooth scroll navigation ------------------------------------

catalogLink.addEventListener('click', function () {
  scrollTo(catalog);
});
aboutLink.addEventListener('click', function () {
  scrollTo(about);
});
quizLink.addEventListener('click', function () {
  scrollTo(quiz);
});
teamLink.addEventListener('click', function () {
  scrollTo(team);
});
faqLink.addEventListener('click', function () {
  scrollTo(faq);
});
contactsLink.addEventListener('click', function () {
  scrollTo(contacts);
});
"use strict";

var validateForms = function validateForms(selector, rules, messages, successModal, yaGoal) {
  new window.JustValidate(selector, {
    rules: rules,
    messages: messages,
    colorWrong: '#fff',
    submitHandler: function submitHandler(form) {
      var formData = new FormData(form);
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      };

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
      form.reset();
    }
  });
};

validateForms('.callback-form', {
  name: {
    required: true
  },
  phone: {
    required: true
  }
}, {
  name: {
    required: 'Вы должны ввести имя'
  },
  phone: {
    required: 'Вы должны ввести телефон'
  }
}, '.thanks-popup');
/**
  * название функции
  *
  * @param {number} first - первое число
  * @returns {number}
  */
"use strict";
//# sourceMappingURL=main.js.map
