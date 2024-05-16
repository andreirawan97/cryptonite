import {
  ChevronDownIcon,
  Icon,
  Select as SelectRaw,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectItem,
} from "@gluestack-ui/themed";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

export type SelectItem = {
  value: string;
  label: string;
};

type Props = {
  defaultValue: string;
  onValueChange: (value: string) => void;
  items: SelectItem[];
  label?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function Select(props: Props) {
  const {
    items = [],
    defaultValue,
    onValueChange,
    style,
    containerStyle,
    label,
  } = props;

  return (
    <View style={containerStyle}>
      <Text style={styles.label}>{label}</Text>
      <SelectRaw
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        style={style}
      >
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select option" />
          {/* @ts-ignore because it throws an unexpected children error */}
          <SelectIcon mr="$3">
            <Icon as={ChevronDownIcon} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>

            {items.map((item, i) => {
              const { label, value } = item;
              return <SelectItem key={i} label={label} value={value} />;
            })}
          </SelectContent>
        </SelectPortal>
      </SelectRaw>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "grey",
    marginBottom: 6,
  },
});
