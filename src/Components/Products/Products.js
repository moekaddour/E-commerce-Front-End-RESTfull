import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Badge
} from "reactstrap";
import axios from "axios";
import "./Products.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMsg: "",
      products: []
    };
  }

  componentDidMount = () => {
    setInterval(() => {
      axios
        .get("/products")
        .then(response => {
          console.log(response);
          this.setState({ products: response.data.products });
        })
        .catch(error => {
          console.log(error);
        });
    }, 500);
  };

  addToCartHandler = id => {
    axios
      .post(
        "/addOrder",
        { id: id },
        {
          headers: { authorization: "Bearer " + this.props.token }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  changeMsgHandler = e => {
    this.setState({ userMsg: e.target.value });
  };
  sendMsgHandlel = id => {
    axios
      .post(
        "/user/" + id,
        {
          message: this.state.userMsg
        },
        {
          headers: { Authorization: "Bearer" + " " + this.props.token }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <Container className="productsContainer">
        {this.state.products.map((product, index) => {
          return (
            <div key={product._id}>
              <Card className="productCard">
                <CardImg
                  top
                  style={{ width: "100%", padding: "10px" }}
                  src={product.productImage}
                  alt="Card image cap"
                  className="productImg"
                />
                <CardBody>
                  <CardTitle>Category : {product.category}</CardTitle>
                  <hr />
                  <CardSubtitle>Type : {product.type}</CardSubtitle>
                  <CardSubtitle>Price : {product.price} $</CardSubtitle>
                  <CardText> Model : {product.model}</CardText>
                  <CardText> Location : {product.createdBy.country} / {product.createdBy.city}</CardText>
                  <CardText>
                    {" "}
                    Condition :
                    <h5>
                      {" "}
                      <Badge color="primary"> {product.condition}</Badge>
                    </h5>
                  </CardText>
                  <CardText> Quantity :{product.quantity}</CardText>
                  <CardText> Description : {product.description}</CardText>
                  <CardText>
                    Added : {moment(product.addedAt).format("MMM Do YYYY")}
                  </CardText>
                  <CardText> Seller : {product.createdBy.userName}</CardText>
                  <Button
                    color="info"
                    onClick={() => this.addToCartHandler(product._id)}
                  >
                    Add to Cart
                  </Button>
                  <hr />
                  {/* <FormGroup>
                 
                    <Input
                      type="textarea"
                      name="text"
                      id="exampleText"
                      placeholder="Ask Seller"
                      onChange={this.changeMsgHandler}
                      value={this.state.description}
                    />
                  </FormGroup>
                  <Button
                    color="success"
                    size="sm"
                    onClick={() =>
                      this.sendMsgHandlel(product.createdBy.userName._id)
                    }
                  >
                    Send Message to {product.createdBy.userName}
                  </Button> */}
                </CardBody>
              </Card>
            </div>
          );
        })}
      </Container>
    );
  }
}

let connectedProducts = connect(store => {
  return { token: store.token };
})(Products);
export default connectedProducts;
