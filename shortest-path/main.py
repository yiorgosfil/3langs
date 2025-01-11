my_graph = {
	'A': [('B', 3), ('D', 1)],
	'B': [('A', 3), ('C', 4)],
	'C': [('B', 4), ('D', 7)],
	'D': [('A', 1), ('C', 7)]
}

my_graph_2 = {
	'A': [('B', 5), ('C', 3), ('E', 11)],
    'B': [('A', 5), ('C', 1), ('F', 2)],
    'C': [('A', 3), ('B', 1), ('D', 1), ('E', 5)],
    'D': [('C', 1), ('E', 9), ('F', 3)],
    'E': [('A', 11), ('C', 5), ('D', 9)],
    'F': [('B', 2), ('D', 3)]
}

def shortest_path(graph, start, target=''):
    # list of all nodes in graph
    unvisited = list(graph)

    # dictionary with keys as nodes and  values:
    #   - 0 if node is start
    #   - infinity for all other nodes
    distances = {node: 0 if node == start else float('inf') for node in graph}

    # dictionary with keys as nodes and values as empty lists 
    paths = {node: [] for node in graph}

    # paths stores the sequence of nodes forming the shortest path to each node 
    # add start to paths[start]
    paths[start].append(start)

    # while unvisited is not empty
    while unvisited:
        # node in unvisited with the smallest value in distances
        current = min(unvisited, key=distances.get)

        # for each neighbor, edge_distance
        for node, distance in graph[current]:
            # if the path through the current node is shorter than the previously known distance to the neighbor
            if distance + distances[current] < distances[node]:
                distances[node] = distance + distances[current]
                # if paths[neighbor] is not empty and the last node in paths[neighbor] is neighbor
                if paths[node] and paths[node][-1] == node:
                    # reset it to the current path
                    paths[node] = paths[current][:]
                else:
                    # extend it with the path to current and append the neighbor
                    paths[node].extend(paths[current])
                # add neighbor to paths[neighbor]
                paths[node].append(node)
        # remove current from unvisited
        unvisited.remove(current)

        # if target is specified, create a single item list with the target node 
        # otherwise it defaults to all nodes in the graph
        targets_to_print = [target] if target else graph 
        for node in targets_to_print:
            if node == start:
                continue
            print(f'\n{start}-{node} distance: {distances[node]}\nPath: {" -> ".join(paths[node])}')

    return distances, paths 

shortest_path(my_graph, 'A')
shortest_path(my_graph_2, 'A', 'F')

