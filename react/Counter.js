import React ,{Component, propTypes} from "react"
class Counter extends Component {
        static propTypes = {
            value: propTypes.number.isRequired,
            onIncrement: propTypes.func.isRequired,
            onDecrement: propTypes.func.idRequired
        }

        incrementIfOdd = ()=>{
            if(this.props.value %2 !==0){
                this.props.onIncrement();
            }
        }


}