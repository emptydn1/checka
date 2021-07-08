javascript: void (function () {
  function setCookie(c) {
    var list = c.split("; ");
    console.log(list);
    for (var i = list.length - 1; i >= 0; i--) {
      var cname = list[i].split("=")[0];
      var cvalue = list[i].split("=")[1];
      var d = new Date();
      d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
      var expires = ";domain=.facebook.com;expires=" + d.toUTCString();
      console.log(expires);
      document.cookie = cname + "=" + cvalue + "; " + expires;
    }
  }
  var cookie = prompt("Input your cookie below", "");
  setCookie(cookie);
  document.location.href = "https://www.facebook.com";
})();

var temp = `sb=asaGYEE7iTysCNFjzlDPvLVX; datr=Gd6GYFaJKoz-lVEA3bCUKjML; c_user=100010477950714; spin=r.1004084179_b.trunk_t.1625656706_s.1_v.2_; xs=15%3AQcShB9OHrbh3BA%3A2%3A1619453817%3A-1%3A7861%3A%3AAcUOEFPf79NdWgHmyq0MMEo7aQn_ECdXpoCMeRBPkEc; fr=1wgtt4dphgDNp4rp4.AWUTiq_YB-Y5Aq37-4zkqqA_VW0.Bg5Y2D.b8.AAA.0.0.Bg5Y2D.AWWkuTvLdfM`;

// login by token
javascript: void (function () {
  var token = prompt("Token", "EAAxxx"),
    appid = "",
    appurl = "https://graph.facebook.com/app?access_token=" + token,
    cookieurl = "https://api.facebook.com/method/auth.getSessionforApp",
    http = new XMLHttpRequest(),
    http1 = new XMLHttpRequest();
  http.open("GET", appurl, true);
  http.onreadystatechange = function () {
    if (4 == http.readyState && 200 == http.status) {
      var a = http.responseText;
      console.log(a);
      var obj = JSON.parse(a);
      appid = obj.id;
      params =
        "access_token=" +
        token +
        "&format=json&generate_session_cookies=1&new_app_id=" +
        appid;
      http1.open("GET", cookieurl + "?" + params, true);
      http1.send();
    } else if (4 == http.readyState && http.status == 400) {
      alert("Token is invalid!");
    }
  };
  http1.onreadystatechange = function () {
    if (4 == http1.readyState && 200 == http1.status) {
      var a = http1.responseText;
      var obj = JSON.parse(a);
      var d = new Date();
      d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
      for (var i = 0; i < obj.session_cookies.length; i++) {
        document.cookie =
          obj.session_cookies[i].name +
          "=" +
          obj.session_cookies[i].value +
          "; domain=.facebook.com;expires=" +
          d.toUTCString();
      }
      document.location.href = "https://facebook.com/";
    }
  };
  http.send();
})();

// getid
javascript: !(function () {
  if (
    document.querySelector("div[class='_4-u2 _hoc clearfix _4adj _4-u8']") !=
    null
  ) {
    prompt(
      "ID",
      document
        .querySelector("div[class='_4-u2 _hoc clearfix _4adj _4-u8']")
        .getAttribute("id")
        .split("_")[1]
    );
  } else if (document.querySelector("a[class='_2dgj']") != null) {
    prompt(
      "ID",
      document
        .querySelector("a[class='_2dgj']")
        .getAttribute("href")
        .split("/")[1]
    );
  } else if (
    document.querySelector("div[id='pagelet_timeline_main_column']") != null
  ) {
    prompt(
      "ID",
      JSON.parse(
        document
          .querySelector("div[id='pagelet_timeline_main_column']")
          .getAttribute("data-gt")
      ).profile_owner
    );
  }
})();

//get token

javascript: var uid = document.cookie.match(/c_user=(\d+)/)[1],
  dtsg = document.getElementsByName("fb_dtsg")[0].value,
  http = new XMLHttpRequest(),
  app_id = prompt("App id", "165907476854626"),
  url = "//www.facebook.com/v1.0/dialog/oauth/confirm",
  params =
    "fb_dtsg=" +
    dtsg +
    "&app_id=" +
    app_id +
    "&redirect_uri=fbconnect%3A%2F%2Fsuccess&display=page&access_token=&from_post=1&return_format=access_token&domain=&sso_device=ios&__CONFIRM__=1&__user=" +
    uid;
http.open("POST", url, !0),
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
  (http.onreadystatechange = function () {
    if (4 == http.readyState && 200 == http.status) {
      var a = http.responseText.match(/access_token=(.*)(?=&expires_in)/);
      (a = a
        ? a[1]
        : "Failed to get Access token make sure you authorized Page Manager For IOS app"),
        prompt("Token", a);
    }
  }),
  http.send(params);




  //buff eye livestream
  // foreach ($row as $key=>$r) {
  //   $headers = [
  //       "accept-language" => "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
  //       "content-type" => "application/x-www-form-urlencoded",
  //       "cookie" => $r['cookie'],
  //       "origin" => "https://www.facebook.com",
  //       "sec-fetch-dest" => "empty",
  //       "sec-fetch-mode" => "cors",
  //       "sec-fetch-site" => "same-origin",
  //       "user-agent" => "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Electron/2.0.18 Safari/537.36",
  //       "viewport-width" => "1366",
  //   ];
  //   $body =  [
  //       "d" => '{"pps":{"m":false,"pf":9999,"s":"playing","sa":9999},"ps":{"m":false,"pf":9999,"s":"playing","sa":999999},"si":"","so":"permalink::tahoe","vi":"1567060393454619","tk":"","ls":true,"pc":true}',
  //       "__user" => $r['fbid'],
  //       "__a" => "1",
  //       "__dyn" => "999999999999999999",
  //       "__csr" => "",
  //       "__req" => "75",
  //       "__beoa" => "0",
  //       "__pc" => "PHASED:DEFAULT",
  //       "dpr" => "1",
  //       "__rev" => "1001912121",
  //       "__s" => "99999999999999",
  //       "__hsi" => "6809081207004245081-0",
  //       "__comet_req" => "0",
  //       "fb_dtsg" => $r['fb_dtsg'],
  //       "jazoest" => "22089",
  //       "__spin_r" => "1001912121",
  //       "__spin_b" => "trunk",
  //       "__spin_t" => time()
  //   ];
  //   $requests[] = new \GuzzleHttp\Psr7\Request('POST', 'https://www.facebook.com/video/unified_cvc/', $headers, http_build_query($body));
