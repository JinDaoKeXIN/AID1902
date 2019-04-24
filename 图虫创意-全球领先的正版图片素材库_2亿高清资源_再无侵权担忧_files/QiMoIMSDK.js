/**
 * Created by yaxi on 2015-07-29.
 */
var utils = {
  chatboxProp: {
    isVisit: 0,
    isChatBoxShow: 0,
    isServiceTime: 0
  },
  broswer: {
    IE6: 'msie 6',
    IE7: 'msie 7',
    IE8: 'msie 8',
    IE9: 'msie 9',
    IE10: 'msie 10',
    IE11: 'msie 11',
    Chrome: 'chrome',
    Firefox: 'firefox',
    Opera: 'opera',
    Safari: 'safari',
    Netscape: 'netscape'
  },

  isFromMobile: function () {
    var agent = navigator.userAgent.toLowerCase()
    var ipad = agent.match(/(ipad).*os\s([\d_]+)/),
      isIphone = !ipad && agent.match(/(iphone\sos)\s([\d_]+)/),
      isAndroid = agent.match(/(android)\s+([\d.]+)/),
      isWinPhone = agent.match(/(windows mobile)\s+([\d.]+)/),
      isMobile = ipad || isIphone || isAndroid || isWinPhone
    return isMobile
  },

  getBroswer: function () {
    var defaultBroswer = 'netscape', agent = navigator.userAgent.toLowerCase()
    if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.*])/.test(agent)) {
      var name = RegExp.$1, versionNum = parseInt(RegExp.$2)
      defaultBroswer = name,
      'msie' == name && (defaultBroswer += ' ' + versionNum)
    } else /version\D+(\d[\d.]*).*safari/.test(agent) && (defaultBroswer = 'safari')

    return defaultBroswer
  },

  eventOn: function (elem, eventtype, func) {
    elem = ('string' == typeof elem ? document.getElementById(elem) : elem)
    elem.addEventListener ? elem.addEventListener(eventtype, func, false) : (elem.attachEvent ? elem.attachEvent('on' + eventtype, func) : elem['on' + eventtype] = func)
  },
  getCookie: function (key) {
    var strCookie = document.cookie
    var arrCookie = strCookie.split('; ')
    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split('=')
      if (arr[0] == key)
        return arr[1]
    }
    return ''
  },
  setCookie: function (obj, value, exp, domain) {
    var cookieTime = 24 * 60 * 60 * 1000
    if (exp && exp!="session") {
      cookieTime = cookieTime * exp;
    }
    var d = new Date()
    d.setTime(d.getTime() + cookieTime)
    var cookieExpires = '; expires=' + d.toGMTString()
    var domainStr = ''
    if (domain && domain != undefined) {
      domainStr = '; domain=' + domain
    }

    if ('string' == typeof obj) {
      document.cookie = obj + '=' + encodeURIComponent(value) + (exp=="session"?"":cookieExpires) + domainStr + '; path=/'
    } else {
      for (var key in obj) {
        document.cookie = key + '=' + encodeURIComponent(obj[key]) + (exp=="session"?"":cookieExpires) + domainStr + '; path=/'
      }
    }

  },
  makeQuery: function (json) {
    json = json || {}
    var query_arr = []
    json.__ = new Date().getTime()
    for (var key in json) {
      var val = json[key]
      query_arr.push(key + '=' + encodeURIComponent(val))
    }
    var query = query_arr.join('&').replace(/%20/g, '+')
    return query
  },

  aniMove: function (element, position, speed, callback) {
    if (!element.effect) {
      element.effect = {}
      element.effect.move = 0
    }
    clearInterval(element.effect.move)
    var speed = speed || 30
    var start = {
      left: element.offsetLeft,
      bottom: position.b,
      top: element.offsetTop,
      right: position.r
    }
    var style = element.style
    var parr = new Array()
    if (typeof(position.left) == 'number') {
      parr.push('left')
    }
    if (typeof(position.right) == 'number') {
      parr.push('right')
    }
    if (typeof(position.bottom) == 'number') {
      parr.push('bottom')
    }
    if (typeof(position.top) == 'number') {
      parr.push('top')
    }

    element.effect.move = setInterval(function () {
      for (var i = 0; i < parr.length; i++) {
        start[parr[i]] += (position[parr[i]] - start[parr[i]]) * speed / 100
        style[parr[i]] = start[parr[i]] + 'px'
      }
      for (var i = 0; i < parr.length; i++) {
        if (Math.round(start[parr[i]]) == position[parr[i]]) {
          if (i != parr.length - 1) {
            continue
          }
        } else {
          break
        }
        for (var i = 0; i < parr.length; i++) {
          style[parr[i]] = position[parr[i]] + 'px'
        }

        clearInterval(element.effect.move)
        if (callback) {
          callback()
        }
      }

    }, 5)
  },
  chatBtnPosition: function () {
    var btn = document.getElementById('chatBtn')
    var data = onlineData
    var chatPos = {}
    if (data.cssStyle.chatboxLocation) {
      btn.style.borderTopLeftRadius = '0px'
      btn.style.borderTopRightRadius = '0px'
      btn.style.borderBottomRightRadius = '0px'
      btn.style.borderBottomLeftRadius = '0px'
      btn.style.bottom = ''
      btn.style.padding = ''
      if (data.scheduleEnable && data.entranceNode) {
        var positionStyle = data.entranceNode.buttonStyle
        data.cssStyle.onlineText = positionStyle.text
        data.cssStyle.chatButtonLocation = positionStyle.location
        data.cssStyle.chatboxIconType = positionStyle.iconType
        if (positionStyle.location == 'circle-left' || positionStyle.location == 'circle-right') {
          data.cssStyle.chatButtonSideMargin = positionStyle.sideMargin
          data.cssStyle.chatButtonBottomMargin = positionStyle.bottomMargin
        } else if (positionStyle.location == 'bottom-left' || positionStyle.location == 'bottom-right') {
          data.cssStyle.chatButtonSideMargin = positionStyle.sideMargin
        } else if (positionStyle.location == 'side-left' || positionStyle.location == 'side-right') {
          data.cssStyle.chatButtonBottomMargin = positionStyle.bottomMargin
        }
        positionStyle.mobileBottomMargin && (data.cssStyle.chatButtonMobileBottomMargin = positionStyle.mobileBottomMargin)
        positionStyle.mobileText !== undefined && (data.cssStyle.onlineMobileText = positionStyle.mobileText)
        positionStyle.mobileIconType && (data.cssStyle.chatboxMobileIconType = positionStyle.mobileIconType)
        positionStyle.mobileLocation && (data.cssStyle.chatButtonMobileLocation = positionStyle.mobileLocation)
        positionStyle.mobileSideMargin && (data.cssStyle.chatButtonMobileSideMargin = positionStyle.mobileSideMargin)
      }
      // 移动端按钮位置单独设置
      if (utils.isFromMobile() && data.cssStyle.chatButtonMobileLocation) {
          if (data.cssStyle.chatButtonMobileLocation == 'circle-left' || data.cssStyle.chatButtonMobileLocation == 'circle-right') {
              btn.style.width = '25px'
              btn.style.height = '25px'
              btn.style.borderRadius = '55px'
              btn.style.padding = '15px'
              btn.getElementsByTagName('img')[0].style.width = '25px'
              btn.getElementsByTagName('img')[0].style.height = '25px'
              btn.getElementsByTagName('img')[0].style.margin = ''
              btn.getElementsByTagName('span')[0].innerHTML = ''
          }
          if (data.cssStyle.chatButtonMobileLocation == 'circle-left') {
              btn.style.left = data.cssStyle.chatButtonMobileSideMargin + 'px'
              btn.style.bottom = data.cssStyle.chatButtonMobileBottomMargin + 'px'
          } else if (data.cssStyle.chatButtonMobileLocation == 'circle-right') {
              btn.style.right = data.cssStyle.chatButtonMobileSideMargin + 'px'
              btn.style.bottom = data.cssStyle.chatButtonMobileBottomMargin + 'px'
          } else if (data.cssStyle.chatButtonMobileLocation == 'bottom') {
              btn.style.bottom = '-1px'
              btn.style.padding = '8px 10px 8px 10px'
              btn.style.borderTopLeftRadius = '5px'
              btn.style.borderTopRightRadius = '5px'
          }
      } else {
          if (data.cssStyle.chatButtonLocation == 'bottom-left') {
              btn.style.left = data.cssStyle.chatButtonSideMargin + 'px'
              btn.style.bottom = '-1px'
          } else if (data.cssStyle.chatButtonLocation == 'bottom-right') {
              btn.style.right = data.cssStyle.chatButtonSideMargin + 'px'
              btn.style.bottom = '-1px'
          } else if (data.cssStyle.chatButtonLocation == 'side-left') {
              btn.style.left = '-1px'
              btn.style.bottom = data.cssStyle.chatButtonBottomMargin + 'px'
              btn.style.borderBottomRightRadius = '5px'
              btn.style.borderTopRightRadius = '5px'
          } else if (data.cssStyle.chatButtonLocation == 'side-right') {
              btn.style.right = '-1px'
              btn.style.bottom = data.cssStyle.chatButtonBottomMargin + 'px'
              btn.style.borderTopLeftRadius = '5px'
              btn.style.borderBottomLeftRadius = '5px'
          } else if (data.cssStyle.chatButtonLocation == 'circle-left') {
              btn.style.left = data.cssStyle.chatButtonSideMargin + 'px'
              btn.style.bottom = data.cssStyle.chatButtonBottomMargin + 'px'
          } else if (data.cssStyle.chatButtonLocation == 'circle-right') {
              btn.style.right = data.cssStyle.chatButtonSideMargin + 'px'
              btn.style.bottom = data.cssStyle.chatButtonBottomMargin + 'px'
          }
          if (data.cssStyle.chatButtonLocation == 'side-left' || data.cssStyle.chatButtonLocation == 'side-right') {
              btn.getElementsByTagName('span')[0].style.wordBreak = 'break-all'
              btn.getElementsByTagName('span')[0].style.wordWrap = 'break-word'
              btn.getElementsByTagName('span')[0].style.width = '14px'
              btn.getElementsByTagName('span')[0].style.display = 'block'
              // btn.getElementsByTagName('img')[0].style.padding = '0px 6px -5px 0px'
              btn.getElementsByTagName('span')[0].style.padding = '0px 6px'
              btn.style.padding = '10px 8px'
          } else if (data.cssStyle.chatButtonLocation == 'circle-right' || data.cssStyle.chatButtonLocation == 'circle-left') {
              btn.style.width = '25px'
              btn.style.height = '25px'
              btn.style.borderRadius = '55px'
              btn.style.padding = '15px'
              btn.getElementsByTagName('img')[0].style.width = '25px'
              btn.getElementsByTagName('img')[0].style.height = '25px'
              btn.getElementsByTagName('img')[0].style.margin = ''
              btn.getElementsByTagName('span')[0].innerHTML = ''
          } else if (data.cssStyle.chatButtonLocation == 'bottom-left' || data.cssStyle.chatButtonLocation == 'bottom-right') {
              btn.getElementsByTagName('img')[0].style.margin = '0px 5px -6px 0px'
              btn.style.padding = '8px 10px 8px 10px'
              btn.style.borderTopLeftRadius = '5px'
              btn.style.borderTopRightRadius = '5px'
          }
      }
      chatPos = {
        'left': btn.style.left,
        'right': btn.style.right,
        'bottom': btn.style.bottom
      }
      return chatPos
    } else {
      btn.style.right = '18px'
      btn.style.padding = '8px 10px 8px 10px'
      btn.style.borderTopLeftRadius = '5px'
      btn.style.borderTopRightRadius = '5px'
      btn.style.borderBottomRightRadius = '0px'
      btn.style.borderBottomLeftRadius = '0px'
    }

  },
  isIE: function(ver){
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
  },

  getCurrentDateDay: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    month = month + 1 > 9 ? month + 1 : '0' + (month + 1);
    day = day > 9 ? day : '0' + day;
    return year + "-" + month + "-" + day;
  },

  getCurrentDateTime: function () {
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    hour = hour > 9 ? hour : '0' + hour;
    minutes = minutes > 9 ? minutes : '0' + minutes;
    seconds = seconds > 9 ? seconds : '0' + seconds;
    return hour + ":" + minutes + ":" + seconds;
  },
  deepClone: function (targetObj) {
    var tempObj
    if (typeof targetObj === 'object') {
      if (targetObj === null) {
        tempObj = null
      } else {
        if (targetObj instanceof Date) {
          tempObj = targetObj
        } else if (targetObj instanceof Array) {
          tempObj = []
          for (var i = 0, len = targetObj.length; i < len; i++) {
            tempObj.push(utils.deepClone(targetObj[i]))
          }
        } else {
          tempObj = {}
          for (var j in targetObj) {
            tempObj[j] = utils.deepClone(targetObj[j])
          }
        }
      }
    } else {
      tempObj = targetObj
    }
    return tempObj
  }
}
var styleColor = undefined
var peers = undefined
var selectPeer = ''
var lastReferrer = qimo_config.referrer   // 上级来源页
var firstSeoRefer = utils.getCookie('qimo_firstSeoRefer') // cookie中保存的seo信息
var seoUrl = ''
var seoSource = ''  // 搜索来源
var seoKeywords = ''  // 搜索关键字
var skey = 'qimo_seosource_' + qimo_config.accessId
var kkey = 'qimo_seokeywords_' + qimo_config.accessId
var unreadMessageCount = 0   // 未读消息数
var openTimeout = 0
var showNewMsgTimeout = 0
var showNewMsgRight = -100

window.console = window.console || (function(){
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
        = c.clear = c.exception = c.trace = c.assert = function(){};
    return c;
})();

// 修正seoKeyWord获取的逻辑， 2018.11.20 by yangxk
// 1.如果referrer等于当前host，取cookie，有则使用，否则站内
// 2.如果referrer存在，过滤一次，如果能过滤出，取用，存入cookie
// 3.如果referrer存在 且无法过滤出，说明可能是其他站地址跳转，取值未知，cookie置空
// 4.如果referrer为空 说明为直接打开连接，取值未知, cookie置空
var getSeoParams = function () {
  // 针对官网，如果cookie中有之前存入的seo信息，取用，没有则取用当前refer
  if (firstSeoRefer) {
      seoUrl = decodeURIComponent(firstSeoRefer)
  } else {
      seoUrl = lastReferrer
  }
  if (seoUrl !== '') {
      var host = ''
      var temps = utils.getCookie(skey)
      var tempk = utils.getCookie(kkey)
      if (seoUrl) {
          host = seoUrl.split('/')[2]
      }
      if (host == window.location.host) {
          seoSource = temps ? decodeURIComponent(temps) : '站内'
          seoKeywords = tempk? decodeURIComponent(tempk) : ''
      } else if (host == 'www.baidu.com') {
          seoSource = '百度搜索'
          if (seoUrl.indexOf('?') > 0) {
              var query_arr = seoUrl.split('?')[1].split('&')
              query_arr.forEach(function (query) {
                  var temp = query.split('=')
                  if (temp[0] == 'wd' || temp[0] == 'word') {
                      seoKeywords = temp[1]
                  }
              })
          }
      } else if (host == 'm.baidu.com') {
          seoSource = '百度搜索'
          if (seoUrl.indexOf('?') > 0) {
              var query_arr = seoUrl.split('?')[1].split('&')
              query_arr.forEach(function (query) {
                  var temp = query.split('=')
                  if (temp[0] == 'word') {
                      seoKeywords = temp[1]
                  }
              })
          }
      } else if (host == 'www.so.com') {
          seoSource = '360搜索'
          if (seoUrl.indexOf('?') > 0) {
              var query_arr = seoUrl.split('?')[1].split('&')
              query_arr.forEach(function (query) {
                  var temp = query.split('=')
                  if (temp[0] == 'q') {
                      seoKeywords = temp[1]
                  }
              })
          }
      }else if (host == 'm.so.com') {
          seoSource = '360搜索'
          if (seoUrl.indexOf('?') > 0) {
              var query_arr = seoUrl.split('?')[1].split('&')
              query_arr.forEach(function (query) {
                  var temp = query.split('=')
                  if (temp[0] == 'q') {
                      seoKeywords = temp[1]
                  }
              })
          }
      } else if (host == 'www.sogou.com') {
          seoSource = '搜狗搜索'
          if (seoUrl.indexOf('?') > 0) {
              var query_arr = seoUrl.split('?')[1].split('&')
              query_arr.forEach(function (query) {
                  var temp = query.split('=')
                  if (temp[0] == 'query') {
                      seoKeywords = temp[1]
                  }
              })
          }
      }else if (host == 'm.sogou.com') {
          seoSource = '搜狗搜索'
          if (seoUrl.indexOf('?') > 0) {
              var query_arr = seoUrl.split('?')[1].split('&')
              query_arr.forEach(function (query) {
                  var temp = query.split('=')
                  if (temp[0] == 'keyword') {
                      seoKeywords = temp[1]
                  }
              })
          }
      } else {
          seoSource = '其他网站'
          seoKeywords = '未知'
      }
  } else {
      seoSource = '站内'
      seoKeywords = ''
  }

  if ((seoSource) || (seoKeywords)) {
    utils.setCookie(skey, seoSource, 1/48) //30分钟
    utils.setCookie(kkey, seoKeywords, 1/48) //30分钟
  } else {
    utils.setCookie(skey, seoSource, -1) // cookie置空
    utils.setCookie(kkey, seoKeywords, -1) // cookie置空
  }

}

getSeoParams()

function QiMoIMSDK () {
  var self = this
  var mini = false
  var closeTip = false
  this.chatboxstyle = {
    html: '<div class=\'qimo_chatpup\' id=\'qimo_chatpup\' style=\'display: none; \'>' +
            '<div style=\'\' class=\'dragbarChat\' id=\'dragChat\'></div>' +
            '<iframe id=\'chatIframe\' src=\'\' height=\'100%\' width=\'100%\'></iframe>' +
            '<div id=\'maskChat\'></div>' +
           '</div>' +
           '<div id=\'chatBtn\' class=\'chatBtn\'></div>' +
            '<div id=\'qimo_showNewMsg\' class=\'qimo_showNewMsg\' style=\'display: none; \'>' +
            '<div id=\'qimo_showNewMsg_box\' class=\'qimo_showNewMsg_box\'>' +
            '<div id=\'qimo_showNewMsg_title_box\' class=\'qimo_showNewMsg_title_box\'>' +
            '<img src=\'' + qimo_config.chatHost + 'images/agentLogo.png\'>' +
            '<span id=\'qimo_showNewMsg_title\' class=\'qimo_showNewMsg_title\'></span>' +
            '</div> ' +
            '<div id=\'qimo_showNewMsg_content\' class=\'qimo_showNewMsg_content\'></div>' +
            '</div>' +
            '<span id=\'qimo_showNewMsg_close\' class=\'qimo_showNewMsg_close\'>x</span>' +
            '</div>'
  }
  this.inviteBoxStyle = {
    html: '<div class=\'qimo_inviteBox\' id=\'qimo_inviteBox\' style=\'display: none; \'>' +
    '<img class=\"qimo_invite_close\" id=\'qimo_invite_close\' src=\'' + qimo_config.chatHost + 'images/invite-close.png\'>' +
    '<div class=\'qimo_inviteBox_top\'>' +
    '<div class=\"qimo_inviteBox_top_img\" id="qimo_inviteBox_top_img"><img id=\"qimo_inviteBox_img\" src=\'' + qimo_config.chatHost + 'images/defaultPhoto.png\'></div>' +
    '<div class=\"qimo_inviteBox_top_right\" id="qimo_inviteBox_top_right"><p id=\"qimo_inviteBox_InviteWords\"></p>' +
    '<div class=\"qimo_inviteBox_top_button\" id=\"qimo_inviteBox_top_button\"><div id=\"invite_click_button_1\" class=\"divbuttons msie11PadTop\">立即咨询</div><div id=\"invite_click_button_2\" class=\"divbuttons msie11PadTop\">稍后再说</div></div></div>' +
    '</div>' +
    '<div class=\'qimo_inviteBox_bottom\'><textarea id="sendInviteText" placeholder="请输入您想要输入的内容..." rows=\"2\"></textarea><div id=\"sendInviteContent\" class=\"sendInviteContent msie11PadTop\">发送</div></div>' +
    '' + '</div>'
  }

  this.init = function () {
    var data = {
      accessId: qimo_config.accessId,
      location: encodeURIComponent(window.location.host),
      referrer: document.referrer || '',
      callbackF: 'getChatConfig',
      action: 'getOnlineStates'
    }
    this.loadJsonp(qimo_config.companyConfigUrl, data)
  }
  this.loadJsonp = function (url, data) {
    var query = utils.makeQuery(data)
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.setAttribute("charset", "UTF-8");
    script.src = url + '?' + query
    try {
      document.body.appendChild(script)
    } catch (e) {
      document.ready(function () {
        document.body.appendChild(script)
      })

    }
  }

  this.initChat = function (data, callback) {
    peers = data.peers
    var isClick = false
    if (!data.success) {
      return
    }
    var obj = {href: window.location.href}
    // 保存在同域名下的cookie下
    if (!utils.getCookie('href')) {
      utils.setCookie(obj, '', 'session')
    }
    utils.setCookie({accessId: data.accessId})
    var chatdiv = document.createElement('div')
    chatdiv.innerHTML = this.chatboxstyle.html
    document.body.appendChild(chatdiv)
    var qimoFrame = document.getElementById('qimo_chatpup').getElementsByTagName('iframe')[0]
    // 传递给iframe页
    var href = utils.getCookie('href')
    if (utils.getBroswer() != utils.broswer.IE6 && utils.getBroswer() != utils.broswer.IE7) {
      document.getElementById('qimo_chatpup').getElementsByTagName('iframe')[0].src = qimo_config.chatPage + '?v=' + qimo_config.version + '&clientId=' + qimo_config.clientId + '&urlTitle=' + qimo_config.urlTitle + '&fromUrl=' + qimo_config.fromUrl + '&serviceStates=' + data.serviceStates + '&accessId=' + data.accessId + '&styleColor=' + data.cssStyle.styleColor + '&peers=' + encodeURIComponent(JSON.stringify(data.peers)) + '&otherParams=' + qimo_config.otherParams + '&seoSource=' + encodeURIComponent(seoSource) + '&seoKeywords=' + encodeURIComponent(seoKeywords) + '&companyName=' + encodeURIComponent(qimo_config.companyName) + '&seoUrl=' + encodeURIComponent(lastReferrer) + '&language=' + qimo_config.language + '&href=' + href
    }
    this.loadStyle()
    var btn = document.getElementById('chatBtn')
    if (!qimo_config.autoShow || qimo_config.autoShow == 'false') {
      btn.style.right = '-10000px'
      //btn.style.left="1000px";
      btn.style.zIndex = '-100'
      //btn.style.bottom = "30px";
      btn.style.display = 'none'
      isClick = true
    }
    var chatBox = document.getElementById('qimo_chatpup')
    var dragChatDom = document.getElementById('dragChat')
    var chatStyle = document.getElementById('chatstyle')
    if (data.cssStyle.styleColor && data.cssStyle.styleColor != undefined && data.cssStyle.styleColor != 'undefined') {
      btn.style.backgroundColor = '#' + data.cssStyle.styleColor
    }
    if (data.scheduleEnable && data.entranceNode) {
        var positionStyle = data.entranceNode.buttonStyle
        data.cssStyle.onlineText = positionStyle.text
        data.cssStyle.chatButtonLocation = positionStyle.location
        data.cssStyle.chatboxIconType = positionStyle.iconType
        if (positionStyle.location == 'circle-left' || positionStyle.location == 'circle-right') {
            data.cssStyle.chatButtonSideMargin = positionStyle.sideMargin
            data.cssStyle.chatButtonBottomMargin = positionStyle.bottomMargin
        } else if (positionStyle.location == 'bottom-left' || positionStyle.location == 'bottom-right') {
            data.cssStyle.chatButtonSideMargin = positionStyle.sideMargin
        } else if (positionStyle.location == 'side-left' || positionStyle.location == 'side-right') {
            data.cssStyle.chatButtonBottomMargin = positionStyle.bottomMargin
        }
        positionStyle.mobileBottomMargin && (data.cssStyle.chatButtonMobileBottomMargin = positionStyle.mobileBottomMargin)
        positionStyle.mobileText !== undefined && (data.cssStyle.onlineMobileText = positionStyle.mobileText)
        positionStyle.mobileIconType && (data.cssStyle.chatboxMobileIconType = positionStyle.mobileIconType)
        positionStyle.mobileLocation && (data.cssStyle.chatButtonMobileLocation = positionStyle.mobileLocation)
        positionStyle.mobileSideMargin && (data.cssStyle.chatButtonMobileSideMargin = positionStyle.mobileSideMargin)
    }
    if (data.serviceStates == 1) {
      var typeListHtml = ''
      if (!data.cssStyle.chatboxLocation) {
        btn.innerHTML = '<img width=\'28px\' height=\'25px\' style=\'margin:0px 5px -6px 0px;\' src=\'' + qimo_config.chatHost + 'images/chat.png\'/><span>' + (data.cssStyle.onlineText.trim() == '' ? '咨询客服' : data.cssStyle.onlineText) + '</span>' + typeListHtml + '<span id="qimo_badge"></span>'
      } else if (utils.isFromMobile() && data.cssStyle.chatButtonMobileLocation) {
        btn.innerHTML = '<img width=\'25px\' height=\'25px\'  src=\'' + qimo_config.chatHost + 'images/' + data.cssStyle.chatboxMobileIconType + '.png?1221\'/><span>' + (data.cssStyle.onlineMobileText.m7trim() == '' ? '' : data.cssStyle.onlineMobileText) + '</span>' + typeListHtml + '<span id="qimo_badge"></span>'
      } else {
        btn.innerHTML = '<img width=\'25px\' height=\'25px\'  src=\'' + qimo_config.chatHost + 'images/' + data.cssStyle.chatboxIconType + '.png?1221\'/><span>' + (data.cssStyle.onlineText.m7trim() == '' ? '咨询客服' : data.cssStyle.onlineText) + '</span>' + typeListHtml + '<span id="qimo_badge"></span>'
      }
    } else {
      if (!data.cssStyle.chatboxLocation) {
        btn.innerHTML = '<img width=\'28px\' height=\'25px\' style=\'margin:0px 5px -6px 0px;\' src=\'' + qimo_config.chatHost + 'images/chat.png\'/><span>' + (data.cssStyle.onlineText.trim() == '' ? '咨询客服' : data.cssStyle.onlineText) + '</span>' + typeListHtml + '<span id="qimo_badge"></span>'
      } else {
        btn.innerHTML = '<img width=\'25px\' height=\'25px\'  src=\'' + qimo_config.chatHost + 'images/' + data.cssStyle.chatboxIconType + '.png?1221\'/><span>' + (data.cssStyle.offlineText.trim() == '' ? '留言联系我们' : data.cssStyle.offlineText) + '</span>' + '<span id="qimo_badge"></span>'
      }
    }
    utils.chatboxProp.isServiceTime = data.serviceStates
    styleColor = data.cssStyle.styleColor
    if (data.cssStyle.chatboxLocation && data.advConfig && data.advConfig.windowType != 'common' && !utils.isFromMobile()) {
      var pos = [data.cssStyle.chatboxSideMargin, data.cssStyle.chatboxLocation]
      var chatBox = document.getElementById('qimo_chatpup')
      if (pos[1] == 'left') {
        chatBox.style.left = pos[0] + 'px'
      } else if (pos[1] == 'right') {
        chatBox.style.right = pos[0] + 'px'
      } else if (pos[1] == 'center') {
        chatBox.style.left = '0'
        chatBox.style.right = '0'
        chatBox.style.margin = '0 auto'
      }
    } else {
      chatBox.style.right = '18px'
    }

    if (data.chatboxLocationY && data.advConfig && data.advConfig.windowType != 'common' && !utils.isFromMobile()) {
      var pos = [data.chatboxSideMarginY, data.chatboxLocationY]
      var chatBox = document.getElementById('qimo_chatpup')
      if (pos[1] == 'top') {
        chatBox.style.top = pos[0] + 'px'
      } else if (pos[1] == 'bottom') {
        chatBox.style.bottom = pos[0] + 'px'
      } else if (pos[1] == 'center') {
        chatBox.style.top = '0'
        chatBox.style.bottom = '0'
        chatBox.style.margin = 'auto'
      }
    }
    if (data.cssStyle.chatboxLocation && data.chatboxLocationY && data.advConfig && data.advConfig.windowType != 'common' && !utils.isFromMobile()) {
      if (data.chatboxLocationY == 'center' && data.cssStyle.chatboxLocation == 'center') {
        chatBox.style.top = '0'
        chatBox.style.bottom = '0'
        chatBox.style.left = '0'
        chatBox.style.right = '0'
        chatBox.style.margin = 'auto'
      }
    }

    // 自定义宽度
    if (data.advConfig && data.advConfig.windowType != 'common' && data.chatboxWidth && !utils.isFromMobile()) {
      chatBox.style.width = data.chatboxWidth + 'px'
    }
    // 自定义高度
    if (data.advConfig && data.advConfig.windowType != 'common' && data.chatboxHeight && !utils.isFromMobile()) {
      chatBox.style.height = data.chatboxHeight + 'px'
    }

    chatBox.onmouseover = function (e) {
      dragChatDom.style.display = 'block'
    }
    chatBox.onmouseout = function () {
      dragChatDom.style.display = 'none'
    }
    this.loadAdvConfig(data)

    utils.eventOn(btn, 'click', this.openChat)

    if (utils.getBroswer() == utils.broswer.IE6 || utils.getBroswer() == utils.broswer.IE7 || !qimoFrame.contentWindow.postMessage) {
      //utils.aniMove(btn, {bottom: 0, b: -btn.offsetHeight}, 15);
      btn.style.display = 'block'
    }
    var msgBtn = document.getElementById('qimo_showNewMsg_box')
    utils.eventOn(msgBtn, 'click', this.openChat)
    var closeBtn = document.getElementById('qimo_showNewMsg_close')
    utils.eventOn(closeBtn, 'click', this.closeNewMsg)
    callback(isClick)
  }

  this.loadAdvConfig = function (data) {
    var chatBox = document.getElementById('qimo_chatpup');
    var dragChatDom = document.getElementById('dragChat');
    if (data.advConfig && data.advConfig.windowType === 'common' && !utils.isFromMobile()) {
      this.startDrag(dragChatDom, chatBox, null, 'qimo_chatpup')
      var davType = data.advConfig.advType; // 广告弹窗的类型 1：右侧有广告； 2： 两边都有广告： 3：左边有广告； 4： 两边都没广告
      if (davType == '1' || davType == '3') {
        chatBox.style.width = '650px'
        dragChatDom.style.width = '570px'
      } else if (davType == '2') {
        chatBox.style.width = '820px'
        dragChatDom.style.width = '740px'
      } else if (davType == '4') {
        chatBox.style.width = '480px'
        dragChatDom.style.width = '400px'
      }
    } else {
      chatBox.removeChild(dragChatDom)
    }
  }

  this.initInviteBox = function () {
    var self = this
    var inviteBoxDiv = document.createElement('div')
    inviteBoxDiv.innerHTML = this.inviteBoxStyle.html
    document.body.appendChild(inviteBoxDiv)
    // 按x 隐藏
    var qimo_invite_close_btn = document.getElementById('qimo_invite_close')
    qimo_invite_close_btn && utils.eventOn(qimo_invite_close_btn, 'click', function () {
      document.getElementById('qimo_inviteBox').style.display = 'none'
      //  onlineData.autoInvite === '1' 替换为  qimosdk.autoInviteChat()  qyg
      if (onlineData.autoShowInviteType === '2' && qimosdk.autoInviteChat() && onlineData.closeStayTime && onlineData.closeStayTime !== '0') {
        if (openTimeout !== 0) {
          window.clearTimeout(openTimeout)
        }
        openTimeout = window.setTimeout(function () {
          self.openInviteBox()
        }, onlineData.closeStayTime * 1000)
      }
    })
    // 默认按钮事件
    var invite_click_button_1 = document.getElementById('invite_click_button_1')
    var invite_click_button_2 = document.getElementById('invite_click_button_2')
    utils.eventOn(invite_click_button_1, 'click', this.inviteBoxOpenChat)
    utils.eventOn(invite_click_button_2, 'click', this.inviteBoxHideInvite)
    // 发送按钮事件
    var sendInviteContent_btn = document.getElementById('sendInviteContent')
    utils.eventOn(sendInviteContent_btn, 'click', function () {
      document.getElementById('qimo_inviteBox').style.display = 'none'
      var value = ''
      // 如果邀请框有输入内容，打开聊天框以后发出去
      if (document.getElementById('sendInviteText').value !== '') {
        value = document.getElementById('sendInviteText').value
        if (utils.getBroswer() == utils.broswer.IE8) {
          if (document.getElementById('sendInviteText').value === onlineData.inviteBoxData.inviteStyle.placeholder) {
            value = ''
          }
        }
        if (utils.chatboxProp.isVisit == 1 && utils.chatboxProp.isChatBoxShow == 0) {
          if (document.getElementById('sendInviteText').value !== '') {
            var PostStashContent = 'PostStashInviteBoxContent' + value
            document.getElementById('qimo_chatpup').getElementsByTagName('iframe')[0].contentWindow.postMessage(PostStashContent, '*')
            document.getElementById('sendInviteText').value = ''
          }
        } else {
          var stashContent = 'stashInviteBoxContent' + value
          document.getElementById('qimo_chatpup').getElementsByTagName('iframe')[0].contentWindow.postMessage(stashContent, '*')
          document.getElementById('sendInviteText').value = ''
        }
      }
      self.openChat()
    })
    if (onlineData.inviteBoxData) {
      this.loadInviteBoxStyle()
    }
  }
  this.openInviteBox = function () {
    var InviteBoxDom = document.getElementById('qimo_inviteBox')
    if (utils.getBroswer() == utils.broswer.IE8) {
      if (document.getElementById('sendInviteText').value === '') {
        document.getElementById('sendInviteText').value = onlineData.inviteBoxData.inviteStyle.placeholder
      }
    }
    if (InviteBoxDom) {
      InviteBoxDom.style.display = 'block'
    }
  }
  this.loadInviteBoxStyle = function () {
    var inviteBoxData = onlineData.inviteBoxData
    var inviteStyle = onlineData.inviteBoxData.inviteStyle
    var qimoInviteBoxDom = document.getElementById('qimo_inviteBox')
    var self = this
    if (inviteBoxData.positionX === 'right') {
      qimoInviteBoxDom.style.left = ''
      qimoInviteBoxDom.style.right = inviteBoxData.distanceX + 'px'
    } else if (inviteBoxData.positionX === 'left') {
      qimoInviteBoxDom.style.right = ''
      qimoInviteBoxDom.style.left = inviteBoxData.distanceX + 'px'
    } else if (inviteBoxData.positionX === 'center') {
      qimoInviteBoxDom.style.right = '0'
      qimoInviteBoxDom.style.left = '0'
    }
    if (inviteBoxData.positionY === 'down') {
      qimoInviteBoxDom.style.top = ''
      qimoInviteBoxDom.style.bottom = inviteBoxData.distanceY + 'px'
    } else if (inviteBoxData.positionY === 'up') {
      qimoInviteBoxDom.style.bottom = ''
      qimoInviteBoxDom.style.top = inviteBoxData.distanceY + 'px'
    } else if (inviteBoxData.positionY === 'center') {
      qimoInviteBoxDom.style.top = '0'
      qimoInviteBoxDom.style.bottom = '0'
    }
    if (inviteStyle.layoutType === '2') {   //布局
      document.getElementById('qimo_inviteBox_top_img').style.display = 'none'
      document.getElementById('qimo_inviteBox_top_right').style.width = '100%'
      document.getElementById('qimo_inviteBox_top_right').style.marginLeft = '0'
    }
    if (inviteStyle.layoutType === '1' && inviteStyle.photourl) {       // 客服头像
      document.getElementById('qimo_inviteBox_img').src = inviteStyle.photourl
    }
    if (inviteStyle.backImg !== undefined && inviteStyle.backImg !== '') {    //背景图片
      if ( utils.getBroswer() == utils.broswer.IE8 ) {
        document.getElementById('qimo_inviteBox').style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' + inviteStyle.backImg + ", sizingMethod='scale')"
        document.getElementById('qimo_inviteBox').style.MsFilter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' + inviteStyle.backImg + ", sizingMethod='scale')"
        document.getElementById('qimo_inviteBox').style.background = 'url(' + inviteStyle.backImg + ') no-repeat\0/'
      } else {
        document.getElementById('qimo_inviteBox').style.backgroundImage = 'url(' + inviteStyle.backImg + ')'
        document.getElementById('qimo_inviteBox').style.backgroundSize = 'cover'
      }
    }
    if (!inviteStyle.backImg && inviteStyle.backColor) {    //背景色
      document.getElementById('qimo_inviteBox').style.background = inviteStyle.backColor
      document.getElementById('sendInviteContent').style.background = inviteStyle.backColor
    }
    if (inviteStyle.inviteWords) {    //邀请语
      document.getElementById('qimo_inviteBox_InviteWords').innerHTML = inviteStyle.inviteWords
    }
    if (utils.getBroswer() === utils.broswer.IE8) {
      document.getElementById('sendInviteText').style.overflow = 'auto'
    }
    if (inviteStyle.placeholder) {    //placeholder
      if (utils.getBroswer() == utils.broswer.IE8 ) {
        document.getElementById('sendInviteText').value = inviteStyle.placeholder
        utils.eventOn(document.getElementById('sendInviteText'), 'blur', function () {
          if (document.getElementById('sendInviteText').value === '') {
            document.getElementById('sendInviteText').value = inviteStyle.placeholder
          }
        })
        utils.eventOn(document.getElementById('sendInviteText'), 'focus', function () {
          if (document.getElementById('sendInviteText').value === inviteStyle.placeholder) {
            document.getElementById('sendInviteText').value = ''
          }
        })
      } else {
        document.getElementById('sendInviteText').placeholder = inviteStyle.placeholder
      }
    }
    if (inviteStyle.Buttons && inviteStyle.Buttons.length > 0) {
      if (document.addEventListener) {
        document.getElementById('invite_click_button_1').removeEventListener('click', this.inviteBoxOpenChat)
        document.getElementById('invite_click_button_2').removeEventListener('click', this.inviteBoxHideInvite)
      } else {
        document.getElementById('invite_click_button_1').detachEvent('onclick', this.inviteBoxOpenChat)
        document.getElementById('invite_click_button_2').detachEvent('onclick', this.inviteBoxHideInvite)
      }

      for (var i = 0; i < inviteStyle.Buttons.length; i++) {
        document.getElementById('invite_click_button_' + (i+1)).innerHTML = inviteStyle.Buttons[i].text
        document.getElementById('invite_click_button_' + (i+1)).style.color = inviteStyle.Buttons[i].color
        document.getElementById('invite_click_button_' + (i+1)).style.borderColor = inviteStyle.Buttons[i].color
        var btn = document.getElementById('invite_click_button_' + (i+1))
        if (inviteStyle.Buttons[i].action === 'openChat') {
          utils.eventOn(btn, 'click', this.inviteBoxOpenChat)
        } else {
          // 隐藏
          utils.eventOn(btn, 'click', this.inviteBoxHideInvite)
        }
      }
    }
    if (inviteStyle.Buttons.length === 1) {
      document.getElementById('invite_click_button_2').style.display = 'none'
    }
  }
  this.inviteBoxOpenChat = function () {
    // 打开对话
    document.getElementById('qimo_inviteBox').style.display = 'none'
    self.openChat()
  }
  this.inviteBoxHideInvite = function () {
    document.getElementById('qimo_inviteBox').style.display = 'none'
    //  onlineData.autoInvite === '1' 替换为  qimosdk.autoInviteChat()  qyg
    if (onlineData.autoShowInviteType === '2' && qimosdk.autoInviteChat() && onlineData.closeStayTime && onlineData.closeStayTime !== '0') {
      if (openTimeout !== 0) {
        window.clearTimeout(openTimeout)
      }
      openTimeout = window.setTimeout(function () {
        self.openInviteBox()
      }, onlineData.closeStayTime * 1000)
    }
  }
  this.loadStyle = function () {
    var style = document.createElement('link')
    style.type = 'text/css'
    style.rel = 'stylesheet'
    if (utils.isFromMobile()) {
      style.href = qimo_config.chatHost + '/stylesheets/chatStyle_wap.css?0108'
      // 这里通过js赋值body为fixed 且高宽100%，是为了避免移动端窗口展开后依然能滚动父页面的问题。
      var body = document.getElementsByTagName('body')
      body[0].setAttribute('data-7m', '7m_warp')
    } else {
      style.href = qimo_config.chatHost + '/stylesheets/chatStyle.css?0108'
    }

    var head = document.getElementsByTagName('head')[0]
    head.appendChild(style)
  }

  this.closeNewMsg = function () {
    window.clearTimeout(showNewMsgTimeout)
    document.getElementById('qimo_showNewMsg_title').innerHTML = ''
    document.getElementById('qimo_showNewMsg_content').innerHTML = ''
    document.getElementById('qimo_showNewMsg').style.right = '-100%'
    document.getElementById('qimo_showNewMsg').style.left = ''
    document.getElementById('qimo_showNewMsg').style.display = 'none'
    showNewMsgRight = -100
  }

  this.openChat = function () {
    if (onlineData.scheduleEnable) {
      var data = {
        accessId: qimo_config.accessId,
        location: encodeURIComponent(window.location.host),
        referrer: document.referrer || "",
        callbackF: "updateOnlineData",
        action:"getOnlineStates"
      };
      self.loadJsonp(qimo_config.companyConfigUrl, data);
    } else {
      openChatTodo()
    }
  }
  window.updateOnlineData = function (c) {
    onlineData = c;
    openChatTodo();
    // 启用日程后openChat会有异步，所以要在这里重新隐藏一下
    if (window.qimo_autoReOpenFromCookie && utils.isFromMobile()) {
        window.setTimeout(function () {
            qimosdk.hideChatBox()
            document.getElementById('qimo_chatpup').style.opacity = 1
            window.qimo_autoReOpenFromCookie = false
        }, 0)
    }
  }
  var openChatTodo = function () {
    //console.log(this.getAttribute("index"));
    //if(peers.length == 1){
    //    selectPeer = peers[0].id;
    //}else if(peers.length > 1){
    //    selectPeer = peers[this.getAttribute("index")].id;
    //}
    if (utils.isFromMobile() && (utils.isIE(5) || utils.isIE(6) || utils.isIE(7) || utils.isIE(8))) {
      window.alert('在线咨询不兼容当前浏览器版本, 请升级ie浏览器或使用其他浏览器')
      return
    }
    if (utils.isIE(5) || utils.isIE(6) || utils.isIE(7)) {
      window.alert('在线咨询不兼容当前浏览器版本, 请升级ie浏览器或使用其他浏览器')
      return
    }
    if (window.mobileHisPush) {
        window.mobileHisPush()
    }

    try {
      if (typeof qimoClientId == 'string' && qimoClientId != 'undefined') {
        qimo_config.clientId = encodeURIComponent(qimoClientId)
      }
      if (typeof qimoClientId == 'object') {
        qimo_config.clientId = qimoClientId.userId || '';
        var str = '',
          strone,
          strNew
        if (qimoClientId.customField && typeof qimoClientId.customField == 'object') {
          str = JSON.stringify(qimoClientId.customField)
          strone = JSON.parse(str)
          strNew = JSON.stringify(strone)
        } else if (qimoClientId.customField && typeof qimoClientId.customField == 'string') {
          strNew = qimoClientId.customField
        }
        var newClientId = utils.deepClone(qimoClientId)
        if (strNew) {
          newClientId.customField = encodeURIComponent(strNew)
        }
        // 客户自定义字段
        qimo_config.otherParams = encodeURIComponent(JSON.stringify(newClientId))
      }
    } catch (e) {

    }
    // 打开聊天框时 隐藏邀请框
    if (document.getElementById('qimo_inviteBox') && document.getElementById('qimo_inviteBox').style.display === 'block') {
      document.getElementById('qimo_inviteBox').style.display = 'none'
    }
    if (openTimeout !== 0) {
      window.clearTimeout(openTimeout)
      openTimeout = 0
    }
    var chatBox = document.getElementById('qimo_chatpup')
    var chatBtn = document.getElementById('chatBtn')
    var body = document.getElementsByTagName('body')
    // 因为body赋值position为fixed会导致页面滚动至顶部，先记录当前滚动位置，收起时再滚动回来。
    window.pageScrollValue = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    if (body[0].getAttribute('data-7m') === '7m_warp') {
      body[0].setAttribute('data-7m', 'overbody')
      window.scrollTo(0, 0)
    }
    if (utils.isFromMobile()) {
      chatBox.style.left = '-8px'
      chatBox.style.top = '-8px'
    }
    if (utils.chatboxProp.isVisit == 1 && utils.chatboxProp.isChatBoxShow == 0) {
      chatBtn.style.display = 'none'
      chatBox.style.display = 'block'
      utils.chatboxProp.isChatBoxShow = 1
      var badage = document.getElementById('qimo_badge')
      badage.style.display = 'none'
      // utils.aniMove(chatBox, {bottom: -1, b: -chatBox.offsetHeight})
      utils.aniMove(chatBtn, {bottom: -chatBtn.offsetHeight, b: 0})
      if (unreadMessageCount > 0) {
        document.getElementById('qimo_chatpup').getElementsByTagName('iframe')[0].contentWindow.postMessage('newMsgReOpen', '*')
      }
      unreadMessageCount = 0
      return
    }
    if (utils.chatboxProp.isVisit == 1 && utils.chatboxProp.isChatBoxShow == 1) {
      return
    }
    if (utils.getBroswer() != utils.broswer.IE6 && utils.getBroswer() != utils.broswer.IE7) {
      utils.chatboxProp.isVisit = 1
      utils.chatboxProp.isChatBoxShow = 1
      var getCss = function (o, key) {
        return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key]
      }
      // utils.aniMove(chatBox, {bottom: 0, b: -chatBox.offsetHeight})
      if ((getCss(chatBox, 'bottom') === 'auto' || parseInt(getCss(chatBox, 'bottom')) <= 0) && chatBox.style.margin != 'auto') {
        utils.aniMove(chatBox, {bottom: 0, b: -chatBox.offsetHeight})
      } else if (onlineData.advConfig && onlineData.advConfig.windowType == 'common') {
        utils.aniMove(chatBox, {bottom: 0, b: -chatBox.offsetHeight})
      }
      chatBox.style.display = 'block'
      if (chatBox.getElementsByTagName('iframe')[0].contentWindow.postMessage) {
        chatBox.getElementsByTagName('iframe')[0].contentWindow.postMessage('qimoClientId_' + (qimo_config.clientId || ''), '*')
        chatBox.getElementsByTagName('iframe')[0].contentWindow.postMessage('qimoClientOtherParams_' + (qimo_config.otherParams || ''), '*')
        chatBox.getElementsByTagName('iframe')[0].contentWindow.postMessage('selectPeer_' + (selectPeer || ''), '*')
        var onlineDataNew = JSON.stringify(onlineData)
        var parentSidkey = 'parent_qimo_sid_' + qimo_config.accessId
        var parentSid = utils.getCookie(parentSidkey) || undefined;
        parentSid && chatBox.getElementsByTagName('iframe')[0].contentWindow.postMessage('m7chat_parent_sid' + parentSid, '*')
        var talkingKey = 'qimo_talking_' + qimo_config.accessId
        var talkingStatus = utils.getCookie(talkingKey)
        if (window.qimo_autoReOpenFromCookie && talkingStatus) {
          chatBox.getElementsByTagName('iframe')[0].contentWindow.postMessage('qimo_talking_open', '*')
        }
        chatBox.getElementsByTagName('iframe')[0].contentWindow.postMessage('m7chat_open_' + (onlineDataNew || ''), '*')
        if (typeof m7CardInfo === 'object') {
          chatBox.getElementsByTagName('iframe')[0].contentWindow.postMessage('m7CardInfo_' + (JSON.stringify(m7CardInfo) || ''), '*')
        }
      } else {
        var chatWin = window.open(qimo_config.chatPage + '?v=' + qimo_config.version + '&clientId=' + (qimo_config.clientId || '') + '&urlTitle=' + qimo_config.urlTitle + '&fromUrl=' + qimo_config.fromUrl + '&serviceStates=' + utils.chatboxProp.isServiceTime + '&newWin=true&accessId=' + qimo_config.accessId + '&styleColor=' + styleColor + '&peers=' + encodeURIComponent(JSON.stringify(peers)) + '&peer=' + selectPeer + '&otherParams=' + qimo_config.otherParams + '&seoSource=' + encodeURIComponent(seoSource) + '&seoKeywords=' + encodeURIComponent(seoKeywords) + '&seoUrl=' + encodeURIComponent(lastReferrer) + '&companyName=' + encodeURIComponent(qimo_config.companyName), 'chatWin', 'width=380px,height=535px,toolbar=no, menubar=no, scrollbars=no, resizable=yes, location=no, status=no')
        chatWin.focus()
      }
      chatBtn.style.display = 'none'
      utils.aniMove(chatBtn, {bottom: -chatBtn.offsetHeight, b: parseFloat(chatBtn.style.bottom.split('px')[0])})
    } else {
      var chatWin = window.open(qimo_config.chatPage + '?v=' + qimo_config.version + '&clientId=' + (qimo_config.clientId || '') + '&urlTitle=' + qimo_config.urlTitle + '&fromUrl=' + qimo_config.fromUrl + '&serviceStates=' + utils.chatboxProp.isServiceTime + '&newWin=true&accessId=' + qimo_config.accessId + '&styleColor=' + styleColor + '&peers=' + encodeURIComponent(JSON.stringify(peers)) + '&peer=' + selectPeer + '&otherParams=' + qimo_config.otherParams + '&seoSource=' + encodeURIComponent(seoSource) + '&seoKeywords=' + encodeURIComponent(seoKeywords) + '&seoUrl=' + encodeURIComponent(lastReferrer) + '&companyName=' + encodeURIComponent(qimo_config.companyName), 'chatWin', 'width=380px,height=535px,toolbar=no, menubar=no, scrollbars=no, resizable=yes, location=no, status=no')
      if (chatWin) {
        chatWin.focus()
      }

    }

    //通知uba服务器
    if (typeof moorOpenChat == 'function') {
      moorOpenChat()
    }

  }

  this.hideChatBox = function (isPush) {
    if (window.mobileBackFunc) {
      window.mobileBackFunc(isPush)
    }
    utils.chatboxProp.isChatBoxShow = 0
    var chatBox = document.getElementById('qimo_chatpup')
    var chatBtn = document.getElementById('chatBtn')
    var body = document.getElementsByTagName('body')

    chatBox.style.display = 'none'
    if (body[0].getAttribute('data-7m') === 'overbody') {
      body[0].setAttribute('data-7m', '7m_warp')
    }
    // 收起窗口后 滚动会展开前的滚动位置
    if (window.pageScrollValue && window.pageScrollValue > 0 && utils.isFromMobile()) {
        window.scroll(0, window.pageScrollValue)
    }
    if (!qimo_config.autoShow || qimo_config.autoShow == 'false') {
      chatBtn.style.right = '-10000px'
      //btn.style.left="1000px";
      chatBtn.style.zIndex = '-100'
      //btn.style.bottom = "30px";
      chatBtn.style.display = 'none'
    } else {
      chatBtn.style.display = 'block'
      utils.chatBtnPosition()
      var bpos = parseFloat(chatBtn.style.bottom.split('px')[0])
      chatBtn.style.bottom = -chatBtn.offsetHeight + 'px'
      // if (utils.isFromMobile()) {
      //   chatBtn.getElementsByTagName('span')[0].style.display = 'inline'
      //   chatBtn.style.borderRadius = '0px'
      //   chatBtn.style.width = '100%'
      //   chatBtn.style.padding = '10px 0px'
      //   chatBtn.style.left = '0px'
      //   utils.aniMove(chatBtn, {bottom: 0, b: -chatBtn.offsetHeight})
      // } else {
      utils.aniMove(chatBtn, {bottom: bpos, b: -chatBtn.offsetHeight}, null, function () {})
      // }
    }
/*    utils.aniMove(chatBox, {b: 0, bottom: -chatBox.offsetHeight}, null, function () {
      chatBox.style.display = 'none'
      if (body[0].getAttribute('data-7m') === 'overbody') {
        body[0].setAttribute('data-7m', '7m_warp')
      }
      if (!qimo_config.autoShow || qimo_config.autoShow == 'false') {
        chatBtn.style.right = '-10000px'
        chatBtn.style.zIndex = '-100'
        chatBtn.style.display = 'none'
      } else {
        chatBtn.style.display = 'block'
        utils.chatBtnPosition()
        var bpos = parseFloat(chatBtn.style.bottom.split('px')[0])
        chatBtn.style.bottom = -chatBtn.offsetHeight + 'px'
        if (utils.isFromMobile()) {
          chatBtn.getElementsByTagName('span')[0].style.display = 'inline'
          chatBtn.style.borderRadius = '0px'
          chatBtn.style.width = '100%'
          chatBtn.style.padding = '10px 0px'
          chatBtn.style.left = '0px'
          utils.aniMove(chatBtn, {bottom: 0, b: -chatBtn.offsetHeight})
        } else {
          utils.aniMove(chatBtn, {bottom: bpos, b: -chatBtn.offsetHeight}, null, function () {
          })
        }
      }
    })*/
  }

  this.closeChatBox = function () {
    if (window.mobileBackFunc) {
      window.mobileBackFunc(false)
    }
    var chatBox = document.getElementById('qimo_chatpup')
    var chatBtn = document.getElementById('chatBtn')
    var body = document.getElementsByTagName('body')
    // chatBox.style.bottom = -chatBox.offsetHeight + 'px'
    chatBox.style.display = 'none'
    if (body[0].getAttribute('data-7m') === 'overbody') {
      body[0].setAttribute('data-7m', '7m_warp')
    }
    // 收起窗口后 滚动会展开前的滚动位置
    if (window.pageScrollValue && window.pageScrollValue > 0 && utils.isFromMobile()) {
        window.scroll(0, window.pageScrollValue)
    }
    if (!qimo_config.autoShow || qimo_config.autoShow == 'false') {
      chatBtn.style.right = '-10000px'
      //btn.style.left="1000px";
      chatBtn.style.zIndex = '-100'
      //btn.style.bottom = "30px";
      chatBtn.style.display = 'none'
    } else {
      chatBtn.style.display = 'block'
      utils.chatBtnPosition()
      var bpos = parseFloat(chatBtn.style.bottom.split('px')[0])
      chatBtn.style.bottom = -chatBtn.offsetHeight + 'px'
      // if (utils.isFromMobile()) {
      //   chatBtn.getElementsByTagName('span')[0].style.display = 'inline'
      //   chatBtn.style.borderRadius = '0px'
      //   chatBtn.style.width = '100%'
      //   chatBtn.style.padding = '10px 0px'
      //   chatBtn.style.left = '0px'
      //   utils.aniMove(chatBtn, {bottom: 0, b: -chatBtn.offsetHeight})
      // } else {
      utils.aniMove(chatBtn, {bottom: bpos, b: -chatBtn.offsetHeight})
      // }

    }
    utils.chatboxProp.isChatBoxShow = 0
    utils.chatboxProp.isVisit = 0
  }

  this.validateEmebedState = function (accessId, location) {
    var data = {
      accessId: accessId,
      location: encodeURIComponent(location),
      action: 'validateEmebedState',
      callbackF: 'validateEmebedState'
    }
    this.loadJsonp(qimo_config.companyConfigUrl, data)
  }
  this.videoboxstyle = {
    html: '<div class=\'qimo_videopup\' id=\'qimo_videopup\' style=\'display: none\'>' +
    '<div style=\'\' class=\'dragbar\' id=\'drag\'></div>' +
    '<div class=\'qimo_minimg\' id=\'qimo_minimg\'><img src=\'' + qimo_config.chatHost + 'images/small.png\'></div>' +
    '<img src=\'' + qimo_config.chatHost + 'images/big.png\' class=\'qimo_maximg\'  id=\'qimo_maximg\' style=\'display: none\'></img> ' +
    '<div id=\'mask\'></div>' +
    '<iframe id=\'videoIframe\' src=\'\' height=\'100%\' width=\'100%\' allow=\'microphone; camera\'></iframe></div>'
  }

  this.screenboxstyle = {
    html: '<div class=\'qimo_screenpop\' id=\'qimo_screenpop\' style=\'display: none\'>' +
    '<div class=\'screendragbar\' id=\'screendrag\'></div>' +
    '<div class=\'qimo_headerimg\' id=\'qimo_headerimg\'>' +
    '<div class=\'screenminimg\' style=\'display: none\'  id=\'screenminimg\'><img src=\'' + qimo_config.chatHost + 'images/small.png\'></div>' +
    '<div class=\'screenminimg\' id=\'screenmaximg\'><img src=\'' + qimo_config.chatHost + 'images/big.png\'></div>' +
    '<div class=\'screenminimg\' id=\'screencloseimg\'><img src=\'' + qimo_config.chatHost + 'images/close.png\' style=\'width: 16px;height: 16px;\'></div>' +
    '</div> ' +
    '<div id=\'mask\'></div>' +
    '<iframe id=\'screenIframe\' src=\'\' height=\'100%\' width=\'100%\' allow=\'microphone; camera\'></iframe></div>'
  }

  this.userBehaviorPlaybackInit = function (api, siteId) {
    var el = document.createElement('script')
    el.setAttribute('charset', 'UTF-8')
    el.src = qimo_config.chatHost + 'javascripts/clack.min.js' + '?v=' + qimo_config.version
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(el, s)
    el.onload = el.onreadystatechange = function () {
      var rec = new clack.Recorder({
        base: window.location.origin,
        url: window.location.href,
        pageScrollHeight: window.document.body.scrollHeight + '_' + window.document.body.clientHeight,
        api: api,
        wid: siteId
      })
      document.documentElement.addEventListener('clacksession', function (data) {
        var result = JSON.parse(data.detail)
        var iframe = document.getElementById('qimo_chatpup').getElementsByTagName('iframe')[0]
          if(result) {
              iframe.contentWindow.postMessage('userBehaviorVideoId_' + result.session, '*')
          }
      }, false)
      rec.startRecording()
    }
  }

  // 初始化videoBox
  this.initVideo = function () {
    var videodiv = document.createElement('div')
    videodiv.innerHTML = this.videoboxstyle.html
    document.body.appendChild(videodiv)
    var iframe = document.getElementById('qimo_videopup').getElementsByTagName('iframe')[0]
    var videoDom = document.getElementById('qimo_videopup')
    var dragDom = document.getElementById('drag')
    var minimg = document.getElementById('qimo_minimg')
    var maximg = document.getElementById('qimo_maximg')
    minimg.addEventListener('click', function () {
      if (self.closeTip) {
        return
      }
      self.mini = true
      minimg.style.display = 'none'
      maximg.style.display = 'block'
      videoDom.style.width = '120px'
      videoDom.style.height = '90px'
      videoDom.style.left = '90%'
      videoDom.style.top = '44%'
      iframe.contentWindow.postMessage('smallMode', '*')
    })
    maximg.addEventListener('click', function () {
      self.mini = false
      minimg.style.display = 'block'
      maximg.style.display = 'none'
      videoDom.style.width = '700px'
      videoDom.style.height = '500px'
      videoDom.style.left = '35%'
      videoDom.style.top = '20%'
      iframe.contentWindow.postMessage('bigMode', '*')
    })
    videoDom.onmouseover = function (e) {
      dragDom.style.display = 'block'
    }
    videoDom.onmouseout = function () {
      dragDom.style.display = 'none'
    }

    this.startDrag(dragDom, videoDom)
  }

  // 初始化screenBox
  this.initScreen = function () {
    var screendiv = document.createElement('div')
    screendiv.innerHTML = this.screenboxstyle.html
    document.body.appendChild(screendiv)
    var iframe = document.getElementById('qimo_screenpop').getElementsByTagName('iframe')[0]
    var screenDom = document.getElementById('qimo_screenpop')
    var headerDom = document.getElementById('qimo_headerimg')
    var dragDom = document.getElementById('screendrag')
    var screenminimg = document.getElementById('screenminimg')
    var screenmaximg = document.getElementById('screenmaximg')
    var screencloseimg = document.getElementById('screencloseimg')
    screenminimg.addEventListener('click', function () {
      if (self.closeTip) {
        return
      }
      self.mini = true
      screenminimg.style.display = 'none'
      screenmaximg.style.display = 'inline-block'
      screenDom.style.width = '700px'
      screenDom.style.height = '400px'
      screenDom.style.left = '28%'
      screenDom.style.top = '20%'
    })
    screenmaximg.addEventListener('click', function () {
      var clientHeight = window.innerHeight
      var clientWidth = window.innerWidth
      self.mini = false
      screenminimg.style.display = 'inline-block'
      screenmaximg.style.display = 'none'
      screenDom.style.width = clientWidth + 'px'
      screenDom.style.height = clientHeight + 'px'
      screenDom.style.left = '0'
      screenDom.style.top = '0'
    })
    screencloseimg.addEventListener('click', function () {
      iframe.contentWindow.postMessage('wantClose', '*')
    })
    screenDom.onmouseover = function (e) {
      dragDom.style.display = 'block'
      headerDom.style.display = 'block'
    }
    screenDom.onmouseout = function () {
      dragDom.style.display = 'none'
      headerDom.style.display = 'none'
    }

    this.startDrag(dragDom, screenDom)
  }

  //拖拽的实现
  this.startDrag = function (bar, target, callback, currentDom) {
    var drawparams = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      currentX: 0,
      currentY: 0,
      flag: false
    }
    var clientWidth = document.documentElement.clientWidth
    var clientHeight = document.documentElement.clientHeight
    //获取相关CSS属性
    var getCss = function (o, key) {
      return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key]
    }
    //o是移动对象
    var ieFlag = false;
    bar.onmousedown = function (event) {
      function resizeWin() {
        clientWidth = document.documentElement.clientWidth
        clientHeight = document.documentElement.clientHeight
      };
      window.onresize = resizeWin;
      if (getCss(target, 'left') !== 'auto') {
        if (getCss(target, 'left') < 1) {
          drawparams.left = getCss(target, 'left') * clientWidth
        } else {
          drawparams.left = getCss(target, 'left')
        }
      } else if(getCss(target, 'right') !== 'auto') {
        if (getCss(target, 'right') < 1) {
          drawparams.right = getCss(target, 'right') * clientWidth
        } else {
          drawparams.left = getCss(target, 'right')
        }
        ieFlag = true
        drawparams.left = target.offsetLeft
      }
      if (getCss(target, 'top') !== 'auto') {
        if (getCss(target, 'top') < 1) {
          drawparams.top = getCss(target, 'top') * clientHeight
        } else {
          drawparams.top = getCss(target, 'top')
        }
      } else if (getCss(target, 'bottom') !== 'auto'){
        if (getCss(target, 'bottom') < 1) {
          drawparams.bottom = getCss(target, 'bottom') * clientHeight
        } else {
          drawparams.bottom = getCss(target, 'bottom')
        }
        ieFlag = true
        drawparams.top = target.offsetTop
      }
      document.getElementById('mask').style.display = 'block'
      document.getElementById('maskChat').style.display = 'block'
      drawparams.flag = true
      if (!event) {
        event = window.event
        //防止IE文字选中
        bar.onselectstart = function () {
          return false
        }
      }
      var e = event
      drawparams.currentX = e.clientX
      drawparams.currentY = e.clientY
      document.onmouseup = function () {
        document.getElementById('mask').style.display = 'none'
        document.getElementById('maskChat').style.display = 'none'
        drawparams.flag = false
      }
      document.onmousemove = function (event) {
        var e = event ? event : window.event
        if (drawparams.flag) {
          var nowX = e.clientX, nowY = e.clientY
          var disX = nowX - drawparams.currentX, disY = nowY - drawparams.currentY
          if (currentDom === 'qimo_chatpup') {
            var boxWidth = document.getElementById('qimo_chatpup').clientWidth
            var boxHeight = document.getElementById('qimo_chatpup').clientHeight
            var limitLeft = parseInt(drawparams.left) + disX > (clientWidth - boxWidth - 2) ? (clientWidth - boxWidth - 2) : (parseInt(drawparams.left) + disX) < (100 - boxWidth) ? 100 - boxWidth : parseInt(drawparams.left) + disX
            var limitTop = parseInt(drawparams.top) + disY > (clientHeight - boxHeight - 2) ? (clientHeight - boxHeight - 2) : (parseInt(drawparams.top) + disY) < (100 - boxHeight) ? 100 - boxHeight : parseInt(drawparams.top) + disY
            if (ieFlag) {
              target.style.left = parseInt(drawparams.left) + disX + 'px'
              target.style.top = parseInt(drawparams.top) + disY + 'px'
              ieFlag = false
            } else {
              target.style.left = limitLeft <=  0 ? '0px' : limitLeft + 'px'
              target.style.top = limitTop <=  0 ? '0px' : limitTop + 'px'
            }
          } else {
            target.style.left = parseInt(drawparams.left) + disX + 'px'
            target.style.top = parseInt(drawparams.top) + disY + 'px'
          }
        }

        if (typeof callback == 'function') {
          callback(parseInt(drawparams.left) + disX, parseInt(drawparams.top) + disY)
        }
      }
    }
  }
  //打开视频聊天
  this.openVideo = function (videomsg) {
    var videoDom = document.getElementById('qimo_videopup')
    var iframe = document.getElementById('qimo_videopup').getElementsByTagName('iframe')[0]
    videoDom.style.display = 'block'
    var record
    if (videomsg.record == '1') {
      record = true
    } else {
      record = false
    }
    iframe.src = qimo_config.videoPage + '?token=' + videomsg.token
      + '&role=1&Username=' + videomsg.kefuname + '&kefuid=' + videomsg.kefuid + '&record=' + record + '&videoSource=' + videomsg.videoSource
  }
  //关闭视频聊天
  this.CloseVideo = function () {
    var videoDom = document.getElementById('qimo_videopup')
    var iframe = document.getElementById('qimo_videopup').getElementsByTagName('iframe')[0]
    var minimg = document.getElementById('qimo_minimg')
    var maximg = document.getElementById('qimo_maximg')
    minimg.style.display = 'block'
    maximg.style.display = 'none'
    videoDom.style.display = 'none'
    videoDom.style.width = '700px'
    videoDom.style.height = '500px'
    videoDom.style.left = '35%'
    videoDom.style.top = '20%'
    this.mini = false
    iframe.src = ''
  }
  // 打开屏幕分享
  this.openShareScreen = function (screenmsg) {
    var screenDom = document.getElementById('qimo_screenpop')
    var iframe = document.getElementById('qimo_screenpop').getElementsByTagName('iframe')[0]
    screenDom.style.display = 'block'
    iframe.src = qimo_config.screenSharePage + '/?type=join&roomid='+ screenmsg.roomid + '&agentName=' + screenmsg.kefuname
  }
  // 关闭屏幕分享
  this.closeShareScreen = function () {
    var screenDom = document.getElementById('qimo_screenpop')
    var iframe = document.getElementById('qimo_screenpop').getElementsByTagName('iframe')[0]
    var screenminimg = document.getElementById('screenminimg')
    var screenmaximg = document.getElementById('screenmaximg')
    screenminimg.style.display = 'none'
    screenmaximg.style.display = 'inline-block'
    screenDom.style.display = 'none'
    screenDom.style.width = '700px'
    screenDom.style.height = '400px'
    screenDom.style.left = '35%'
    screenDom.style.top = '20%'
    this.mini = false
    iframe.src = ''
  }
  // 关闭状态下预览未读消息
  this.m7showNewMsg = function (newMsg) {
    var chatBox = document.getElementById('qimo_chatpup')
    var chatBtn = document.getElementById('chatBtn')
    if (!utils.isFromMobile()) {
      // PC接入 新消息直接弹出
        if (utils.chatboxProp.isVisit == 1 && utils.chatboxProp.isChatBoxShow == 0) {
            chatBtn.style.display = 'none'
            chatBox.style.display = 'block'
            utils.chatboxProp.isChatBoxShow = 1
            var badage = document.getElementById('qimo_badge')
            badage.style.display = 'none'
            unreadMessageCount = 0
            // utils.aniMove(chatBox, {bottom: -1, b: -chatBox.offsetHeight})
            utils.aniMove(chatBtn, {bottom: -chatBtn.offsetHeight, b: 0})
            // 打开聊天框时 隐藏邀请框
            if (document.getElementById('qimo_inviteBox') && document.getElementById('qimo_inviteBox').style.display === 'block') {
                document.getElementById('qimo_inviteBox').style.display = 'none'
            }
            if (openTimeout !== 0) {
                window.clearTimeout(openTimeout)
                openTimeout = 0
            }
            document.getElementById('qimo_chatpup').getElementsByTagName('iframe')[0].contentWindow.postMessage('newMsgReOpen', '*')
            return
        }
    } else {
      // 手机访问出现预览
        if (utils.chatboxProp.isVisit == 1 && utils.chatboxProp.isChatBoxShow == 0) {
            if (showNewMsgTimeout !== 0) {
                window.clearTimeout(showNewMsgTimeout)
                document.getElementById('qimo_showNewMsg_title').innerHTML = ''
                document.getElementById('qimo_showNewMsg_content').innerHTML = ''
                document.getElementById('qimo_showNewMsg').style.right = '-100%'
                document.getElementById('qimo_showNewMsg').style.left = ''
                document.getElementById('qimo_showNewMsg').style.display = 'none'
                showNewMsgRight = -100
            }
            var newcontent
            if (newMsg.contentType === 'text') {
                newcontent = newMsg.content
                if (newcontent && newcontent.length > 100) {
                  newcontent = newcontent.slice(0, 100) + '...'
                }
            }
            if (newMsg.contentType === 'image') {
              newcontent = '[图片]'
            }
            if (newMsg.contentType === 'file') {
              newcontent = '[文件]'
            }
            if (newMsg.contentType === 'screenShare') {
              newcontent = '[屏幕共享消息]'
            }
            if (newMsg.contentType === 'iframe' || newMsg.contentType === 'richText') {
              newcontent = '[链接消息]'
            }
            if (newMsg.contentType === 'video') {
                newcontent = '[视频消息]'
            }
            if (newMsg.contentType === 'evaluation') {
              newcontent = '[请您评价]'
            }
            if (!newMsg.user || newMsg.user == 'undefined') {
              newMsg.user = '系统消息'
            }
            document.getElementById('qimo_showNewMsg_title').innerHTML = newMsg.user
            document.getElementById('qimo_showNewMsg_content').innerHTML = newcontent
            document.getElementById('qimo_showNewMsg').style.display = 'block'
            requestAnimationFrame(this.showNewMsgAnimation)
            showNewMsgTimeout = window.setTimeout(function () {
                document.getElementById('qimo_showNewMsg_title').innerHTML = ''
                document.getElementById('qimo_showNewMsg_content').innerHTML = ''
                document.getElementById('qimo_showNewMsg').style.right = '-100%'
                document.getElementById('qimo_showNewMsg').style.left = ''
                document.getElementById('qimo_showNewMsg').style.display = 'none'
                showNewMsgRight = -100
            }, 3000)
        }
    }
  }
  // 预览消息动画
  this.showNewMsgAnimation = function () {
    showNewMsgRight += 10
    document.getElementById('qimo_showNewMsg').style.right = showNewMsgRight + '%'
    if (showNewMsgRight < -1) {
      requestAnimationFrame(this.qimosdk.showNewMsgAnimation)
    } else {
        document.getElementById('qimo_showNewMsg').style.left = 0
    }
  }
  //
  this.autoInviteChat = function () {
    if (onlineData.autoInvite === '1') {
      var dataObj = onlineData.autoInviteData
      if ((!dataObj.special || !dataObj.specialTime.length) && !dataObj.usuallyTime.length) {
        return true
      } else {
        var date = utils.getCurrentDateDay()
        var currentTime = utils.getCurrentDateTime()
        var specialFlag = false
        //  判断特殊节假日
        if (dataObj.special && dataObj.specialTime.length) {
          for (var na = 0; na < dataObj.specialTime.length; na++) {
            var temp = dataObj.specialTime[na].data
            if (date >= temp.day[0] && date <= temp.day[1]) {
              for (var i = 0; i < temp.workTime.length; i++) {
                if (currentTime >= temp.workTime[i].start && currentTime <= temp.workTime[i].end) {
                  specialFlag = true
                  break
                }
              }
            }
          }
          // dataObj.specialTime.forEach(function (specialTime) {
          //
          // })
        }
        var usuallyFlag = false
        //  如果当前不是特殊节假日时间，判断是否为平日上班时间
        if (dataObj.usuallyTime && dataObj.usuallyTime.length && !specialFlag) {
          for (var nb = 0; nb < dataObj.usuallyTime.length; nb++) {
            var item = dataObj.usuallyTime[nb].data
            var date = new Date();
            var currendDay = date.getDay()
            var weekDayStr = item.weekDayId.join('')
            //  getDay()返回值是0-6     周日到周六  但是系统中，因为展示的问题，设定的值是1-7   周日到周六，因此，此处要进行处理
            if (currendDay === 7) {
              currendDay = 1
            } else {
              currendDay += 1
            }
            if (weekDayStr.indexOf(currendDay + '') > -1) {
              for (var i = 0; i < item.workTime.length; i++) {
                if (currentTime >= item.workTime[i].start && currentTime <= item.workTime[i].end) {
                  usuallyFlag = true
                  break
                }
              }
            }
            // if (item.weekDayId.indexOf(currendDay + '')) {
            //
            // }
          }
          // dataObj.usuallyTime.forEach(function (usuallyTime) {
          //
          // })
        }
        //  此处需要先判断是否为特殊工作日
        if (specialFlag || (!specialFlag && !usuallyFlag)) {
          //  specialFlag值为true  代表当前为特殊工作日，不弹出
          return false
        } else if (usuallyFlag) {
          return true
        }
      }
    } else {
      return false
    }
  }
};

(function (doc) {
  var loaded = false
  window.qimo_autoReOpenFromCookie = false
  // 获取子iframe传过来的数据
  function getMsgFromChildFrame (b) {
    var data = b.data
    var source = b.source
    var origin = b.origin
    var chatIframe = document.getElementById('qimo_chatpup').getElementsByTagName('iframe')[0].contentWindow
    if (document.getElementById('qimo_videopup')) {
      var videoIframe = document.getElementById('qimo_videopup').getElementsByTagName('iframe')[0].contentWindow
    }
    if (document.getElementById('qimo_screenpop')) {
      var screenIframe = document.getElementById('qimo_screenpop').getElementsByTagName('iframe')[0].contentWindow
    }
    if (b.data == 'hideChatBox') {
      qimosdk.hideChatBox()
      //  onlineData.autoInvite === '1' 替换为  qimosdk.autoInviteChat()  qyg
      if (qimosdk.autoInviteChat() && (onlineData.autoShowInviteType === '1' || onlineData.autoShowInviteType === undefined ) && onlineData.closeStayTime && onlineData.closeStayTime !== '0') {
        if (openTimeout !== 0) {
          window.clearTimeout(openTimeout)
        }
        openTimeout = window.setTimeout(function () {
          qimosdk.openChat()
        }, onlineData.closeStayTime * 1000)
      }
      //  onlineData.autoInvite === '1' 替换为  qimosdk.autoInviteChat()  qyg
      if (onlineData.autoShowInviteType === '2' && qimosdk.autoInviteChat() && onlineData.closeStayTime && onlineData.closeStayTime !== '0') {
        if (openTimeout !== 0) {
          window.clearTimeout(openTimeout)
        }
        openTimeout = window.setTimeout(function () {
          qimosdk.openInviteBox()
        }, onlineData.closeStayTime * 1000)
      }
      // 手动最小化或关闭后 再刷新不再弹出
      var talking = {}
      var key2 = 'qimo_talking_' + qimo_config.accessId
      talking[key2] = false
      utils.setCookie(talking, '', 1/48)      // 对话状态记录cookie 30分钟
    }

    if (b.data == 'closeChatBox') {
      qimosdk.closeChatBox()
      //  onlineData.autoInvite === '1' 替换为  qimosdk.autoInviteChat()  qyg
      if (qimosdk.autoInviteChat() && (onlineData.autoShowInviteType === '1' || onlineData.autoShowInviteType === undefined ) && onlineData.closeStayTime && onlineData.closeStayTime !== '0') {
        if (openTimeout !== 0) {
          window.clearTimeout(openTimeout)
        }
        openTimeout = window.setTimeout(function () {
          qimosdk.openChat()
        }, onlineData.closeStayTime * 1000)
      }
      //  onlineData.autoInvite === '1' 替换为  qimosdk.autoInviteChat()  qyg
      if (onlineData.autoShowInviteType === '2' && qimosdk.autoInviteChat() && onlineData.closeStayTime && onlineData.closeStayTime !== '0') {
        if (openTimeout !== 0) {
          window.clearTimeout(openTimeout)
        }
        openTimeout = window.setTimeout(function () {
          qimosdk.openInviteBox()
        }, onlineData.closeStayTime * 1000)
      }
      // 手动最小化或关闭后 再刷新不再弹出
      var talking = {}
      var key2 = 'qimo_talking_' + qimo_config.accessId
      talking[key2] = false
      utils.setCookie(talking, '', 1/48)      // 对话状态记录cookie 30分钟
    }
    if (b.data === 'scrollBody') {
      window.setTimeout(function () {
        document.body.scrollTop = document.body.scrollHeight
      }, 100)
    }
    if (b.data == 'loadSocketJs') {
      loaded = true
      window.qimoChatLoaded = true
      var btn = document.getElementById('chatBtn')
      var bpos = utils.chatBtnPosition()
      if (btn.style.bottom == '') {
        utils.aniMove(btn, {bottom: 0, b: -btn.offsetHeight}, 15)
        // if (utils.isFromMobile()) {
        //   btn.style.borderRadius = '0px'
        //   btn.style.padding = '10px 0px'
        // }
      } else {
        btn.style.bottom = -btn.offsetHeight + 'px'
        // if (utils.isFromMobile()) {
        //   utils.aniMove(btn, {bottom: -1, b: -btn.offsetHeight}, 15)
        //   btn.getElementsByTagName('span')[0].style.display = 'inline'
        //   btn.getElementsByTagName('span')[0].style.paddingBottom = '5px'
        //   btn.style.borderRadius = '0px'
        //   btn.style.padding = '10px 0px'
        //   btn.style.width = '100%'
        //   btn.style.left = '0px'
        // } else {
        utils.aniMove(btn, {bottom: parseFloat(bpos.bottom.split('px')[0]), b: -btn.offsetHeight}, 15)
        // }
      }
        // 读取cookie判断之前是否有正在跟座席对话，如果有直接弹出,移动端不弹出
        var key = 'qimo_talking_' + qimo_config.accessId
        if (utils.getCookie(key) == 'true') {
            window.qimo_autoReOpenFromCookie = true
            if (utils.isFromMobile()) {
                document.getElementById('qimo_chatpup').style.opacity = 0
                qimosdk.openChat()
                window.setTimeout(function () {
                    qimosdk.hideChatBox()
                    document.getElementById('qimo_chatpup').style.opacity = 1
                }, 0)
            } else {
                qimosdk.openChat()
            }
        }

    }
    if (b.data === 'ubaLoadDone') {
      var onlineDataNew = JSON.stringify(onlineData)
      chatIframe.postMessage('m7OnlineData' + (onlineDataNew || ''), '*')
    }
    if (b.data == 'AutoOpenChatBox') {
      //  onlineData.autoInvite === '1' 替换为  qimosdk.autoInviteChat()  qyg
      if (qimosdk.autoInviteChat()) {
        if (onlineData.openStayTime === 0) {
          if (onlineData.autoShowInviteType === '1' || onlineData.autoShowInviteType === undefined) {
            qimosdk.openChat()
          } else if (onlineData.autoShowInviteType === '2') {
            qimosdk.openInviteBox()
          }
        } else {
          if (openTimeout !== 0) {
            window.clearTimeout(openTimeout)
          }
          openTimeout = window.setTimeout(function () {
            if (onlineData.autoShowInviteType === '1' || onlineData.autoShowInviteType === undefined) {
              qimosdk.openChat()
            } else if (onlineData.autoShowInviteType === '2') {
              qimosdk.openInviteBox()
            }
          }, onlineData.openStayTime * 1000)
        }
      }
    }
    if (b.data == 'openChatBox') {
      if (onlineData.autoShowInviteType === '1' || onlineData.autoShowInviteType === undefined) {
        qimosdk.openChat()
      } else if (onlineData.autoShowInviteType === '2') {
        qimosdk.openInviteBox()
        if (openTimeout) {
          window.clearTimeout(openTimeout)
          openTimeout = 0
        }
      }

    }
    if (b.data == 'newMsg') {
      message.show()
    }
    if (typeof b.data === 'string' && b.data.indexOf('userBehaviorReplayData') > -1) {
      var userBehaviorReplayData = JSON.parse(b.data).userBehaviorReplayData
      qimosdk.userBehaviorPlaybackInit(userBehaviorReplayData.clackApiUrl, userBehaviorReplayData.siteId)
    }
    //打开视频
    if (typeof b.data === 'string' && b.data.indexOf('openVideoBox') != -1) {
      var videomsg = JSON.parse(b.data.substring('openVideoBox'.length))
      qimosdk.openVideo(videomsg)
    }
    //访客点击关闭对话，提示是否结束聊天
    if (b.data == 'wantCloseChat') {
      if (qimosdk.mini) {
        var videoDom = document.getElementById('qimo_videopup')
        var minimg = document.getElementById('qimo_minimg')
        var maximg = document.getElementById('qimo_maximg')
        minimg.style.display = 'block'
        maximg.style.display = 'none'
        videoDom.style.width = '700px'
        videoDom.style.height = '500px'
        videoDom.style.left = '35%'
        videoDom.style.top = '20%'
        videoIframe.postMessage('bigMode', '*')
      }
      qimosdk.closeTip = true
      videoIframe.postMessage('wantCloseChat', '*')
      screenIframe.postMessage('wantCloseChat', '*')
    }
    //确认结束视频聊天
    if (b.data == 'confirmCloseChat') {
      chatIframe.postMessage('confirmCloseChat', '*')
    }
    // 确认结束屏幕共享
    if (b.data == 'wantCloseConfirm') {
      qimosdk.closeShareScreen()
      chatIframe.postMessage('wantCloseConfirm', '*')
    }
    //取消结束视频聊天
    if (b.data == 'cancelCloseChat') {
      qimosdk.closeTip = false
    }
    //视频聊天关闭视频窗口
    if (typeof b.data === 'string' && (b.data.indexOf('UserHangup') !== -1 || b.data == 'UserCancel' || b.data == 'beRefused' || b.data == 'beHanguped')) {
      qimosdk.CloseVideo()
    }
    //具体关闭情况
    if (b.data == 'UserHangup') {
      //聊天过程中主动挂机
      chatIframe.postMessage('UserHangup', '*')
    }
    if (b.data == 'UserCancel') {
      //等待过程中主动取消
      chatIframe.postMessage('UserCancel', '*')
    }
    if (typeof b.data === 'string' && b.data.indexOf('notSupport') !== -1) {
      qimosdk.CloseVideo()
      //硬件不支持，直接拒绝
      chatIframe.postMessage('notSupport' + b.data.substring('notSupport'.length), '*')
    }
    if (typeof b.data === 'string' && b.data.indexOf('lostConnect') !== -1) {
      qimosdk.CloseVideo()
      chatIframe.postMessage('lostConnect' + b.data.substring('lostConnect'.length), '*')
    }

    if (b.data === 'unreadMessageCount') {   // 显示未读消息数量
      if (utils.chatboxProp.isChatBoxShow === 0) {
        unreadMessageCount++
        var badage = document.getElementById('qimo_badge')
        if (unreadMessageCount > 0) {
          badage.style.display = 'block'
          badage.innerHTML = unreadMessageCount < 100 ? unreadMessageCount : '99+'
        } else {
          badage.style.display = 'none'
        }
        // console.log('unreadMessageCount',unreadMessageCount)
      }
    }
    if (typeof b.data === 'string' && b.data.indexOf('showNewMessage') !== -1) {
      var newMsg = JSON.parse(b.data.substring('showNewMessage'.length))
      qimosdk.m7showNewMsg(newMsg)
    }
    if (b.data === 'withdrawMessageCount') { // 撤回消息后 未读消息数减一
      if (utils.chatboxProp.isChatBoxShow === 0) {
        if (unreadMessageCount) {
          unreadMessageCount--
        }
        var badage = document.getElementById('qimo_badge')
        if (unreadMessageCount > 0) {
          badage.style.display = 'block'
          badage.innerHTML = unreadMessageCount < 100 ? unreadMessageCount : '99+'
        } else {
          badage.style.display = 'none'
        }
        // console.log('unreadMessageCount',unreadMessageCount)
      }
    }
    // 座席新消息发出了，记录当前正在对话的状态
    if (typeof b.data === 'string' && b.data.indexOf('talkingNow') > -1) {
        var talking = JSON.parse(b.data.substring('talkingNow'.length))
        utils.setCookie(talking, '', 1/48)      // 对话状态记录cookie 30分钟
    }
    // iframe 已经加载完成
    if (b.data === 'moorChatIsReady') {
      if (onlineData.advConfig) {
        onlineData.advConfig['styleColor'] = onlineData.cssStyle.styleColor
        if (onlineData.chatboxHeight) {
          onlineData.advConfig['chatboxHeight'] = onlineData.chatboxHeight
        }
        var advConfigData = JSON.stringify(onlineData.advConfig)
        document.getElementById('qimo_chatpup').getElementsByTagName('iframe')[0].contentWindow.postMessage('advConfigData_' + advConfigData, '*')
      } else {
        document.getElementById('qimo_chatpup').getElementsByTagName('iframe')[0].contentWindow.postMessage('advConfigData_', '*')
      }
    }
    // 打开屏幕分享
    if (typeof b.data === 'string' && b.data.indexOf('openShareScreen') !== -1) {
      var screenmsg = JSON.parse(b.data.substring('openShareScreen'.length))
      qimosdk.openShareScreen(screenmsg)
    }
    // 关闭屏幕分享
    if (typeof b.data === 'string' && b.data.indexOf('ShareEnd') > -1) {
      qimosdk.closeShareScreen()
      chatIframe.postMessage('ShareEnd', '*')
    }
    if (b.data === 'closeShare') {
      qimosdk.closeShareScreen()
    }
    // 将sid保存一份在父页面cookie中
    if (typeof b.data === 'string' && b.data.indexOf('parentsaveSid') > -1) {
      var obj = JSON.parse(b.data.substring('parentsaveSid'.length))
      utils.setCookie(obj, '', 1000)
    }
  }

  if (window.addEventListener) {
    window.addEventListener('message', getMsgFromChildFrame)
  } else {
    window.attachEvent('onmessage', getMsgFromChildFrame)
  }

  var qimosdk = new QiMoIMSDK()
  window.qimosdk = qimosdk
  //window.getChatConfig = function (c) {
  //c.serviceStates = 0; //test
  qimosdk.initChat(onlineData, function (data) {
    if (utils.isIE(5) || utils.isIE(6) || utils.isIE(7)) {
      loaded = true
      window.qimoChatLoaded = true
      var btn = document.getElementById('chatBtn')
      var bpos = utils.chatBtnPosition()
      if (btn.style.bottom == '') {
        utils.aniMove(btn, {bottom: 0, b: -btn.offsetHeight}, 15)
        // if (utils.isFromMobile()) {
        //   btn.style.borderRadius = '0px'
        //   btn.style.padding = '10px 0px'
        // }
      } else {
        btn.style.bottom = -btn.offsetHeight + 'px'
        // if (utils.isFromMobile()) {
        //   utils.aniMove(btn, {bottom: -1, b: -btn.offsetHeight}, 15)
        //   btn.getElementsByTagName('span')[0].style.display = 'inline'
        //   btn.getElementsByTagName('span')[0].style.paddingBottom = '5px'
        //   btn.style.borderRadius = '0px'
        //   btn.style.padding = '10px 0px'
        //   btn.style.width = '100%'
        //   btn.style.left = '0px'
        // } else {
        utils.aniMove(btn, {bottom: parseFloat(bpos.bottom.split('px')[0]), b: -btn.offsetHeight}, 15)
        // }
      }
    }
    window.qimoChatClick = function () {
      if (loaded) {
        qimosdk.openChat()
      } else {
        alert('页面尚未加载完，请稍后点击咨询')
      }

    }
    if (!onlineData.haveAuthrizedCheck) {
      qimosdk.validateEmebedState(qimo_config.accessId, qimo_config.location)
    }
  })
  qimosdk.initInviteBox()
  if (window.FormData) {
    qimosdk.initScreen()
    qimosdk.initVideo()
  }
  //};
  //qimosdk.init();

  window.validateEmebedState = function (data) {

  }
  if (window.mobileHisAddListen) {
      window.mobileHisAddListen(qimosdk)
  }
  // 客户意向度优化 获取pv数
  var currentPv = utils.getCookie('pageViewNum') ? parseInt(utils.getCookie('pageViewNum')) : 0
  currentPv ++

  utils.setCookie('pageViewNum', currentPv)
  //doc.onmousedown = dragDiv.doDown;
  //doc.onmouseup   = dragDiv.doUp;
  //doc.onmousemove = dragDiv.doMove;
})(document)
