import React,{Component} from 'react'
export default class Questions extends Component {
	constructor(props) {
	    super(props)
	    this.initPagination = this.initPagination.bind(this)
	    this.pageselectCallback = this.pageselectCallback.bind(this)
	 }
	componentDidMount(){
		this.initPagination()	
	}
	initPagination(){
		let self = this
		 this.pageInit = true
		$("#pagination").pagination(self.props.tl.total, {
			items_per_page: 10,
			num_edge_entries: 1,
			current_page:self.props.tl.current,
			prev_text:"<前一页",
			next_text:"后一页>",
			num_display_entries: 4, 
			callback: self.pageselectCallback
		});
	}
	pageselectCallback(page_index,jq){
		if(!this.pageInit){
			this.props.changePage(page_index)		
		}
		this.pageInit = false;
	}
	render(){
		const {total,list,text} = this.props.tl
		return (
			<div className="result-layout">
				{!text && 
					<p>常见问题</p>
				}
				{text &&
					<p>已搜索到与<span>"{text}"</span>相关的{total}条问题 <a className="btn btn-primary" href="#">更多</a></p>
				}
				
				<div className="row item-list">	
					<ul>
						{list.map(function(value, index) {
							return <li className="col-xs-3" key={index}>
										<div className="li-ui">
											<div className="border-left">
												<a href={value.url}>
													<div className="content-ui">
														{value.title}
													</div>
													<div className="foot-ui row">
														<div className="col-xs-7 date">{value.creatime}</div>
													</div>
												</a>
											</div>
										</div>
									</li>								
						})}
					</ul>
				</div>
				<div id="pagination" className="pagination"></div>
			</div>
		)
	}
}