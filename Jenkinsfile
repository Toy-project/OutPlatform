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
              def a = input(
                message: 'Hello?',
                parameters: [
                  [
                    $class: 'BooleanParameterDefinition',
                    defaultValue: true,
                    description: '',
                    name: 'Please confirm you agree with this'
                  ]
                ])
              if(a){
                echo 'true'
              } else {
                echo 'false'
              }
            }
          }
        }
    }
}
