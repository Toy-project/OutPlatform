pipeline {
    agent {
        docker {
            image 'node:9.2.1-alpine'
            args '-p 8000:8000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        if(CI){
          stage('Test') {
              steps {
                  sh './jenkins/scripts/test.sh'
              }
          }
        }
        stage('Deliver') {
            steps {
              sh './jenkins/scripts/deliver.sh'
              input message: 'Finished using the web site? (Click "Proceed" to continue)'
              sh './jenkins/scripts/kill.sh'
            }
        }
    }
}
