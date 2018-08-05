import {combineReducers} from 'redux'

function dataReducer(state = {}, action)
{
	switch(action.type)
	{
		case "GET_DATA":
      let st = {
			...state,
				categories: action.payload.categories,
				products: action.payload.products,
    }
			return st

		default:
			return state
	}
}

const reducer = combineReducers({
	dataReducer
})

export default reducer;
