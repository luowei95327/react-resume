export const setMarkdown = (isMD) => {
	return {
		type: "SET_MARKDOWN",
		payLoad: isMD
	}
}

export const setStyle = (showContent) => {
	return {
		type: "SET_STYLE",
		payLoad: showContent
	}
}

export const setIntroduce = (showContent) => {
	return {
		type: "SET_INTRODUCE",
		payLoad: showContent
	}
}

export const setStyleEditable = (isStyleEditable) => {
  return {
    type: "SET_STYlEEDITABLE",
    payLoad: isStyleEditable
  }
}