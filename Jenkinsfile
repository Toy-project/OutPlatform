pipeline {
    agent none
    environment {
      CI = 'true'
    }
    stages {
        stage('Checkout') {
          agent any
          steps {
            //start Checkout
            echo 'start checkout'
            echo 'Building ${BRANCH_NAME}'
            echo 'Current workspace : ${workspace}'

            // remove shared diretory
            echo 'remove shared diretory'
            sh 'rm -rf /shared/*'

            //copy workspace -> shared
            echo 'copy workspace directory'
            sh 'cp -rf ./* /shared'

            // copy config -> shared
            echo 'copy config diretory'
            sh 'cp -rf /config /shared'
          }
        }

        stage('Product Deploy') {
          agent any
          when {
            branch 'master'
          }
          steps {
            retry(2) {
              timeout(2) { // 2minutes
                //develop container list
                echo 'develop container list'
                sh 'docker exec -i product ls -al'

                // copy shared -> workspace
                echo 'copy shared directory'
                sh 'docker exec -i product cp -rf /shared/* /app'

                // npm install
                echo 'npm install'
                sh 'docker exec -i product npm --prefix /app install /app'

                // npm run build
                echo 'npm install'
                sh 'docker exec -i product npm --prefix /app run build /app'

                //pm2 delete & start
                echo 'pm2 product start'
                sh 'docker exec -i product npm --prefix /app run product /app'
              }
            }
          }
        }
    }
}
