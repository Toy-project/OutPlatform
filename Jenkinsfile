pipeline {
    agent none

    stages {
        stage('Build') {
          agent {
            docker {
              image 'node:8.9.3-alpine'
            }
          }

            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
          agent {
            docker {
              image 'node:8.9.3-alpine'
            }
          }
          steps {
              sh './jenkins/scripts/test.sh'
          }
        }
        stage('Deliver for development') {
          ageny any
          steps {
            sh 'docker exec -i test npm install'
          }
        }
    }
}
