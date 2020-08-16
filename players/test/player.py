import random

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
    # problem = {
    #   size: [int],
    #   filled: [int],
    #   source: bool,
    #   sink: bool,
    #   target: int
    # }
    path = []
    path.append([ f for f in problem["filled"] ])
    # the following algorithm is NOT a valid algorithm
    # it randomly generates solution that is invalid
    # its purpose is to show you how this class will work
    # not a guide to how to write your algorithm
    for step in range(random.randint(1,10)):
      path.append([ random.randint(0, b) for b in problem["size"]])
    # the following search tree is a static search tree 
    # to show you the format of the variable 
    # to generate a search tree in the frontend.
    # you are required to generate the search tree based on your search algorithm
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
    # this function should return the path and the search_tree
    return path, search_tree