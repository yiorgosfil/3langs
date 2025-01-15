NUMBER_OF_DISKS = 5
A = list(range(NUMBER_OF_DISKS, 0, -1))
B = []
C = []

# n -> the number of disks
# source -> is the starting rod 
# auxiliary -> helps move the disks to the target rod 
# target -> should finally have all disks stacked
def move(n, source, auxiliary, target):
    if n <= 0:
        return 
    
    # move n - 1 disks from target to the auxiliary, so they are out of the way
    move(n - 1, source, target, auxiliary)

    # move the nth disk from source target
    target.append(source.pop())

    # disply progress
    print(A, B, C, '\n')

    # move the n - 1 disks left on auxiliary to the target 
    move(n - 1, auxiliary, source, target)

# intitiate call from source A to target C with auxiliary B 
move(NUMBER_OF_DISKS, A, B, C)
