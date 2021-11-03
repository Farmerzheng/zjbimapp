var remoteIPPort = "";
var ModeRemoteUrl = "";
var Longitude = 0;
var Latitude = 0;
var Height = 0;
var Rot = 0;


//历史数据
var historyArr = [];//历史数据数组
//其实也是图例
var historyXAxisData = ['PM10', 'PM2.5', '湿度', '噪音', '温度', '风向', '风力', '风速'];
var thresholdArr = [150, 75, 500, 70, 500, 500, 500, 500];//阈值

function getWetherHistoryData (beginTime, endTime) {
  // var beginTime="2021-04-01 00:00:00";
  // var endTime="2021-04-01 02:00:00";
  var deviceId = $("select[name=device] option:selected").val();//'40113961'
  if (beginTime == null || endTime == null) {
    var dates = choseDate(1);//今日
    beginTime = dates.startDate;
    endTime = dates.endDate;
  }
  var url = '/app/environment/historyData';
  $.ajax({
    type: "POST",  //请求方式
    url: url,  //请求路径
    data: { deviceId: deviceId, beginTime: beginTime, endTime: endTime },      //传输到服务器的数据
    cache: false,  //是否有缓存
    async: false,  //同步和异步，false 表示同步，默认为true
    success: function (data) {
      // console.log(data);
      data = JSON.parse(data);
      historyDataEchars(data);
      if (historyArr.length > 0) {
        bindMonitorData(historyArr);
      }
    },
    error: function (xhr, textStatus) {
      alert('错误');
    }
  });
}

//环境监测--预警相关的数据处理
function bindMonitorData (historyArr) {
  var tbody = document.getElementById("targetTable").getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
  for (var i = 0; i < historyXAxisData.length && i < 10; i++) {
    var name = historyXAxisData[i];//指标
    if (name != '风向') {
      var threshold = thresholdArr[i];//阈值
      var historyData = historyArr[i];//历史数据
      var tr = document.createElement("tr");
      var tdName = document.createElement("td");
      tdName.innerHTML = name;
      tdName.className = 'target-th';
      var thresholdName = document.createElement("td");
      thresholdName.innerHTML = threshold;
      var count = document.createElement("td");
      //前端对数据进行了过滤
      count.innerHTML = historyData.filter(function (data) {
        return data > threshold;
      }).length;
      tr.appendChild(tdName);
      tr.appendChild(thresholdName);
      tr.appendChild(count);
      tbody.appendChild(tr);
    }
  }
}


//环境监测--历史数据折线图
function historyDataEchars (data) {
  var recordTime = [];
  var pm10s = [], pm25s = [], hums = [], noises = [], tems = [], wd360s = [], wps = [], wss = [];
  if (data != null && data.length > 0) {
    data.forEach(function (item) {
      recordTime.push(dateFormat(new Date(item.recordTime), 'yyyy-MM-dd HH:mm'));
      pm10s.push(item.pm10);
      pm25s.push(item.pm25);
      hums.push(item.hum);
      noises.push(item.noise);
      tems.push(item.tem);
      wd360s.push(item.wd360);
      wps.push(item.wp);
      wss.push(item.ws);
    });
  }
  historyArr = [pm10s, pm25s, hums, noises, tems, wd360s, wps, wss];
  var seriesData = [];
  for (var i = 0; i < historyXAxisData.length; i++) {
    var obj = {};
    obj.name = historyXAxisData[i];
    obj.data = historyArr[i];
    obj.type = 'line';
    seriesData.push(obj);
  }
}

//今日[1]，本周[2]，本月[3]，本季度【4】，本年[5]
function getHistoryByDate (index) {
  var dates = choseDate(index);
  var beginTime = dates.startDate;
  var endTime = dates.endDate;
  $("#targetDate").val(beginTime + ' - ' + endTime);
  getWetherHistoryData(beginTime, endTime);
}

//格式化日期
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

//日期格式化
function dateFormat (date, fmt) {
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(),        // 年
    "M+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "m+": date.getMinutes().toString(),         // 分
    "s+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    }
    ;
  }
  ;
  return fmt;
}

//获取今天日，本周，本月，本季度，本年的时间方法
function choseDate (val) {
  var params;
  // var date = new Date();
  var now = new Date(); //当前日期
  var nowDayOfWeek = now.getDay(); //今天本周的第几天
  var nowDay = now.getDate(); //当前日
  var nowMonth = now.getMonth(); //当前月
  var nowYear = now.getYear(); //当前年
  nowYear += nowYear < 2000 ? 1900 : 0; //
  var lastMonthDate = new Date(); //上月日期
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  var lastYear = lastMonthDate.getYear();
  var lastMonth = lastMonthDate.getMonth();

  //格式化日期：yyyy-MM-dd
  function formatDate (date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return myyear + "-" + mymonth + "-" + myweekday;
  }

  function getMonthDays (myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  }

  //获得本季度的开始月份
  function getQuarterStartMonth () {
    var quarterStartMonth = 0;
    if (nowMonth < 3) {
      quarterStartMonth = 0;
    }
    if (2 < nowMonth && nowMonth < 6) {
      quarterStartMonth = 3;
    }
    if (5 < nowMonth && nowMonth < 9) {
      quarterStartMonth = 6;
    }
    if (nowMonth > 8) {
      quarterStartMonth = 9;
    }
    return quarterStartMonth;
  }

  function getDay (day) {
    var today = new Date();
    var targetday_milliseconds =
      today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
  }

  function doHandleMonth (month) {
    var m = month;
    if (month.toString().length == 1) {
      m = "0" + month;
    }
    return m;
  }

  // var flag = parseInt(params);
  switch (val) {
    case 1:
      // 今日
      var startStr = formatDate(now) + " 00:00:00";
      var endStr = formatDate(now) + " 23:59:59";
      params = {
        startDate: startStr,
        endDate: endStr
      };
      break;
    case 2:
      // 本周
      // var weekStartDate = new Date(
      //   nowYear,
      //   nowMonth,
      //   nowDay - nowDayOfWeek
      // );
      // var start = formatDate(weekStartDate);
      // var weekEndDate = new Date(
      //   nowYear,
      //   nowMonth,
      //   nowDay + (6 - nowDayOfWeek)
      // );
      // var end = formatDate(weekEndDate);
      // var start = getDay(-6;
      //             // var end = getDay(0);

      //按周日为一周的最后一天计算
      var date = new Date();
      //今天是这周的第几天
      var today = date.getDay();
      //上周日距离今天的天数（负数表示）
      var stepSunDay = -today + 1;
      // 如果今天是周日
      if (today == 0) {
        stepSunDay = -7;
      }
      // 周一距离今天的天数（负数表示）
      var stepMonday = 7 - today;
      var time = date.getTime();
      var monday = new Date(time + stepSunDay * 24 * 3600 * 1000);
      var sunday = new Date(time + stepMonday * 24 * 3600 * 1000);
      //本周一的日期 （起始日期）
      start = formatDate(monday); // 日期变换
      //本周日的日期 （结束日期）
      end = formatDate(sunday); // 日期变换

      params = {
        startDate: start + " " + "00:00:00",
        endDate: end + " " + "23:59:59"
      };
      break;
    case 3:
      // 本月
      var monthStartDate = new Date(nowYear, nowMonth, 1);
      var start = formatDate(monthStartDate);
      var monthEndDate = new Date(
        nowYear,
        nowMonth,
        getMonthDays(nowMonth)
      );
      var end = formatDate(monthEndDate);
      params = {
        startDate: start + " " + "00:00:00",
        endDate: end + " " + "23:59:59"
      };
      break;
    case 4:
      // 本季度
      var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
      var start = formatDate(quarterStartDate);
      var quarterEndMonth = getQuarterStartMonth() + 2;
      var quarterStartDate = new Date(
        nowYear,
        quarterEndMonth,
        getMonthDays(quarterEndMonth)
      );
      var end = formatDate(quarterStartDate);
      params = {
        startDate: start + " " + "00:00:00",
        endDate: end + " " + "23:59:59"
      };
      break;
    case 5:
      // 本年
      var start = new Date().getFullYear() + "-01-01 00:00:00";
      var end = new Date().getFullYear() + "-12-31 23:59:59";
      params = {
        startDate: start,
        endDate: end
      };
      break;
  }
  return params;
}
