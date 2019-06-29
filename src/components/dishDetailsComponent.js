import React, {Component} from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
    }

    render() {
        const renderDish = ({ dish }) => {
        if (dish != null)
            return(
                <div className = 'col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        else
            return(<div>Hello</div>);
        }

        return(
            <div className = 'row'>
                { renderDish }
            </div>
        );
    }
}

export default DishDetail;