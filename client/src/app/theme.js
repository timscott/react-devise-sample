import {
  deepOrangeA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack, indigo500, indigo700
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

// NOTE: To see what else can be customized visit: https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js

export default {
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56
  },
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo700,
    primary3Color: grey400,
    accent1Color: deepOrangeA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: indigo500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  }
};
