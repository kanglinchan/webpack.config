
import React, { Component } from "react"
import { Link } from "react-router"

class Category extends Component{

    constructor( props ){
        super(props);
        this.state = {
            closeId:[]
        };
    }

    componentDidMount(){
        let { fetchCategory, category } = this.props;
        fetchCategory();
    }


    in_array(data, val){
        for( let i = 0, len = data.length; i<len; i++ ){
            if(val == data[i]) {
                return true;
            }
        }
        return false;
    }


    switch(item){
        if( this.in_array( this.state.closeId, item.id ) ){
            let id = this.state.closeId.filter( (i)=>{
                if( i != item.id  ){
                    return  true;
                }else{
                    return  false;
                }
            } );
            this.setState( { closeId: [].concat(id) } );
        }else{
            this.setState( { closeId: this.state.closeId.concat( item.id ) } );
        }
    }


    render(){
        let { category } = this.props;
        let childNode = ( item )=>{
            let active = "children-box";
            if( this.in_array(this.state.closeId, item.id)  ){
                active = 'children-box active';
            }
            return( <ul className ={active}>
                        {item.child.map( ( child, index  ) =>{
                            return(<li key={index}>
                                <Link to={"/categoryList/" + child.id } >
                                    {child.name} {child.id}
                                </Link>
                            </li>)
                        } )}
                    </ul> );
        };

        let list = category.data.map( (item)=>{
            return(
                <li key={'id_'+item.id} >
                    <span onClick={this.switch.bind(this,item )} >{ item.name }</span>
                    { item.child && childNode( item )  }
                </li>
            );
        } );

        return( <div className="block">
                    <h4 className="title">CATEGORY</h4>
                    <ul className="parent-box">
                        { category.loading ? "正在加载": list }
                    </ul>
                </div> )
    }
}


module.exports  = Category;











