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
                sh 'npm install'
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
              sh './jenkins/scripts/test.sh'
          }
        }
        stage('Deliver for development') {
            steps {
              sh 'sudo docker exec -i -t test echo'
            }
        }
    }
}
