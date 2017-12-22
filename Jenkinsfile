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

            // remove shared directory
            echo 'remove shared directory'
            sh 'rm -rf /shared/*'

            //copy workspace -> shared
            echo 'copy workspace directory'
            sh 'cp -rf ./* /shared'
          }
        }

        stage('Develop Deploy') {
          agent any
          when {
            branch 'develop'
          }
          steps {
            //develop container list
            echo 'develop container list'
            sh 'sudo docker exec -i develop ls -al'

            //copy shared -> workspace
            echo 'copy shared directory'
            sh 'sudo docker exec -i develop cp -rf /shared/* /app'
          }
        }
    }
}
