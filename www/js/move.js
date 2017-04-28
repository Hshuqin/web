function getStyle(obj,name){/*getComputedStyle 是firefox中的， currentStyle 是ie中的*/
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}
		else{
			return getComputedStyle(obj,false)[name];
		}
		 /*通过currentStyle就可以获取到通过内联或外部引用的CSS样式的值了（仅限IE） 如：document.getElementById("test").currentStyle.top要兼容FF，就得需要getComputedStyle 出马了*/
	};
function startMove(obj,attr,iTarget, fnEnd){//fnEnd函数

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
//在到达目的地后，调用函数fnEnd;
					if(fnEnd)fnEnd();
//在到达目的地后，调用函数fnEnd;
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

		//说明：move.js是建立在index.js上，在startMove上加了一个参数

function getByClass(oParent,sClass){
			var aEle=oParent.getElementsByTagName('*');
			var aResult=[];

			for(var i=0;i<aEle.length;i++){
				if(aEle[i].className==sClass){
					aResult.push(aEle[i]);
				};
			};
			return aResult;
		};
		window.onload=function(){
			var oDiv=document.getElementById('banner');
			var oBtnPrev=getByClass(oDiv,'prev')[0];
			var oBtnNext=getByClass(oDiv,'next')[0];
			var oMarkLeft=getByClass(oDiv,'mark_left')[0];
			var oMarkRight=getByClass(oDiv,'mark_right')[0];
		//左右按钮
			oBtnPrev.onmouseover=oMarkLeft.onmouseover=function(){
				startMove(oBtnPrev,'opacity',100);
			};
			oBtnPrev.onmouseout=oMarkLeft.onmouseout=function(){
				startMove(oBtnPrev,'opacity',0);
			};
			oBtnNext.onmouseover=oMarkRight.onmouseover=function(){
				startMove(oBtnNext,'opacity',100);
			};
			oBtnNext.onmouseout=oMarkRight.onmouseout=function(){
				startMove(oBtnNext,'opacity',0);
			};
		//点小图，大图切换
			var oDivSmall=getByClass(oDiv,'b_right')[0];
			var aLiSmall=oDivSmall.getElementsByTagName('li');
			var oUlSmall=oDivSmall.getElementsByTagName('ul')[0];
			var oUlBig=getByClass(oDiv,'b_left')[0];
			var aLiBig=oUlBig.getElementsByTagName('li');
			var nowZIndex=2;//设置当前层级
			var now=0;//当前页面；
			for(var i=0;i<aLiSmall.length;i++){

				aLiSmall[i].index=i;

				aLiSmall[i].onclick=function(){
					if(this.index==now) return;
					now=this.index;
					tab();//封装
				};
				aLiSmall[i].onmouseover=function(){
					startMove(this,'opacity',100);
				};
				aLiSmall[i].onmouseout=function(){
					if(this.index!=now){
						startMove(this,'opacity',60);
					}
				}
			};
		//左右按钮点击
			oBtnPrev.onclick=function(){
				now--;
				if(now==-1){
					now=aLiSmall.length-1;
				}
				tab();

			};
			oBtnNext.onclick=function(){
				now++;
				if(now==aLiSmall.length){
					now=0;
				}
				tab();
			};
			//定时器
			var timer=setInterval(oBtnNext.onclick,5000);
			oDiv.onmouseover=function(){
				clearInterval(timer);
			};
			oDiv.onmouseout=function(){
				timer=setInterval(oBtnNext.onclick,5000);
			};


			var oDivHider=document.getElementById('hider');
			var oDivfx=document.getElementById('fenxiao');
			oDivHider.onmouseover=function(){
				startMove(oDivfx,'left',30,function(){
					startMove(oDivfx,'height',200);
				});
			};
			oDivHider.onmouseout=function(){
				startMove(oDivfx,'height',30,function(){
					startMove(oDivfx,'left',-80);
				});
			};


		function tab(){
			aLiBig[now].style.zIndex=nowZIndex++;

			for(var i=0;i<aLiSmall.length;i++){
				startMove(aLiSmall[i],'opacity',60);
			};
				startMove(aLiSmall[now],'opacity',100);
					
				var num=Math.random()*3+1;
					num=parseInt(num,10);
					if(num==1){
						aLiBig[now].style.height=0;
						startMove(aLiBig[now],'height',400);
					}
					else if(num==2){
						aLiBig[now].style.width=0;
						startMove(aLiBig[now],'width',900);
					}
					else{
						aLiBig[now].style.opacity=0;
						startMove(aLiBig[now],'opacity',100);
					}

				if(now==0){
					startMove(oUlSmall,'top',0);
				}
				else{
					startMove(oUlSmall,'top',-(now-1)*200);
				}
			};
		};	
