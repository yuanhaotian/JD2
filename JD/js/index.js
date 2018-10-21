/*公共函数*/
	//移动动画函数
	//参数：ele被移动的元素；dis每次移动的距离
	function move(ele,dis){
		var temp=0;
		var nowoffset = ele.offsetLeft;
		var time = setInterval(function(){
			if(dis<0){ //左移动
				temp-=5;
				if(temp<dis){
					ele.style.left = nowoffset+dis+"px";
					clearInterval(time);
					return;
				}
			}else{
				temp+=5;
				if(temp>dis){
					ele.style.left = nowoffset+dis+"px";
					clearInterval(time);
					return;
				}
			}
			ele.style.left = nowoffset+temp+"px";
		},15);
	}
	//点击小圆点移动函数
	//参数:ele被移动的元素;arrow点击触发移动的元素;lis_dis每次移动距离
	function moveCirle(ele,arrow,lis_dis){
		var indexs=0;
		for(var i=0;i<arrow.length;i++){
			arrow[i].index=i;
			arrow[i].onclick = function(){
				var ulleft = (indexs-this.index)*lis_dis;
				move(ele,ulleft);
				indexs = this.index;
			}
		} 
	}
	//点击箭头左右移动函数
	//参数：ele被移动的元素；arrow点击触发移动的元素;dis每次移动距离(Number);n用于判断能否移动
	function arr(eleM,ele,dis,n){
		var index = 0;//第i个li
		for(var i=0;i<ele.length;i++){
			ele[i].n=i;
			ele[i].addEventListener("click",function(){
				if(this.n===0 && index<n){//判断能否移动
					index++;
					move(eleM,-dis)
				}
				if(this.n===1 && index>0){
					index--;
					move(eleM,dis)
				}
			})
		}
	}
/*公共函数*/
/*header start*/
(function(){
	var oshortcut = document.getElementById("shortcut");
	var oa = oshortcut.getElementsByClassName("s_c_ul")[0].getElementsByTagName("a");
	var ospan = oshortcut.getElementsByClassName("c_i_span")[0];

	var aL = oa.length;
	var temp = 0;
	for(var ii=0 ; ii<aL ; ii++){
		oa[ii].onclick = function(){
			ospan.innerHTML = this.innerHTML;	
			for(var jj = 0; jj<aL ;jj++){
				oa[jj].className = "a2";
			}
			this.className = "a1";
		}
	}
})();
/*header end*/
/*fs start*/
(function(){
	var d2_img = document.querySelectorAll("#fs .d2_imgs a"),
		d2_arrow = document.querySelectorAll("#fs .d2_arrow i"),
		d2_circle = document.querySelectorAll("#fs .d2_circle li");
	var i = 0;
	var inum = d2_img.length;

	//onclick
	d2_arrow[1].onclick = function(){
		d2_img[i].className = "";
		d2_circle[i].className = "";

		i = (i===9 ? 0 : ++i);
		d2_img[i].className = "d2_i_on";
		d2_circle[i].className = "now";
	}
	d2_arrow[0].onclick = function(){
		d2_img[i].className = "";
		d2_circle[i].className = "";

		i = (i===0 ? 9 : --i);
		d2_img[i].className = "d2_i_on";
		d2_circle[i].className = "now";
	}

	//li
	var Lnum = d2_circle.length;
	for(var j = 0;j<Lnum;j++){
		d2_circle[j].index = j; 
		d2_circle[j].onclick = function(){
			d2_img[i].className = " ";
			d2_circle[i].className = " ";
			i = this.index;
			d2_img[i].className = "d2_i_on";	
			d2_circle[i].className = "now";
		}
	}
	//set time
	function slide(time){
		clearTimeout(circle);

		d2_img[i].className = "";
		d2_circle[i].className = "";

		i = (i===9 ? 0 : ++i);
		d2_img[i].className = "d2_i_on";
		d2_circle[i].className = "now";
		var circle = setTimeout(function(){
			slide(5000);
		},time);
	}

	slide(5000); 

	//onmouseover
	var fs_span = document.querySelectorAll("#fs .d4_nav .h .sp"),
		fs_ul =  document.querySelectorAll("#fs .d4_nav .uls ul");
	var snum = 0;

	for(var q = 0;q<fs_span.length ; q++){
		fs_span[q].index = q;

		fs_span[q].onmouseenter = function(){
			fs_ul[snum].className = " ";
			snum = this.index;
			fs_ul[snum].className = "on";
		}
	}
})();
/*fs end*/
/*sk start*/
(function(){
	var timeSpan = document.getElementById("sk").getElementsByClassName("time")[0].getElementsByTagName("span"); //时分秒
	var s_m = document.getElementById("sk").getElementsByClassName("s_m")[0];
	var goodsUl = s_m.getElementsByTagName("ul")[0];
	var arrow = s_m.getElementsByClassName("iconfont");
	var lis = goodsUl.getElementsByTagName("li");
	var dis = lis[0].offsetWidth;
	var ulss = document.getElementById("sk").getElementsByClassName("ulss")[0];
	var ulss_cir = document.getElementById("sk").getElementsByClassName("s_r_ul")[0].getElementsByTagName("li");//点击的小圆点
	var lis_dis = ulss.getElementsByClassName("ul_li")[0].offsetWidth; //一个li的宽度

	//倒计时
	var endTime = 3600;//一小时后
	var time=setInterval(function(){
		endTime--;
		timeSpan[0].innerHTML = parseInt(endTime/3600)<10 ? "0"+parseInt(endTime/3600) :parseInt(endTime/3600);//拼接成05两位数
		timeSpan[1].innerHTML = parseInt(endTime%3600/60)<10?"0"+ parseInt(endTime%3600/60) : parseInt(endTime%3600/60);
		timeSpan[2].innerHTML = parseInt(endTime%3600%60)<10 ? "0"+ parseInt(endTime%3600%60):parseInt(endTime%3600%60);

		if(endTime==0){
			clearInterval(time);
		}
	},1000)

	arr(goodsUl,arrow,dis,lis.length-4);
	moveCirle(ulss,ulss_cir,lis_dis);
	// //点击左右移动;
	// //参数：ele被移动的元素；arrow点击触发移动的元素;dis每次移动距离(Number);n用于判断能否移动
	// function arr(eleM,ele,dis,n){
	// 	var index = 0;//第i个li
	// 	for(var i=0;i<ele.length;i++){
	// 		ele[i].n=i;
	// 		ele[i].addEventListener("click",function(){
	// 			if(this.n===0 && index<lis.length-4){//判断能否移动
	// 				index++;
	// 				move(eleM,-dis)
	// 			}
	// 			if(this.n===1 && index>0){
	// 				index--;
	// 				move(eleM,dis)
	// 			}
	// 		})
	// 	}
	// }
	
	//移动函数
	// function move(ele,dis){
	// 	var temp=0;
	// 	var nowoffset = ele.offsetLeft;
	// 	var time = setInterval(function(){
	// 		if(dis<0){ //左移动
	// 			temp-=5;
	// 			if(temp<dis){
	// 				ele.style.left = nowoffset+dis+"px";
	// 				clearInterval(time);
	// 				return;
	// 			}
	// 		}else{
	// 			temp+=5;
	// 			if(temp>dis){
	// 				ele.style.left = nowoffset+dis+"px";
	// 				clearInterval(time);
	// 				return;
	// 			}
	// 		}
	// 		ele.style.left = nowoffset+temp+"px";
	// 	},15);
	// }
	// //小圆点移动
	// //参数:ele被移动的元素;arrow点击触发移动的元素
	// function moveCirle(ele,arrow){
	// 	var indexs=0;
	// 	for(var i=0;i<arrow.length;i++){
	// 		arrow[i].index=i;
	// 		arrow[i].onclick = function(){
	// 			var ulleft = (indexs-this.index)*lis_dis;
	// 			move(ele,ulleft);
	// 			indexs = this.index;
	// 		}
	// 	} 
	// }

})();
/*sk end*/