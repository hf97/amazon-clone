export const initialState = {
  basket: [],
  user: null,
  search: ''
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      sessionStorage.setItem('basket', JSON.stringify([...state.basket, action.item]))
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id} as its not in basket!)`
        )
      }

      sessionStorage.setItem('basket', JSON.stringify(newBasket))
      
      return {
        ...state,
        basket: newBasket
      }

    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: []
      }

    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }

    case 'SET_SEARCH':
      return {
        ...state,
        search: action.search
      }

    default:
      return state;
  }
};

export default reducer;