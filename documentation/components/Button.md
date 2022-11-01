# Layout

The Button component is responsible for displaying button with `text`.

## Props

| Name         | Type                                                      | Default            | Description                                                                                            |
| ------------ | --------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| `title`      | string                                                    | -                  | The text to display for the component.                                                                 |
| `type`       | 'primary' / 'secondary' / 'secondaryDark'                 | -                  | The variant of style that allows you to distinguish between actions of different importance in the UI. |
| `size`       | 's'/'m'/'l'                                               | 'l'                | Size of the Button |
| `danger`?    | boolean                                                   | false              | The style to signify destructive action.                                                               |
| `disabled`?  | boolean                                                   | false              | A true value sets the button to a disabled state.                                                      |
| `uppercase`? | boolean                                                   | true               | A true value sets the button text to uppercased.                                                       |
| `onPress`    | Function                                                  | -                  | The event handler property for processing click events on the button.                                  |
| `mode`?      | ButtonMode.Default / ButtonMode.Loading / ButtonMode.Done | ButtonMode.Default | Button mode: default for text button, loading for button with spinner, done with checkbox              |
| `testID`?    | string                                                    | -                  | The unique E2E test handler.                                                                           |

## Examples

### React Native

```javascript
return <Button type="primary" title="Okay" onPress={() => {}} />;
```
