/*
 * qiu.form.1.0.js 15-08-12
 * */
;
(function($) {
	$.myform = function(arg) {
			var obj = this;
			/**----reg----**/
			var arrayReg = [];
			arrayReg.push({
				"cid": "empty",
				"reg": /[^\s]+/
			}); //空
			arrayReg.push({
				"cid": "bit_4",
				"reg": /^[^\s]{4,10}$/
			}); //4字节
			arrayReg.push({
				"cid": "pw",
				"reg": /^[a-zA-Z|\d]\w{5,17}$/
			});
			arrayReg.push({
				"cid": "phone",
				"reg": /^1[3|4|5|8][0-9]\d{8,8}$/
			});
			arrayReg.push({
				"cid": "chinese",
				"reg": /^[\u4E00-\u9FFF]+$/g
			});
			arrayReg.push({
				"cid": "card",
				"reg": /^62[0-9]{17,17}$/
			});
			arrayReg.push({
				"cid": "id",
				"reg": /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i
			});
			arrayReg.push({
				"cid": "email",
				"reg": /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
			});
			arrayReg.push({
				"cid": "num",
				"reg": /^[1-9][0-9]*[\.]{0,1}[0-9]{2}$/
			});
			arrayReg.push({
				"cid": "zip_code",
				"reg": /[1-9]\d{5}(?!\d)/
			});
			arrayReg.push({
				"cid": "day",
				"reg": /^\d+[-|\/]\d{1,2}[-|\/]\d{1,2}/
			});
			arrayReg.push({
				"cid": "area",
				"reg": /[^省份|地级市|市、县级市|县、区级市]/
			});
			arrayReg.push({
				"cid": "again_pw",
				"inid": '.pw'
			});
			arrayReg.push({
				"cid": "img",
				"reg": /^.*[^a][^b][^c]\.(?:png|jpg|bmp|gif|jpeg)$/
			});
			/*--var reg--*/
			if (arg.reg) {
				var ar = arg.reg;
				for (var i = 0; i < ar.length; i++) {
					arrayReg.unshift(ar[i])
				}
			}
			this.arr = arrayReg;
			/**----trigger----**/
			var trigger = arg.trigger ? arg.trigger + ' change' : 'blur change';

			/*---function----*/
			function falsefun(_obj) {
				if (arg.falsefun) arg.falsefun(_obj);
				_obj.addClass('false');
				//阻止默认行为,trigger时不触发
				return false;
			}

			function truefun(_obj) {
				if (arg.truefun) arg.truefun(_obj);
				_obj.removeClass('false');
				return true;
			}

			function inputfun(_obj, array) {
				var length = array.length;
				for (var i = 0; i < length; i++) {
					var cid = array[i].cid,
						reg = array[i].reg,
						inid = array[i].inid;
					if (_obj.hasClass(cid)) {
						var value = _obj.val();
						if (inid && value != $(inid).val()) {
							return falsefun(_obj);
						} else if (value == '' || !value.match(reg)) {
							return falsefun(_obj);
						} else {
							if (_obj.hasClass('false'))
								return truefun(_obj);
						} //value
					} //1、again.val()，2、reg,3、true
				} //for
			} //$(select).val() function;
			function checkedfun(_obj) {
				var min = _obj.attr('data-min') || '1';
				value = 0;
				_obj.find('input:checked').each(function() {
					value++;
				});
				if (value < min) {
					return falsefun(_obj);
				} else {
					return truefun(_obj);
				}
			}
			/**--trigger fun--**/
			$('.myform').on(trigger, function() {

				return inputfun($(this), arrayReg);
			}); //输入框执行
			$('.mycheck input').on('change', function() {

				return checkedfun($(this).parents('.mycheck'));
			}); //选项框执行
			/**--this fun--**/
			this.formSub = function(obj, loop) {
					var returnV = 0;
					var _obj = $(obj).find(".myform");
					for (var i = 0; i < _obj.size(); i++) {

						var bool = inputfun(_obj.eq(i), arrayReg);
						if (_obj.eq(i).hasClass('mycheck')) checkedfun(_obj.eq(i));

						if (loop && !bool) return false;
						if (bool) returnV++;
					}
					if (returnV < _obj.size()) {
						return false;
					} else {
						return true;
					}

				} //递交事件(form,循环)
			obj.tip_show = function(name, str) {
				$(name).text(str).addClass('active');
			};
			obj.tip_clean = function(name) {
				$(name).removeClass('active');
			};
			obj.tip_setShow = function(name, str, ms) {
				var ms = ms ? ms : 1000;
				obj.tip_show(name, str);
				return setTimeout(function() {
					$(name).removeClass('active');
				}, ms)
			}
		} //$	
})(window.jQuery || window.Zepto)