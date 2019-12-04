import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMarkdown, setStyle, setIntroduce, setStyleEditable } from '../redux/actions/action';
import { introduce, styles } from '../assets/data';
import Introduce from './Introduce';
import StyleSheet from './StyleSheet';

class Resume extends Component {
  state = {
    interval: 40,
  }

  componentDidMount = () => {
    // this.props.setIntroduce(introduce);
    // this.props.setStyle(styles.join());
    // this.props.setMarkdown(true);
    // this.props.setStyleEditable(true);
    this.start();
  }

  showIntroduce = () => {
    return new Promise((resolve, reject) => {
      let show = () => {
        const { currentIntroduce } = this.props;
        if(currentIntroduce.length < introduce.length) {
          this.props.setIntroduce(introduce.substring(0, currentIntroduce.length+1));
          setTimeout(show, this.state.interval);
        } else {
          resolve();
        }
      }
      show();
    })
  }

  showStyles = (style, next) => {
    const { currentStyle } = this.props;
    if(next) {
      style = currentStyle + style
    }
    return new Promise((resolve, reject) => {
      let show = () => {
        const { currentStyle } = this.props;
        if(!style) return ;
        if(currentStyle.length < style.length) {
          this.props.setStyle(style.substring(0, currentStyle.length+1));
          setTimeout(show, this.state.interval);
        } else {
          resolve();
        }
      }
      show();
    })
  }

  async start() {
    try {
      await(this.showStyles(styles[0]));
      await(this.showIntroduce());
      await(this.showStyles(styles[1], true));
      this.props.setMarkdown(true);
      await(this.showStyles(styles[2], true));
      this.props.setStyleEditable(true);
    } catch (err) {
      console.error(err)
    }
  }

  editStyle = (style) => {
    this.props.setStyle(style);
  }

  render() {
    const { currentStyle, currentIntroduce, isMD, isStyleEditable } = this.props;
    return(
      <Fragment>
        <StyleSheet 
          currentStyle={currentStyle} 
          isStyleEditable={isStyleEditable}
          editStyle={this.editStyle}
        />
        <Introduce currentIntroduce={currentIntroduce} isMD={isMD}/>
        <style>{currentStyle}</style>
      </Fragment>
    )
  }
}

const mapStateToProps = ({currentIntroduce, currentStyle, isMD, isStyleEditable}) => {
  return {
    currentIntroduce,
    currentStyle,
    isMD,
    isStyleEditable,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
		setMarkdown: bindActionCreators(setMarkdown, dispatch),
		setStyle: bindActionCreators(setStyle, dispatch),
    setIntroduce: bindActionCreators(setIntroduce, dispatch),
    setStyleEditable: bindActionCreators(setStyleEditable, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Resume);