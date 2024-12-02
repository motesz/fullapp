import { View, Platform } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import {  PlatformPressable } from '@react-navigation/elements';

import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon, IconElement } from '@ui-kitten/components';

const HomeIcon = (props) => (
  <Icon
    {...props}
    name='home-outline'
  />
);

const ProfileIcon = (props) => (
  <Icon
    {...props}
    name='person-outline'
  />
);

const CameraIcon = (props) => (
  <Icon
    {...props}
    name='camera-outline'
  />
);

const TutorTabBaxr = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const TutorBottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='SCAN' icon={CameraIcon} />
    <BottomNavigationTab title='HOME' icon={HomeIcon} />
    <BottomNavigationTab title='PROFILE' icon={ProfileIcon} />
  </BottomNavigation>
);

export {
  TutorBottomTabBar
};
