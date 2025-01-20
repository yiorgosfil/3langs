'''
    Concept:
    A Binary Search Tree (BST) is a tree data structure where each node has 
    at most two children: left and right. It has the following properties:
    - The left subtree of a node contains only nodes with keys smaller than the node's key.
    - The right subtree of a node contains only nodes with keys greater tha the node's key.
    - BST allows efficient searching, insertion, and deletion operations, typically in O(log n) time.
'''

class TreeNode: # Represents a single node in the BST 
    def __init__(self, key):
        self.key = key # The value (key) of the node 
        self.left = None # Reference to the left child 
        self.right = None # Reference to the right child

    def __str__(self):
        return str(self.key) # String representation of the node's key


class BinarySearchTree: # Represents the Binary Search Tree 
    def __init__(self):
        self.root = None # The root node of the tree 

    def _insert(self, node, key):
        # Base case: of the current node is None, create a new node
        if node is None:
            return TreeNode(key)
        
        if key < node.key: # If the key is smaller, recursively insert in the left subtree
            node.left = self._insert(node.left, key)
        elif key > node.key: # If the key is larger, recursively insert in the right subtree
            node.right = self._insert(node.right, key)
        return node # Return the updated node to maintain the structure

    def insert(self, key):
        self.root = self._insert(self.root, key) # Insert the key starting from the root

    def _search(self, node, key):
        # Base case: node is None or matches the node's key
        if node is None or node.key == key: 
            return node
        if key < node.key: # If the key is smaller, search in the left subtree
            return self._search(node.left, key)
        return self._search(node.right, key) # If the key is larger, search in the right subtree

    def search(self, key):
        return self._search(self.root, key) # Start the search from the root

    def _delete(self, node, key):
        # Base case: If node is None, return the node
        if node is None: 
            return node
        # If key is smaller, recursively delete in the left subtree
        if key < node.key:
            node.left = self._delete(node.left, key)
        elif key > node.key: # Else recursively delete in the right subtree
            node.right = self._delete(node.right, key)
        # Else if key matches the node's key
        else:
            if node.left is None: # If no left child, replace with the right child
                return node.right
            elif node.right is None: # If no right child, replace with the left child
                return node.left

            # Node w/ two children: find the in-order successor (smallest in right subtree)
            node.key = self._min_value(node.right)
            # Delete the in-order successor
            node.right = self._delete(node.right, node.key)

        # Return the updated node
        return node

    def delete(self, key):
        # Start deletion from the root
        self.root = self._delete(self.root, key)

    def _min_value(self, node):
        while node.left is not None: # Traverse to the leftmost node
            node = node.left
        return node.key # Key of the smallst node

    def _inorder_traversal(self, node, result):
        if node:
            self._inorder_traversal(node.left, result) # Visit the left subtree 
            result.append(node.key) # Add the current node's key to the result 
            self._inorder_traversal(node.right, result) # Visit the right subtree

    def inorder_traversal(self):
        result = [] # List to store the in-order traversal 
        self._inorder_traversal(self.root, result) # Perform the in-order traversal starting from the root
        return result

# Create a new Binary Search Tree
bst = BinarySearchTree()

# Insert nodes into the tree
nodes = [50, 30, 20, 40, 70, 60, 80]
for node in nodes:
    bst.insert(node)  # Insert each node into the BST

# Search for a specific key in the tree
print('Search for 80:', bst.search(80)) 

# Print the in-order traversal of the tree
print("Inorder traversal:", bst.inorder_traversal())

# Delete a key from the tree
bst.delete(40)

# Search for the deleted key
print("Search for 40:", bst.search(40))

# Print the in-order traversal after deletion
print('Inorder traversal after deleting 40:', bst.inorder_traversal()) 
