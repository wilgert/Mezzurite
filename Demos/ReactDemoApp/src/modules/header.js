import React from 'react';
import { withMezzurite } from '@microsoft/mezzurite-react';
import Pie from '../pie.jpg';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: ""
        }
    }

    componentDidMount(){
        fetch('https://swapi.co/api/people/1/')
        .then(response => response.json())
        .then(result => {
            console.log("result? ", result);
            this.setState({
                data: result
            });
        })
    }

    render(){
    return (<div>
    <h2>This is a header!!</h2>
    <h3>{this.state.data.name}</h3>
    <img src={Pie} alt="Pie"/>
    </div>)
    }
}

export default withMezzurite(Header);