# deku-find-all [![Build Status](https://travis-ci.org/kvnneff/deku-find-all.svg?branch=master)](https://travis-ci.org/kvnneff/deku-find-all)

Traverse a [Deku](https://github.com/dekujs/deku) component tree and return all components that satisfy a function.

Inspired by [react-shallow-testutils](https://github.com/sheepsteak/react-shallow-testutils)

## Example

```js
import findAll from 'deku-find-all'
import element from 'virtual-element'
import Mock from 'component-mock'

const Component = {
  render: function () {
    element('ul', [
      element('li', 'Foo'),
      element('li', 'Bar')
    ])
  }
}

const mock = Mock(component)
const node = mock.render()

let listElement = findAll(node, (element) => {
  return element.children.length === 2
})

listElement = listElement[0]

console.log(listElement.type) //=> returns `ul`

const listItems = findAll(node, (element) => {
  return element.type === 'li'
})

console.log(listItems.length) //=> returns `2`
```

## API

### findAll(node, fn)

  Returns an array of items found within `node` that satisfy `fn`.

## License
MIT
