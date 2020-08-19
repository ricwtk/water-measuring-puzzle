let vm = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: {
    name: {
      main: "Water measuring puzzle",
      side: "Logs"
    },
    logs: [],
    log_enabler: true,
    players: [],
    player: {
      text: "",
      value: ""
    },
    player_obj: {},
    default_val: {
      player_icon: "mdi-account"
    },
    player_socket: null,
    load_next_player: false,
    problem: {
      size: [8,5,3],
      filled: [0,0,0],
      source: true,
      sink: true,
      target: 4
    },
    searching: false,
    result: {
      path: [],
      search_tree: []
    },
    colors: [
      "#fbb4ae",
      "#b3cde3",
      "#ccebc5",
      "#decbe4",
      "#fed9a6",
      "#ffffcc",
      "#e5d8bd",
      "#fddaec",
      "#f2f2f2"
    ],
    log_msg_dialog: {
      show: false,
      index: 0
    },
    param_dialog: {
      show: false,
      new_bucket_size: "",
      edit_filled: -1,
      edit_filled_value: "",
      edit_filled_err: [],
      crand: 0
    },
    profile_dialog: {
      show: false,
      crand: 0
    }
  },
  computed: {
    player_list: function () {
      let pl = [{
        text: "",
        value: ""
      }];
      this.players.forEach(p => {
        pl.push({
          text: p.name,
          value: p.folder,
          disabled: p.err,
          icon: p.icon
        });
        if (p.err) { 
          this.addToLogs({
            text: `player ${p.name} is disabled due to ${p.err}`,
            type: "error"
          }); 
        }
      });
      return pl;
    },
    player_icon_display: function () {
      if (this.player.value == "") {
        return this.default_val.player_icon;
      } else {
        return this.player_obj.icon;
      }
    }
  },
  mounted: function () {
    this.param_dialog.crand = Math.round(Math.random()*this.colors.length);
    this.profile_dialog.crand = Math.round(Math.random()*this.colors.length);
    let req = new Request("./get-player-list");
    fetch(req)
    .then(r => r.json())
    .then(r => { this.players = r.content; });
  },
  methods: {
    checkSelectedPlayer: function (pl) {
      let retval = true;
      if (this.players.length > 0 && pl.value !== "") {
        this.player_obj = this.players.find(el => el.folder == pl.value);
        retval = this.player_obj.err;
        retval = retval == null ? true : retval;
      }
      return retval;
    },
    runPlayer: function () {
      if (this.player_socket) {
        this.player_socket.close();
        this.load_next_player = true;
      } else {
        this.createWebSocket(this.player_obj.folder);
      }
    },
    createWebSocket: function (folder) {
      this.player_socket = new WebSocket(`ws://${location.host}/select-player/${folder}`);
      this.player_socket.onopen = (ev) => {
        this.result.path = [];
        this.result.search_tree = [];
        ev.target.send(JSON.stringify({
          purpose: "problem",
          data: this.problem
        }));
      };
      this.player_socket.onclose = (ev) => {
        this.player_socket = null;
        if (this.load_next_player) {
          this.createWebSocket(this.player_obj.folder);
          this.load_next_player = false;
        }
      };
      this.player_socket.onmessage = (ev) => {
        let data = JSON.parse(ev.data);
        console.log(data);
        if (data.err) {
          this.addToLogs({
            type: "error",
            text: data.data
          });
        } else if (data.purpose == "initiation") {
          this.addToLogs({
            type: "notification",
            text: `Player ${data.data.name} is initiated`
          });
        } else if (data.purpose == "init execution") {
          this.addToLogs({
            type: "notification",
            text: `The search algorithm is initiated`
          });
        } else if (data.purpose == "terminated") {
          this.addToLogs({
            type: "notification",
            text: "Algorithm is terminated, path and search tree are returned"
          });
          this.searching = false;
          this.result.path = data.data.path;
          this.result.search_tree = data.data.search_tree;
          this.addToLogs({
            type: "notification",
            text: `path: ${data.data.path.length-1} steps`
          });
          this.addToLogs({
            type: "notification",
            text: `search_tree: ${data.data.search_tree.length} nodes`
          });
        }
      };
    },
    addToLogs: function (l) { if (this.log_enabler) { this.logs.push(l); } },
    showLogMsg: function (idx) { this.log_msg_dialog.index = idx; this.log_msg_dialog.show = true; },
    getColor: function (idx) { return this.colors[idx%this.colors.length]; },
    addNewBucket: function () { 
      if (!isNaN(this.param_dialog.new_bucket_size)) {
        this.problem.size.push(Number(this.param_dialog.new_bucket_size));
        this.problem.filled.push(0);
      }
      this.param_dialog.new_bucket_size = "";
    },
    removeBucket: function (idx) { 
      this.problem.size.splice(idx,1); 
      this.problem.filled.splice(idx,1); 
    },
    editInitialFill: function (idx) {
      this.param_dialog.edit_filled = idx;
      this.param_dialog.edit_filled_value = this.problem.filled[idx];
      this.$refs.editFillBox.focus();
    },
    updateInitialFill: function () {
      if (
        !isNaN(this.param_dialog.edit_filled_value) 
        && this.param_dialog.edit_filled > -1
        && Number(this.param_dialog.edit_filled_value) <= this.problem.size[this.param_dialog.edit_filled]
      ) {
        this.problem.filled.splice(this.param_dialog.edit_filled, 1, Number(this.param_dialog.edit_filled_value));
        this.param_dialog.edit_filled_value = "";
        this.param_dialog.edit_filled = -1;
      } else {
        if (isNaN(this.param_dialog.edit_filled_value)) { this.param_dialog.edit_filled_err.push(`${this.param_dialog.edit_filled_value} is not a number`) }
        else if (Number(this.param_dialog.edit_filled_value) > this.problem.size[this.param_dialog.edit_filled]) { this.param_dialog.edit_filled_err.push(`${this.param_dialog.edit_filled_value} is more than the size of the bucket (${this.problem.size[this.param_dialog.edit_filled]})`) }        
        else {
          this.param_dialog.edit_filled_value = "";
          this.param_dialog.edit_filled = -1;
        }
      }
      this.$refs.editFillBox.blur();
    }
  }
});