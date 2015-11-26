/*global describe, it*/
var assert = require('assert')
var elAssert = require('assert-element')
var findAll = require('../')
var Mock = require('component-mock')
var dom = require('virtual-element')

var OtherComponent = {
  render: function () {
    return dom('div', {class: 'other-component'}, '')
  }
}

var Component = {
  render: function () {
    return (
      dom('div', {class: 'test-class'}, [
        dom('span'),
        dom('div', {class: 'test-class test-class--modified'}),
        dom('div', {class: 'test-class2 test-class2--modified'}),
        dom('div', {class: 'test-class3 test-class3--modified'}),
        dom('form', {
          action: '/',
          method: 'post'
        }, [
          dom('input', {
            id: 'test',
            name: 'test',
            type: 'text'
          }),
          dom('input', {
            id: 'test2',
            name: 'test2',
            type: 'text'
          }),
          dom('button', 'Send')
        ]),
        dom(OtherComponent),
        dom('span', 'Some content')
      ])
    )
  }
}

describe('`findAll`', function () {
  var mock = Mock(Component)
  var node = mock.render()

  it('traverses all thirteen items in tree', () => {
    var traversed = 0

    findAll(node, function (el) {
      traversed++
    })
    assert.equal(traversed, 13)
  })

  it('traverses child-first', function () {
    var traversed = 0

    findAll(node, function (component) {
      traversed++

      switch (traversed) {
        case 1:
          elAssert.hasClass(component, 'test-class')
          break
        case 6:
          elAssert.isNode(component, 'form')
          break
        case 11:
          elAssert.isNode(component, OtherComponent)
          break
      }
    })
  })
})
