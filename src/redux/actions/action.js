export const setMarkdown = (isMD) => {
	return {
		type: "SET_MARKDOWN",
		payload: isMD
	}
}

export const setStyle = (showContent) => {
	return {
		type: "SET_STYLE",
		payload: showContent
	}
}

export const setIntroduce = (showContent) => {
	return {
		type: "SET_INTRODUCE",
		payload: showContent
	}
}

export const setStyleEditable = (isStyleEditable) => {
  return {
    type: "SET_STYLE_EDITABLE",
    payload: isStyleEditable
  }
}
