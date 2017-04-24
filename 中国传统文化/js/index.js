function getStyle(obj,name){/*getComputedStyle 是firefox中的， currentStyle 是ie中的*/
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}
		else{
			return getComputedStyle(obj,false)[name];
		}
		 /*通过currentStyle就可以获取到通过内联或外部引用的CSS样式的值了（仅限IE） 如：document.getElementById("test").currentStyle.top要兼容FF，就得需要getComputedStyle 出马了*/
	};
function startMove(obj,attr,iTarget){//再添一个参数attr,任意值框架

			clearInterval(obj.timer);

			obj.timer=setInterval(function(){

				/*var current=parseInt(getStyle(obj,attr));*/
				/*解决办法*/
				var current=0;
				if(attr=='opacity'){
					/*bug:计算机中并不能真正的存小数，一般是一个近似值，比如alert(0.07*100),跳出来的是7.00000001，所以要用到Math.round四舍五入*/
					/*current=parseFloat(getStyle(obj,attr))*100;*/
					//解决办法
					current=Math.round(parseFloat(getStyle(obj,attr))*100);
				}
				else{
					current=parseInt(getStyle(obj,attr));
				}

				var speed=(iTarget-current)/10;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);

				if(current==iTarget){
					clearInterval(obj.timer);
				}else{
					/*obj.style[attr]=current+speed+'px';*/
					/*解决办法*/
					if(attr=='opacity'){
						obj.style.filter='alpha(opacity:'+(current+speed)+')';
						obj.style.opacity=(current+speed)/100;
					}
					else
					obj.style[attr]=current+speed+'px';
				}
			},30);
		};