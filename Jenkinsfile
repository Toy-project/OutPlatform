pipeline {
    agent none

    stages {
        stage('Build') {
          agent {
            docker {
              image 'node:8.9.3-alpine'
              args '-p 80:80'
            }
          }

          steps {
              sh 'npm --version'
          }
        }
        stage('Test') {
          agent {
            docker {
              image 'node:8.9.3-alpine'
              args '-p 80:80'
            }
          }
          steps {
              sh 'npm --version'
          }
        }
        stage('Deliver for development') {
          agent any
          steps {
            sh 'sudo docker exec -i -t test echo'
          }
        }
    }
}
