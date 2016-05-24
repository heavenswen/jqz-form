# jqz_form

*待修改*
<p>2014-05-18</p>

<h4>基于jQuery，zepto框架,使用正则来验证表单，包含了常用的验证，包括seleact和checkbox多选项验证，自定义提示，可添加新规则等</h4>



初始化：new $.myform(自定义data)
 * trggier:input的触发
 * reg:添加正则验证｛"cid":"class","reg":"正则"，"inid":"内容比对"｝
 * falsefun:当false时触发将传入一个对象。
 * truefun:当true时触发传入一个对象。
 * false or true fun会优先执行；
 * 当验证不通过默认在元素上添加class:'false';通过则取消class；
 *---this.formSub(selectd,bool)触发验证,selectd必填表单id,bool可选true为依次验证，false和空为全部验证。
 * 将返回一个bool,建议用submit()进行提交
 * --html:验证项必须添加myform;
 * input,select上加入验证用class；
 * input type='checkbox'or type='rideo'添加mycheck验证，可选属性‘data-min’添加最小值

<p><strong>input的值被js改变时无法检测到，未能找到像avalon框架的样的能力</strong></p>
<p><small>*zepto 并不完全与jquery，这里是以zepto的进行制作的，兼容了jquery</small></p>
