# react-native-keyboard-topview
react-native keyboard top view, custom container content(ios,android,android 需要删除 android 目录下 'app'内'src'目录中AndroidManifest.xml文件内的android:windowSoftInputMode 项)

## Installation

```
npm i react-native-keyboard-topview --save

```
![示例](https://github.com/CJELLYS/image/blob/master/keyboardDismiss.png)

## Use
```
import KeyboardTopView from 'react-native-keyboard-topview'

export default class KeyBoardDismissView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{ height: 40,borderColor: 'gray', borderWidth: 1 }}
        />
        <KeyboardTopView />
      </View>
    );
  }
}
```