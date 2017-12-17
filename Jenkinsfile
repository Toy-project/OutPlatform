pipeline {
    agent {
      docker {
        image 'node:8.9.3-alpine'
        args '-p 80:80'
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
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Deliver for development') {
            steps {
              sh 'sudo docker exec -i -t test echo "Hello"'
            }
        }
    }
}
