from fastapi import fastapi, WebSocket
from starlette.endpoints import WebSocketEndpoint
from fastapi.responses import FileResponse, JSONResponse
import os, importlib, sys, json

app = FastAPI()

players_dir = os.path.join("players")
player_file_name = "player"
player_class_name = "Player"
global players
players = []
global errors
errors = []

def loadPlayer(folderName):
  player = {
    "folder": folderName,
    "module": None,
    "err": None
  }
  try:
    mod = importlib.import_module("{}.{}.{}".format(
      players_dir.replace(os.pathsep, "."), 
      folderName,
      player_file_name
    ))
    player["module"] = getattr(mod, player_class_name)
  except:
    player["err"] = sys.exc_info()
  return player

def sendError(e):
  return e[1]

def retrievePlayerDetails(player):
  details = {
    "folder": player["folder"],
    "err": None
  }
  if player["err"] is None:
    try:
      details.update({
        "folder": player["folder"],
        "name": player["module"].name,
        "group": player["module"].group,
        "icon": player["module"].icon,
        "members": player["module"].members,
        "informed": player["module"].informed
      })
    except:
      details["err"] = sendError(sys.exc_info())
  else:
    details["err"] = sendError(player["err"])

def initPlayer(folderName):
  global players
  player = players[ [ p["folder"] for p in players ].index(folderName) ]
  initiated_player = {
    "beforeinit": player,
    "player": None,
    "err": None
  }
  if player["module"] is None:
    initiated_player.update({ "err": player["err"] })
  else:
    try:
      initiated_player.update({ "player": player["module"]() })
    except:
      initiated_player.update({ "err": sys.exc_info() })
  return initiated_player

@app.get("/get-player-list")
async def getPlayerList():
  global players
  players = [ loadPlayer(f) 
    for f in os.listdir(players_dir) 
    if not f.startswith(".") 
    and os.path.isdir( os.path.join(players_dir, f) ) 
  ]
  player_list = [ retrievePlayerDetails(p) for p in players ]
  return JSONResponse(content={
    "name": "player list",
    "content": player_list
  })

@app.websocket_route("/select-player/{folder_name}")
class PlayerWSEndpoint(WebSocketEndpoint):
  async def on_connect(self, websocket: WebSocket):
    await websocket.accept()
    folder_name = websocket.url.path.split("/")[-1]
    self.player = initPlayer(folder_name)
    await websocket.send_json({
      "err": self.player["err"] is not None,
      "purpose": "initiation",
      "data": retrievePlayerDetails(self.player["beforeinit"])
    })
  
  async def on_receive(self, websocket: WebSocket, data_str):
    data = json.loads(data_str)
    print("Data received from frontend", data)
    if data["purpose"] == "problem":
      self.problem = data["data"]
      await websocket.send_json({
        "err": False,
        "purpose": "init execution",
        "data": ""
      })
      try:
        path, search_tree = self.player.run(self.problem)
      except:
        await websocket.send_json({
          "err": True,
          "purpose": "notification",
          "data": [
            "error when executing algorithm",
            sendError(sys.exc_info())
          ]
        })
      else:
        await websocket.send_json({
          "err": False,
          "purpose": "path",
          "data": {
            "path": path,
            "search_tree": search_tree
          }
        })
    else:
      await websocket.send_json({
        "err": True,
        "purpose": "notification",
        "data": "data not recognised"
      })

  async def on_disconnect(self, websocket: WebSocket, close_code: int):
    pass
    