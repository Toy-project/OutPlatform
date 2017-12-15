pipeline {
    agent none
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            agent any
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            agent any
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Deliver for development') {
          when {
              branch 'dev'
          }
          agent {
            docker {
              image 'node:8.9.3-alpine'
              args '-p 80:80'
            }
          }
          steps {
            sh './jenkins/scripts/deliver-for-development.sh'
            input message: 'Finished using the web site? (Click "Proceed" to continue)'
            sh './jenkins/scripts/kill.sh'
          }
        }
        stage('Deploy for production') {
          when {
              branch 'pro'
          }
          agent {
            docker {
              image 'node:8.9.3-alpine'
              args '-p 5000:5000'
            }
          }
          steps {
            sh './jenkins/scripts/deploy-for-production.sh'
            input message: 'Finished using the web site? (Click "Proceed" to continue)'
            sh './jenkins/scripts/kill.sh'
          }
        }
    }
}
