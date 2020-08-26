Vue.component('search-tree', {
  template: "#search-tree-template",
  props: {
    width: {
      type: String,
      default: "100%"
    },
    tree: {
      type: Array,
      default: []
    },
    font: {
      type: Object,
      default: () => ({
        state: 12,
        action: 10
      }),
    },
    dimension: {
      type: Object,
      default: () => ({
        node_height: 50,
        node_width: 50,
        link_height: 50,
        node_sep: 50
      })
    }
  },
  data: function () {
    return { }
  },
  computed: {
    font_size: function () {
      return {
        state: this.font && this.font.state ? this.font.state == "" ? 12 : this.font.state : 12,
        action: this.font && this.font.action ? this.font.action == "" ? 10 : this.font.action : 10,
      }
    },
    node_height: function () {
      return this.dimension && this.dimension.node_height ? isNaN(this.dimension.node_height) || Number(this.dimension.node_height) < 10 ? 50 : Number(this.dimension.node_height) : 50;
    },
    node_width: function () {
      return this.dimension && this.dimension.node_width ? isNaN(this.dimension.node_width) || Number(this.dimension.node_width) < 10 ? 50 : Number(this.dimension.node_width) : 50;
    },
    link_height: function () {
      return this.dimension && this.dimension.link_height ? isNaN(this.dimension.link_height) || Number(this.dimension.link_height) < 10 ? 50 : Number(this.dimension.link_height) : 50;
    },
    node_sep: function () {
      return this.dimension && this.dimension.node_sep ? isNaN(this.dimension.node_sep) || Number(this.dimension.node_sep) < 10 ? 50 : Number(this.dimension.node_sep) : 50;
    },
    tree_array: function () {
      let st_arr = [];
      if (this.tree && this.tree.length > 0) {
        st_arr.push([[this.tree.find(v => !v.parent)]]);
        while (!st_arr[st_arr.length - 1].every(arr => arr.every(v => v < 1))) {
          st_arr.push(
            st_arr[st_arr.length - 1].flat()
            .map(n => n < 1 ?
                [n - 1]
                : (n.children.length == 0 ? [0] : n.children.map(i => this.tree.find(v => v.id == i)).filter(v => v !== undefined))
            )
          );
        }
      }
      return st_arr;
    },
    view_box: function () {
      let vb = "0 0 0 0";
      if (this.tree_array.length > 0) {
        let width = 
          this.tree_array[this.tree_array.length - 1].length * this.node_width
          + (this.tree_array[this.tree_array.length - 1].length - 1) * this.node_sep + 10 + .5*this.node_width + .1*this.node_width;
        let height = 
          (this.tree_array.length - 1)* this.node_height
          + (this.tree_array.length - 2) * this.link_height + 10 + this.node_height + .1*this.node_height;
        vb = [-.1*this.node_width, -5-.1*this.node_height, width, height].join(" ");
      } else {
        vb = [0, 0, this.node_width, this.node_height].join(" ");
      }
      return vb;
    },
    node_x: function () {
      let x = [];
      if (this.tree_array.length > 0) {
        x.push(this.tree_array[this.tree_array.length - 2].flat().map((node,n) => n * (this.node_width + this.node_sep) + 5));
        for ( let i = this.tree_array.length - 3; i > -1; i-- ) {
          x.push(
            this.tree_array[i].flat().map((node,n) => {
              let first_child_idx = this.tree_array[i+1].slice(0,n).reduce((acc,curr) => acc + curr.length, 0);
              let last_child_idx = first_child_idx + this.tree_array[i+1][n].length - 1;
              return (x[x.length - 1][first_child_idx] + x[x.length - 1][last_child_idx])/2;
            })
          );
        }
      }
      return x.reverse();
    },
    linkage: function () {
      let links = [];
      if (this.tree_array.length > 0) {
        for ( let i = this.tree_array.length - 2; i > 0; i-- ) {
          links.push(
            this.tree_array[i].flatMap((siblings,s) => {
              let parent = this.node_x[i-1][s];
              let parent_node = this.tree_array[i-1].flat()[s];
              return siblings.map((node,n) => {
                let node_idx = this.tree_array[i].slice(0,s).reduce((acc,curr) => acc + curr.length, 0) + n;
                return {
                  parent_loc: parent,
                  child_loc: this.node_x[i][node_idx],
                  label: parent_node.actions ? parent_node.actions[n] : ''
                }
              });
            })
          );
        }
      }
      return links.reverse();
    },
  }
});

Vue.component("tap", {
  template: "#tap-template",
  props: {
    width: {
      type: String,
      default: "50"
    },
    x: {
      type: String,
      default: "0"
    },
    y: {
      type: String,
      default: "0"
    }
  }
});

Vue.component("drain", {
  template: "#drain-template",
  props: {
    width: {
      type: String,
      default: "50"
    },
    x: {
      type: String,
      default: "0"
    },
    y: {
      type: String,
      default: "0"
    }
  }
});

Vue.component("bucket", {
  template: "#bucket-template",
  props: {
    x: {
      type: String,
      default: "0"
    },
    y: {
      type: String,
      default: "0"
    },
    filledRatio: { // as ratio of the size
      type: Number,
      default: 1
    },
    dimension: {
      type: Object,
      default: () => ({
        w: 300,
        h: 300,
        left_partial: 175,
        right_partial: 50,
        top_height: 30
      })
    }
  },
  data: function () {
    return { }
  },
  computed: {
    height: function () { return this.dimension.height; },
    width: function () { return this.dimension.width; },
    w: function () { return this.dimension.w; },
    h: function () { return this.dimension.h; },
    left_partial: function () { return this.dimension.left_partial; },
    right_partial: function () { return this.dimension.right_partial; },
    top_height: function () { return this.dimension.top_height; },
  }
});

Vue.component("buckets", {
  template: "#buckets-template",
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    size: {
      type: Array,
      default: [8,5,3]
    },
    filled: {
      type: Array,
      default: [0,0,0]
    },
    source: {
      type: Boolean,
      default: true
    },
    sink: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      tap: {
        width: 200,
        x: 0,
        y: 0
      },
      bucket: {
        sep: 50,
        max: {
          w: 300,
          h: 300,
          left_partial: 175,
          right_partial: 50,
          top_height: 30,
        }
      }
    }
  },
  computed: {
    max_bucket: function () { return Math.max(...this.size); },
    buckets_dim: function () {
      let maxA = this.bucket.max.w * this.bucket.max.h;
      let buckets = this.size.map((v) => {
        let size_ratio = v / this.max_bucket;
        let delA = maxA * ( 1 - size_ratio );
        let w = this.bucket.max.w - delA / 2 / this.bucket.max.h;
        let h = this.bucket.max.h - this.bucket.max.h * delA / ( 2 * this.bucket.max.h * this.bucket.max.w - delA );
        let left_partial = this.bucket.max.left_partial / this.bucket.max.w * w;
        let right_partial = this.bucket.max.right_partial / this.bucket.max.w * w;
        let top_height = this.bucket.max.top_height / this.bucket.max.h * h;
        let height = 10+10+top_height+10+10+h+10+10;
        let width = 10+10+w+10+10;
        return {
          height: height,
          width: width,
          w: w,
          h: h,
          left_partial: left_partial,
          right_partial: right_partial,
          top_height: top_height,
          y: this.tap.width + this.bucket.max.h - h + this.bucket.max.top_height - top_height
        };
      });
      buckets = buckets.map((b,i) => {
        b.x = this.tap.x + this.tap.width + buckets.slice(0,i).reduce((a,v)=>a + v.width + this.bucket.sep, 0);
        return b;
      });
      return buckets;
    },
    drain: function () {
      let drn = { width: 150 };
      drn.x = this.tap.x + this.tap.width + this.buckets_dim.reduce((a,v) => a + v.width + this.bucket.sep, 0);
      drn.y = this.tap.y + this.tap.width + Math.max(...this.buckets_dim.map(d => d.height)) - drn.width / 2;
      return drn;
    }
  }
});

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
    buckets_display_index: 0,
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
    },
    search_tree_dialog: {
      show: false,
      tree_width: {
        current: 30,
        reset: 30
      },
      settings: {
        show: false
      },
      font: {
        state: 12,
        action: 10
      },
      dimension: {
        node_height: 50,
        node_width: 50,
        link_height: 50,
        node_sep: 50
      }
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