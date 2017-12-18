{
  "apps" : [{
    "name"        : "worker",
    "script"      : "/usr/local/bin/npm",
    "args" : "start"
    "cwd" : "/app"
    "watch"       : true,
    "env": {
      "NODE_ENV": "development"
    },
    "env_production" : {
       "NODE_ENV": "production"
    }
  },{
    "name"       : "api-app",
    "script"     : "./api.js",
    "instances"  : 4,
    "exec_mode"  : "cluster"
  }]
}
