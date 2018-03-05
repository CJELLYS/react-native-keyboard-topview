import React, { Component } from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  Platform,
  Dimensions,
  Animated,
  TouchableOpacity,
  Text
} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const viewHeight = 40;
export default class KeyboardTopView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(-viewHeight)
    };
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      this.keyboardShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardShow.bind(this));
      this.keyboardHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardHide.bind(this));
    } else {
      this.keyboardShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardShow.bind(this));
      this.keyboardHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardHide.bind(this));
    }
  }

  keyboardShow(events) {
    this.props.getKeyboardHeight(events.endCoordinates.height + viewHeight);
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: events.endCoordinates.height,
        duration: Platform.OS === 'ios' ? (events.duration) : 0
      },
    ).start();
  }

  keyboardHide(events) {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: -viewHeight,
        duration: Platform.OS === 'ios' ? (events.duration) : 0,
      },
    ).start();
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  onRightButtonAction() {
    Keyboard.dismiss();
    this.props.onRightButtonAction();
  }

  leftSubView() {
    if (this.props.leftSubView) {
      this.props.leftSubView();
    }
  }

  rightSubView() {
    if (this.props.rightSubView) {
      this.props.rightSubView();
    } else {
      return <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.onRightButtonAction()}
        style={this.props.rightButtonStyle}>
        <Text style={this.props.doneTextStyle}>{this.props.doneText}</Text>
      </TouchableOpacity>
    }
  }

  render() {
    return (
      <Animated.View style={[this.props.AnimatedViewStyle, { bottom: this.state.fadeAnim, }]}>
        <View style={this.props.leftViewStyle}>
          {this.leftSubView()}
        </View>
        <View style={this.props.rightViewStyle}>
          {this.rightSubView()}
        </View>
      </Animated.View>
    );
  }
}

KeyboardTopView.defaultProps = {
  AnimatedViewStyle: {//键盘顶部父视图样式
    position: 'absolute',
    left: 0,
    width: ScreenWidth,
    height: viewHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  leftViewStyle: {//键盘顶部父视图内部左边视图样式
    width: ScreenWidth / 2.0,
    height: viewHeight
  },
  rightViewStyle: {//键盘顶部父视图内部右边视图样式
    width: ScreenWidth / 2.0,
    height: viewHeight,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  rightButtonStyle: {//键盘顶部父视图内部右边视图按钮样式
    backgroundColor: 'green',
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  doneTextStyle: { color: 'white' },//键盘顶部父视图内部右边视图按钮内文字样式
  doneText: '完成',//键盘顶部父视图内部右边视图按钮内文字
  leftSubView: undefined,//左边视图内容
  rightSubView: undefined,//右边边视图内容
  onRightButtonAction: Function,//点击右边按钮所执行的行为
  getKeyboardHeight: Function,//获取键盘高度,可通知用户键盘已经弹起.进行回调使用.
};
