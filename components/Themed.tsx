import {
  ScrollView as DefaultScrollView,
  Text as DefaultText,
  View as DefaultView,
  useColorScheme,
  TouchableOpacity as DefaultTouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface ThemeProps {
  lightColor?: string;
  darkColor?: string;
}

export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];
export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TouchOProps = ThemeProps & DefaultTouchableOpacity["props"];

export type IconProps = ThemeProps & {
  name: string;
  size?: number;
  style?: any;
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps != null) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    "background"
  );
  return (
    <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TouchableOpacity(props: TouchOProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    "background"
  );
  const borderColor = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    "text"
  );

  return (
    <DefaultTouchableOpacity
      style={[{ backgroundColor, borderColor }, style]}
      {...otherProps}
    />
  );
}

export function ThemedFeatherIcon(props: IconProps) {
  const {
    lightColor,
    darkColor,
    name,
    style,
    size: customSize,
    ...otherProps
  } = props;
  const defaultSize = 24;
  const size = customSize ?? defaultSize;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Feather
      name={name as any}
      size={size}
      color={color}
      {...otherProps}
      style={style}
    />
  );
}
