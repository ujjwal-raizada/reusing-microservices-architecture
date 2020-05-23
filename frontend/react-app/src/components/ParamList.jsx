import React, { Component, Fragment } from 'react'
import  { Button, ButtonGroup } from 'react-bootstrap'

class ParamList extends Component {
    
    handleClick = event => {
        event.preventDefault()      
        this.props.onClick(event.target.name)
    }

    render() {
        var { color, selected } = this.props
        var params = this.props.paramList.map((item, index) => (
            <Button 
                variant = {'outline-' + color}
                size="md" key={index} 
                name={item} 
                onClick={this.handleClick}
            >
                {item}
            </Button>
        ))

        var list = []
        for (let item in selected) {
            if(selected[item]){
                list.push(<h6 key={item}>{item}</h6>)
            }
        }

        return (
            <Fragment>
                <ButtonGroup vertical>
                    {params}
                </ButtonGroup>
                <hr/>
                <h5> Selection </h5>
                {list.length ? list : "None Selected"}
            </Fragment>
        )            
    }
}

export default ParamList
