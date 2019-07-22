import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, 
    BreadcrumbItem, Modal, Button, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
    }

    render() {
        return(
            <>
                <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-pencil'> Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='row'>
                                <Col md={11}>
                                    <Label htmlFor='Rating'>Rating</Label>
                                    <Control.select model='.rating' id='rating' name="rating" className='form-control' >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='row mt-2'>
                                <Col md={11}>                            
                                    <Label htmlFor='name'>Your name</Label>
                                    <Control.text model='.name' id='name' name='name' className='form-control'
                                    validators={{
                                        minLength: minLength(2), maxLength: maxLength(15),
                                    }}
                                    placeholder='Your Name'/>
                                    <Errors className='text-danger' model='.name' show='touched'
                                    messages= {{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 10 characters or less'
                                    }} />
                                </Col>
                            </Row>
                            <Row className='row mt-2'>
                                <Col md={11}>                            
                                    <Label htmlFor='comment'>Comment</Label>
                                    <Control.textarea model='.comment' id='comment' name='comment' className='form-control' rows='6'/>
                                </Col>
                            </Row>
                            <Row className='row mt-2'>
                                <Col md={11}>
                                    <Button type='submit' color='primary'>Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

function RenderComments({comments, postComment, dishId}) {
    if (comments != null)
        return (
            <div className = 'col-12 col-md-5 m-1'>
                <h4>Comments</h4>
                <ul className ='list-unstyled'>
                    <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                    <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author}, 
                                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                                </Fade>
                            )
                        })}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
}

function RenderDish({dish}) {
    return(
        <div className = 'col-12 col-md-5 m-1'>
            <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(50%)' }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errmess) {
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{props.errmess}</h4>
                </div>
            </div>
        )
    }
    else if (props.dish != null)
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments} postComment={props.postComment}
                dishId={props.dish.id} />
            </div>
            </div>
        );
    else
        return( null);
}

export default DishDetail;