pipeline {
    agent {
        docker {
            image 'node:8.9.3-alpine'
            args '-p 8000:8000 -p 5000:5000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
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
