import React,{Component} from 'react'
export default class Header extends Component {
	render(){
		return (
			<div className="header">
				<ul>
					<li><a href="index.html"><span>首页</span></a><p></p></li>
					<li className="active"><a href="#"><span>问题库</span></a><p></p></li>
				</ul>
			</div>
		)
	}
}