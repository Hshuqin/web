$(function(){
	//header start
	(function(){
			var $shop = $("#h_main .h_m_right .h_m_r_shop");
			var $s_hide =$("#h_main .h_m_right .h_m_r_shop .h_m_r_s_hide");
			$shop.hover(function(){
				$s_hide.stop(true).slideDown();/**/
			},function(){
				$s_hide.stop(true).slideUp();
			});//onmouseover onmouseout
		})();
	//header end

	//search input 获取焦点 start
			var $search = $("#nav .n_search");
			var $input = $("#nav .n_search .n_s_input input");
			var $s_i_hide = $("#nav .n_search .n_s_input .n_s_hide");
			$input.focus(function(){
				$search.addClass("focus");
				$s_i_hide.show();
			}).blur(function(){
				$search.removeClass("focus");
				$s_i_hide.hide();
			});

			//鼠标滑动到n_m_one上 将n_w_product展示
			var $one = $("#nav .n_main .n_m_one");
			var $product =$("#n_w_product");
			var $p_ul = $("#n_w_product .n_w_p_main ul");
			$one.hover(function(){
				var _index = $(this).index();
				$product.stop(true).slideDown(300);
				$p_ul.eq(_index).show().siblings().hide();
			},function(){
				$product.stop(true).slideUp(300);
			});
			$product.hover(function(){
				$(this).stop(true).slideDown(300);
			},function(){
				$(this).stop(true).slideUp(300);
			});

			//banner 的轮播切换
			var $tabli = $("#b_main .b_m_tab li");
			var $picli = $("#b_main .b_m_pic li");
			var $btn = $("#b_main .b_m_btn div");
			var _index = 0;
			var len = $tabli.length;//5
			var $timer = null;
			var $b_main = $("#b_main");
			$tabli.hover(function(){ 
				$(this).addClass("hover");
			},function(){
				$(this).removeClass("hover");
			}).click(function(){
				_index = $(this).index();//索引,一个盒子的索引从0开始
				$(this).addClass("click").siblings().removeClass("click");
				//等价于$tabli.eq(_index).addClass("click").siblings().removeClass("click");
				$picli.eq(_index).fadeIn().siblings().fadeOut();
				//重复代码，要优化
			});
			//点击左右按钮 进行轮播
			$btn.click(function(){
				var index = $(this).index();
				if(index==1){//若点击是右按钮
					_index++;
					if(_index > len-1){
						_index=0;
					}
					$tabli.eq(_index).addClass("click").siblings().removeClass("click");
					$picli.eq(_index).fadeIn().siblings().fadeOut();
					//重复代码，要优化
				}else{
					_index--;
					if(_index < 0){
						_index=len-1;
					}
					$tabli.eq(_index).addClass("click").siblings().removeClass("click");
					$picli.eq(_index).fadeIn().siblings().fadeOut();
					//重复代码，要优化
				}
			});
			function auto(){//封装
				timer =setInterval(function(){//定时器
					_index++;
					if(_index > len-1){
						_index=0;
					}
					$tabli.eq(_index).addClass("click").siblings().removeClass("click");
					$picli.eq(_index).fadeIn().siblings().fadeOut();
						//重复代码，要优化
				},1000)
			}
			auto();
			//鼠标移入b_main 停止定时，离开继续
			$b_main.hover(function(){
				clearInterval(timer);
			},function(){
				auto();
			});
			//执行定时器


			//左侧nav的二级导航
			(function(){
				var $nav_li = $("#b_nav>ul>li");
				$nav_li.hover(function(){
					//将对应的hide部分显示
					$(this).find(".b_n_hide").show();
				},function(){
					$(this).find(".b_n_hide").hide();
				});
			})();
			

		//starGoods  start
		(function(){
			var $data = miData.starGoods;
			var len = $data.imgSrc.length;
			var html = "";
			var $ul = $("#starGoods .s_goods ul");
			var $btn = $("#starGoods .s_title .s_t_btn div");
			var flag = true;
			var $left = $("#starGoods .s_title .s_t_btn .s_t_b_left");
			var $right = $("#starGoods .s_title .s_t_btn .s_t_b_right");
			var timer = null;
			for (var i=0;i<len;i++)
			{
				html += "<li>"+
						"<a href='#' class='s_g_img'><img src='"+$data.imgSrc[i]+"' /></a>"+
						"<a href='#' class='s_g_title'>"+$data.title[i]+"</a>"+
						"<p class='s_g_detail'>"+$data.datail[i]+"</p>"+
						"<p class='s_g_price'>"+$data.price[i]+"</p>"+
					"</li>";
			}
			$ul.append(html);
			var $li = $("#starGoods .s_goods li");
			var margin = $li.eq(5).position().left;//取第六个li 的位置 1240px；以s_goods为父亲 
			$btn.click(function(){
				var index = $(this).index();
				if(index){//如果点击右边
					if(flag){
						flag = !flag;
						$ul.stop(true).animate({
							marginLeft:-margin
						},500);
						toggle();
						clearInterval(timer);
						auto();
					}
				}else{
					if(!flag){
						flag=!flag;
						$ul.stop(true).animate({
							marginLeft:0
						},500);
						toggle();
						clearInterval(timer);
						auto();
					}
				}
			});
			//实现click样式的轮播切换
			function toggle(){
				$left.toggleClass("click");
				$right.toggleClass("click");
			};
			//自动轮播
			function auto(){
				timer = setInterval(function(){
					if(flag){
						flag = !flag;
						$ul.stop(true).animate({
							marginLeft:-margin
						},500);
						toggle();
					}else{
					if(!flag){
						flag=!flag;
						$ul.stop(true).animate({
							marginLeft:0
						},500);
						toggle();
					}
				}
				},6000);
			};
			auto();
		})();
           //starGoods  end

            //match start
		(function(){
			var $data = miData.match;
			var len = $data.length;
			var $right =$("#match .m_con .m_c_right");
			var $t_li = $("#match .m_title ul li");
			for(var i=0;i<len;i++){
				var $ul = $("<ul></ul>");//document.creatElement(); jquery库中
				$right.append($ul);
			}
			var $ul = $("#match .m_con .m_c_right ul");//在前三行执行后，才可以拿到
			//让第一个ul展现出来
			$ul.eq(0).css("display","block");
			$ul.each(function(index){
				//alert(len);
				for(var i=0;i<9;i++){
					if(i<7){
						$li = $("<li class='m_c_bottom'>"+
							"<a  class ='m_c_r_img'><img src = 'images/match/"+$data.attr[index]+"/"+(i+1)+".jpg' /></a>"+
							"<a class ='m_c_r_title'>"+$data[$data.attr[index]].title[i]+"</a>"+
							"<p class ='m_c_r_price'>"+$data[$data.attr[index]].price[i]+"</p>"+
							"<p class ='m_c_r_comment'>"+$data[$data.attr[index]].comment[i]+"</p>"+"</li>");
						if(i==5 && index==0){
							var $div = $("<div class='m_c_hide'>"+
								"<span class ='review'>小米的产品值得信赖，用了一般时间，无论是听歌，打电话...</span>"+
								"<span class ='author'>来自 气功流 的评价</span>"+
							"</div>");
							$li.append($div);
						}
					}
					else if (i==7){
						$li = $("<li class='m_c_eight'>"+
							"<a href='#' class='m_c_e_title'>"+$data[$data.attr[index]].title[i]+"</a>"+
							"<a href='#' class='m_c_e_img'><img src='images/match/"+$data.attr[index]+"/"+(i+1)+".jpg' width='80' height='80' /></a>"+
							"<p class='m_c_e_price'>"+$data[$data.attr[index]].price[i]+"</p>"+
						"</li>");
					}
					else{
						 $li = $("<li class='m_c_nine'>"+
							"<a href='' class ='m_c_n_more'>浏览更多</a>"+
							"<a href='' class ='m_c_n_ear'>耳机音箱</a>"+
							"<a href='' class ='iconfont'>&#xe617;</a>"+
						"</li>");
					}
					$(this).append($li);
				}
			});
			//当鼠标滑动到li
			var $li = $("#match .m_con .m_c_right ul li");
			$li.hover(function(){
				$(this).find(".m_c_hide").stop(true).animate({
					bottom:0,
					opacity:1     //透明度
				},300);
			},function(){
				$(this).find(".m_c_hide").stop(true).animate({
					bottom:-74,  //-"74px"
					opacity:0
				},300);
			});
			//鼠标移入title中的li
			$t_li.mouseover(function(){
				var _index = $(this).index();
				$(this).addClass("hover").siblings().removeClass("hover");
				$ul.eq(_index).show().siblings().hide();
			});
		})();
		//match end
		//peijian start
		(function(){
			var $data = miData.peijian;
			var len = $data.length;
			var $right =$("#peijian .p_con .p_c_right");
			var $t_li = $("#peijian .p_title ul li");
			for(var i=0;i<len;i++){
				var $ul = $("<ul></ul>");//document.creatElement(); jquery库中
				$right.append($ul);
			}
			var $ul = $("#peijian .p_con .p_c_right ul");//在前三行执行后，才可以拿到
			//让第一个ul展现出来
			$ul.eq(0).css("display","block");
			$ul.each(function(index){
				//alert(len);
				for(var i=0;i<9;i++){
					if(i<7){
						$li = $("<li class='p_c_bottom'>"+
							"<a  class ='p_c_r_img'><img src = 'images/peijian/"+$data.attr[index]+"/"+(i+1)+".jpg' /></a>"+
							"<a class ='p_c_r_title'>"+$data[$data.attr[index]].title[i]+"</a>"+
							"<p class ='p_c_r_price'>"+$data[$data.attr[index]].price[i]+"</p>"+
							"<p class ='p_c_r_comment'>"+$data[$data.attr[index]].comment[i]+"</p>"+"</li>");
						if(i==5 && index==0){
							var $div = $("<div class='p_c_hide'>"+
								"<span class ='review'>小米的产品值得信赖，用了一般时间，无论是听歌，打电话...</span>"+
								"<span class ='author'>来自 气功流 的评价</span>"+
							"</div>");
							$li.append($div);
						}
					}
					else if (i==7){
						$li = $("<li class='p_c_eight'>"+
							"<a href='#' class='p_c_e_title'>"+$data[$data.attr[index]].title[i]+"</a>"+
							"<a href='#' class='p_c_e_img'><img src='images/peijian/"+$data.attr[index]+"/"+(i+1)+".jpg' width='80' height='80' /></a>"+
							"<p class='p_c_e_price'>"+$data[$data.attr[index]].price[i]+"</p>"+
						"</li>");
					}
					else{
						 $li = $("<li class='p_c_nine'>"+
							"<a href='' class ='p_c_n_more'>浏览更多</a>"+
							"<a href='' class ='p_c_n_ear'>耳机音箱</a>"+
							"<a href='' class ='iconfont'>&#xe617;</a>"+
						"</li>");
					}
					$(this).append($li);
				}
			});
			//当鼠标滑动到li
			var $li = $("#peijian .p_con .p_c_right ul li");
			$li.hover(function(){
				$(this).find(".p_c_hide").stop(true).animate({
					bottom:0,
					opacity:1     //透明度
				},300);
			},function(){
				$(this).find(".p_c_hide").stop(true).animate({
					bottom:-74,  //-"74px"
					opacity:0
				},300);
			});
			//鼠标移入title中的li
			$t_li.mouseover(function(){
				var _index = $(this).index();
				$(this).addClass("hover").siblings().removeClass("hover");
				$ul.eq(_index).show().siblings().hide();
			});
		})();
		//peijian end

		//zhoubian start
		(function(){
			var $data = miData.zhoubian;
			var len = $data.length;
			var $right =$("#zhoubian .z_con .z_c_right");
			var $t_li = $("#zhoubian .z_title ul li");
			for(var i=0;i<len;i++){
				var $ul = $("<ul></ul>");//document.creatElement(); jquery库中
				$right.append($ul);
			}
			var $ul = $("#zhoubian .z_con .z_c_right ul");//在前三行执行后，才可以拿到
			//让第一个ul展现出来
			$ul.eq(0).css("display","block");
			$ul.each(function(index){
				//alert(len);
				for(var i=0;i<9;i++){
					if(i<7){
						$li = $("<li class='z_c_bottom'>"+
							"<a  class ='z_c_r_img'><img src = 'images/zhoubian/"+$data.attr[index]+"/"+(i+1)+".jpg' /></a>"+
							"<a class ='z_c_r_title'>"+$data[$data.attr[index]].title[i]+"</a>"+
							"<p class ='z_c_r_price'>"+$data[$data.attr[index]].price[i]+"</p>"+
							"<p class ='z_c_r_comment'>"+$data[$data.attr[index]].comment[i]+"</p>"+"</li>");
						if(i==5 && index==0){
							var $div = $("<div class='z_c_hide'>"+
								"<span class ='review'>小米的产品值得信赖，用了一般时间，无论是听歌，打电话...</span>"+
								"<span class ='author'>来自 气功流 的评价</span>"+
							"</div>");
							$li.append($div);
						}
					}
					else if (i==7){
						$li = $("<li class='z_c_eight'>"+
							"<a href='#' class='z_c_e_title'>"+$data[$data.attr[index]].title[i]+"</a>"+
							"<a href='#' class='z_c_e_img'><img src='images/zhoubian/"+$data.attr[index]+"/"+(i+1)+".jpg' width='80' height='80' /></a>"+
							"<p class='z_c_e_price'>"+$data[$data.attr[index]].price[i]+"</p>"+
						"</li>");
					}
					else{
						 $li = $("<li class='z_c_nine'>"+
							"<a href='' class ='z_c_n_more'>浏览更多</a>"+
							"<a href='' class ='z_c_n_ear'>耳机音箱</a>"+
							"<a href='' class ='iconfont'>&#xe617;</a>"+
						"</li>");
					}
					$(this).append($li);
				}
			});
			//当鼠标滑动到li 
			var $li = $("#zhoubian .z_con .z_c_right ul li");
			$li.hover(function(){
				$(this).find(".z_c_hide").stop(true).animate({
					bottom:0,
					opacity:1     //透明度
				},300);
			},function(){
				$(this).find(".z_c_hide").stop(true).animate({
					bottom:-74,  //-"74px"
					opacity:0
				},300);
			});
			//鼠标移入title中的li
			$t_li.mouseover(function(){
				var _index = $(this).index();
				$(this).addClass("hover").siblings().removeClass("hover");
				$ul.eq(_index).show().siblings().hide();
			});
		})();
		//zhoubian end

		//recommend  start
		(function(){
			var $data = miData.recommend;
			var len = $data.imgSrc.length;
			var html = "";
			var $ul = $("#recommend .r_goods ul");
			var $btn = $("#recommend .r_title .r_t_btn div");
			var flag = true;
			var $left = $("#recommend .r_title .r_t_btn .r_t_b_left");
			var $right = $("#recommend .r_title .r_t_btn .r_t_b_right");
			var timer = null;
			for (var i=0;i<len;i++)
			{
				html += "<li>"+
						"<a href='#' class='r_g_img'><img src='"+$data.imgSrc[i]+"' /></a>"+
						"<a href='#' class='r_g_title'>"+$data.title[i]+"</a>"+
						"<p class='r_g_detail'>"+$data.datail[i]+"</p>"+
						"<p class='r_g_price'>"+$data.price[i]+"</p>"+
					"</li>";
			}
			$ul.append(html);
			var $li = $("#recommend .r_goods li");
			var margin = $li.eq(5).position().left;//取第六个li 的位置 1240px；以s_goods为父亲 
			$btn.click(function(){
				var index = $(this).index();
				if(index){//如果点击右边
					if(flag){
						flag = !flag;
						$ul.stop(true).animate({
							marginLeft:-margin
						},500);
						toggle();
						clearInterval(timer);
						auto();
					}
				}else{
					if(!flag){
						flag=!flag;
						$ul.stop(true).animate({
							marginLeft:0
						},500);
						toggle();
						clearInterval(timer);
						auto();
					}
				}
			});
			//实现click样式的轮播切换
			function toggle(){
				$left.toggleClass("click");
				$right.toggleClass("click");
			};
			//自动轮播
			function auto(){
				timer = setInterval(function(){
					if(flag){
						flag = !flag;
						$ul.stop(true).animate({
							marginLeft:-margin
						},500);
						toggle();
					}else{
					if(!flag){
						flag=!flag;
						$ul.stop(true).animate({
							marginLeft:0
						},500);
						toggle();
					}
				}
				},6000);
			};
			auto();
		})();
           //starGoods  end
})