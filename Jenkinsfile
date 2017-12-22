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

            //copy config -> shared
            echo 'copy config directory'
            sh 'cp -rf /config /shared'
          }
        }
    }
}
