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
            sh 'docker exec -i develop ls -al'

            // npm install
            echo 'npm install'
            sh 'docker exec -i develop npm --prefix /shared install /shared'


            //pm2 delete & start
            echo 'pm2 develop start'
            script {
              def isRunning = input(
                message: 'Please check below if it's running now',
                parameters: [
                  [
                    $class: 'BooleanParameterDefinition',
                    defaultValue: true,
                    description: '',
                    name: 'On running'
                  ]
                ])
              if(isRunning){
                sh 'docker exec -i develop pm2 restart /shared/ecosystem.json'
              } else {
                sh 'docker exec -i develop pm2 start /shared/ecosystem.json'
              }
            }
          }
        }
    }
}
