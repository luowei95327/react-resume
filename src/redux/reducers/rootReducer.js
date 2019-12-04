import { combineReducers } from 'redux';

const currentIntroduce = (state="", action) => {
	switch(action.type) {
		case "SET_INTRODUCE":
			return action.payLoad;
		default:
			return state;
	}
}

const currentStyle = (state="", action) => {
	switch(action.type) {
		case "SET_STYLE":
			return action.payLoad;
		default:
			return state;
	}
}

const isMD = (state=false, action) => {
	switch(action.type) {
		case "SET_MARKDOWN":
			return action.payLoad;
		default:
			return state;
	}
}

const isStyleEditable = (state=false, action) => {
	switch(action.type) {
		case "SET_STYlEEDITABLE":
			return action.payLoad;
		default:
			return state;
	}
}

export default combineReducers({
  currentIntroduce,
  currentStyle,
  isMD,
  isStyleEditable
});