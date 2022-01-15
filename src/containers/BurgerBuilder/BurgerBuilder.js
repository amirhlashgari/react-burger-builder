import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = { salad: 0.5, bacon: 0.7, meat: 1.3, cheese: 0.4 };

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        axios.get('https://react-burger-builder-a0a66-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            }).catch(err => {
                console.log(err);
            });
    }

    updatePurchaseState(ingredients) {
        const ingredientsSum = Object.keys(ingredients).map(ingredientKey => {
            return ingredients[ingredientKey];
        }).reduce((sum, el) => { //*** el is "ingredients[ingredientKey]" that returned above and the first element "sum" is the output of function... also the second element "0" show the start amount of sum ***
            return sum + el;
        }, 0);
        this.setState({ purchasable: ingredientsSum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice + INGREDIENT_PRICES[type];
        this.setState({ totalPrice: newTotalPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice - INGREDIENT_PRICES[type];
        this.setState({ totalPrice: newTotalPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        this.props.history.push({
            pathname: 'checkout',
            search: '?' + queryParams.join('&')
        });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = <Spinner />;
        let orderSummary = null;
        if (this.state.ingredients) {
            orderSummary = <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice} purchaseCanceled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} />;
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);