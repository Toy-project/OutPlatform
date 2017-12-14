set -x
npm run server &
sleep 1
echo $! > .pidfile
set +x
