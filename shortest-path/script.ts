type Graph = {
  [node: string]: [string, number][]
}

const graph1: Graph = {
  'A': [['B', 3], ['D', 1]],
  'B': [['A', 3], ['C', 4]],
  'C': [['B', 4], ['D', 7]],
  'D': [['A', 1], ['C', 7]],
}

const graph2: Graph = {
  'A': [['B', 5], ['C', 3], ['E', 11]],
  'B': [['A', 5], ['C', 1], ['F', 2]],
  'C': [['A', 3], ['B', 1], ['D', 1], ['E', 5]],
  'D': [['C', 1], ['E', 9], ['F', 3]],
  'E': [['A', 11], ['C', 5], ['D', 9]],
  'F': [['B', 2], ['D', 3]],
}

function shortrestPath(graph: Graph, start: string, target: string = '') {
  const unvisited: string[] = Object.keys(graph)
  console.log(unvisited)

  const distances = 
}

shortrestPath(graph1, 'A')
