import React,{Component} from 'react'
export default class Search extends Component {
	constructor(props) {
	    super(props)
	    this.handleChange = this.handleChange.bind(this)
	 }
	handleChange(){
		this.props.handleChange(this.refs.searchInput.value.trim())
	}
	render(){
		const {hotList} = this.props
		return (
			<div className="row wrapper">
				<div className="search-layout">
					<form className="form-inline">
						<div className="input-group">
						  <input type="text" className="form-control" placeholder="请出入您要搜索的关键词" ref="searchInput" />
						   <a href="javascript:void(0)" onClick={this.handleChange} className="btn btn-primary input-group-addon" role="button"><i className="glyphicon glyphicon-search"></i>&nbsp;搜索</a>
						</div>						  
					</form>
					{hotList.length > 0 &&
						<div className="text-line-ui">
							<p>热门关键词:
							{hotList.map(function(value, index) {
								return <a key={index} href={value.url}><span>{value.title}</span></a>;
							})}
							</p>								
						</div>
					}				
				</div>
			</div>
		)
	}
}