function loginAction(){
			//清空提示信息
			$("#name_span").html("");
			$("#pwd_span").html("");
		
			//获取请求参数
			var name = $("#name").val().trim();
			var password = $("#pwd").val().trim();
			var ok = true;//所有参数均有效
			//格式的效验
			if(name == ""){
				$("#name_span").html("用户名不能为空!");
				ok = false;
				
			}
			if(password == ""){
				$("#pwd_span").html("密码不能为空!");
				ok = false;
			}
			
			//发送请求
			if(ok){
				$.ajax({
					url:path+"/manager/login.ddb",
					type:"post",
					data:{"name":name,"password":password},
					dataType:"json",
					success:function(result){
						console.log(result);
						if(result.state==0){//成功
							//将用户信息存到Cookie中
							var user = result.data;
							//跳转到主页面
							window.location.href="index.html";
						}else if(result.state==2){
							$("#name_span").html(result.message);
						}else if(result.state==3){
							$("#pwd_span").html(result.message);	
						}
					},
					error:function(result){
						alert("登录失败！");
						
					}
				});
			};
		};
		
	
		