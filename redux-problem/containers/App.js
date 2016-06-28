import React,{Component} from 'react'
import { connect } from 'react-redux'
import { sendPostsIfNeeded,sendPostsHotKey,pageChange,searchText} from '../actions'
import Header from "../components/Header"
import Search from "../components/Search"
import Questions from "../components/Questions";
export default class App extends Component {
	constructor(props) {
	    super(props)
	    this.handleChange = this.handleChange.bind(this)
	    this.changePage = this.changePage.bind(this)
	    this.patchSampleCode = this.patchSampleCode.bind(this)
	 }
	patchSampleCode(obj){
		const { dispatch } = this.props
		dispatch(sendPostsIfNeeded(config.searchQuest,obj))
	}
	componentDidMount() {   	
		const { dispatch } = this.props
		dispatch(sendPostsHotKey(config.searchHotQuest))
    	this.patchSampleCode({keyWords:"",currPage:0})
  	}	
  	handleChange(text){
  		const { dispatch } = this.props
  		dispatch(searchText(text))
    	this.patchSampleCode({keyWords:text,currPage:0})
  	}
  	changePage(pageindex){
  		const { dispatch,init,text } = this.props
  		let textStr = ""
  		!text ? textStr = "" : textStr = text
  		dispatch(pageChange(pageindex))			
  		this.patchSampleCode({keyWords:textStr,currPage:pageindex})		
  	}
	render(){
		const { isFetching, total,list ,hotList,init,fail,text,current} = this.props
		return (
			<div className="issuesManage-ui">
				<div className="asker problem-ui">	
					<Header />
					<div className="main container-fluid">
						<div className="panel panel-default">
							<Search hotList={hotList.list} handleChange={this.handleChange}/>
							<div className="line line-dashed b-b line-lg"></div>
							{fail && list.length === 0 &&
								<h2>{fail}...</h2>
					        }
							{!fail && isFetching && list.length === 0 &&
					          <h2>正在加载...</h2>
					        }
					        
					        {!isFetching && list.length === 0 &&
					          <h2>数据为空...</h2>
					        }	
					        {list.length > 0 &&
								<Questions tl={{total:total,list:list,init,text,current}} changePage={this.changePage}/>
					        }	        
				          					        
						</div>
					</div>					
				</div>	
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { postsByQuestions,postsByHot } = state
  const {
    isFetching,
    total,
    list,
    init,
    fail,
    text,
    current
  } = postsByQuestions.questions || {
    isFetching: true,
    total:0,
    init:true,
    fail:"",
    text:"",
    current:0,
    list: []
  }
  return {
    isFetching,
    total,
    list,
    init,
    fail,
    text,
    current,
    hotList:postsByHot
  }
}

export default connect(mapStateToProps)(App)