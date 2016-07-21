/**
 * @description 显示消息
 * @param {String} who 消息来源,可选参数: {params} 'sender','receiver'
 * @param {Object} type 消息类型,可选参数: {params} 'text','url','img'
 * @param {JSON} data 消息数据,可选参数: {params} {{el:'消息容器选择器'},{senderAvatar:'发送者头像地址'},{receiverAvatar:'接收者头像地址'},{msg:'消息内容'}}
 * ('text'和'url'类型的msg是文字，img类型的msg是img地址)
 */
var appendMsg = function(who,type,data) {
	// 生成节点
	var domCreat = function(node){
		return document.createElement(node)
	};
	
	// 基本节点
	var msgItem = domCreat("div"),
		avatarBox = domCreat("div"),
		contentBox = domCreat("div"),
		avatar = domCreat("img"),
		triangle = domCreat("div");
	
	// 头像节点
	avatarBox.className="chat-avatar";
	avatar.src = (who=="sender")?data.senderAvatar:data.receiverAvatar;
	avatarBox.appendChild(avatar);
	
	// 内容节点
	contentBox.className="chat-content";
	triangle.className="chat-triangle";
	contentBox.appendChild(triangle);
	
	// 消息类型
	switch (type){
		case "text":
			var	msgTextNode = domCreat("span");
			msgTextNode.innerHTML = data.msg;
			contentBox.appendChild(msgTextNode);
			break;
		case "url":
			var msgUrlNode = domCreat("a");
			var textnode=document.createTextNode(data.msg);
			if(data.indexOf('http://') < 0){
				data.msg = "http://" + data.msg;
			}
			msgUrlNode.setAttribute("href",data.msg); 
			msgUrlNode.appendChild(textnode);
			contentBox.appendChild(msgUrlNode);			
			break;
		case "img":
			var msgImgNode = domCreat("img");
			msgImgNode.src = data.msg;
			contentBox.appendChild(msgImgNode);
			break;
		default:
			break;
	}
	
	// 节点连接
	msgItem.className="chat-"+who;
	msgItem.appendChild(avatarBox);
	msgItem.appendChild(contentBox);
	document.querySelector(data.el).appendChild(msgItem);
}

/**
 * @description 展示消息精简版
 * @param {String} who 消息来源,可选参数: {params} 'sender','receiver'
 * @param {Object} type 消息类型,可选参数: {params} 'text','url','img'
 * @param {Object} msg ('text'和'url'类型的msg是文字，img类型的msg是img地址)
 */
var msgShow = function(who,type,msg){
	appendMsg(who,type,{
		el: msgInit.el,
		senderAvatar: msgInit.senderAvatar,
		receiverAvatar: msgInit.receiverAvatar,
		msg: msg
	});
}