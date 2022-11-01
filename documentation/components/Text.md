# Text

The Text component is responsible for displaying text.

## Props

| Name                  | Type                        | Default       | Description                                                                                       |
| --------------------- | --------------------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| `children`            | React.ReactNode             | -             | The content of the component.                                                                     |
| `type` ?              | TextType                    | 'bodyDefault' | The type of style that allows you to distinguish between texts of different importance in the UI. |
| `color` ?             | ColorKey                    | -             | The color of the text.                                                                            |
| `font` ?              | string                      | -             | The preferred font.                                                                               |
| `uppercase` ?         | boolean                     | false         | A boolean that indicates whether the text should be converted to uppercase.                       |
| `align` ?             | 'left' / 'center' / 'right' | 'left'        | The preferred text alignment.                                                                     |
| `style` ?             | Text Style, View Style Props | -             | The additional styles.                                                                            |
| `testID`?             | string                      | -             | The unique E2E test handler.                                                                      |

## Examples

### React

```javascript
return <Text type="h1">Hello</Text>;
```
