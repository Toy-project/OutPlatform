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
            def doesJavaRock = input(message: 'Do you like Java?', ok: 'Yes',
                        parameters: [booleanParam(defaultValue: true,
                        description: 'If you like Java, just push the button',name: 'Yes?')])

echo "Java rocks?:" + doesJavaRock

          }
        }
    }
}
