import React from "react"
import { Link } from "react-router"


class ArticleList extends React.Component{
    render(){
        let data = this.props.data;
        let list = '';
        if( data.length == 0){
            list = <div className="empty-list">
                        <img src="./images/empty.jpg"/>
                   </div>
        }else{
            list =  data.map((item, index)=>{
                let { id, last_modify_time, summary, tags, title, cover } = item;
                let d = new Date( last_modify_time );
                let mouth = d.getMonth();
                let day = d.getDate();
                mouth < 10 ? mouth = '0'+ mouth: "";
                day < 10 ? day = "0"+day : "";
                let liNodes = '';
                if(  typeof tags == 'string'){
                    liNodes =  tags.split(',').map((tag, index) => {
                        return ( <li key ={index }> { tag } </li> )
                    });
                }
                return (<li key={ index } className="article-item">
                            <div className="date-wrap">
                                    <span className="date">
                                        { mouth+"-"+day }
                                    </span>
                                <Link to={"/article/"+id } className="more">more</Link>
                            </div>
                            <div className="main">
                                <Link to={"/article/"+id } className="title">{ title }</Link>
                                <p className="summary"> { summary } </p>
                                <ul className="article-tags">
                                    { liNodes }
                                </ul>
                            </div>
                            <div className="thumb">
                                <img src={cover} alt="" />
                            </div>
                        </li> );
            });
        }
        return (<div className="article-list-container">
            { list }
        </div>);
    }
}


module.exports = ArticleList;
