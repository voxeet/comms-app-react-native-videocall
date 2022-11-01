# Icon

The Icon component is responsible for displaying icon.

## Props

| Name        | Type                                      | Default | Description                            |
| ----------- | ----------------------------------------- | ------- | -------------------------------------- |
| `name`      | IconComponentName                         | -       | The text to display for the component. |
| `color`     | ColorKey                                  | -       | Tint color for the Icon                |
| `colorTone` | ColorTone ('light' / 'default' / 'dark')  | default | The color tone of the icon.            |
| `size`?     | IconSize ('xxs' / 'xs' / 's' / 'm' / 'l') | m       | The size of the icon.                  |
| `testID`?   | string                                    | -       | The unique E2E test handler.           |

## Available icons

| Name                   | Icon                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| arrowLeft              | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/arrow-left.svg)               |
| cameraOff              | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/camera-off.svg)               |
| cameraReverse          | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/camera-reverse.svg)           |
| camera                 | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/camera.svg)                   |
| chat                   | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/chat.svg)                     |
| close                  | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/close.svg)                    |
| copy                   | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/copy.svg)                     |
| dotsHorizontal         | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/dots-horizontal.svg)          |
| dotsVertical           | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/dots-vertical.svg)            |
| handset                | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/handset.svg)                  |
| headphones             | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/headphones.svg)               |
| info                   | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/info.svg)                     |
| microphoneOff          | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/microphone-off.svg)           |
| microphone             | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/microphone.svg)               |
| participants           | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/participants.svg)             |
| pin                    | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/pin.svg)                      |
| present                | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/present.svg)                  |
| record                 | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/record.svg)                   |
| sendMessage            | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/send-message.svg)             |
| settings               | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/settings.svg)                 |
| speaker                | ![Alt text](../../packages/mobile/src/components/ui/Icon/IconComponents/speaker.svg)                  |

## Examples

### React Native

```javascript
return <Icon name="arrowLeft" size="s" testID="testID" />;
```
