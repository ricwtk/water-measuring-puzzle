# Instructions

1. You are required to create two AI players as a Python class to solve the pouring problem. One with uninformed search, and one with informed search.

2. The information of the problem will be passed to the AI player. The information includes
    - number of buckets,
    - sizes of the buckets,
    - initial fills of the buckets,
    - availability of the source (tap), 
    - availability of the sink (drain), and
    - target amount of the warter.

3. The AI player will solve the problem based on the information using a search algorithm before returning the path of the solution and the search tree.

## `Player` class

```Python
class Player():
  name = "testing player"
  group = "Children of Odin"
  icon = "mdi-cloud"
  members = [
    ["Thor", "12834823"],
    ["Loki", "98854678"],
    ["Hela", "87654654"]
  ]
  informed = False

  def __init__(self):
    pass

  def run(self, problem):
    ...
    return path, search_tree
```

**Note the indentation**

### Group information

```Python{2-10}
class Player():
  name = "testing player"
  group = "Children of Odin"
  icon = "mdi-cloud"
  members = [
    ["Thor", "12834823"],
    ["Loki", "98854678"],
    ["Hela", "87654654"]
  ]
  informed = False

  def __init__(self):
    pass

  def run(self, problem):
    ...
    return path, search_tree
```

- `name` stores the name of the AI player
- `group` stores the name of your group
- `icon` stores the name of the icon of your group (from [here](https://cdn.materialdesignicons.com/5.0.45/))
- `members` stores a list of lists of the name and student ID of the group members
- `informed` is a boolean variable to indicate if this AI player implements informed (`True`) or uninformed (`False`) search algorithm

### Initiation of `Player` object

```Python{12-13}
class Player():
  name = "testing player"
  group = "Children of Odin"
  icon = "mdi-cloud"
  members = [
    ["Thor", "12834823"],
    ["Loki", "98854678"],
    ["Hela", "87654654"]
  ]
  informed = False

  def __init__(self):
    pass

  def run(self, problem):
    ...
    return path, search_tree
```

`__init__` is the initiation function of the AI player. Most likely you will not need to include any code in this function. Therefore a `pass` here will be sufficient.

### Search algorithm execution

```Python{15-18}
class Player():
  name = "testing player"
  group = "Children of Odin"
  icon = "mdi-cloud"
  members = [
    ["Thor", "12834823"],
    ["Loki", "98854678"],
    ["Hela", "87654654"]
  ]
  informed = False

  def __init__(self):
    pass

  def run(self, problem):
    ...
    # this function should return the path and the search_tree
    return path, search_tree
```

`run` is the function to implement the search algorithm. The function will take the input argument of `problem` which contains the information of the problem to be solved.

For example, for a problem with 3 buckets with size 8, 5, and 3, which are initially unfilled, with source (tap) and sink (drain) available, and the target amount of water is 4, the variable `problem` will be:

```Python
problem = {
  size: [8, 5, 3],
  filled: [0, 0, 0],
  source: True,
  sink: True,
  target: 4
}
```

This function should return two variables, `path` and `search_tree`.

`path` should be a list of lists that informs the amount of water in each bucket from the beginning until you reach the solution. For example, if the solution is a 4-step solution to get a bucket with water amount 2, starting from all buckets unfilled `[0,0,0]`, fill the first bucket `[8,0,0]`, pour from first bucket to second bucket `[3,5,0]`, and pour from second bucket to third bucket `[3,2,3]`, the `path` variable should be

```Python
path = [[0,0,0], [8,0,0], [3,5,0], [3,2,3]]
```

`search_tree` should be a list of dictionary objects that gives us the information of each node in the search tree. Each object should be

```Python
{
  "id": 2,
  "state": "5,0,0",
  "expansionsequence": 2,
  "children": [5,6,7],
  "actions": ["src2one","src2two","one2three"],
  "removed": False,
  "parent": 1
},
```

- `id` is the ID of this node, which should be unique for every node
- `state` is the state of this node, which should be a string (the display format is not constrained)
- `expansionsequence` is the order of this node being expanded
- `children` is the ID of the nodes that are children to this node, which should be a list (empty list if no children)
- `actions` is the list of actions that correspond to the children in `children`, which should be a list of equal length with `children` (the display format is not constrained)
- `removed` indicates if this node has been removed due to being a duplicated node or creating a redundant path
- `parent` is the ID of the node that is parent to this node

For example, the following search tree will have the `search_tree` variable below it.

<svg width="100%" viewBox="-5 -10 490 315"><style>
          .expseq { font: normal 10px sans-serif; }
        </style> <rect x="255" y="0" width="50" height="50" stroke="gray" fill="white"></rect> <text x="280" y="25" font-weight="thin" font-size="12px" dominant-baseline="middle" text-anchor="middle">0,0,0</text> <text x="317.5" y="25" font-weight="thin" dominant-baseline="middle" text-anchor="middle" class="expseq">1</text> <circle cx="317.5" cy="25" r="10" fill="none" stroke="#009688"></circle> <!----> <!----> <!----> <!----><rect x="105" y="100" width="50" height="50" stroke="gray" fill="white"></rect> <text x="130" y="125" font-weight="thin" font-size="12px" dominant-baseline="middle" text-anchor="middle">5,0,0</text> <text x="167.5" y="125" font-weight="thin" dominant-baseline="middle" text-anchor="middle" class="expseq">2</text> <circle cx="167.5" cy="125" r="10" fill="none" stroke="#009688"></circle> <!----> <!----> <line x1="280" y1="50" x2="130" y2="100" stroke="gray"></line> <text x="205" y="75" stroke="white" stroke-width=".5pt" font-weight="900" font-size="10px" dominant-baseline="middle" text-anchor="middle">src2one</text><rect x="305" y="100" width="50" height="50" stroke="gray" fill="white"></rect> <text x="330" y="125" font-weight="thin" font-size="12px" dominant-baseline="middle" text-anchor="middle">0,3,0</text> <!----> <!----> <!----> <!----> <line x1="280" y1="50" x2="330" y2="100" stroke="gray"></line> <text x="305" y="75" stroke="white" stroke-width=".5pt" font-weight="900" font-size="10px" dominant-baseline="middle" text-anchor="middle">src2two</text><rect x="405" y="100" width="50" height="50" stroke="gray" fill="white"></rect> <text x="430" y="125" font-weight="thin" font-size="12px" dominant-baseline="middle" text-anchor="middle">0,0,4</text> <!----> <!----> <!----> <!----> <line x1="280" y1="50" x2="430" y2="100" stroke="gray"></line> <text x="355" y="75" stroke="white" stroke-width=".5pt" font-weight="900" font-size="10px" dominant-baseline="middle" text-anchor="middle">src2three</text><rect x="5" y="200" width="50" height="50" stroke="gray" fill="white"></rect> <text x="30" y="225" font-weight="thin" font-size="12px" dominant-baseline="middle" text-anchor="middle">5,0,0</text> <!----> <!----> <line stroke="red" stroke-width="3" x1="0" y1="195" x2="60" y2="255"></line> <line stroke="red" stroke-width="3" x1="60" y1="195" x2="0" y2="255"></line> <line x1="130" y1="150" x2="30" y2="200" stroke="gray"></line> <text x="80" y="175" stroke="white" stroke-width=".5pt" font-weight="900" font-size="10px" dominant-baseline="middle" text-anchor="middle">src2one</text><rect x="105" y="200" width="50" height="50" stroke="gray" fill="white"></rect> <text x="130" y="225" font-weight="thin" font-size="12px" dominant-baseline="middle" text-anchor="middle">5,3,0</text> <!----> <!----> <!----> <!----> <line x1="130" y1="150" x2="130" y2="200" stroke="gray"></line> <text x="130" y="175" stroke="white" stroke-width=".5pt" font-weight="900" font-size="10px" dominant-baseline="middle" text-anchor="middle">src2two</text><rect x="205" y="200" width="50" height="50" stroke="gray" fill="white"></rect> <text x="230" y="225" font-weight="thin" font-size="12px" dominant-baseline="middle" text-anchor="middle">1,0,4</text> <!----> <!----> <!----> <!----> <line x1="130" y1="150" x2="230" y2="200" stroke="gray"></line> <text x="180" y="175" stroke="white" stroke-width=".5pt" font-weight="900" font-size="10px" dominant-baseline="middle" text-anchor="middle">one2three</text><!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----><!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----></svg>

```Python
search_tree = [
  {
    "id": 1,
    "state": "0,0,0",
    "expansionsequence": 1,
    "children": [2,3,4],
    "actions": ["src2one","src2two","src2three"],
    "removed": False,
    "parent": None
  },
  {
    "id": 2,
    "state": "5,0,0",
    "expansionsequence": 2,
    "children": [5,6,7],
    "actions": ["src2one","src2two","one2three"],
    "removed": False,
    "parent": 1
  },
  {
    "id": 3,
    "state": "0,3,0",
    "expansionsequence": -1,
    "children": [],
    "actions": [],
    "removed": False,
    "parent": 1
  },
  {
    "id": 4,
    "state": "0,0,4",
    "expansionsequence": -1,
    "children": [],
    "actions": [],
    "removed": False,
    "parent": 1
  },
  {
    "id": 5,
    "state": "5,0,0",
    "expansionsequence": -1,
    "children": [],
    "actions": [],
    "removed": True,
    "parent": 2
  },
  {
    "id": 6,
    "state": "5,3,0",
    "expansionsequence": -1,
    "children": [],
    "actions": [],
    "removed": False,
    "parent": 2
  },
  {
    "id": 7,
    "state": "1,0,4",
    "expansionsequence": -1,
    "children": [],
    "actions": [],
    "removed": False,
    "parent": 2
  }
]
```