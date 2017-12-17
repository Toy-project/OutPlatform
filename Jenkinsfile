pipeline {
    agent any
    stages {
        stage('Deliver for development') {
            steps {
              sh 'docker exec -i -t test echo "Hello"'
            }
        }
    }
}
