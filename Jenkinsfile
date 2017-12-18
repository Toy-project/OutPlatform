pipeline {
    agent none

    stages {
        stage('Build') {
          agent {
            docker {
              image 'node:8.9.2'
            }
          }

          steps {
              sh 'npm install'
          }
        }
        stage('Test') {
          agent {
            docker {
              image 'node:8.9.2'
            }
          }
          steps {
              sh './jenkins/scripts/test.sh'
          }
        }
        stage('Deliver for development') {
          agent any
          steps {
            sh 'docker cp . nodeForDev:/app'
            sh 'docker exec nodeForDev sh -c "cd /app && pm2 restart ecosystem.json"'
          }
        }
    }
}
