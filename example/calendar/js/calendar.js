(function(w){
	w.Calendar = function (opt) {
		// 创建日历控件基本结构	
		var cldbox = document.createElement("div");
		cldbox.className = 'calendar-container';
		cldbox.id = opt.el;
		var tpl = "";
		tpl += '<div class="calendar-title">';
		tpl += '<div class="calendar-prevyear"><<</div>';
		tpl += '<div class="calendar-prevmonth"><</div>';
		tpl += '<div class="calendar-year"></div>';
		tpl += '<div class="calendar-month"></div>';
		tpl += '<div class="calendar-nextmonth">></div>';
		tpl += '<div class="calendar-nextyear">>></div>';
		tpl += '</div>';
		tpl += '<div class="calendar-week"><div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div></div>';
		tpl += '<div class="calendar-content clearfix"></div>';
		cldbox.innerHTML=tpl;
		document.body.appendChild(cldbox);
		
		// dom 对象
		var omonth = cldbox.querySelector(".calendar-month");
		var oyear = cldbox.querySelector(".calendar-year");
		var prevyear = cldbox.querySelector(".calendar-prevyear");
		var prevmonth = cldbox.querySelector(".calendar-prevmonth");
		var nextyear = cldbox.querySelector(".calendar-nextyear");
		var nextmonth = cldbox.querySelector(".calendar-nextmonth");
		var content = cldbox.querySelector(".calendar-content");
		
		// 时间对象(默认当前)
		var dateObj;
		if(opt.value){
			dateObj = opt.value;
		}else{
			dateObj = new Date();
		}
		// 年月获取 
		var year = getYear(dateObj);
		var month = getMonth(dateObj);
		// 月年的显示
		omonth.innerHTML = month+"月";
		oyear.innerHTML = year+"年";
		// 获取本月1号的周值
		var fistWeek = getCurmonWeeknum(dateObj);
		// 本月总日数
		var monDaynum = getCurmonDaynum(dateObj);
		// 当前日期
		var nowDay = getDay(dateObj);
		//初始化显示本月信息
		setContent(content, fistWeek, monDaynum, nowDay);
		
		var isSupportMUI = (typeof mui === 'function');
		var evt = {
			type: isSupportMUI?'tap':'click'
		}
		// 显示当前时间
		content.addEventListener(evt.type,function (event) {
		    if(event.target.tagName=="DIV" && event.target.nodeType=="1" && hasclass(event.target.className,"canChoose")){
				var day = event.target.innerHTML;
				var dateObj = new Date(year, month-1, day);
				var week = getWeek(dateObj);	
				opt.fn({
					'year': year,
					'month': month,
					'day': day,
					'week': week
				});
			}; 
		})

		// 上一月
		prevmonth.addEventListener(evt.type,function(){
			var ddm = null;
			var ddy = null;
			if((dateObj.getMonth()-1)==-1){
				ddm = 11;
				ddy = dateObj.getFullYear()-1;
			}else{
				ddm = dateObj.getMonth()-1;
				ddy = dateObj.getFullYear();
			};
			dateObj.setFullYear(ddy);
		  	dateObj.setMonth(ddm);
		  	omonth.innerHTML = getMonth(dateObj)+"月";
		  	oyear.innerHTML = dateObj.getFullYear()+"年";
		  	clearContent(content);
		  	fistWeek = getCurmonWeeknum(dateObj);
		  	monDaynum = getCurmonDaynum(dateObj);
		  	nowDay = getDay(dateObj);
		  	setContent(content, fistWeek, monDaynum, nowDay);
		})
		
		// 下一月
		nextmonth.addEventListener(evt.type,function(){
			var ddm = null;
			var ddy = null;
			if((dateObj.getMonth()+1)==12){
				ddm = 0;
				ddy = dateObj.getFullYear()+1;
			}else{
				ddm = dateObj.getMonth()+1;
				ddy = dateObj.getFullYear();
			};
			dateObj.setFullYear(ddy);
			dateObj.setMonth(ddm);
			omonth.innerHTML = getMonth(dateObj)+"月";
			oyear.innerHTML = dateObj.getFullYear()+"年";
			clearContent(content);
			fistWeek = getCurmonWeeknum(dateObj);
			monDaynum = getCurmonDaynum(dateObj);
			nowDay = getDay(dateObj);
			setContent(content, fistWeek, monDaynum,nowDay);  
		})
		
		// 上一年
		prevyear.addEventListener(evt.type,function(){
			var ddy = dateObj.getFullYear()-1;
			dateObj.setFullYear(ddy);
			oyear.innerHTML = dateObj.getFullYear()+"年";
			clearContent(content);
			fistWeek = getCurmonWeeknum(dateObj);
			monDaynum = getCurmonDaynum(dateObj);
			nowDay = getDay(dateObj);
			setContent(content, fistWeek, monDaynum, nowDay);
		})
		
		// 下一年
		nextyear.addEventListener(evt.type,function(){
			var ddy = dateObj.getFullYear()+1;
			dateObj.setFullYear(ddy);
			oyear.innerHTML = dateObj.getFullYear()+"年";
			clearContent(content);
			fistWeek = getCurmonWeeknum(dateObj);
			monDaynum = getCurmonDaynum(dateObj);
			nowDay = getDay(dateObj);
			setContent(content, fistWeek, monDaynum, nowDay);  
		})
	}
	
	//有无指定类名的判断
	function hasclass(str,cla){
	  	var i=str.search(cla);
	  	if(i==-1){
	   		return false;
	  	}else{
	   		return true;
	  	};
	}
	
	// 初始化日期显示方法
	function setContent(el, fistWeek, monDaynum, nowDay){
		// 留空
		for(var i=1;i <= fistWeek;i++){
			var subContent = document.createElement("div");
			subContent.innerHTML = "";
			el.appendChild(subContent);
		}
		// 正常区域
		for(var i=1;i <= monDaynum;i++){
			var subContent = document.createElement("div");
			subContent.className="canChoose";
			if(i==nowDay){     
				subContent.classList.add("today");
			}
			subContent.innerHTML = i;
			el.appendChild(subContent);
		}
	}
	
	// 清除内容
	function clearContent(el){
		el.innerHTML="";
	}
	
	// 判断闰年
	function isLeapYear(year){ 
		if( (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)){
			return true;
		}else{
			return false;
		}
	}
	
	// 得到当前年份
	function getYear (dateObj) {
		return dateObj.getFullYear()
	}
	
	// 得到当前月份
	function getMonth (dateObj) { 
		var month=dateObj.getMonth()
		switch(month) { 
			case 0: return "1"; break; 
		  	case 1: return "2"; break; 
		  	case 2: return "3"; break; 
		  	case 3: return "4"; break; 
		  	case 4: return "5"; break; 
		  	case 5: return "6"; break; 
		  	case 6: return "7"; break; 
		  	case 7: return "8"; break; 
		  	case 8: return "9"; break; 
		  	case 9: return "10"; break; 
		  	case 10: return "11"; break; 
		  	case 11: return "12"; break;   
		  	default: 
		}
	}
	
	// 得到当前号数
	function getDay (dateObj) {
		return dateObj.getDate();
	}
	
	// 得到周期数
	function getWeek (dateObj) {
		var week;
		switch (dateObj.getDay()){
		 	case 1: week = "星期一"; break;
		 	case 2: week = "星期二"; break;
		 	case 3: week = "星期三"; break;
		 	case 4: week = "星期四"; break;
		 	case 5: week = "星期五"; break;
		 	case 6: week = "星期六"; break;
		 	default: week = "星期天";
		}
		return week;
	}
	
	// 获取本月总日数方法
	function getCurmonDaynum(dateObj){
		var year=dateObj.getFullYear();
		var month=dateObj.getMonth();
		if(isLeapYear(year)){//闰年
			switch(month) { 
				case 0: return "31"; break; 
				case 1: return "29"; break; //2月
				case 2: return "31"; break; 
			   	case 3: return "30"; break; 
			   	case 4: return "31"; break; 
			   	case 5: return "30"; break; 
			   	case 6: return "31"; break; 
			   	case 7: return "31"; break; 
			   	case 8: return "30"; break; 
			   	case 9: return "31"; break; 
			   	case 10: return "30"; break; 
			   	case 11: return "31"; break;   
				default:  
			}
		}else{//平年
	   		switch(month) { 
	   			case 0: return "31"; break; 
	   			case 1: return "28"; break; //2月 
	   			case 2: return "31"; break; 
			   	case 3: return "30"; break; 
			   	case 4: return "31"; break; 
			   	case 5: return "30"; break; 
			   	case 6: return "31"; break; 
			   	case 7: return "31"; break; 
			   	case 8: return "30"; break; 
			   	case 9: return "31"; break; 
			   	case 10: return "30"; break; 
			   	case 11: return "31"; break;   
	   			default:  
			}   
		}
	}
	
	// 获取本月1号的周值
	function getCurmonWeeknum(dateObj){
		var oneyear = new Date();
		var year = dateObj.getFullYear();
		var month = dateObj.getMonth(); //0是12月
		oneyear.setFullYear(year);
		oneyear.setMonth(month); //0是12月
		oneyear.setDate(1);
		return oneyear.getDay();  
	}
})(window);