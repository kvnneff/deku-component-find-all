var isNode = require('deku-component-is-node')

/**
 * Traverses the tree and returns all components that satisfy the function `test`.
 *
 * @param  {DekuComponent} tree the tree to traverse
 * @param  {Function} test       the test for each component
 * @return {Array}               the components that satisfied `test`
 */
function findAll (tree, test) {
  var found = test(tree) ? [tree] : []
  if (isNode(tree)) {
    if (tree.children.length > 0) {
      tree.children.forEach(function (child) {
        found = found.concat(findAll(child, test))
      })
    }
  }

  return found
}

module.exports = findAll
