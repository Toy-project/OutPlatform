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
        stage('Deliver for development') {
            steps {
              sh 'docker exec -i -t test echo "Hello"'
            }
        }
    }
}
